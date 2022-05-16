import React, { useEffect, useState, useRef, useReducer } from 'react';
import { createFFmpeg, CreateFFmpegOptions } from '@ffmpeg/ffmpeg';
import { getStillsFromVideo, transformRawFrameData, attachRawFramesToAnalysis } from './utils';
import { uploadImgToBucket } from '../../services/s3Service';
import { VideoSource, S3Links, AlertMessageProps, DataAnalysis } from './types';
import { ProgressBar } from 'react-bootstrap';
import { fileNotSelected, uploadSuccessful, analysisError } from './Alert/utils';
import ActionAlert from './Alert/ActionAlert';
import { getAnalysis, sendDataToBackEnd } from '../../services/backendService';
import {VERSION} from '../../consts';

const UploadVideo = () => {

  const [analysisData, setAnalysisData] = useState<DataAnalysis>();
  const [message, setMessage] = useState<string>('Click the button to transcode');
  const [barProgress, setBarProgress] = useState<number>();
  const [showAlert, toggleShowAlert] = useReducer(state => !state, false);
  const [isTranscoding, toggleIsTranscoding] = useReducer(state => !state, false);
  const [alertMessage, setAlertMessage] = useState<AlertMessageProps>();
  const accuracy = useRef<number>(5); // TODO initialise as wanted default value
  const videoName = useRef<string>('');
  const source = useRef<VideoSource>('');

  const config: CreateFFmpegOptions = {log: true};

  if (VERSION !== '@dev') {
    config['corePath'] = '/static/js/ffmpeg-core.js';
  }

  const ffmpeg = useRef(createFFmpeg(config));

  const load = async () => {
    setMessage('Loading transcoder...');
    await ffmpeg.current.load();
    setMessage('Start transcoding');
  };

  useEffect(()=> {!ffmpeg.current.isLoaded() && load();}, []);

  const handleTranscodeClick = async (): Promise<void> => {
    if (isTranscoding) return;
    if (showAlert) toggleShowAlert();
    if (ffmpeg.current.isLoaded() && source.current) {
      toggleIsTranscoding();
      ffmpeg.current.setProgress(({ ratio }) => {
        setBarProgress(ratio*100);
      });
      const rawFrameDataArray: Uint8Array[] = await getStillsFromVideo(ffmpeg.current, source.current, accuracy.current);
      toggleIsTranscoding();
      setMessage('Transcoding Complete');
      const {filesArray, newFramesNames, videoId} = transformRawFrameData(rawFrameDataArray); // TODO update and transform only filesarray and videoid
      const {links}: S3Links = await sendDataToBackEnd(newFramesNames, videoId);
      const isUploaded = await uploadImgToBucket(filesArray, links);
      if (isUploaded) {
        let analysis: DataAnalysis | undefined;
        console.log('=> starting timeout with ', videoId, new Date(Date.now()));
        setTimeout(async () => {
          console.log('FIRING', new Date(Date.now()));
          analysis = await getAnalysis(videoId);
          console.log({analysis});
          if (analysis) {
            const analysisWithRawFrames = attachRawFramesToAnalysis(rawFrameDataArray, analysis);
            setAnalysisData(analysisWithRawFrames);
            setAlertMessage(uploadSuccessful);
            toggleShowAlert();
            console.log('=> DONE');
          } else {
            setAlertMessage(analysisError);
            toggleShowAlert();
          }
        }, 5000);
      }// TODO add an else block to handle transcode errors?
    } else {!source.current && setAlertMessage(fileNotSelected);
      toggleShowAlert();
    }
  };

  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (event.target.files) {
      source.current = event.target.files[0];
      videoName.current = event.target.files[0]?.name.replace(/\.\w+$/gi, ''); //TODO send videoName.current to backend and display it in the dashboard
    }
  };

  const handleAccuracyChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    accuracy.current = +event.target.value;
  };

  return (
    <section className="py-4 py-xl-5 ">
      <div className="container my-5 mt-2">
        <div className="text-white text-center bg-dark border rounded border-0 p-3 p-md-4 d-flex flex-column aling-items-center">
          <h1 className="fw-bold text-white mb-3">analyze video</h1><small></small>
          <p className="mb-4">Upload a video and ClassDojo will analyze it</p>
          <div className='mt-4'>
            <small className='me-3'>Select analysis quality</small>
            <select style={{maxWidth: 200}} defaultValue={5} onChange={handleAccuracyChange}>
              <optgroup label="Quality">
                <option value={20}>Low</option>
                <option value={10}>Medium</option>
                <option value={5}>High</option>
              </optgroup>
            </select>
          </div>
          <div className='my-3'>
            <div className='px-9'>
              <label htmlFor="formFileLg" className="form-label notranslate mt-3"></label>
              <input className="form-control form-control-lg notranslate" id="formFileLg" type="file" translate='no' accept="video/*" onChange={handleFileInputChange}/>
            </div>
            {/* <input type="file" accept="video/*" onChange={handleFileInputChange}/> */}
            <div className="my-3"><a className={`btn btn-primary btn-lg me-2 dark-element ${!ffmpeg.current.isLoaded() || isTranscoding ? 'upload-btn-disabled' : ''}`} role="button" onClick={handleTranscodeClick}>ANALYZE VIDEO</a></div>
            <div className='mt-4'>{ isTranscoding ? <ProgressBar style={{ marginTop: 35, marginBottom: 12 }} animated now={barProgress}/> : <p style={{ marginBottom: 0, marginTop: 0 }}>{message}</p>}</div>
          </div>
        </div>
        <div className='mt-2'>
          {showAlert &&
          <ActionAlert videoName={videoName.current} accuracy={accuracy.current} analysisData={analysisData as DataAnalysis} alertMessage={alertMessage as AlertMessageProps} toggleShowAlert={toggleShowAlert}/>}
        </div>
      </div>
    </section>
  );
};

export default UploadVideo;

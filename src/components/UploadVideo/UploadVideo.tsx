import React, { useEffect, useState, useRef, useReducer } from 'react';
import { createFFmpeg, CreateFFmpegOptions } from '@ffmpeg/ffmpeg';
import { getStillsFromVideo, transformRawFrameData, attachRawFramesToAnalysis } from './utils';
import { uploadImgToBucket } from '../../services/s3Service';
import { VideoSource, S3Links, AlertMessageProps, DataAnalysis, VideoStillsWithInfo } from './types';
import { ProgressBar } from 'react-bootstrap';
import { fileNotSelected, analysisError } from './Alert/utils';
import ActionAlert from './Alert/ActionAlert';
import Spinner from './Spinner';
import { getAnalysis, sendDataToBackEnd } from '../../services/backendService';
import {VERSION} from '../../constants';
import { useNavigate } from 'react-router-dom';

const UploadVideo = () => {

  const [message, setMessage] = useState<string>('Click the button to transcode');
  const [barProgress, setBarProgress] = useState<number>();
  const [showSpinner, toggleShowSpinner] = useReducer(state => !state, false);
  const [showAlert, toggleShowAlert] = useReducer(state => !state, false);
  const [isTranscoding, toggleIsTranscoding] = useReducer(state => !state, false);
  const [alertMessage, setAlertMessage] = useState<AlertMessageProps>();
  const accuracy = useRef<number>(5); // TODO initialise as wanted default value
  const videoName = useRef<string>('');
  const videoDate = useRef<string>('');
  const source = useRef<VideoSource>('');
  const navigate = useNavigate();

  const config: CreateFFmpegOptions = {log: true};

  if (VERSION !== '@dev') {
    config['corePath'] = '/static/js/ffmpeg-core.js';
  }

  const ffmpeg = useRef(createFFmpeg(config));

  const load = async () => {
    setMessage('WAX ON, WAX OFF... 🥋');
    await ffmpeg.current.load();
    setMessage('START ANALYSIS');
  };

  useEffect(()=> {!ffmpeg.current.isLoaded() && load();}, []);

  const showError = () => {
    setAlertMessage(analysisError);
    toggleShowSpinner();
    toggleShowAlert();
  };

  const handleTranscodeClick = async (): Promise<void> => {
    if (isTranscoding) return;
    if (showAlert) toggleShowAlert();
    if (ffmpeg.current.isLoaded() && source.current) {
      toggleIsTranscoding();
      ffmpeg.current.setProgress(({ ratio }) => {
        setBarProgress(ratio*100);
      });
      const { rawFrameDataArray, duration }: VideoStillsWithInfo = await getStillsFromVideo(ffmpeg.current, source.current, accuracy.current);
      toggleIsTranscoding();
      toggleShowSpinner();
      const { filesArray, newFramesNames, videoId } = transformRawFrameData(rawFrameDataArray);
      const { links }: S3Links = await sendDataToBackEnd(newFramesNames, videoId);
      const isUploaded = await uploadImgToBucket(filesArray, links);
      if (isUploaded) {
        const analysis = await getAnalysis(videoId, videoName.current, videoDate.current, duration, accuracy.current);
        if (analysis) {
          const analysisWithRawFrames = attachRawFramesToAnalysis(rawFrameDataArray, analysis);
          const completeData = { ...analysisWithRawFrames, videoName: videoName.current, videoDate: videoDate.current, duration, accuracy: accuracy.current, videoId};
          toggleShowSpinner();
          navigate(`/analysis/${videoId}`, { state: completeData as DataAnalysis });
        } else {
          showError();
        }
      } else {
        showError();
      }
    } else {!source.current && setAlertMessage(fileNotSelected);
      toggleShowAlert();
    }
  };

  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (event.target.files) {
      source.current = event.target.files[0];
      videoName.current = event.target.files[0]?.name.replace(/\.\w+$/gi, '');
      videoDate.current = event.target.files[0] && new Date(event.target.files[0].lastModified).toISOString();
    }
  };

  const handleAccuracyChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    accuracy.current = +event.target.value;
  };

  return (
    <section className="py-4 py-xl-5 ">
      <div className="container my-5 mt-2">
        <div className="text-white text-center bg-dark border rounded border-0 p-3 p-md-4 d-flex flex-column aling-items-center">
          <h1 className="fw-bold text-white mb-3">ANALYZE VIDEO</h1><small></small>
          <p className="mb-4">Upload a video and Class Dojo will analyze it</p>
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
            {/* <div className="mt-5"><a className={`btn btn-primary btn-lg me-2 dark-element ${!ffmpeg.current.isLoaded() || isTranscoding ? 'upload-btn-disabled' : ''}`} role="button" onClick={handleTranscodeClick}>{message}</a></div> */}
            {showSpinner ? <Spinner /> : <div className='mt-4 mx-9'>
              { isTranscoding ?
                <ProgressBar className={'mt-6 mb-5'} /*style={{ marginTop: 35, marginBottom: 12 }}*/ animated now={barProgress}/> :
                <div className="mt-5 mb-2"><a className={`btn btn-primary btn-lg me-2 dark-element ${!ffmpeg.current.isLoaded() || isTranscoding ? 'upload-btn-disabled' : ''}`} role="button" onClick={handleTranscodeClick}>{message}</a></div>}</div>}
          </div>
        </div>
        <div className='mt-2'>
          {showAlert && <ActionAlert alertMessage={alertMessage as AlertMessageProps} toggleShowAlert={toggleShowAlert}/>}
        </div>
      </div>
    </section>
  );
};

export default UploadVideo;

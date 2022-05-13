import React, { useEffect, useState, useRef, useReducer } from 'react';
import { createFFmpeg } from '@ffmpeg/ffmpeg';
import { getStillsFromVideo, transformRawFrameData } from './utils';
import { uploadImgToBucket } from '../../services/s3Service';
import { VideoSource, Frame, S3Links, AlertMessageProps, DataAnalysis } from './types';
import { ProgressBar } from 'react-bootstrap';
import { loaderNotReady, fileNotSelected, uploadSuccessful } from './Alert/utils';
import ActionAlert from './Alert/ActionAlert';
import { getAnalysis, sendDataToBackEnd } from '../../services/backendService';

const UploadVideo = () => {

  const [framesArray, setFramesArray] = useState<Frame[]>([]);
  const [analysisData, setAnalysisData] = useState<DataAnalysis>();
  const [message, setMessage] = useState<string>('Click the button to transcode');
  const [barProgress, setBarProgress] = useState<number>();
  const [showAlert, toggleShowAlert] = useReducer(state => !state, false);
  const [isTranscoding, toggleIsTranscoding] = useReducer(state => !state, false);
  const [alertMessage, setAlertMessage] = useState<AlertMessageProps>();
  const accuracy = useRef<number>(5); // TODO initialise as wanted default value
  const source = useRef<VideoSource>('');
  const ffmpeg = useRef(createFFmpeg({ log: true }));

  const load = async () => {
    setMessage('Loading transcoder');
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
      const {filesArray, newFramesArray, videoId} = transformRawFrameData(rawFrameDataArray); // TODO refactor so we can access images from the dashboard (useContext?) and trigger the request to be, s3 and be again one after another.
      setFramesArray(newFramesArray);
      const {links}: S3Links = await sendDataToBackEnd(newFramesArray, videoId);
      const isUploaded = await uploadImgToBucket(filesArray, links);
      if (isUploaded) {
        const analysis: DataAnalysis = await getAnalysis(videoId);
        setAnalysisData(analysis);
      }// TODO parse data to be passed to the dashboard and save that to state (or local storage?)

      setAlertMessage(uploadSuccessful);
      toggleShowAlert();

    } else {!source.current ? setAlertMessage(fileNotSelected) : setAlertMessage(loaderNotReady);
      toggleShowAlert();
    }
  };

  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (event.target.files) {
      source.current = event.target.files[0];
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
            <div className="my-3"><a className={`btn btn-primary btn-lg me-2 dark-element ${isTranscoding ? 'upload-btn-disabled' : ''}`} role="button" onClick={handleTranscodeClick}>UPLOAD VIDEO</a></div>
            <div className='mt-4'>{ isTranscoding ? <ProgressBar style={{ marginTop: 35, marginBottom: 12 }} animated now={barProgress}/> : <p style={{ marginBottom: 0, marginTop: 0 }}>{message}</p>}</div>
          </div>
        </div>
        <div className='mt-2'>
          {showAlert &&
          <ActionAlert accuracy={accuracy.current} analysisData={analysisData as DataAnalysis} alertMessage={alertMessage as AlertMessageProps} toggleShowAlert={toggleShowAlert}/>}
        </div>
      </div>
    </section>
  );
};


export default UploadVideo;

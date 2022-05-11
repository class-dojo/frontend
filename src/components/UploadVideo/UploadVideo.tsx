import React, {useEffect, useState, useRef, useReducer} from 'react';
import {createFFmpeg} from '@ffmpeg/ffmpeg';
import { getStillsFromVideo, transformRawFrameData } from './utils';
import { uploadImgToBucket } from '../../services/s3Service';
import { VideoSource, Frame, AlertMessageProps } from './types';
import { ProgressBar } from 'react-bootstrap';
import { loaderNotReady, fileNotSelected, uploadSuccessful } from './Alert/utils';
import ActionAlert from './Alert/Alert';
import { getAnalytics, sendDataToBackEnd } from '../../services/backendService';


const UploadVideo = () => {

  const [framesArray, setFramesArray] = useState<Frame[]>([]);
  const [message, setMessage] = useState<string>('Click the button to transcode');
  const [barProgress, setBarProgress] = useState<number>();
  const [showAlert, toggleShowAlert] = useReducer(state => !state, false);
  const [isTranscoding, toggleIsTranscoding] = useReducer(state => !state, false);
  const [alertMessage, setAlertMessage] = useState<AlertMessageProps>({heading: '', body: '', variant: ''});
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
      const urls: string[] = sendDataToBackEnd(newFramesArray, videoId); // TODO it's gonna be async
      const isUploaded = await uploadImgToBucket(filesArray, urls); // make it return a boolean if responses % is high enough
      const analytics = getAnalytics(videoId); // TODO pass analytics to helper functions and then to dashboard
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
    <section className="py-4 py-xl-5">
      <div className="container my-5">
        <div className="text-white bg-dark border rounded border-0 p-4 p-md-5">
          <h2 className="fw-bold text-white mb-3">analyze video</h2><small></small>
          <p className="mb-4">Upload a video and ClassDojo will analyze it</p><small>Select analysis quality&nbsp;</small>
          <select defaultValue={5} onChange={handleAccuracyChange}>
            <optgroup label="Parsing Accuracy">
              <option value={20}>Low</option>
              <option value={10}>Medium</option>
              <option value={5}>High</option>
            </optgroup>
          </select>
          <div className='my-3'>
            <input type="file" accept="video/*" onChange={handleFileInputChange}/>
            <div className="my-3"><a className="btn btn-primary btn-lg me-2" role="button" onClick={handleTranscodeClick}>UPLOAD VIDEO</a></div>
            <div>{ isTranscoding ? <ProgressBar animated now={barProgress}/> : <p>{message}</p>}</div>
          </div>
          {showAlert && <ActionAlert alertMessage={alertMessage} toggleShowAlert={toggleShowAlert}/>}
        </div>
      </div>
    </section>
  );
};


export default UploadVideo;

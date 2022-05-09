import React, {useEffect, useState, useRef, useReducer} from 'react';
import {createFFmpeg} from '@ffmpeg/ffmpeg';

import { getStillsFromVideo, transformRawFrameData } from './utils';
import { uploadImgToBucket } from '../../services/s3Service';
import { VideoSource } from './types';

const UploadVideo = () => {

  const [frameUrlArray, setFrameUrlArray] = useState<string[]>([]);
  const [message, setMessage] = useState<string>('Click the button to transcode');
  const [isLoaderReady, setLoaderReady] = useReducer(()=> true, false);
  const source = useRef<VideoSource>('');
  const ffmpeg = useRef(createFFmpeg({ log: true }));
  const load = async () => {
    setMessage('Loading ffmpeg-core.js');
    await ffmpeg.current.load();
    setLoaderReady();
    setMessage('Start transcoding');
  };
  useEffect(()=> {load();}, []);

  const handleTranscodeClick = async (): Promise<void> => {
    if (isLoaderReady && source.current) {
      const rawFrameDataArray: Uint8Array[] = await getStillsFromVideo(ffmpeg.current, source.current);
      setMessage('Transcoding Complete');

      const {filesArray, newFrameUrlArray} = transformRawFrameData(rawFrameDataArray);
      setFrameUrlArray(newFrameUrlArray);
      uploadImgToBucket(filesArray[0]); // TODO change alert with warning component
    } else {alert('Loader not ready, wait for "Start Transcoding" message to appear');}

    // TODO send request to backend
    // const DataToBeSent = {
    //   [source.current.toString()]: filesArray
    // };
  };

  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (event.target.files) {
      source.current = event.target.files[0];
    }
  };

  return (

    <section className="py-4 py-xl-5">
      <div className="container">
        <div className="text-white bg-dark border rounded border-0 p-4 p-md-5">
          <h2 className="fw-bold text-white mb-3">analyze video</h2><small></small>
          <p className="mb-4">Upload a video and ClassDojo will analyze it</p><small>Select analysis quality&nbsp;</small><select>
            <optgroup label="This is a group">
              <option value="12" defaultValue={undefined}>Low</option>
              <option value="13">Medium</option>
              <option value="14">High</option>
            </optgroup>
          </select>
          <div>
            <input type="file" accept="video/*" onChange={handleFileInputChange}/>
            <div className="my-3"><a className="btn btn-primary btn-lg me-2" role="button" onClick={handleTranscodeClick}>UPLOAD VIDEO</a></div>
            <p>{message}</p>
            <sub>Estimated duration: 3 min</sub>
          </div>
          <div>
            {frameUrlArray && frameUrlArray.map(frameURL => <img src={frameURL} key={frameURL}/>)}
          </div>
        </div>
      </div>
    </section>


  );
};


export default UploadVideo;

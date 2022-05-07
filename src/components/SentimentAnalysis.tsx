import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
import React, { useState } from 'react';

const SentimentAnalysis = () => {
  const [videoSrc, setVideoSrc] = useState('');
  const [message, setMessage] = useState('Click Start to transcode');
  const ffmpeg = createFFmpeg({
    log: true,
  });
  const doTranscode = async () => {
    setMessage('Loading ffmpeg-core.js');
    await ffmpeg.load();
    setMessage('Start transcoding');
    ffmpeg.FS('writeFile', 'test.mp4', await fetchFile('/flame.avi'));
    await ffmpeg.run('-i', 'test.mp4', '-vf', 'fps=1/6', 'out%02d.jpg');
    setMessage('Complete transcoding');
    const data = ffmpeg.FS('readFile', 'test.mp4');
    console.log(data);
    setVideoSrc(URL.createObjectURL(new Blob([data.buffer], { type: 'video/mp4' })));
  };
  return (
    <div className="App">
      <p/>
      <video src={videoSrc} controls></video><br/>
      <button onClick={doTranscode}>Start</button>
      <p>{message}</p>
    </div>
  );
};


export default SentimentAnalysis;
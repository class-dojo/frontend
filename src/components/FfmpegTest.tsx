import React, {useState, useEffect} from 'react';
import {createFFmpeg, fetchFile} from '@ffmpeg/ffmpeg';

const ffmpeg = createFFmpeg({log: true});

const FfmpegTest = () => {

  const [ready, setReady] = useState(false);

  const load = async () => {
    await ffmpeg.load();
    setReady(true);
  };

  useEffect(()=> {
    load();
  }, []);


  return (<>TEST</>);
};

export default FfmpegTest;
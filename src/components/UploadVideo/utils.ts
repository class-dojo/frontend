import { fetchFile, FFmpeg } from '@ffmpeg/ffmpeg';

import { VideoSource } from './types';

export const getStillsFromVideo =
async (ffmpeg: FFmpeg, source: VideoSource): Promise<Uint8Array[]> => {
  ffmpeg.FS('writeFile', 'test.mp4', await fetchFile(source));
  await ffmpeg.run('-i', 'test.mp4', '-vf', 'fps=1/5', '%d.png');
  const frameArray = [];
  console.log('SOURCE', source);
  for (let i = 1; i<=14; i++) {
    const frame = ffmpeg.FS('readFile', `${i}.png`);
    frameArray.push(frame);
  }
  return frameArray;
};

export const transformRawFrameData = (rawFrameDataArray: Uint8Array[]) => {
  const filesArray: File[] = [];
  const newFrameUrlArray: string[] = [];
  rawFrameDataArray.forEach((frameRawData, i) => {
    const frameUrlBlob: string = URL.createObjectURL(new Blob([frameRawData], { type: 'image/png' }));
    newFrameUrlArray.push(frameUrlBlob);
    const imgFile = new File([frameRawData], `${i+1}.png`);
    filesArray.push(imgFile);
  });
  return {filesArray, newFrameUrlArray};
};

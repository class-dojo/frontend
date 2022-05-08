import { fetchFile, FFmpeg } from '@ffmpeg/ffmpeg';

import { VideoSource } from './types';

export const getStillsFromVideo =
async (ffmpeg: FFmpeg, source: VideoSource): Promise<Uint8Array[]> => {
  ffmpeg.FS('writeFile', 'test.mp4', await fetchFile(source));
  await ffmpeg.run('-i', 'test.mp4', '-vf', 'fps=1/5', '%d.jpg');
  const frameArray = [];
  const duration: number = await getVideoDuration(source);
  for (let i = 1; i<=Math.floor(duration/5); i++) {
    const frame = ffmpeg.FS('readFile', `${i}.jpg`);
    frameArray.push(frame);
  }
  return frameArray;
};

export const getVideoDuration = async (source: VideoSource) => {
  const video = document.createElement('video');
  video.src = URL.createObjectURL(source as Blob);
  video.preload = 'metadata';
  const duration: number = await videoLoaded(video);
  return duration;
};

const videoLoaded = async (video: HTMLVideoElement): Promise<number> => {
  return new Promise<number>((resolve) => {
    return video.onloadedmetadata = function () {
      window.URL.revokeObjectURL(video.src);
      resolve(video.duration);
    };
  });
};

export const transformRawFrameData = (rawFrameDataArray: Uint8Array[]) => {
  const filesArray: File[] = [];
  const newFrameUrlArray: string[] = [];
  rawFrameDataArray.forEach((frameRawData, i) => {
    const frameUrlBlob: string = URL.createObjectURL(new Blob([frameRawData], { type: 'image/jpg' }));
    newFrameUrlArray.push(frameUrlBlob);
    const imgFile = new File([frameRawData], `${i+1}.jpg`);
    filesArray.push(imgFile);
  });
  return {filesArray, newFrameUrlArray};
};

import { fetchFile, FFmpeg } from '@ffmpeg/ffmpeg';
import { VideoSource, Frame } from './types';
import { v4 as uuidv4 } from 'uuid';

export const getStillsFromVideo =
  async (ffmpeg: FFmpeg, source: VideoSource, accuracy: number): Promise<Uint8Array[]> => {
    ffmpeg.FS('writeFile', 'test.mp4', await fetchFile(source));
    await ffmpeg.run('-i', 'test.mp4', '-vf', `fps=1/${accuracy}`, '%d.jpg');
    const frameArray = [];
    const duration: number = await getVideoDuration(source);
    for (let i = 1; i <= Math.floor(duration / accuracy); i++) {
      const frame: Uint8Array = ffmpeg.FS('readFile', `${i}.jpg`);
      frameArray.push(frame);
    }
    return frameArray;
  };

export const getVideoDuration = async (source: VideoSource) => {
  const video: HTMLVideoElement = document.createElement('video');
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
  const newFramesArray: Frame[] = [];
  const videoId: string = uuidv4();
  rawFrameDataArray.forEach((frameRawData, i) => {
    const frameName = `${videoId}/${i + 1}.jpg`;
    const singleFrameObj: Frame = { [frameName]: URL.createObjectURL(new Blob([frameRawData], { type: 'image/jpg' })) };
    newFramesArray.push(singleFrameObj);
    const imgFile = new File([frameRawData], frameName);
    filesArray.push(imgFile);
  });
  return { filesArray, newFramesArray, videoId };
};

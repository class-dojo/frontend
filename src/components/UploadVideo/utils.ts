import { fetchFile, FFmpeg } from '@ffmpeg/ffmpeg';
import { VideoSource, DataAnalysis, VideoStillsWithInfo } from './types';
import { v4 as uuidv4 } from 'uuid';
import { sorryTooLong } from './Alert/utils';

export const getStillsFromVideo = async (ffmpeg: FFmpeg, source: VideoSource, accuracy: number): Promise<VideoStillsWithInfo> => {
  const duration: number = await getVideoDuration(source);
  const ratio = Math.floor(duration / accuracy);
  if (ratio <= 50) {
    ffmpeg.FS('writeFile', 'test.mp4', await fetchFile(source));
    await ffmpeg.run('-i', 'test.mp4', '-vf', `fps=1/${accuracy}`, '%d.jpg');
    const rawFrameDataArray = [];
    for (let i = 1; /*ratio = Math.floor(duration / accuracy);*/ i <= ratio; i++) {
      const frame: Uint8Array = ffmpeg.FS('readFile', `${i}.jpg`);
      rawFrameDataArray.push(frame);
    }
    return { rawFrameDataArray, duration };
  } else {
    return { sorryTooLong };
  }
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
  const newFramesNames: string[] = [];
  const videoId: string = uuidv4();
  rawFrameDataArray.forEach((frameRawData, i) => {
    const frameName = `${videoId}/${i + 1}.jpg`;
    newFramesNames.push(frameName);
    const imgFile = new File([frameRawData], frameName);
    filesArray.push(imgFile);
  });
  return { filesArray, newFramesNames, videoId };
};

export const attachRawFramesToAnalysis = (frames: Uint8Array[], analysis: DataAnalysis) => {
  const framesArrayWithRawData = analysis.framesArray.map((singleFrameAnalysis, i) => {
    return singleFrameAnalysis.isImportantAttention || singleFrameAnalysis.isImportantMood || singleFrameAnalysis.isImportantPeople ?
      { ...singleFrameAnalysis, importantFrame: frames[i] } : singleFrameAnalysis;
  });
  return { ...analysis, framesArray: framesArrayWithRawData };
};

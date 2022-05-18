import { IMAGE_BUCKET_URL } from '../../constants';
import {Frame, SingleFrameAnalysis, TSingleFrameKeys} from '../UploadVideo/types';

export const parseChartData = (framesArray: SingleFrameAnalysis[], key: TSingleFrameKeys, samplePeriod: number, chart: string) => {

  let importance = '' as TSingleFrameKeys;
  switch (key) {
    case 'attentionScore':
      importance = 'isImportantAttention';
      break;
    case 'moodScore':
      importance = 'isImportantMood';
      break;
    case 'amountOfPeople':
      importance = 'isImportantPeople';
      break;
  }
  if (chart === 'line') {
    return parseLine(framesArray, key, samplePeriod, importance);
  } else return parseBar(framesArray, key, samplePeriod, importance);
};

const parseBar = (framesArray: SingleFrameAnalysis[], key: TSingleFrameKeys, samplePeriod: number, importance: TSingleFrameKeys) => {
  let goodKeyName = '';
  switch (key) {
    case 'attentionScore':
      goodKeyName = 'Attention';
      break;
    case 'moodScore':
      goodKeyName = 'Mood';
      break;
    case 'amountOfPeople':
      goodKeyName = 'Headcount';
      break;
  }

  const importantIndexes: number[] = [];
  const data = framesArray.map((frame: SingleFrameAnalysis, i: number) => {
    if (frame[importance]) importantIndexes.push(i);
    return { id: i, Time: i * samplePeriod, [goodKeyName]: key === 'amountOfPeople' ? Math.round(Number(frame[key]) * 10) / 10 : Math.round(Number(frame[key]) * 100 * 10) / 10 };
  });
  return { data, importantIndexes, keys: [goodKeyName] };
};

export const getImportantFrames = (data: SingleFrameAnalysis[]) => {
  const frames: Frame = {};
  data.forEach((singleFrameData, i) => {
    if (singleFrameData.importantFrame) {
      return typeof singleFrameData.importantFrame === 'string' ?
        frames[i] = {
          src: `${IMAGE_BUCKET_URL}${singleFrameData.importantFrame}`,
          frameInfo: singleFrameData.faceDetails
        } :
        (frames[i] = {
          src: URL.createObjectURL(new Blob([singleFrameData.importantFrame], { type: 'image/jpg' })),
          frameInfo: singleFrameData.faceDetails
        });
    }
  });
  return frames;
};

const parseLine = (framesArray: SingleFrameAnalysis[], key: TSingleFrameKeys, samplePeriod: number, importance: TSingleFrameKeys) => {
  const data = framesArray.map((frame: SingleFrameAnalysis, i: number) => {
    return {
      x: i * samplePeriod,
      y: key === 'amountOfPeople' ? Math.round(Number(frame[key]) * 10) / 10 : Math.round(Number(frame[key]) * 100 * 10) / 10,
      isImportant: frame[importance] as boolean
    };
  });
  return { data };
};

export const isInFirstHalf = (index: number, length: number) => {
  return index < length / 2;
};

import { Frame, SingleFrameAnalysis, SingleFramesLoose } from '../UploadVideo/types';

// ALL IN ONE
export const parseChartData = (framesArray: SingleFramesLoose[], key: string, samplePeriod: number, chart: string) => {
  let importance = '';
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

const parseBar = (framesArray: SingleFramesLoose[], key: string, samplePeriod: number, importance: string) => {
  let goodKeyName = '';
  switch (key) {
    case 'attentionScore':
      goodKeyName = 'Attention';
      break;
    case 'moodScore':
      goodKeyName = 'Mood';
      break;
    case 'amountOfPeople':
      goodKeyName = 'People';
      break;
  }
  const importantIndexes: number[] = [];
  const data = framesArray.map((frame: SingleFramesLoose, i: number) => {
    if (frame[importance]) importantIndexes.push(i);
    return { id: i, Time: i * samplePeriod, [goodKeyName]: Math.round(Number(frame[key]) * 10 * 10) / 10 };
  });
  return { data, importantIndexes, keys: [goodKeyName] };
};

// TODO when we get links for old videoanalysis from be, add if else statement if we receive Uint8Array or another type in importantFrame property
export const getImportantFrames = (data: SingleFrameAnalysis[]) => {
  const frames: Frame = {};
  data.forEach((singleFrameData, i) => singleFrameData.importantFrame &&
    (frames[i] = URL.createObjectURL(new Blob([singleFrameData.importantFrame], { type: 'image/jpg' }))));
  return frames;
};

const parseLine = (framesArray: SingleFramesLoose[], key: string, samplePeriod: number, importance: string) => {
  const data = framesArray.map((frame: SingleFramesLoose, i: number) => {
    return {
      x: i * samplePeriod,
      y: Math.round(Number(frame[key]) * 10 * 10) / 10,
      isImportant: frame[importance] as boolean
    };
  });
  return { data };
};

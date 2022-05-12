import { SingleFramesLoose } from '../UploadVideo/types';

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
  const importantIndexes: number[] = [];
  const data = framesArray.map((frame: SingleFramesLoose, i: number) => {
    if (frame[importance]) importantIndexes.push(i);
    return { id: i, Time: i * samplePeriod, [key]: frame[key] };
  });
  return { data, importantIndexes };
};

const parseLine = (framesArray: SingleFramesLoose[], key: string, samplePeriod: number, importance: string) => {
  const data = framesArray.map((frame: SingleFramesLoose, i: number) => {
    return { x: i * samplePeriod, y: frame[key], isImportant: frame[importance] };
  });
  return { data };
};

// const attentionLine = parseChartData(analysis.framesArray, 'attentionScore', accuracy.current, 'line');
// const moodLine = parseChartData(analysis.framesArray, 'moodScore', accuracy.current, 'line');
// const peopleLine = parseChartData(analysis.framesArray, 'amountOfPeople', accuracy.current, 'line');
// const attentionBar = parseChartData(analysis.framesArray, 'attentionScore', accuracy.current, 'bar');
// const moodBar = parseChartData(analysis.framesArray, 'moodScore', accuracy.current, 'bar');
// const peopleBar = parseChartData(analysis.framesArray, 'amountOfPeople', accuracy.current, 'bar');

// console.log('atL', attentionLine, '\nmoL', moodLine, '\npplL',  peopleLine, '\natB', attentionBar, '\nmoB', moodBar, '\npplB', peopleBar);
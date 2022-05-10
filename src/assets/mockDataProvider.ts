import { colors } from '../colors';

export const createMultiLineData = () => {
  const dataset1 = getRandomData(21);
  dataset1.data[17].isImportant = true;
  dataset1.data[9].isImportant = true;
  dataset1.color = '#f5c022';
  dataset1.id = 'Happiness';

  const dataset2 = getRandomData(21);
  dataset2.data[17].isImportant = true;
  dataset2.data[9].isImportant = true;
  dataset2.color = '#2fcbd6';
  dataset2.id = 'Sadness';

  const dataset3 = getRandomData(21);
  dataset3.data[17].isImportant = true;
  dataset3.data[9].isImportant = true;
  dataset3.color = '#5252bf';
  dataset3.id = 'Calmness';

  const dataset4 = getRandomData(21);
  dataset4.data[17].isImportant = true;
  dataset4.data[9].isImportant = true;
  dataset4.color = '#1db525';
  dataset4.id = 'Confusion';

  return [dataset1, dataset2, dataset3, dataset4];
};

export const createSingleLineData = () => {
  const dataset = getRandomData(21);
  dataset.data[17].isImportant = true;
  dataset.data[9].isImportant = true;
  dataset.color = colors.turquoise;
  dataset.id = 'Happiness';

  return [dataset];
};

export const mockRawData = [3, 4, 4, 6, 5, 6, 4, 3, 5, 7, 6, 5, 5, 4, 4, 3, 2, 5, 7, 8, 8, 7, 7, 6, 7];
export const mockRawData2 = [...mockRawData].reverse();

export const mockRadarData = [
  {
    emotion: 'Confusion',
    value: +((Math.random() * 9) + 1).toFixed(1),
  },
  {
    emotion: 'Surprise',
    value: +((Math.random() * 9) + 1).toFixed(1),
  },
  {
    emotion: 'Fear',
    value: +((Math.random() * 9) + 1).toFixed(1),
  },
  {
    emotion: 'Sadness',
    value: +((Math.random() * 9) + 1).toFixed(1),
  },
  {
    emotion: 'Happiness',
    value: +((Math.random() * 9) + 1).toFixed(1),
  },
  {
    emotion: 'Anger',
    value: +((Math.random() * 9) + 1).toFixed(1),
  },
  {
    emotion: 'Disgust',
    value: +((Math.random() * 9) + 1).toFixed(1),
  },
  {
    emotion: 'Calmness',
    value: +((Math.random() * 9) + 1).toFixed(1),
  },
];

const parseLineChartData = (rawData: number[], samplePeriod: number) => {
  return rawData.map((attentionLevel, i) => {
    return { x: i * samplePeriod, y: attentionLevel, isImportant: false };
  });
};

const getRandomData = (dataLength: number) => {
  let previousNum: number;
  const rawData = Array(dataLength).fill(0).map((num, i) => {
    if (i === 0) {
      previousNum = +((Math.random() * 9) + 1).toFixed(1);
      return previousNum;
    }
    let nextStep;
    do {
      nextStep = (Math.random() * 2);
      if (Math.random() < 0.5) nextStep = -nextStep;
    } while (previousNum + nextStep <= 0 || previousNum + nextStep >= 10);
    previousNum = +(previousNum + nextStep).toFixed(1);
    return previousNum;
  });
  const data = parseLineChartData(rawData, 5);
  return {
    data,
    color: Math.floor(Math.random()*16777215).toString(16),
    id: generateId(7),
  };
};

const generateId = (length: number) => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for ( let i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

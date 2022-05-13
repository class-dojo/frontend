import { colors } from '../colors';

export const createMultiLineData = () => {
  const dataset1 = getRandomLineData(21);
  dataset1.data[17].isImportant = true;
  dataset1.data[9].isImportant = true;
  dataset1.color = colors.happiness;
  dataset1.id = 'Happiness';

  const dataset2 = getRandomLineData(21);
  dataset2.data[17].isImportant = true;
  dataset2.data[9].isImportant = true;
  dataset2.color = colors.sadness;
  dataset2.id = 'Sadness';

  const dataset3 = getRandomLineData(21);
  dataset3.data[17].isImportant = true;
  dataset3.data[9].isImportant = true;
  dataset3.color = colors.calmness;
  dataset3.id = 'Calmness';

  const dataset4 = getRandomLineData(21);
  dataset4.data[17].isImportant = true;
  dataset4.data[9].isImportant = true;
  dataset4.color = colors.confusion;
  dataset4.id = 'Confusion';

  return [dataset1, dataset2, dataset3, dataset4];
};

export const createSingleLineData = (color: string) => {
  const dataset = getRandomLineData(21);
  dataset.data[17].isImportant = true;
  dataset.data[9].isImportant = true;
  dataset.color = color;
  dataset.id = 'Attention Level';

  return [dataset];
};

export const createSingleBarData = () => {
  const data = getRandomBarData(21, 'Attention Level');
  const keys = ['Attention Level'];
  const importantIndexes = [3, 12];
  const samplePeriod = 5;
  return {
    data,
    keys,
    importantIndexes,
    samplePeriod
  };
};

export const createMultiBarData = () => {
  const data1 = getRandomBarData(21, 'Happiness');
  const data2 = getRandomBarData(21, 'Sadness');
  const data3 = getRandomBarData(21, 'Calmness');
  const data4 = getRandomBarData(21, 'Confusion');
  const keys = ['Happiness', 'Sadness', 'Calmness', 'Confusion'];
  const importantIndexes = [10, 19];
  const samplePeriod = 5;
  const data = [];
  for (let i = 0; i < data1.length; i++) {
    data.push(Object.assign({}, data1[i], data2[i], data3[i], data4[i]));
  }
  return {
    data,
    keys,
    importantIndexes,
    samplePeriod
  };
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
  return rawData.map((value, i) => {
    return { x: i * samplePeriod, y: value, isImportant: false };
  });
};

export const parseBarChartData = (rawData: number[], samplePeriod: number, key: string) => {
  return rawData.map((value, i) => {
    return { id: i, Time: i * samplePeriod, [key]: value }; // TODO change attention index for variable
  });
};

const getRandomLineData = (dataLength: number) => {
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

const getRandomBarData = (dataLength: number, key: string) => {
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

  const data = parseBarChartData(rawData, 5, key);

  return data;
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

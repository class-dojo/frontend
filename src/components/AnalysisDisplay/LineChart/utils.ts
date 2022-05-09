export const parseAttentionData = (rawData: number[], samplePeriod: number) => {
  return rawData.map((attentionLevel, i) => {
    return { x: i * samplePeriod, y: attentionLevel, isImportant: false };
  });
};

export const getRandomData = (dataLength: number) => {
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
  const data = parseAttentionData(rawData, 5);
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

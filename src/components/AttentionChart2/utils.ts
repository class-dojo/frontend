export const parseAttentionData = (rawData: number[], samplePeriod: number) => {
  const mappedData = rawData.map((attentionLevel, i) => {
    return { x: i * samplePeriod, y: attentionLevel, isImportant: false };
  });
  return {
    id: 'Attention index',
    color: 'hsl(178, 53%, 41%)',
    data: mappedData
  };
};

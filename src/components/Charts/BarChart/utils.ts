export const parseAttentionData = (rawData: number[], samplePeriod: number) => {
  return rawData.map((attentionLevel, i) => {
    return { id: i, Time: i * samplePeriod, 'Attention Index': attentionLevel };
  });
};

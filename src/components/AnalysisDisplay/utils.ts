
import { SingleFramesLoose } from '../UploadVideo/types';

export const turnIntoRaw = (arr: SingleFramesLoose[], key: string) => {
  return arr.map(frame => frame[key]) as number[];
};

export const parseLineChartData = (rawData: number[], samplePeriod: number) => {
  return rawData.map((value, i) => {
    return { x: i * samplePeriod, y: value, isImportant: false };
  });
};

export interface BarDatum {
  id: number,
  Time: number,
  [key: string]: number
}
//id: number // Index of the sample works fine for this
//Time: number // index * samplePeriod
// ??? Does this need a question mark? In some cases we need multiple key-value pairs
//[key: string]: number // Mood, Attention... for Key. Value is the value of the data
// Refer to parseBarChartData() function, you might be able to use it, but maybe it needs modifying
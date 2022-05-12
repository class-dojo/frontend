export interface BarDataset {
  data: BarDatum[];
  importantIndexes: number[],
  keys: string[] // e.g Mood, Attention... we should pass this into the parser function manually depending on what data we are showing
}

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

export interface LineDataset {
  data: LineDatum[];
  color: string; // Yes, the line chart needs to get its color from the data. We will pass this as param into the parser function
  id: string // Attention, Mood... we will pass manually into the parser function
}

export interface LineDatum {
  x: number; // The same as Time in bar data
  y: number; // The value of the data
  isImportant: boolean;
}
// Refer to parseLineChartData() function, you might be able to use it, but maybe it needs modifying
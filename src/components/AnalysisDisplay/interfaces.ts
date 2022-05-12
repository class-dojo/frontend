export interface BarDataset {
  data: BarDatum[];
  importantIndexes: number[],
  keys?: string[] // e.g Mood, Attention... we should pass this into the parser function manually depending on what data we are showing
}

export interface BarDatum {
  id: number,
  Time: number,
  [key: string]: number
}

export interface LineDataset {
  data: LineDatum[];
  color?: string; // Yes, the line chart needs to get its color from the data. We will pass this as param into the parser function
  id?: string // Attention, Mood... we will pass manually into the parser function
}

export interface LineDatum {
  x: number; // The same as Time in bar data
  y: number; // The value of the data
  isImportant: boolean;
}

export type VideoSource = string | Buffer | Blob | File;

export interface VideoStillsWithInfo {
  rawFrameDataArray: Uint8Array[],
  duration: number
}
export interface Analytics {
  analysisData: DataAnalysis
}

export interface Frame {
  [key: string]: string
}

export interface AlertMessageProps {
  heading: string
  body: string
  variant: string
}

export interface DataToBackend {
  videoId: string // uuid
  videoName?: string
  videoDate?: string
  duration?: number
  accuracy?: number
  frames?: string[] // TODO send also the framerate?
}

export interface S3Links {
  links: string[]
}

export interface DataAnalysis {
  framesArray: SingleFrameAnalysis[]
  peaks: Peaks
  valleys: Valleys
  averages: Averages
  videoId?: string
  videoName?: string
  videoDate?: string
  duration?: number
  accuracy?: number
}

export interface SingleFrameAnalysis {
  attentionScore: number
  moodScore: number
  amountOfPeople: number
  isImportantAttention: boolean
  isImportantMood: boolean
  isImportantPeople: boolean
  importantFrame?: string | Uint8Array // for rawdata
}

export interface SingleFramesLoose {
  [key: string]: number | boolean | string | Uint8Array
}


export interface Peaks {
  moodPeak: number
  attentionPeak: number
  peoplePeak: number
}

export interface Valleys {
  moodValley: number
  attentionValley: number
  peopleValley: number
}

export interface Averages {
  moodAverage: number
  attentionAverage: number
  peopleAverage: number
}

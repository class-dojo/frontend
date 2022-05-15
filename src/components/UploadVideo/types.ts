export type VideoSource = string | Buffer | Blob | File;

export type Frame = {
  [key: string]: string
}

export type AlertMessageProps = {
  heading: string
  body: string
  variant: string
}

export type DataToBackend = {
  videoId: string // uuid
  frames?: string[] // TODO send also the framerate?
}

export type S3Links = {
  links: string[]
}

export type DataAnalysis = {
  framesArray: SingleFrameAnalysis[]
  peaks: Peaks
  valleys: Valleys
  averages: Averages
}

export type SingleFrameAnalysis = {
  attentionScore: number
  moodScore: number
  amountOfPeople: number
  isImportantAttention: boolean
  isImportantMood: boolean
  isImportantPeople: boolean
  importantFrame?: string | Uint8Array // for rawdata
}

export type SingleFramesLoose = {
  [key: string]: number | boolean | string | Uint8Array
}


export type Peaks = {
  moodPeak: number
  attentionPeak: number
  peoplePeak: number
}

export type Valleys = {
  moodValley: number
  attentionValley: number
  peopleValley: number
}

export type Averages = {
  moodAverage: number
  attentionAverage: number
  peopleAverage: number
}

export type VideoSource = string | Buffer | Blob | File;

export type Frame = {
  [key: string]: string
}

export type BEData = {
  bucket: string,
  frameNames: string[] // Object.keys(Frame[])
}

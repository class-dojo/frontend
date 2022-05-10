export type VideoSource = string | Buffer | Blob | File;

export type Frame = {
  [key: string]: string
}

export type AlertMessageProps = {
  heading: string,
  body: string,
  variant: string
}

export type dataToBackend = {
  bucket: string,
  frameNames: string[] // Object.keys(Frame[])
}

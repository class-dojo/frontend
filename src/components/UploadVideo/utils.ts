import { fetchFile, FFmpeg } from '@ffmpeg/ffmpeg';

export const getStillsFromVideo =
async (ffmpeg: FFmpeg, source: string | Buffer | Blob | File): Promise<Uint8Array[]> => {
  ffmpeg.FS('writeFile', 'test.mp4', await fetchFile(source));
  await ffmpeg.run('-i', 'test.mp4', '-vf', 'fps=1/5', '%d.png');
  const frameArray = [];
  for (let i = 1; i<=14; i++) {
    const frame = ffmpeg.FS('readFile', `${i}.png`);
    frameArray.push(frame);
  }
  return frameArray;
};

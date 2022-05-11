
const batchDivider = (arr: Array<File> | Array<string>, size: number): (Array<File> | Array<string>)[] => arr.length > size ? [arr.slice(0, size), ...batchDivider(arr.slice(size), size)] : [arr];

const promiseMaker = (fileArr: File[], urlArr: string[]) => {
  const payload = [];
  for (let i = 0; i < fileArr.length; i++) {
    const { type } = fileArr[i];
    const url = urlArr[i];
    payload.push(fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': type,
      },
      body: fileArr[i],
    }));
  }
  return payload;
};

// TODO refactor to get links from our backend
export const uploadImgToBucket = async (files: File[], urls: string[], accuracy = 10) => {
  const imageBatches = batchDivider(files, accuracy);
  const urlBatches = batchDivider(urls, accuracy);
  const payloads = imageBatches.map((images, i) => promiseMaker(images as File[], urlBatches[i] as string[]));
  const responses = payloads.map(async payload => await Promise.all(payload)); // TODO handle errors
  return responses;
};

// TODO once received successful response from s3 bucket, send POST request to backend to /analyze to receive the data to show

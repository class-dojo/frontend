const urls = [
  'http://images.localhost:9000/images/dummy1.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=root%2F20220509%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20220509T164546Z&X-Amz-Expires=604800&X-Amz-Signature=62835950a0046bf4db93444fea0d2d0626c45ccc0da71eaca470a95b304dbd76&X-Amz-SignedHeaders=host',
  'http://images.localhost:9000/images/dummy2.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=root%2F20220509%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20220509T164546Z&X-Amz-Expires=604800&X-Amz-Signature=98ed2fa0826f3cb879a4454700a91feee850b07d3237026627faaf0f2f4d2a19&X-Amz-SignedHeaders=host',
  'http://images.localhost:9000/images/dummy3.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=root%2F20220509%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20220509T164546Z&X-Amz-Expires=604800&X-Amz-Signature=f225597dc96e6824109be872c2fced68160f9c00cc35e98aaf87ec0a17147da1&X-Amz-SignedHeaders=host',
  'http://images.localhost:9000/images/dummy4.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=root%2F20220509%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20220509T164546Z&X-Amz-Expires=604800&X-Amz-Signature=195c72d61a7dd44c643bf6cd233a5e43ffe33b0bc37e042c06fb86030ac5e92b&X-Amz-SignedHeaders=host',
  'http://images.localhost:9000/images/dummy5.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=root%2F20220509%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20220509T164546Z&X-Amz-Expires=604800&X-Amz-Signature=f63205e3f4cc68cd3aa7ea90117d726ffcde100a2b1786b6c1e933e204f9ba5f&X-Amz-SignedHeaders=host',
  'http://images.localhost:9000/images/dummy6.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=root%2F20220509%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20220509T164546Z&X-Amz-Expires=604800&X-Amz-Signature=9bc4deb78c6011b26c5c666e122200c8dfcc58e7764e46d4f16a63001d56685c&X-Amz-SignedHeaders=host',
  'http://images.localhost:9000/images/dummy7.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=root%2F20220509%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20220509T164546Z&X-Amz-Expires=604800&X-Amz-Signature=02e4889ea9fef82dc830100819bc5762ba338dd03fb4bb9bab0ce47e074a479b&X-Amz-SignedHeaders=host',
  'http://images.localhost:9000/images/dummy8.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=root%2F20220509%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20220509T164546Z&X-Amz-Expires=604800&X-Amz-Signature=a7d1d75dceb4053ce032b73e4e7a4203bff55b82aac9ceeea3c3e3fb9cce47d7&X-Amz-SignedHeaders=host',
  'http://images.localhost:9000/images/dummy9.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=root%2F20220509%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20220509T164546Z&X-Amz-Expires=604800&X-Amz-Signature=f841a712238729131fdc7ba4823ef7998139304f6dcbe6cd6ab86e0b397cd26b&X-Amz-SignedHeaders=host',
  'http://images.localhost:9000/images/dummy10.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=root%2F20220509%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20220509T164546Z&X-Amz-Expires=604800&X-Amz-Signature=bcd011f0be8b31ee796811e9b15fb90142c084e27c7f72f4c1eb03b8078d52fe&X-Amz-SignedHeaders=host',
  'http://images.localhost:9000/images/dummy11.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=root%2F20220509%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20220509T164546Z&X-Amz-Expires=604800&X-Amz-Signature=e0a93869484da6f4bcd5235977a6c4afc61f41440638fa91d765a0b353547555&X-Amz-SignedHeaders=host',
  'http://images.localhost:9000/images/dummy12.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=root%2F20220509%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20220509T164546Z&X-Amz-Expires=604800&X-Amz-Signature=5f1d0789e80c9be879971f0a4f2eedd04786551f7685c8f1315591607eed289a&X-Amz-SignedHeaders=host',
  'http://images.localhost:9000/images/dummy13.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=root%2F20220509%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20220509T164546Z&X-Amz-Expires=604800&X-Amz-Signature=ef2d4a64b6f4cd151458438d1896059ce620dba6a3a49b2f13c133c22e95c9bd&X-Amz-SignedHeaders=host',
  'http://images.localhost:9000/images/dummy14.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=root%2F20220509%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20220509T164546Z&X-Amz-Expires=604800&X-Amz-Signature=94a98439f24e7e45ae8af2e24299af82a2759418b0f48d9bb17bc89caa939d00&X-Amz-SignedHeaders=host',
  'http://images.localhost:9000/images/dummy15.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=root%2F20220509%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20220509T164546Z&X-Amz-Expires=604800&X-Amz-Signature=0858028c4c68a36e1789cca39736c12aa235a37bb5fc707ca95facbef547729e&X-Amz-SignedHeaders=host'
];

const batchDivider = (arr: Array<File> | Array<string>, size: number): (Array<File> | Array<string>)[] => arr.length > size ? [arr.slice(0, size), ...batchDivider(arr.slice(size), size)] : [arr];

const promiseMaker = (fileArr: File[], urlArr: string[]) => {
  const payload = [];
  for (let i = 0; i < fileArr.length; i++) {
    const batch = new Promise((resolve) => {
      const { type } = fileArr[i];
      const url = urlArr[i];
      resolve(fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': type,
        },
        body: fileArr[i],
      })
        //.then(console.log)
        .catch(console.error));
    });
    payload.push(batch);
  }
  return payload;
};

// TODO refactor to get links from our backend
export const uploadImgToBucket = (files: File[], accuracy = 10) => {
  const imageBatches = batchDivider(files, accuracy);
  const urlBatches = batchDivider(urls, accuracy);
  const payloads = imageBatches.map((images, i) => promiseMaker(images as File[], urlBatches[i] as string[]));
  payloads.forEach(payload => Promise.all(payload)); // TODO handle errors
};

// TODO once received successful response from s3 bucket, send POST request to backend to /analyze to receive the data to show

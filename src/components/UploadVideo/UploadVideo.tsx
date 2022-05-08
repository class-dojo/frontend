import React, {useState} from 'react';
import {createFFmpeg, fetchFile} from '@ffmpeg/ffmpeg';
import Frame from '../Frame';

const UploadVideo = () => {

  const [source, setSource] = useState<string | Buffer | Blob | File>('');
  const [message, setMessage] = useState('Click the button to transcode');
  const [frames, setFrames] = useState<string[]>([]);
  const ffmpeg = createFFmpeg({
    log: true,
  });
  const doTranscode = async () => {
    setMessage('Loading ffmpeg-core.js');
    await ffmpeg.load();
    setMessage('Start transcoding');
    ffmpeg.FS('writeFile', 'test.mp4', await fetchFile(source));
    await ffmpeg.run('-i', 'test.mp4', '-vf', 'fps=1/5', 'out%d.png');
    setMessage('Complete transcoding');
    const frameArray = [];
    for (let i = 1; i<=14; i++) {
      const frame = ffmpeg.FS('readFile', `out${i}.png`);
      frameArray.push(frame);
    }

    frameArray.forEach(frame => setFrames(prev => {
      const blobString = URL.createObjectURL(new Blob([frame], { type: 'image/png' }));
      // console.log(blobString);
      // const sliced = blobString.slice(5);
      const frameUrls = [...prev, blobString];
      //console.log(sliced);
      return frameUrls;
    }));

    // await ffmpeg.run('-i', 'test.mp4', '-t', '2.5', '-ss', '2.0', '-f', 'gif', 'out.gif');
    // setMessage('Transcoding Complete');
    // const data = ffmpeg.FS('readFile', 'out.gif');
    // console.log(data);
    // setFrames(URL.createObjectURL(new Blob([data.buffer], { type: 'image/gif' })));
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSource(event.target.files[0]);
    }
  };

  return (

    <section className="py-4 py-xl-5">
      <div className="container">
        <div className="text-white bg-dark border rounded border-0 p-4 p-md-5">
          <h2 className="fw-bold text-white mb-3">analyze video</h2><small></small>
          <p className="mb-4">Upload a video and ClassDojo will analyze it</p><small>Select analysis quality&nbsp;</small><select>
            <optgroup label="This is a group">
              <option value="12" defaultValue={undefined}>Low</option>
              <option value="13">Medium</option>
              <option value="14">High</option>
            </optgroup>
          </select>
          <div>
            <input type="file" accept="video/*" onChange={handleChange}/>
            <div className="my-3"><a className="btn btn-primary btn-lg me-2" role="button" onClick={doTranscode}>UPLOAD VIDEO</a></div>
            <p>{message}</p>
            <sub>Estimated duration: 3 min</sub>
          </div>
          <div>{frames && frames.map((frameURL, i) => <Frame frameURL={frameURL} key={i}/>)}</div>
        </div>
      </div>
    </section>


  );
};


export default UploadVideo;

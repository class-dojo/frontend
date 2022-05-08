import React, {useState} from 'react';
import {createFFmpeg, fetchFile} from '@ffmpeg/ffmpeg';
import Frame from '../Frame';

const UploadVideo = () => {

  const [source, setSource] = useState<string | Buffer | Blob | File>('');
  const [message, setMessage] = useState('Click the button to transcode');
  const [frames, setFrames] = useState<string[]>([]);

  // set the array frames inside an object as value

  const ffmpeg = createFFmpeg({
    log: true,
  });

  const handleTranscodeClick = async () => {
    setMessage('Loading ffmpeg-core.js');
    await ffmpeg.load();
    setMessage('Start transcoding');
    ffmpeg.FS('writeFile', 'test.mp4', await fetchFile(source));
    await ffmpeg.run('-i', 'test.mp4', '-vf', 'fps=1/5', '%d.png');
    setMessage('Complete transcoding');
    const frameArray = [];
    for (let i = 1; i<=14; i++) {
      const frame = ffmpeg.FS('readFile', `${i}.png`);
      frameArray.push(frame);
    }

    const filesArray: File[] = [];
    frameArray.forEach((frame, i) =>
    {
      setFrames(prev => {
        const blobString = URL.createObjectURL(new Blob([frame], { type: 'image/png' }));
        const frameUrls = [...prev, blobString];
        return frameUrls;
      });
      const blobFile = new File([frame], `${i+1}.png`);
      filesArray.push(blobFile);
    });

    // TODO upload to bucket
    // const DataToBeSent = {
    //   [source.toString()]: filesArray
    // };

    const url = 'http://images.localhost:9000/images/dummy.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=root%2F20220507%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20220507T123814Z&X-Amz-Expires=604800&X-Amz-Signature=627218060ca95a97b5b0b8413ac00e4eeaf72c7adb746a0b3346e7d59665b807&X-Amz-SignedHeaders=host';
    // take the first file from FilesList
    const file = filesArray[0];
    // Extract Content-Type & filename
    const {type} = file;

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': type,
      },
      body: file,
    })
      .then(console.log)
      .catch(console.error);

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
            <div className="my-3"><a className="btn btn-primary btn-lg me-2" role="button" onClick={handleTranscodeClick}>UPLOAD VIDEO</a></div>
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

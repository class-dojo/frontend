import React from 'react';

const UploadVideo = () => {

  return (
    <>
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
            <div className="my-3"><a className="btn btn-primary btn-lg me-2" role="button" href="#">UPLOAD VIDEO</a></div><sub>Estimated duration: 3 min</sub>
          </div>
        </div>
      </section>
    </>

  );
};


export default UploadVideo;

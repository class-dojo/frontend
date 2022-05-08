import React from 'react';

type FrameProps = {
  frameURL: string
}

const Frame = ({frameURL}: FrameProps) => {
  return (
    <div>
      <img src={frameURL}/>
    </div>
  );
};

export default Frame;
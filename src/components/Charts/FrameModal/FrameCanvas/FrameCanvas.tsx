import React, {useEffect, useRef} from 'react';
import {IFaceDetail} from '../../../UploadVideo/types';

interface IFrameCanvas {
  frame: {
    src: string,
    frameInfo: IFaceDetail[]
  }
}

export const FrameCanvas = ({frame}: IFrameCanvas) => {
  const {src, frameInfo} = frame;

  const canvasRef = useRef(null);

  useEffect(() => {
    const canvasReference = canvasRef.current;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const ctx = canvasReference.getContext('2d');

    const img = new Image();

    img.addEventListener('load', function () {

      const canvas = ctx.canvas ;

      canvas.width = img.width;
      canvas.height = img.height;

      ctx.drawImage(img, 0,0, canvas.width, canvas.height);

      // draw random rectangle
      ctx.beginPath();
      ctx.rect(188, 50, 200, 100);
      ctx.lineWidth = 7;
      ctx.strokeStyle = 'yellow';
      ctx.stroke();
    }, false);


    img.src = src;
  }, []);

  return <canvas ref={canvasRef} />;


};

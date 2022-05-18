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

      for (const face of frameInfo) {
        const {Top, Left, Width, Height} = face.boundingBox;
        const x = Left * img.width;
        const y = Top * img.height;
        const width = Width * img.width;
        const height = Height * img.height;

        ctx.beginPath();
        ctx.rect(x, y, width, height);
        ctx.lineWidth = 6;
        ctx.strokeStyle = 'yellow';
        ctx.stroke();

        const { Type, Confidence } = face.topEmotion;

        ctx.font = 'bold 20px Arial';
        ctx.fillStyle = 'yellow';

        const emotion = `${Type}: ${Confidence.toFixed(2)} %`;
        ctx.fillText(emotion, x, y + height + 30);
      }

    }, false);


    img.src = src;
  }, []);

  return <canvas ref={canvasRef} />;


};

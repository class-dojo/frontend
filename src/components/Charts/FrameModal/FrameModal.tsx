import {Modal} from 'react-bootstrap';
import React from 'react';
import {FrameCanvas} from './FrameCanvas/FrameCanvas';

interface IFrameModal {
  show: boolean,
  onHide: () => void,
  frame: string,
}

export const FrameModal = ({show, onHide, frame}: IFrameModal) => {
  return <Modal centered show={show} onHide={onHide} className="">
    <div
      className="modal-dialog-centered d-flex justify-content-center align-items-center"
      style={{
        backgroundColor: 'transparent',
      }}
    >
      <FrameCanvas frame={frame}/>
    </div>
  </Modal>;
};

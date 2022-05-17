import {Modal} from 'react-bootstrap';
import React from 'react';

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
      <img className="modal-img"
        src={frame}
      />
      <canvas/>
    </div>
  </Modal>;
};

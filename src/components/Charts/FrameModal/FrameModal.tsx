import {Modal} from 'react-bootstrap';
import React from 'react';

export function FrameModal (props: { show: boolean, onHide: () => void, frame: string }) {
  return <Modal centered show={props.show} onHide={props.onHide} className="">
    <div
      className="modal-dialog-centered d-flex justify-content-center align-items-center"
      style={{
        backgroundColor: 'transparent',
      }}
    >
      <img className="modal-img"
        src={props.frame}
      />
      <canvas/>
    </div>
  </Modal>;
}

import React from 'react';


const Spinner = () => {
  return (
    <div className="mt-4 d-flex flex-column align-items-center">
      <strong className='mb-3'>Running analysis...</strong>
      <div className="spinner-border ml-auto" role="status" aria-hidden="true"></div>
    </div>
  );
};

export default Spinner;
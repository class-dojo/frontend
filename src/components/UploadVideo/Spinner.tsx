import React from 'react';


const Spinner = () => {
  return (
    <div className="mt-4 d-flex flex-column align-items-center">
      <strong>Analyzing video...</strong>
      <div className="spinner-border ml-auto" role="status" aria-hidden="true"></div>
    </div>
  );
};

export default Spinner;
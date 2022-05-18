import React from 'react';
import mockPic from '../../assets/images/upload.gif';
import gauge from '../../assets/images/gauge.png';

const CentralGif = () => {
  return (
    <div className='centralHero'>
      <div className='centralFigs'>
        <img src={gauge} style={{maxWidth: '30%'}}/>
        <div className='right'>
          <h3 className='gifText'>Upload the recording of your class</h3>
          <img src={mockPic} style={{maxWidth: '90%'}}/>
        </div>
      </div>
    </div>
  );
};

export default CentralGif;
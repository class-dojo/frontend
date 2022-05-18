import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import bottomGraph from '../../assets/images/bottomGraph.png';

const Bottom = () => {
  return (
    <div className='bottomHero'>
      <h3 className='bottomText'>Take a look at the important events that took place during your class</h3>
      <div style={{display: 'flex', justifyContent: 'center'}}>
        <img src={bottomGraph} style={{maxWidth: '91vw'}}/>
      </div>
      <h2 style={{textAlign: 'center', marginBottom: '3vh' }} className='mt-2'>
        Eager to start?
      </h2>
      <div className='button'>
        <Link to={'/upload'}>
          <Button className='mx-1 btn-lg' variant='dark'>
            <div className='buttonText'>
                  TRY NOW
            </div>
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Bottom;
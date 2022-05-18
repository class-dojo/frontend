import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import firstPNG from '../../assets/images/dashboard.png';

type HeroProps = {handleOnClick: () => void}

const Hero = ({handleOnClick}: HeroProps) => {

  return (
    <div className='bgColour'>
      <div className='d-flex'>
        <div className= 'left'>
          <h1 className='title'>Welcome to Class Dojo</h1>
          <p className='text'>Class Dojo empowers teachers in virtual classrooms with a selection of tools to gauge student interest and emotional response during lectures</p>
          <div className='button'>
            <Link to={'/upload'}>
              <Button className='mx-1 btn-lg' variant='dark'>
                <div className='buttonText'>
                  TRY NOW
                </div>
              </Button>
            </Link>
            <Button className='mx-1 btn-lg btn-outline-dark glass' variant='btn-outline-dark' onClick={handleOnClick}>
              <div className='buttonText'>
                  LEARN MORE
              </div>
            </Button>
          </div>
        </div>
        <div style={{width: '50vw', paddingTop: '5vh'}}>
          <img src={firstPNG} style={{maxWidth: '100%'}}/>
        </div>
      </div>
    </div>
  );
};

export default Hero;
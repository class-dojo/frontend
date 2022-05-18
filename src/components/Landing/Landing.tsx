import React from 'react';
import './landing.css';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import firstPNG from '../../assets/images/dashboard.png';



const Landing = () => {
  return (
    <div className='mainScreen'>
      <div className='d-flex bgColour'>
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
          </div>
        </div>
        <div style={{width: '50vw'}}>
          <img src={firstPNG} style={{maxWidth: '100%'}}/>
        </div>
      </div>
    </div>
  );
};

// TOP => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#cde5fc" fill-opacity="1" d="M0,288L34.3,256C68.6,224,137,160,206,128C274.3,96,343,96,411,106.7C480,117,549,139,617,165.3C685.7,192,754,224,823,208C891.4,192,960,128,1029,133.3C1097.1,139,1166,213,1234,250.7C1302.9,288,1371,288,1406,288L1440,288L1440,0L1405.7,0C1371.4,0,1303,0,1234,0C1165.7,0,1097,0,1029,0C960,0,891,0,823,0C754.3,0,686,0,617,0C548.6,0,480,0,411,0C342.9,0,274,0,206,0C137.1,0,69,0,34,0L0,0Z"></path></svg>

// BOTTOM =>  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
//  <path fill="#cde5fc" fill-opacity="1" d="M0,256L34.3,250.7C68.6,245,137,235,206,234.7C274.3,235,343,245,411,213.3C480,181,549,107,617,101.3C685.7,96,754,160,823,154.7C891.4,149,960,75,1029,64C1097.1,53,1166,107,1234,154.7C1302.9,203,1371,245,1406,266.7L1440,288L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z"></path>
//</svg>

export default Landing;

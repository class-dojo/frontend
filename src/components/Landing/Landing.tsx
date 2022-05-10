import React from 'react';
import './landing.css';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


const Landing = () => {

  const navigate = useNavigate();
  const handleOnClick = () => {navigate('/upload', {replace: true});};

  return (
    <div className='mainScreen'>
      <h1 className='text'>Welcome to Class Dojo</h1>
      <p className='text'>Where programmers don{'\''}t know what to write but can read people minds from a single video</p>
      <div>
        <Button className='mx-1' variant='dark' onClick={handleOnClick}>TRY NOW</Button>
        <Button className='mx-1' variant='outline-dark'>LEARN MORE</Button>
      </div>
    </div>


  );
};

export default Landing;
import React from 'react';
import './landing.css';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const Landing = () => {
  return (
    <div className='mainScreen'>
      <h1 className='text'>Welcome to Class Dojo</h1>
      <p className='text'>ClassDojo empowers teachers in virtual classrooms with a selection of tools to gauge student interest and emotional response during lectures</p>
      <div>
        <Link to={'/upload'}>
          <Button className='mx-1' variant='dark'>TRY NOW</Button>
        </Link>
        <Button className='mx-1' variant='outline-dark'>LEARN MORE</Button>
      </div>
    </div>
  );
};

export default Landing;

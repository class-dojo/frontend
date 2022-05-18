import React, { useRef } from 'react';
import './landing.css';
import Hero from './Hero';
import CentralGif from './CentralGif';
import Bottom from './Bottom';
import { todoType } from '../../types';

const useScroll = () => {
  const anchorRef: todoType = useRef();
  const anchorScroll = () => anchorRef.current.scrollIntoView();
  return [anchorScroll, anchorRef];
};

const Landing = () => {

  const [anchorScroll, anchorRef] = useScroll();

  const handleOnClick = () => anchorScroll();

  return (
    <div className='mainScreen' dir='ltr'>
      <section>
        <Hero handleOnClick={handleOnClick}/>
      </section>
      <section ref={anchorRef}>
        <CentralGif/>
      </section>
      <section>
        <Bottom/>
      </section>
    </div>
  );
};

export default Landing;

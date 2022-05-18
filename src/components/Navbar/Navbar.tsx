import React from 'react';
import { Link } from 'react-router-dom';
import LogoIcon from '../../assets/icons/LogoIcon.svg';

import './navbar.css';

const Navbar = () => {

  return (
    <>
      <nav className='navbar sticky-top navbar-dark navbar-expand-md bg-dark py-3' >

        <div className="container">
          <Link to={'/'}>
            <span className="navbar-brand d-flex align-items-center">
              <span className="dark-element bs-icon-md bs-icon-rounded bs-icon-primary d-flex justify-content-center align-items-center me-2 bs-icon">
                <img src={LogoIcon} className="icon icon-tabler icon-tabler-karate"/>
              </span>
              <span className='fs-4'>
                Class Dojo
              </span>
            </span>
          </Link>
          <div className="collapse navbar-collapse" id="navcol-5">
          </div>
          <Link to={'/upload'}><span className="btn btn-primary ms-md-2 mb-0 dark-element" role="button">Analyze video</span></Link>
        </div>
      </nav>
    </>
  );
};


export default Navbar;

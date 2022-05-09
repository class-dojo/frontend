import React from 'react';

import './navbar.css';

const Navbar = () => {

  return (
    <>
      <nav className='navbar fixed-top navbar-dark navbar-expand-md bg-dark py-3' style={{height: 73}}>
        <div className="container"><a className="navbar-brand d-flex align-items-center" href="#"><span className="bs-icon-sm bs-icon-rounded bs-icon-primary d-flex justify-content-center align-items-center me-2 bs-icon"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icon-tabler-karate">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <circle cx="18" cy="4" r="1"></circle>
          <path d="M3 9l4.5 1l3 2.5"></path>
          <path d="M13 21v-8l3-5.5"></path>
          <path d="M8 4.5l4 2l4 1l4 3.5l-2 3.5"></path>
        </svg></span><span>Classdojo</span></a><button data-bs-toggle="collapse" className="navbar-toggler" data-bs-target="#navcol-5"><span className="visually-hidden">Toggle navigation</span><span className="navbar-toggler-icon"></span></button>
        <div className="collapse navbar-collapse" id="navcol-5">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item"><a className="nav-link active" href="#">First Item</a></li>
            <li className="nav-item"><a className="nav-link" href="#">Second Item</a></li>
            <li className="nav-item"><a className="nav-link" href="#">Third Item</a></li>
          </ul><a className="btn btn-primary ms-md-2" role="button" href="#">Button</a>
        </div>
        </div>
      </nav>
    </>
  );
};


export default Navbar;

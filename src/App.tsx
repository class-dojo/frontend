import React from 'react';
import './App.css';
import './index.css';
import './assets/bootstrap/css/bootstrap.min.css';
import Navbar from './components/Navbar/Navbar';
import UploadVideo from './components/UploadVideo/UploadVideo';
import FfmpegTest from './components/FfmpegTest';

function App () {
  return (
    <main>
      {/* <Navbar/>
      <UploadVideo/> */}
      <FfmpegTest/>
    </main>
  );
}

export default App;

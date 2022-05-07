import React from 'react';
import './App.css';
import './index.css';
import './assets/bootstrap/css/bootstrap.min.css';
import Navbar from './components/Navbar/Navbar';
import UploadVideo from './components/UploadVideo/UploadVideo';

function App () {
  return (
    <main>
      <Navbar/>
      <UploadVideo/>
    </main>
  );
}

export default App;

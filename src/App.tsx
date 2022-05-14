import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import UploadVideo from './components/UploadVideo/UploadVideo';
import Landing from './components/Landing/Landing';
import Analysis from './components/Analysis/Analysis';

function App () {
  return (
    <main>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path='/upload' element={<UploadVideo/>}/>
        <Route path='/analysis' element={<Analysis/>}/>
      </Routes>
    </main>
  );
}

export default App;

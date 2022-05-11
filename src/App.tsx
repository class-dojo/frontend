import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import UploadVideo from './components/UploadVideo/UploadVideo';
import Landing from './components/Landing/Landing';
import AnalysisDisplay from './components/AnalysisDisplay/AnalysisDisplay';

function App () {
  return (
    <main>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path='/upload' element={<UploadVideo/>}/>
        <Route path='/analytics' element={<AnalysisDisplay/>}/>
      </Routes>
    </main>
  );
}

export default App;

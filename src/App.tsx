import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import UploadVideo from './components/UploadVideo/UploadVideo';
import Landing from './components/Landing/Landing';
import AnalysisDisplay from './components/AnalysisDisplay/AnalysisDisplay';
import Dashboard from './components/AnalysisDisplay/Dashboard';

function App () {
  return (
    <main>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path='/upload' element={<UploadVideo/>}/>
        <Route path='/detailed' element={<AnalysisDisplay/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
      </Routes>
    </main>
  );
}

export default App;

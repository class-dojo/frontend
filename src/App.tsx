import React from 'react';
import Navbar from './components/Navbar/Navbar';
import SentimentAnalysis from './components/SentimentAnalysis';
import UploadVideo from './components/UploadVideo/UploadVideo';

function App () {
  return (
    <main>
      <Navbar/>
      <UploadVideo/>
      {/* <SentimentAnalysis /> */}
    </main>
  );
}

export default App;

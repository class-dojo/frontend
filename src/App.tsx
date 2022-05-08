import React from 'react';

import Navbar from './components/Navbar/Navbar';
import UploadVideo from './components/UploadVideo/UploadVideo';
import InterestChart from './components/InterestChart/InterestChart';

function App () {
  return (
    <main>
      <Navbar/>
      {/* <UploadVideo/> */}
      <InterestChart/>
    </main>
  );
}

export default App;

import React from 'react';

import Navbar from './components/Navbar/Navbar';
import UploadVideo from './components/UploadVideo/UploadVideo';
import AttentionChart from './components/InterestChart/AttetionChart';

function App () {
  return (
    <main>
      <Navbar/>
      {/* <UploadVideo/> */}
      <AttentionChart/>
    </main>
  );
}

export default App;

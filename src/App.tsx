import React from 'react';

import Navbar from './components/Navbar/Navbar';
import UploadVideo from './components/UploadVideo/UploadVideo';
import AttentionChart from './components/AttentionChart/AttentionChart';
import AttentionChart2 from './components/AttentionChart2/AttentionChart2';

function App () {
  return (
    <main>
      <Navbar/>
      {/* <UploadVideo/> */}
      {/* <AttentionChart/> */}
      <AttentionChart2/>
    </main>
  );
}

export default App;

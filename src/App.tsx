import React from 'react';

import Navbar from './components/Navbar/Navbar';
import UploadVideo from './components/UploadVideo/UploadVideo';
import AttentionChart from './components/BarChart/BarChart';
import AttentionChart2 from './components/LineChart/LineChart';

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

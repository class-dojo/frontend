import React from 'react';

import Navbar from './components/Navbar/Navbar';
import UploadVideo from './components/UploadVideo/UploadVideo';
import BarChart from './components/AnalysisDisplay/BarChart/BarChart';
import AnalysisDisplay from './components/AnalysisDisplay/AnalysisDisplay';

function App () {
  return (
    <main>
      <Navbar/>
      {/* <UploadVideo/> */}
      {/* <AttentionChart/> */}
      <AnalysisDisplay/>
    </main>
  );
}

export default App;

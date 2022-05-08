import React from 'react';
import { ResponsiveBar } from '@nivo/bar';
import '@nivo/core';

const styles: React.CSSProperties = {
  fontFamily: 'sans-serif',
  textAlign: 'center'
};

const data = [
  { quarter: 1, earnings: 13000 },
  { quarter: 2, earnings: 16500 },
  { quarter: 3, earnings: 14250 },
  { quarter: 4, earnings: 19000 }
];
const InterestChart = () => {
  return (
    <div style={styles}>
      <h1>Nivo showcase</h1>
      <div style={{ height: '400px' }}>
        <ResponsiveBar data={data} keys={['earnings']} indexBy="quarter" />
      </div>
    </div>
  );
};

export default InterestChart;

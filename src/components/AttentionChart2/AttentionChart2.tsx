import React from 'react';
import { ResponsiveLine } from '@nivo/line';
import '@nivo/core';
import { linearGradientDef } from '@nivo/core';

import { parseAttentionData as parseAttentionData } from './utils';
import { mockRawData } from '../../assets/mockData';

import '../AttentionChart/attentionChart.css';
import testImage from '../../assets/images/test.jpg';

const mainContainerStyle: React.CSSProperties = {
  marginTop: 40,
  fontFamily: 'sans-serif',
  textAlign: 'center',
};

const graphContainerStyle: React.CSSProperties = {
  padding: '0 20px',
  height: '450px',
  position: 'relative',
  margin: '10px 0 40px 0',
};

const mockBoxStyle: React.CSSProperties = {
  position: 'absolute',
  height: '401px',
  width: 'calc(100% - 148px)',
  border: '1px solid black',
  backgroundColor: '#f2f2f2',
  top: 0,
  left: 74,
};

const data = parseAttentionData(mockRawData, 5);
console.log(data);
const AttentionChart = () => {

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleMouseEnter = (_: any, event: any) => {
    event.target.classList.add('animate');
    event.target.classList.add('hovered');
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleMouseLeave = (_: any, event: any) => {
    event.target.classList.remove('hovered');
  };

  return (
    <div style={mainContainerStyle}>
      <h1>Attention Index During Lecture</h1>
      <div style={graphContainerStyle}>
        <div style={mockBoxStyle}>
        </div>
        <ResponsiveLine
          colors={data => data.color}
          data={[data]}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          xScale={{ type: 'point' }}
          yScale={{
            type: 'linear',
            min: 0,
            max: 10,
            stacked: false,
            reverse: false
          }}
          curve="cardinal"
          enableArea={true}
          areaOpacity={1}
          enablePoints={false}
          pointSize={16}
          lineWidth={6}
          useMesh={true}
          margin={{ top: 20, right: 55, bottom: 50, left: 55 }}
          enableSlices="x"
          enableGridY={false}
          enableGridX={false}
          axisBottom={{
            tickSize: 0,
            tickPadding: 12,
            tickRotation: 0,
            legend: 'Time',
            legendPosition: 'middle',
            legendOffset: 40,
          }}
          axisLeft={{
            tickSize: 10,
            tickPadding: 10,
            tickRotation: 0,
            legend: 'Attention',
            legendPosition: 'middle',
            legendOffset: -50
          }}
          defs={[
            {
              id: 'gradientC',
              type: 'linearGradient',
              colors: [
                { offset: 0, color: '#d5edec' },
                { offset: 100, color: '#309f9a' },
              ],
            },
          ]}
          fill={[
            { match: '*', id: 'gradientC' },
          ]}
          sliceTooltip={({ slice }) => {
            return (
              <div
                style={{
                  background: 'white',
                  padding: 15,
                  border: '1px solid #ccc',
                  borderRadius: 10,
                }}
              >
                <img src={testImage} style={{height: 200, borderRadius: 10,}}/>
                {slice.points.map(point => (
                  <div key={point.id}>
                    <div
                      style={{
                        color: point.serieColor,
                        padding: '3px 0',
                      }}
                    >
                      <strong>{point.serieId}</strong> [{point.data.yFormatted}]
                    </div>
                    <div><strong>Time</strong> [{point.data.x}]</div>
                  </div>
                ))}
              </div>
            );
          }}
        />
      </div>
    </div>
  );
};

export default AttentionChart;

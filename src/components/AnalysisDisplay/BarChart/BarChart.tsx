import React from 'react';
import { ResponsiveBar } from '@nivo/bar';
import '@nivo/core';
import { linearGradientDef } from '@nivo/core';

import { parseAttentionData as parseAttentionData } from './utils';
import { mockRawData } from '../../../assets/mockData';

import './attentionChart.css';
import testImage from '../../assets/images/test.jpg';
import { todoType } from '../../../types';

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
  height: '400.5px',
  width: 'calc(100% - 140px)',
  border: '1px solid black',
  backgroundColor: '#f2f2f2',
  top: 0,
  left: 70,
};

const data = parseAttentionData(mockRawData, 5);

const AttentionChart = () => {

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleMouseEnter = (_: todoType, event: todoType) => {
    event.target.classList.add('animate');
    event.target.classList.add('hovered');
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleMouseLeave = (_: todoType, event: todoType) => {
    event.target.classList.remove('hovered');
  };

  return (
    <div style={mainContainerStyle}>
      <h1>Attention Index During Lecture</h1>
      <div style={graphContainerStyle}>
        <div style={mockBoxStyle}>
        </div>
        <ResponsiveBar
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          data={data}
          keys={['Attention Index']}
          indexBy="Time"
          maxValue={10}
          padding={0.06}
          margin={{ top: 20, right: 55, bottom: 50, left: 55 }}
          colors={{scheme: 'blue_green'}}
          borderRadius={4}
          borderWidth={1}
          borderColor='black'
          enableLabel={false}
          enableGridY={false}
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
            // will inherit colors from current element
            linearGradientDef('gradientA', [
              { offset: 0, color: 'inherit' },
              { offset: 100, color: 'inherit', opacity: 0 },
            ]),
            {
              id: 'gradientC',
              type: 'linearGradient',
              colors: [
                { offset: 0, color: '#d5edec' },
                { offset: 100, color: '#309f9a' },
              ],
              // colors: [
              //   { offset: 0, color: '#faf047' },
              //   { offset: 100, color: '#e4b400' },
              // ],
            },
          ]}
          // 2. defining rules to apply those gradients
          fill={[
            { match: '*', id: 'gradientC' },
          ]}
          tooltip={({ id, value, color, indexValue }) => (
            <div
              style={{
                padding: 12,
                color,
                background: '#222222',
                borderRadius: 10,
              }}
            >
              <img src={testImage} style={{height: 200, borderRadius: 10,}}/>
              <br />
              <span>
                {id}: {value}
              </span>
              <p style={{ margin: 'unset' }}>Time: {indexValue} seconds</p>
            </div>
          )}
        />
      </div>
    </div>
  );
};

export default AttentionChart;

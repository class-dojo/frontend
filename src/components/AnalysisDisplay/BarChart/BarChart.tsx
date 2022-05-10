import React from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { linearGradientDef, patternSquaresDef } from '@nivo/core';

import { createSingleBarData } from '../../../assets/mockDataProvider';

import './barChart.css';
import testImage from '../../../assets/images/test.jpg';
import { todoType } from '../../../types';

const mainContainerStyle: React.CSSProperties = {
  marginTop: 100,
  fontFamily: 'sans-serif',
  textAlign: 'center',
  height: 'calc(100vh - 133px)'
};

const graphContainerStyle: React.CSSProperties = {
  padding: '0 20px',
  height: '551px',
  position: 'relative',
  margin: '10px 0 40px 0',
};

const displayBoxStyle: React.CSSProperties = {
  position: 'absolute',
  height: '482px',
  width: 'calc(100% - 147.3px)',
  border: '1px solid black',
  backgroundColor: '#f2f2f2',
  top: 19.4,
  left: 73.6,
};

const dataset = createSingleBarData();
const title = 'Attention Index';
const isMultibar = false;

const BarChart = () => {

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
      <h1>{title}</h1>
      <div style={graphContainerStyle}>
        <div style={displayBoxStyle}>
        </div>
        <ResponsiveBar
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          data={dataset.data}
          keys={['Attention Level']}
          indexBy='Time'
          maxValue={10}
          padding={0.06}
          margin={{ top: 20, right: 55, bottom: 50, left: 55 }}
          colors={({ data }) => data.color}
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
            linearGradientDef('gradientA', [
              { offset: 0, color: 'inherit', opacity: 0.5 },
              { offset: 100, color: 'inherit', opacity: 1 },
            ]),
            // linearGradientDef('gradientImportant', [
            //   { offset: 0, color: 'inherit', opacity: 1 },
            //   { offset: 100, color: 'inherit', opacity: 1 },
            // ]),
            // TODO discuss this
            patternSquaresDef('patternImportant', {
              'size': 1,
              'padding': 3,
              'stagger': false,
              'background': 'inherit',
              'color': '#000000'
            })
          ]}
          fill={[
            { match: ({ data }) => {
              console.log(data);
              return dataset.importantIndexes.includes(data.index as number);
            },
            id: 'patternImportant' },
            { match: '*', id: 'gradientA' },
          ]}

          tooltip={({ id, value, color, indexValue, index }: todoType) => {  // Need to extend SliceTooltipProps probably for this to work with type
            return (
              <div
                style={{
                  background: 'white',
                  padding: '0 15px',
                  border: '1px solid black',
                  borderRadius: 10,
                  display: 'flex',
                  gap: 20,
                  alignItems: 'center',
                  height: 200,
                  // TODO try make hover on important point less wonky
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-evenly',
                    height: '100%'
                  }}
                >
                  <div
                    style={{
                      color: color,
                      display: 'flex',
                      justifyContent: 'space-between',
                      flexDirection: 'column',
                      gap: 10
                    }}
                  >
                    <strong>{id}: </strong>
                    <span style={{ fontWeight: 900 }}>{value}</span>
                  </div>

                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexDirection: 'column',
                    gap: 10
                  }}
                  >
                    <strong>Time: </strong>
                    <span style={{ fontWeight: 900 }}>{indexValue} sec</span>
                  </div>
                </div>
                {dataset.importantIndexes.includes(index) &&
                <img src={testImage}
                  style={{
                    height: 200,
                    borderRadius: '2px 10px 10px 2px',
                    marginRight: -15,
                  }}
                />
                }
              </div>
            );
          }}
        />
      </div>
    </div>
  );
};

export default BarChart;

import React from 'react';
import { ResponsiveLine } from '@nivo/line';

import { getRandomData } from './utils';

import testImage from '../../../assets/images/test.jpg';
import { todoType } from '../../../types';
import { linearGradientDef } from '@nivo/core';

const mainContainerStyle: React.CSSProperties = {
  marginTop: 40,
  fontFamily: 'sans-serif',
  textAlign: 'center',
};

const graphContainerStyle: React.CSSProperties = {
  padding: '0 20px',
  height: '578.5px',
  position: 'relative',
  margin: '10px 0 40px 0',
};

const mockBoxStyle: React.CSSProperties = {
  position: 'absolute',
  height: '482px',
  width: 'calc(100% - 147.3px)',
  border: '1px solid black',
  backgroundColor: '#f2f2f2',
  top: 18.7,
  left: 73.6,
};

const dataset1 = getRandomData(21);
dataset1.data[17].isImportant = true;
dataset1.data[9].isImportant = true;
dataset1.color = '#32a09c';
dataset1.id = 'Happiness';

const dataset2 = getRandomData(21);
dataset2.data[17].isImportant = true;
dataset2.data[9].isImportant = true;
dataset2.color = '#469c5d';
dataset2.id = 'Sadness';

const dataset3 = getRandomData(21);
dataset3.data[17].isImportant = true;
dataset3.data[9].isImportant = true;
dataset3.color = '#5252bf';
dataset3.id = 'Calmness';


const dataset4 = getRandomData(21);
dataset4.data[17].isImportant = true;
dataset4.data[9].isImportant = true;
dataset4.color = '#b0c44b';
dataset4.id = 'Confusion';


// Multiline
const hasLegend = true;
const hasFill = false;
const lineWidth = 7;
const enableSlices = false;
const hasPoints = false;
const hasGridX = true;
const hasGridY = true;

const AttentionChart = () => {

  return (
    <div style={mainContainerStyle}>
      <h1>Emotions During Lecture</h1>
      <div style={graphContainerStyle}>
        <div style={mockBoxStyle}>
        </div>
        <ResponsiveLine
          data={[dataset1, dataset2, dataset3, dataset4]}
          colors={data => data.color}
          xScale={{ type: 'linear' }}
          yScale={{
            type: 'linear',
            min: 0,
            max: 10,
            stacked: false,
            reverse: false
          }}
          curve="catmullRom"
          enableSlices={enableSlices ? 'x' : false}
          enableArea={hasFill}
          areaOpacity={0.8}
          enablePoints={true}
          pointSymbol={(pointProps: todoType) => {
            if (hasPoints) return <circle cx="0" cy="0" r={12} stroke={pointProps.color} strokeWidth="2" fill={pointProps.color} />;
            // TODO refactor
            let fillColor = '';
            let borderColor = '';
            let radius = '0';
            if (pointProps.datum.isImportant) {
              fillColor = pointProps.color;
              borderColor = pointProps.color;
              radius = '12';
            }
            const renderedPoint = <circle cx="0" cy="0" r={radius} stroke={borderColor} strokeWidth="2" fill={fillColor} />;
            return (
              renderedPoint
            );
          }}
          lineWidth={lineWidth}
          useMesh={true}
          margin={{ top: 20, right: 55, bottom: 80, left: 55 }}
          pointLabelYOffset={0}
          enableGridY={hasGridX}
          enableGridX={hasGridY}
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
              { offset: 0, color: 'inherit', opacity: 0 },
              { offset: 100, color: 'inherit', opacity: 0.9 },
            ]),
          ]}
          fill={[
            { match: '*', id: 'gradientA' },
          ]}
          sliceTooltip={({ slice }) => {
            return (
              <div
                style={{
                  background: 'white',
                  padding: 15,
                  border: '1px solid #ccc',
                  borderRadius: 10,
                  // TODO try make hover on important point less wonky
                }}
              >
                {slice.points.map((point: todoType ) => ( // Need to extend Point for this to work with type
                  <div
                    key={point.id}
                  >
                    {point.data.isImportant && <img src={testImage} style={{height: 200, borderRadius: 10,}}/>}
                    <div>
                      <div
                        style={{
                          color: point.serieColor,
                        }}
                      >
                        <strong>{point.serieId}</strong> [{point.data.yFormatted}]
                      </div>
                      <div><strong>Time</strong> [{point.data.x} sec]</div>
                    </div>
                  </div>
                ))}
              </div>
            );
          }}
          tooltip={({ point }: { point: todoType }) => {
            return (
              <div
                style={{
                  background: 'white',
                  padding: 15,
                  border: '1px solid #ccc',
                  borderRadius: 10,
                  // TODO make hover on important point less wonky
                }}
              >
                <div
                  key={point.id}
                >
                  {point.data.isImportant && <img src={testImage} style={{height: 200, borderRadius: 10,}}/>}
                  <div>
                    <div
                      style={{
                        color: point.serieColor,
                      }}
                    >
                      <strong>{point.serieId}</strong> [{point.data.yFormatted}]
                    </div>
                    <div><strong>Time</strong> [{point.data.x} sec]</div>
                  </div>
                </div>
              </div>
            );
          }}
          legends={hasLegend ? [
            {
              anchor: 'bottom-right',
              direction: 'row',
              justify: false,
              translateY: 70,
              itemWidth: 100,
              itemHeight: 10,
              itemsSpacing: 6,
              symbolSize: 22,
              symbolShape: 'square',
              itemDirection: 'left-to-right',
              itemTextColor: '#777',
              effects: [
                {
                  on: 'hover',
                  style: {
                    itemBackground: 'rgba(0, 0, 0, .03)',
                    itemOpacity: 1
                  }
                }
              ]
            }
          ] : undefined}
        />
      </div>
    </div>
  );
};

export default AttentionChart;

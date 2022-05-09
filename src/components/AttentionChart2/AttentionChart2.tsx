import React from 'react';
import { ResponsiveLine } from '@nivo/line';

import { parseAttentionData as parseAttentionData } from './utils';
import { mockRawData } from '../../assets/mockData';

import '../AttentionChart/attentionChart.css';
import testImage from '../../assets/images/test.jpg';
import { todoType } from '../../types';

const mainContainerStyle: React.CSSProperties = {
  marginTop: 40,
  fontFamily: 'sans-serif',
  textAlign: 'center',
};

const graphContainerStyle: React.CSSProperties = {
  padding: '0 20px',
  height: '550px',
  position: 'relative',
  margin: '10px 0 40px 0',
};

const mockBoxStyle: React.CSSProperties = {
  position: 'absolute',
  height: '501px',
  width: 'calc(100% - 148px)',
  border: '1px solid black',
  backgroundColor: '#f2f2f2',
  top: 0,
  left: 74,
};

const data = parseAttentionData(mockRawData, 5);
data.data[17].isImportant = true;
data.data[9].isImportant = true;

const AttentionChart = () => {

  return (
    <div style={mainContainerStyle}>
      <h1>Attention Index During Lecture</h1>
      <div style={graphContainerStyle}>
        <div style={mockBoxStyle}>
        </div>
        <ResponsiveLine
          data={[data]}
          colors={data => data.color}
          xScale={{ type: 'point' }}
          yScale={{
            type: 'linear',
            min: 0,
            max: 10,
            stacked: false,
            reverse: false
          }}
          curve="cardinal"
          enableSlices="x"
          enableArea={true}
          areaOpacity={1}
          enablePoints={true}
          pointSize={20}
          pointColor='#32a09c'
          pointSymbol={(pointProps: todoType) => {
            // TODO refactor
            let fillColor = '';
            let borderColor = '';
            let radius = '0';
            if (pointProps.datum.isImportant) {
              fillColor = '#32a09c';
              borderColor = '#32a09c';
              radius = '12';
            } else {
              fillColor = '';
              borderColor = '';
              radius = '0';
            }
            const renderedPoint = <circle cx="0" cy="0" r={radius} stroke={borderColor} strokeWidth="2" fill={fillColor} />;
            return (
              renderedPoint
            );
          }}
          lineWidth={6}
          useMesh={true}
          margin={{ top: 20, right: 55, bottom: 50, left: 55 }}
          pointLabelYOffset={0}
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
                  // TODO make hover on important point less wonky
                }}
              >
                {slice.points.map((point: todoType) => (
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
                      <div><strong>Time</strong> [{point.data.x}]</div>
                    </div>
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

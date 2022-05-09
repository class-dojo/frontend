import React from 'react';
import { ResponsiveLine } from '@nivo/line';
import { linearGradientDef } from '@nivo/core';

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
  height: '578.5px',
  position: 'relative',
  margin: '10px 0 40px 0',
};

const displayBoxStyle: React.CSSProperties = {
  position: 'absolute',
  height: '480px',
  width: 'calc(100% - 147.7px)',
  top: 19.5,
  left: 73.8,
};

const displayBoxBgStyle: React.CSSProperties = {
  backgroundColor: '#f2f2f2',
  zIndex: -10
};

const displayBoxFrameStyle: React.CSSProperties = {
  border: '1px solid black',
  zIndex: 10,
  pointerEvents: 'none'
};

type AttentionChartProps = {
  isMultiline: boolean,
  data: todoType,
  title: string
}

const LineChart = ({ isMultiline, data, title }: AttentionChartProps): JSX.Element => {

  let hasLegend = false;
  let hasFill = true;
  let lineWidth = 8;
  let enableSlices = true;
  let hasPoints = false;
  let hasGridX = false;
  let hasGridY = false;

  if (isMultiline) {
    hasLegend = true;
    hasFill = false;
    lineWidth = 5;
    enableSlices = true;
    hasPoints = false;
    hasGridX = true;
    hasGridY = true;
  }

  return (
    <div style={mainContainerStyle}>
      <h1>{title}</h1>
      <div style={graphContainerStyle}>
        <div style={{...displayBoxStyle, ...displayBoxFrameStyle}}>
        </div>
        <div style={{...displayBoxStyle, ...displayBoxBgStyle}}>
        </div>
        <ResponsiveLine
          data={[...data]}
          colors={data => data.color}
          margin={{ top: 20, right: 55, bottom: 80, left: 55 }}
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
          sliceTooltip={({ slice }: todoType) => {  // Need to extend SliceTooltipProps probably for this to work with type
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
                  {slice.points.map((point: todoType ) => (
                    <div key={point.id}>
                      <div
                        style={{
                          color: point.serieColor,
                          display: 'flex',
                          justifyContent: 'space-between',
                          flexDirection: isMultiline ? 'row' : 'column'
                        }}
                      >
                        <strong>{point.serieId}: </strong>
                        <span style={{ fontWeight: 900 }}>{point.data.yFormatted}</span>
                      </div>
                    </div>
                  ))}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexDirection: isMultiline ? 'row' : 'column'
                  }}
                  >
                    <strong>Time: </strong>
                    <span style={{ fontWeight: 900 }}>{slice.points[0].data.x} sec</span>
                  </div>
                </div>
                {slice.points[0].data.isImportant &&
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
          tooltip={({ point }: { point: todoType }) => {
            return (
              <div
                style={{
                  background: 'white',
                  padding: 15,
                  border: '1px solid #ccc',
                  borderRadius: 10,
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
                      <strong>{point.serieId}: </strong>
                      <span style={{ fontWeight: 900 }}>[{point.data.yFormatted}]</span>
                    </div>
                    <div>
                      <strong>Time: </strong>
                      <span style={{ fontWeight: 900 }}>[{point.data.x} sec]</span>
                    </div>
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

export default LineChart;

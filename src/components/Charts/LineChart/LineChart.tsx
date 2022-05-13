import React from 'react';
import { ResponsiveLine } from '@nivo/line';
import { linearGradientDef } from '@nivo/core';

import testImage from '../../../assets/images/test.jpg';
import { todoType } from '../../../types';
import { LineDataset } from '../../../interfaces';
import { HEADCOUNT } from '../../../constants';

const displayBoxBgStyle: React.CSSProperties = {
  backgroundColor: '#f2f2f2',
  zIndex: -10
};

const displayBoxFrameStyle: React.CSSProperties = {
  border: '1px solid black',
  zIndex: 10,
  pointerEvents: 'none'
};

type LineChartProps = {
  isMultiline: boolean,
  dataset: LineDataset[],
  title: string,
  yAxisName: string,
  isOverlayed?: boolean,
  isSecondary?: boolean,
  isThumbnail?: boolean,
  frames: string[]
  accuracy: number
}

const LineChart = ({ isMultiline, dataset, frames, accuracy, yAxisName, isOverlayed = false, isSecondary = false, isThumbnail = false }: LineChartProps): JSX.Element => {

  const mainContainerStyle: React.CSSProperties = {
    textAlign: 'center',
    height: isThumbnail ? '300px' : 'calc(100vh - 133px)', // TODO see how this fits in dashboard
    width: isThumbnail ? '100%' : 'auto',
    // padding: isThumbnail ? 10 : 'auto',
    // cursor: isThumbnail ? 'pointer' : 'auto'
    // TODO have cursor on important slices
  };

  const graphContainerStyle: React.CSSProperties = {
    padding: isThumbnail ? 'auto' : '0 20px',
    height: isThumbnail ? 310 : 578.5,
    position: 'relative',
    // margin: '0 0 40px 0',
    width: '100%'
  };

  const displayBoxStyle: React.CSSProperties = {
    position: 'absolute',
    height: isThumbnail ? 251 : '480px',
    width: isThumbnail ? (isOverlayed ? 'calc(100% - 108px)' : 'calc(100% - 78.2px)') : 'calc(100% - 147.7px)',
    top: isThumbnail ? 9.5 : 19.5,
    left: isThumbnail ? 54 : 73.8,
    display: isSecondary ? 'none' : 'initial',
  };

  let hasLegend = false;
  let hasFill = true;
  let hasPoints = false;
  let hasGridX = false;
  let hasGridY = false;

  if (isMultiline) {
    hasLegend = true;
    hasFill = false;
    hasPoints = false;
    hasGridX = true;
    hasGridY = true;
  }

  if (isOverlayed) {
    hasFill = false;
  }

  const handleMouseEnter = (point: todoType, event: todoType) => {
    if (point.data.isImportant) {
      event.target.style.cursor = 'pointer';
    }
  };

  const handleMouseLeave = (point: todoType, event: todoType) => {
    if (point.data.isImportant) {
      event.target.style.cursor = 'auto';
    } else {
      event.target.style.cursor = 'auto';
    }
  };

  const handleMouseMove = (point: todoType, event: todoType) => {
    if (point.data.isImportant) {
      event.target.style.cursor = 'pointer';
    } else {
      event.target.style.cursor = 'auto';
    }
  };



  return (
    <div style={{...mainContainerStyle, zIndex: isSecondary ? -1 : 1}}>
      <div style={graphContainerStyle}>
        <div style={{...displayBoxStyle, ...displayBoxFrameStyle}}>
        </div>
        <div style={{...displayBoxStyle, ...displayBoxBgStyle}}>
        </div>
        <ResponsiveLine
          data={[...dataset]}
          colors={data => data.color}
          margin={{ top: isThumbnail ? 10 : 20, right: (isThumbnail && !isOverlayed) ? 25 : 55, bottom: isThumbnail ? 50 : 80, left: 55 }}
          xScale={{ type: 'linear' }}
          yScale={{
            type: 'linear',
            min: 0,
            max: yAxisName === HEADCOUNT ? 'auto' : 10,
            stacked: false,
            reverse: false
          }}
          curve="catmullRom"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onMouseMove={handleMouseMove}
          // enableSlices={'x'}
          enableArea={hasFill}
          areaOpacity={0.8}
          enablePoints={true}
          pointSymbol={(pointProps: todoType) => {
            if (hasPoints) return <circle cx="0" cy="0" r={4} stroke={pointProps.color} strokeWidth="2" fill={pointProps.color} />;
            // TODO refactor
            let fillColor = '';
            let borderColor = '';
            let radius = '0';
            if (pointProps.datum.isImportant) {
              fillColor = pointProps.color;
              borderColor = pointProps.color;
              radius = '4';
            }
            const renderedPoint = <circle cx="0" cy="0" r={radius} stroke={borderColor} strokeWidth="2" fill={fillColor} />;
            return (
              renderedPoint
            );
          }}
          lineWidth={isOverlayed ? 4 : 2}
          useMesh={true}
          pointLabelYOffset={0}
          enableGridY={hasGridX}
          enableGridX={hasGridY}
          axisBottom={isOverlayed ? null : {
            tickSize: 0,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Time',
            legendPosition: 'middle',
            legendOffset: isThumbnail ? 30 : 40,
          }}
          axisLeft={isSecondary ? null : {
            tickSize: 10,
            tickPadding: 10,
            tickRotation: 0,
            legend: yAxisName,
            legendPosition: 'middle',
            legendOffset: isThumbnail ? -40 : -50
          }}
          axisRight={isSecondary ? {
            tickSize: 10,
            tickPadding: 10,
            tickRotation: 0,
            legend: yAxisName,
            legendPosition: 'middle',
            legendOffset: isThumbnail ? 40 : 50
          } : null}
          defs={[
            linearGradientDef('gradientA', [
              { offset: 0, color: 'inherit', opacity: 0.45 },
              { offset: 20, color: 'inherit', opacity: 0.2 },
              { offset: 80, color: 'inherit', opacity: 0.15 },
              { offset: 100, color: 'inherit', opacity: 0.05 },
            ]),
          ]}
          fill={[
            { match: '*', id: 'gradientA' },
          ]}
          // sliceTooltip={({ slice }: todoType) => {  // Need to extend SliceTooltipProps probably for this to work with type
          //   return (
          //     <div
          //       className='unselectable-text'
          //       style={{
          //         background: '#f7fafb',
          //         padding: '0 15px',
          //         border: '1px solid black',
          //         borderRadius: 6,
          //         display: 'flex',
          //         gap: 20,
          //         alignItems: 'center',
          //         height: 180,
          //         // TODO try make hover on important point less wonky
          //       }}
          //     >
          //       <div
          //         style={{
          //           display: 'flex',
          //           flexDirection: 'column',
          //           justifyContent: 'space-evenly',
          //           height: '100%'
          //         }}
          //       >
          //         {slice.points.map((point: todoType ) => (
          //           <div key={point.id}>
          //             <div
          //               style={{
          //                 color: point.serieColor,
          //                 display: 'flex',
          //                 justifyContent: 'space-between',
          //                 flexDirection: isMultiline ? 'row' : 'column',
          //                 gap: isMultiline ? 20 : 10
          //               }}
          //             >
          //               <strong>{point.serieId}: </strong>
          //               <span style={{ fontWeight: 900 }}>{point.data.yFormatted}</span>
          //             </div>
          //           </div>
          //         ))}
          //         <div style={{
          //           display: 'flex',
          //           justifyContent: 'space-between',
          //           flexDirection: isMultiline ? 'row' : 'column',
          //           gap: isMultiline ? 20 : 10
          //         }}
          //         >
          //           <strong>Time: </strong>
          //           <span style={{ fontWeight: 900 }}>{slice.points[0].data.x} sec</span>
          //         </div>
          //       </div>
          //       {slice.points[0].data.isImportant &&
          //       <img src={testImage}
          //         style={{
          //           height: 180,
          //           borderRadius: '2px 6px 6px 2px',
          //           marginRight: -15,
          //         }}
          //       />
          //       }
          //     </div>
          //   );
          // }}
          tooltip={({point}: todoType) => {
            return (
              <div
                className='unselectable-text'
                style={{
                  cursor: 'pointer',
                  background: '#f7fafb',
                  padding: '0 15px',
                  border: '1px solid black',
                  borderRadius: 6,
                  display: 'flex',
                  gap: 20,
                  alignItems: 'center',
                  height: 180,
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
                  <div key={point.id}>
                    <div
                      style={{
                        color: point.serieColor,
                        display: 'flex',
                        justifyContent: 'space-between',
                        flexDirection: isMultiline ? 'row' : 'column',
                        gap: isMultiline ? 20 : 10
                      }}
                    >
                      <strong>{point.serieId}: </strong>
                      <span style={{ fontWeight: 900 }}>{point.data.yFormatted}</span>
                    </div>
                  </div>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexDirection: isMultiline ? 'row' : 'column',
                    gap: isMultiline ? 20 : 10
                  }}
                  >
                    <strong>Time: </strong>
                    <span style={{ fontWeight: 900 }}>{point.data.x} sec</span>
                  </div>
                </div>
                {point.data.isImportant &&
              <img src={frames[point.data.x/accuracy]}
                style={{
                  height: 180,
                  borderRadius: '2px 6px 6px 2px',
                  marginRight: -15,
                }}
              />
                }
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

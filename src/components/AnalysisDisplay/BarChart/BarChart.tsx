import React from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { linearGradientDef, patternLinesDef, patternSquaresDef } from '@nivo/core';

import './barChart.css';
import testImage from '../../../assets/images/test.jpg';
import { todoType } from '../../../types';
import { colors } from '../colors';

const displayBoxBgStyle: React.CSSProperties = {
  backgroundColor: '#f2f2f2',
  zIndex: -10
};

const displayBoxFrameStyle: React.CSSProperties = {
  border: '1px solid black',
  zIndex: 10,
  pointerEvents: 'none'
};

const setBarColor = (id: string, isSecondary: boolean, colorOverride: string | undefined) => {
  switch (id) {
  case 'Happiness':
    return colors.happiness;
    break;
  case 'Sadness':
    return colors.sadness;
    break;
  case 'Calmness':
    return colors.calmness;
    break;
  case 'Confusion':
    return colors.confusion;
    break;
  default:
    if (isSecondary) return '#3a4f637a';
    if (colorOverride) return colorOverride;
    return colors.primaryGreen;
    break;
  }
};

interface BarDataset {
  data: {
    id: number;
    Time: number;
    'Attention Level'?: number;
    Happiness?: number; // TODO Make camelcase and handle capitalization somewhere else
    Sadness?: number;
    Confusion?: number;
    Calmness?: number;
  } [];
  keys: string[];
  importantIndexes: number[];
  samplePeriod: number
}

type BarChartProps = {
  isMultibar: boolean,
  dataset: BarDataset,
  isSecondary?: boolean,
  isThumbnail?: boolean,
  color?: string,
}

const BarChart = ({ isMultibar, dataset, isSecondary = false, isThumbnail = false, color}: BarChartProps) => {

  const mainContainerStyle: React.CSSProperties = {
    // marginTop: isThumbnail ? 0 : 110,
    textAlign: 'center',
    height: isThumbnail ? '300px' : 'calc(100vh - 133px)', // TODO see how this fits in dashboard
    width: isThumbnail ? '100%' : 'auto',
    // padding: isThumbnail ? 10 : 'auto',
  };

  const graphContainerStyle: React.CSSProperties = {
    padding: isThumbnail ? 'auto' : '0 20px', // TODO debate this padding
    height: isThumbnail ? 310 : 548.5, // ?? TODO check why i have such big height differences between this and line chart
    position: 'relative',
    margin: '0 0 40px 0',
  };

  const displayBoxStyle: React.CSSProperties = {
    position: 'absolute',
    height: isThumbnail ? 251 : '479.5px', // ?? TODO check the same here
    width: isThumbnail ? 'calc(100% - 108.7px)' : 'calc(100% - 147.3px)',
    top: isThumbnail ? 9.5 : 19.5,
    left: isThumbnail ? 54 : 73.8,
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleMouseEnter = (data: todoType, event: todoType) => {
    event.target.classList.add('animate');
    event.target.classList.add('hovered');
    if (dataset.importantIndexes.includes(data.index)) {
      event.target.classList.add('pointer');
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleMouseLeave = (data: todoType, event: todoType) => {
    event.target.classList.remove('hovered');
    if (dataset.importantIndexes.includes(data.index)) {
      event.target.classList.remove('pointer');
    }
  };

  const indexes = dataset.data.map(datum => datum.Time).filter(time => time % 10 === 0 || time === 0);

  return (
    <div style={{...mainContainerStyle, zIndex: isSecondary ? -1 : 1}}>
      <div style={graphContainerStyle}>
        <div style={{...displayBoxStyle, ...displayBoxFrameStyle}}>
        </div>
        <div style={{...displayBoxStyle, ...displayBoxBgStyle}}>
        </div>
        <ResponsiveBar
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          data={dataset.data}
          keys={dataset.keys}
          maxValue={10}
          padding={isMultibar ? 0.2 : 0.04}
          margin={{ top: isThumbnail ? 10 : 20, right: 55, bottom: 50, left: 55 }}
          colors={({ id }) => setBarColor(id as string, isSecondary, color)}
          borderRadius={isMultibar ? 1 : 3}
          // borderWidth={1} // TODO debate
          borderColor='black'
          enableLabel={false}
          enableGridY={false}
          enableGridX={isMultibar ? true : false}
          indexScale={{
            type: 'band',
            round: false,
          }}
          groupMode='grouped'
          axisBottom={{
            tickSize: 0,
            tickPadding: 12,
            tickRotation: 0,
            legend: 'Time',
            legendPosition: 'middle',
            legendOffset: 40,
            format: index => {return (index === 0 || indexes.find(vts => vts === index * dataset.samplePeriod)) ? index * 5 : '';} ,
          }}
          axisLeft={isSecondary ? null : {
            tickSize: 10,
            tickPadding: 10,
            tickRotation: 0,
            legend: 'Attention Level',
            legendPosition: 'middle',
            legendOffset: -50
          }}
          axisRight={isSecondary ? {
            tickSize: 10,
            tickPadding: 10,
            tickRotation: 0,
            legend: 'Attention Level',
            legendPosition: 'middle',
            legendOffset: 50
          } : null}
          defs={[
            linearGradientDef('gradientA', [
              { offset: 0, color: 'inherit', opacity: isMultibar ? 0.6 : 0.5 },
              { offset: 100, color: 'inherit', opacity: 1 },
            ]),
            // linearGradientDef('gradientImportant', [
            //   { offset: 0, color: 'inherit', opacity: 1 },
            //   { offset: 100, color: 'inherit', opacity: 1 },
            // ]),
            patternSquaresDef('patternSquare', {
              'size': 1,
              'padding': 3,
              'stagger': false,
              'background': 'inherit',
              'color': '#000000'
            }),
            patternLinesDef('patternLine', {
              'spacing': 7,
              'rotation': 45,
              'lineWidth': isMultibar ? 0.2 : 0.5,
              'background': 'inherit',
              'color': '#000000'
            })
          ]}
          fill={[
            {
              match: ({ data }) => {
                return dataset.importantIndexes.includes(data.index as number);
              },
              id: isMultibar ? 'patternLine' : 'patternSquare'
            },
            { match: '*', id: 'gradientA' },
          ]}

          tooltip={({ id, value, color, indexValue, index }: todoType) => {  // Need to extend SliceTooltipProps probably for this to work with type
            return (/*  isThumbnail ? <></> : */
              <div
                style={{
                  background: '#ececec',
                  padding: '0 15px',
                  border: '1px solid black',
                  borderRadius: 6,
                  display: 'flex',
                  gap: 20,
                  alignItems: 'center',
                  height: 180,
                  zIndex: 100,
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
                    height: 180,
                    borderRadius: '2px 6px 6px 2px',
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

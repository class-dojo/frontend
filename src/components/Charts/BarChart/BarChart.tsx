import React, { useState } from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { linearGradientDef, patternLinesDef, patternSquaresDef } from '@nivo/core';
import { TooltipWrapper } from '@nivo/tooltip';

import './barChart.css';
import { todoType } from '../../../types';
import { colors } from '../../../colors';
import { BarDataset } from '../../../interfaces';
import { HEADCOUNT } from '../../../constants';
import { Modal } from 'react-bootstrap';
import { Frame } from '../../UploadVideo/types';
import useWindowDimensions from '../../../utils/useWindowDimensions';
import { isInFirstHalf } from '../utils';

const displayBoxBgStyle: React.CSSProperties = {
  // backgroundColor: '#f2f2f2',
  backgroundColor: '#fffefa',
  zIndex: -1
};

const displayBoxFrameStyle: React.CSSProperties = {
  border: '1px solid black',
  zIndex: 1,
  pointerEvents: 'none'
};

const setBarColor = (id: string, isSecondary: boolean, colorOverride: string | undefined) => {
  let barColor = colors.primaryGreen;
  if (id === 'Attention') barColor = colors.primaryRed;
  if (id === 'Mood') barColor = colors.primaryGreen;
  if (id === 'Headcount') barColor = colors.primaryPurple;
  if (colorOverride) barColor = colorOverride;
  if (isSecondary) barColor = '#3a4f637a';
  return barColor;
};

type BarChartProps = {
  isMultibar: boolean,
  dataset: BarDataset,
  isSecondary?: boolean,
  isThumbnail?: boolean,
  color?: string,
  isOverlayed?: boolean,
  accuracy: number,
  yAxisName: string,
  frames: Frame
}

const BarChart = ({ isMultibar, dataset, isSecondary = false, isThumbnail = false, color, isOverlayed, accuracy, yAxisName, frames}: BarChartProps) => {

  const [showModal, setShow] = useState(false);
  const [modalImgIndex, setModalImgIndex] = useState(0);

  const { width } = useWindowDimensions();

  const yOffsetThumnbail = 49;

  const mainContainerStyle: React.CSSProperties = {
    height: isThumbnail ? `calc(100% - ${yOffsetThumnbail}px)` : '100%',
    width: '100%',
    zIndex: isSecondary ? -1 : 1,
  };

  const graphContainerStyle: React.CSSProperties = {
    position: 'relative',
    maxWidth: (!isThumbnail) ? (width >= 768 ? 'calc(100vw - 35px)' : 'calc(100vw - 10px)') : '100%',
    width: '100%',
    height: '100%',
  };

  const displayBoxStyle: React.CSSProperties = {
    position: 'absolute',
    height: (width < 768 && isOverlayed) ? 'calc(100% - 79px)' : 'calc(100% - 49px)',
    width: isThumbnail ? (isOverlayed ? 'calc(100% - 108px)' : 'calc(100% - 78.2px)') : 'calc(100% - 108px)',
    top: 9.5,
    left: 54,
    display: isSecondary ? 'none' : 'initial',
  };

  const handleMouseEnter = (data: todoType, event: todoType) => {
    event.target.classList.add('animate');
    event.target.classList.add('hovered');
    if (dataset.importantIndexes.includes(data.index)) {
      event.target.classList.add('pointer');
    }
  };

  const handleMouseLeave = (data: todoType, event: todoType) => {
    event.target.classList.remove('hovered');
    if (dataset.importantIndexes.includes(data.index)) {
      event.target.classList.remove('pointer');
    }
  };

  const handleClick = (data: todoType) => {
    if (dataset.importantIndexes.includes(data.index)) {
      setModalImgIndex(data.index);
      handleShow();
    }
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getMaxValue = () => {
    return dataset.data.reduce((acc, val) => {
      return val[HEADCOUNT] > acc ? val[HEADCOUNT] : acc;
    }, 0);
  };

  const indexes = dataset.data.map(datum => datum.Time).filter(time => time % 10 === 0 || time === 0);

  return (
    <div style={{...mainContainerStyle}}>
      <div style={graphContainerStyle}>
        <div style={{...displayBoxStyle, ...displayBoxFrameStyle}}>
        </div>
        <div style={{...displayBoxStyle, ...displayBoxBgStyle}}>
        </div>
        <ResponsiveBar
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleClick}
          motionConfig={'stiff'}
          data={dataset.data}
          keys={dataset.keys}
          maxValue={yAxisName === HEADCOUNT ? getMaxValue() * 1.2 : 100}
          padding={isMultibar ? 0.2 : 0.04}
          margin={{ top: 10, right: (isThumbnail && !isOverlayed) ? 25 : 55, bottom: (width < 768 && isOverlayed) ? 70 : 40, left: 55 }}
          colors={({ id }) => setBarColor(id as string, isSecondary, color)}
          borderRadius={isMultibar ? 1 : 3}
          // borderWidth={1} // TODO debate
          borderColor='black'
          enableLabel={false}
          enableGridY={false}
          enableGridX={false}
          indexScale={{
            type: 'band',
            round: false,
          }}
          groupMode='grouped'
          axisBottom={{
            tickSize: 0,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Time (seconds)',
            legendPosition: 'middle',
            legendOffset: 30,
            format: index => (index === 0 || indexes.find(vts => vts === index * accuracy)) ? index * 5 : '',
          }}
          axisLeft={isSecondary ? null : {
            tickSize: 10,
            tickPadding: 10,
            tickRotation: 0,
            legend: yAxisName,
            legendPosition: 'middle',
            legendOffset: isThumbnail ? -45 : -50
          }}
          axisRight={isSecondary ? {
            tickSize: 10,
            tickPadding: 10,
            tickRotation: 0,
            legend: yAxisName,
            legendPosition: 'middle',
            legendOffset: isThumbnail ? 45 : 50
          } : null}
          defs={[
            linearGradientDef('gradientA', [
              { offset: 0, color: 'inherit', opacity: isMultibar ? 0.6 : 0.5 },
              { offset: 100, color: 'inherit', opacity: 1 },
            ]),
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
            return ( dataset.importantIndexes.includes(index) && width < 768 ? <></> :
              <TooltipWrapper anchor={isInFirstHalf(index, dataset.data.length) ? 'right' : 'left'} position={[0, 0]}>
                <div
                  className='unselectable-text'
                  style={{
                    background: '#f7fafb',
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
                      <span style={{ fontWeight: 900 }}>{indexValue * accuracy} sec</span>
                    </div>
                  </div>
                  {dataset.importantIndexes.includes(index) &&
                <img src={frames[index]}
                  style={{
                    height: 180,
                    borderRadius: '2px 6px 6px 2px',
                    marginRight: -15,
                  }}
                />
                  }
                </div>
              </TooltipWrapper>
            );
          }}
          legends={isOverlayed ? [
            {
              dataFrom: 'keys',
              anchor: isSecondary ? 'bottom-right' : 'bottom-left',
              direction: 'row',
              justify: false,
              translateY: width >= 768 ? 35 : 60,
              itemWidth: 100,
              itemHeight: 10,
              itemsSpacing: 6,
              symbolSize: isThumbnail ? 14 : 22,
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

      <Modal centered show={showModal} onHide={handleClose} className="">
        <div
          className="modal-dialog-centered d-flex justify-content-center align-items-center"
          style={{
            backgroundColor: 'transparent',
          }}
        >
          <img className='modal-img'
            src={frames[modalImgIndex]}
          />
        </div>
      </Modal>
    </div>
  );
};

export default BarChart;

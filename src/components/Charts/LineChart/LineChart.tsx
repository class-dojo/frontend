import React, { useState } from 'react';
import { ResponsiveLine } from '@nivo/line';
import { linearGradientDef } from '@nivo/core';
import { TooltipWrapper } from '@nivo/tooltip';

import { todoType } from '../../../types';
import { LineDataset } from '../../../interfaces';
import { HEADCOUNT } from '../../../constants';
import { Modal } from 'react-bootstrap';
import { Frame } from '../../UploadVideo/types';
import useWindowDimensions from '../../../utils/useWindowDimensions';
import { isInFirstHalf } from '../utils';
import {FrameModal} from '../FrameModal/FrameModal';

const displayBoxBgStyle: React.CSSProperties = {
  backgroundColor: '#f2f2f2',
  zIndex: -1
};

const displayBoxFrameStyle: React.CSSProperties = {
  border: '1px solid black',
  zIndex: 1,
  pointerEvents: 'none'
};

type LineChartProps = {
  isMultiline: boolean,
  dataset: LineDataset[],
  title?: string,
  yAxisName: string,
  isOverlayed?: boolean,
  isSecondary?: boolean,
  isThumbnail?: boolean,
  frames: Frame
  accuracy: number
}

const LineChart = ({ isMultiline, dataset, frames, accuracy, yAxisName, isOverlayed = false, isSecondary = false, isThumbnail = false }: LineChartProps): JSX.Element => {

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
    maxWidth: (isThumbnail) ? '100%' : (width >= 768 ? 'calc(100vw - 95px)' : 'calc(100vw - 10px)'),
    width: '100%',
    height: '100%',
  };

  const displayBoxStyle: React.CSSProperties = {
    position: 'absolute',
    height: (width < 768 && isOverlayed) ? 'calc(100% - 79px)' : 'calc(100% - 49px)',
    width: isThumbnail ? (isOverlayed ? 'calc(100% - 108px)' : 'calc(100% - 78.2px)') : 'calc(100% - 108px)',
    top: 9.5, // TODO make this pixel perfect
    left: 54,
    display: isSecondary ? 'none' : 'initial',
  };

  let hasFill = true;
  let hasPoints = false;

  if (isMultiline) {
    hasFill = false;
    hasPoints = false;
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

  const handleClick = (point: todoType) => {
    if (point.data.isImportant) {
      const imgIndex = point.data.x / 5;
      setModalImgIndex(imgIndex);
      handleShow();
    }
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getMaxValue = () => {
    return dataset[0].data.reduce((acc, val) => {
      return val['y'] > acc ? val['y'] : acc;
    }, 0);
  };

  return (
    <div style={{...mainContainerStyle}}>
      <div style={graphContainerStyle}>
        <div style={{...displayBoxStyle, ...displayBoxFrameStyle}}>
        </div>
        <div style={{...displayBoxStyle, ...displayBoxBgStyle}}>
        </div>
        <ResponsiveLine
          data={[...dataset]}
          colors={data => data.color}
          margin={{ top: 10, right: (isThumbnail && !isOverlayed) ? 25 : 55, bottom: (width < 768 && isOverlayed) ? 70 : 40, left: 55 }}
          xScale={{ type: 'linear' }}
          yScale={{
            type: 'linear',
            min: 0,
            max: yAxisName === HEADCOUNT ? getMaxValue() * 1.2 : 100,
            stacked: false,
            reverse: false
          }}
          curve="catmullRom"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onMouseMove={handleMouseMove}
          onClick={handleClick}
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
          enableGridY={false}
          enableGridX={false}
          axisBottom={isOverlayed ? null : {
            tickSize: 0,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Time (seconds)',
            legendPosition: 'middle',
            legendOffset: 30,
            format: index => { return (index === 0 || index % 10 === 0) ? index : '';},
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
              { offset: 0, color: 'inherit', opacity: 0.45 },
              { offset: 20, color: 'inherit', opacity: 0.2 },
              { offset: 80, color: 'inherit', opacity: 0.15 },
              { offset: 100, color: 'inherit', opacity: 0.05 },
            ]),
          ]}
          fill={[
            { match: '*', id: 'gradientA' },
          ]}
          tooltip={({point}: todoType) => {
            return ( point.data.isImportant && width < 768 ? <></> :
              <TooltipWrapper anchor={isInFirstHalf(point.index, dataset[0].data.length) ? 'right' : 'left'} position={[0, 0]}>
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
              <img src={frames[point.data.x/accuracy].src}
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
      <FrameModal show={showModal} onHide={handleClose} frame={frames[modalImgIndex]}/>
    </div>
  );
};

export default LineChart;

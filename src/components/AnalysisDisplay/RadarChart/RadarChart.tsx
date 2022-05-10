import React from 'react';
import { ResponsiveRadar } from '@nivo/radar';

import { todoType } from '../../../types';
import { colors } from '../colors';

const mainContainerStyle: React.CSSProperties = {
  marginTop: 100,
  fontFamily: 'sans-serif',
  textAlign: 'center',
  height: 'calc(100vh - 133px)'
};

const graphContainerStyle: React.CSSProperties = {
  padding: '0 20px',
  height: '520px',
  position: 'relative',
  margin: '10px 0 40px 0',
};

const displayBoxStyle: React.CSSProperties = {
  position: 'absolute',
  height: '480px',
  width: 'calc(100% - 900px)',
  top: 19.5,
  left: 450,
};

const displayBoxFrameStyle: React.CSSProperties = {
  border: '1px solid black',
  zIndex: 10,
  pointerEvents: 'none'
};

const displayBoxBgStyle: React.CSSProperties = {
  backgroundColor: '#f2f2f2',
  zIndex: -10
};

const RadarChart = ({ data, title }: { data: todoType, title: string }) => {
  return (
    <div style={mainContainerStyle}>
      <h1>{title}</h1>
      <div style={graphContainerStyle}>
        <div style={{...displayBoxStyle, ...displayBoxFrameStyle}}>
        </div>
        <div style={{...displayBoxStyle, ...displayBoxBgStyle}}>
        </div>
        <ResponsiveRadar
          data={data}
          colors={colors.primary}
          keys={['value' ]}
          indexBy='emotion'
          maxValue={10}
          valueFormat='>-.1f' // probably get formatted numbers anyway
          margin={{ top: 70, bottom: 70 }}
          borderColor={{ from: 'color' }}
          gridLabelOffset={25}
          enableDots={false}
          dotSize={10}
          dotColor={{ theme: 'background' }}
          dotBorderWidth={2}
          motionConfig='wobbly'
          fillOpacity={0.5}
          borderWidth={4}
          gridLevels={4}
          gridShape={'linear'}
          // defs={[
          //   linearGradientDef('gradientA', [
          //     { offset: 0, color: 'inherit', opacity: 1 },
          //     { offset: 50, color: 'inherit', opacity: 0.6 },
          //     { offset: 100, color: 'inherit', opacity: 1 },
          //   ])
          // ]}
          // fill={[
          //   { match: '*', id: 'gradientA' },
          // ]}
          sliceTooltip={({ index, data }) => {  // Need to extend SliceTooltipProps probably for this to work with type
            return (
              <div
                style={{
                  background: 'white',
                  padding: '0 15px',
                  border: '1px solid black',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 10,
                  gap: 20,
                  height: 100,
                  width: 100
                  // TODO try make hover on important point less wonky
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 10
                  }}
                >
                  <strong>{index} </strong>
                  <span style={{ fontWeight: 900, color: colors.primary }}>{data[0].value}</span>
                </div>
              </div>

            );
          }}
        />
      </div>
    </div>
  );
};

export default RadarChart;

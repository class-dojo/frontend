import React from 'react';
import { createMultiBarData, createMultiLineData, createSingleBarData, createSingleLineData, mockRadarData } from '../../assets/mockDataProvider';
import BarChart from './BarChart/BarChart';
import ChartToggler from './ChartToggler/ChartToggler';
import { colors } from './colors';
import { ATTENTION, EMOTIONS, MOOD } from './constants';
import LineChart from './LineChart/LineChart';
import MixedChart from './MixedChart/MixedChart';
import RadarChart from './RadarChart/RadarChart';

const AnalysisDisplay = () => {
  return (
    <div>
      <MixedChart
        color={colors.primaryDarkBlue}
      />
      <ChartToggler
        isBarChartOnInit={true}
        type={ATTENTION}
        color={colors.primaryRed}
      />
      <ChartToggler
        isBarChartOnInit={false}
        color={colors.primaryGreen}
        type={MOOD}
      />
      {/* <ChartToggler
        isBarChartOnInit={false}
        type={EMOTIONS}
      /> */}

      {
      // TODO MAKE PRINTABLE VERSION
      /* <BarChart
        isMultibar={false}
        dataset={createSingleBarData()}
        title={'Attention index'}
      /> */}
      <BarChart
        isMultibar={true}
        dataset={createMultiBarData()}
        title={'Emotion indexes'}
      />
      {/* <LineChart
        isMultiline={false}
        dataset={createSingleLineData(colors.primary)}
        yAxisName='Attention'
        title={'Attention index'}
      /> */}
      <LineChart
        isMultiline={true}
        dataset={createMultiLineData()}
        yAxisName='Emotion score'
        title={'Emotion indexes'}
      />
      <RadarChart
        data={mockRadarData}
        title={'Average emotions'}
      />
    </div>
  );
};

export default AnalysisDisplay;

import React from 'react';
import { useLocation } from 'react-router-dom';
import { createMultiBarData, createMultiLineData, mockRadarData } from '../../assets/mockDataProvider';
import { todoType } from '../../types';
import BarChart from './BarChart/BarChart';
import ChartToggler from './ChartToggler/ChartToggler';
import { colors } from './colors';
import { AGGREGATE, ATTENTION, EMOTIONS, MOOD } from './constants';
import LineChart from './LineChart/LineChart';
import MixedChart from './MixedChart/MixedChart';
import RadarChart from './RadarChart/RadarChart';

const AnalysisDisplay = () => {

  const location = useLocation();
  const { accuracy, data }: todoType = location.state;

  return (
    <div>
      <MixedChart
        type={AGGREGATE}
        color={colors.primaryDarkBlue}
        accuracy={accuracy}
        data={data}
      />
      <ChartToggler
        dataType={'attentionScore'}
        data={data.framesArray}
        accuracy={accuracy}
        isBarChartOnInit={true}
        type={ATTENTION}
        color={colors.primaryRed}
      />
      <ChartToggler
        dataType={'moodScore'}
        data={data.framesArray}
        accuracy={accuracy}
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
      {/* <BarChart
        isMultibar={true}
        dataset={createMultiBarData()}
      /> */}
      {/* <LineChart
        isMultiline={false}
        dataset={createSingleLineData(colors.primary)}
        yAxisName='Attention'
        title={'Attention index'}
      /> */}
      {/* <LineChart
        isMultiline={true}
        dataset={createMultiLineData()}
        yAxisName='Emotion score'
        title={'Emotion indexes'}
      /> */}
      <RadarChart
        data={mockRadarData}
        title={'Average emotions'}
      />
    </div>
  );
};

export default AnalysisDisplay;

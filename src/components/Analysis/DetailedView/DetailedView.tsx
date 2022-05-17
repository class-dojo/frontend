import React from 'react';
import { todoType } from '../../../types';
import ChartToggler from '../../Charts/ChartToggler/ChartToggler';
import { colors } from '../../../colors';
import { AGGREGATE, ATTENTION, HEADCOUNT, MOOD } from '../../../constants';
import MixedChart from '../../Charts/MixedChart/MixedChart';

const AnalysisDisplay = ({ data }: todoType) => {

  return (
    <div>
      <div className='big-chart-container big-chart-aggregate-container'>
        <MixedChart
          type={AGGREGATE}
          color={colors.primaryDarkBlue}
          accuracy={data.accuracy}
          data={data.framesArray}
        />
      </div>
      <div className='big-chart-container'>
        <ChartToggler
          dataType={'attentionScore'}
          data={data.framesArray}
          accuracy={data.accuracy}
          isBarChartOnInit={true}
          type={ATTENTION}
          color={colors.primaryRed}
        />
      </div>
      <div className='big-chart-container'>
        <ChartToggler
          dataType={'moodScore'}
          data={data.framesArray}
          accuracy={data.accuracy}
          isBarChartOnInit={false}
          color={colors.primaryGreen}
          type={MOOD}
        />
      </div>
      <div className='big-chart-container'>
        <ChartToggler
          dataType={'amountOfPeople'}
          data={data.framesArray}
          accuracy={data.accuracy}
          isBarChartOnInit={true}
          color={colors.primaryPurple}
          type={HEADCOUNT}
        />
      </div>
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
      {/* <RadarChart
        data={mockRadarData}
        title={'Average emotions'}
      /> */}

    </div>
  );
};

export default AnalysisDisplay;

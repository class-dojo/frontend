import React from 'react';
import { todoType } from '../../../types';
import ChartToggler from '../../Charts/ChartToggler/ChartToggler';
import { colors } from '../../../colors';
import { AGGREGATE, ATTENTION, HEADCOUNT, MOOD } from '../../../constants';
import MixedChart from '../../Charts/MixedChart/MixedChart';

const AnalysisDisplay = ({accuracy, data}: todoType) => {

  return (
    <div>
      <div >
        <MixedChart
          type={AGGREGATE}
          color={colors.primaryDarkBlue}
          accuracy={accuracy}
          data={data.framesArray}
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
        <ChartToggler
          dataType={'amountOfPeople'}
          data={data.framesArray}
          accuracy={accuracy}
          isBarChartOnInit={true}
          color={colors.primaryPurple}
          type={HEADCOUNT}
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
        {/* <RadarChart
        data={mockRadarData}
        title={'Average emotions'}
      /> */}
      </div>
    </div>
  );
};

export default AnalysisDisplay;

import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { todoType } from '../../types';
import ChartToggler from './ChartToggler/ChartToggler';
import { colors } from './colors';
import { AGGREGATE, ATTENTION, HEADCOUNT, MOOD } from './constants';
import MixedChart from './MixedChart/MixedChart';

const AnalysisDisplay = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const { accuracy, data }: todoType = location.state;

  const toggleView = () => {
    navigate('/dashboard', {state:{ accuracy, data }});
  };

  return (
    <div>
      <div className='container mt-5 mb-5'>
        <div className='row d-flex flex-direction-column justify-content-center'>
          <div className="btn-group d-flex mb-2 col-8" >
            <button className={'p-1 py-2 mb-0 btn btn-primary shadow-none toggle-view-btn'} onClick={toggleView} type="button" style={{background: colors.headers}}>Dashboard</button>
            <button className={'p-1 py-2 mb-0 btn btn-primary shadow-none toggle-view-btn'} type="button" style={{background: colors.headers}}>Detailed</button>
          </div>
        </div>
      </div>
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
  );
};

export default AnalysisDisplay;

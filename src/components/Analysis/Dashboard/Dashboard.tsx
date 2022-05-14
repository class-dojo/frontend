import React from 'react';

import MixedChart from '../../Charts/MixedChart/MixedChart';
import { colors } from '../../../colors';
import AverageValueDisplay from '../../Charts/AverageValueDisplay/AverageValueDisplay';
import { AGGREGATE, ATTENTION, MOOD } from '../../../constants';
import ChartToggler from '../../Charts/ChartToggler/ChartToggler';
import { todoType } from '../../../types';
import TimeIcon from '../../../assets/icons/TimeIcon.svg';
import VideoIcon from '../../../assets/icons/VideoIcon.svg';
import CalendarIcon from '../../../assets/icons/CalendarIcon.svg';

const Dashboard = ({accuracy, data, frames}: todoType) => {

  return (
    <div className='container-fluid px-4 mt-3'>
      <div className='row d-flex justify-content-between mb-3'>
        <div className='col-4 d-flex justify-content-center gap-3'>
          <img src={VideoIcon} className='dashboard-icon'/>
          <span>My cool video</span>
        </div>
        <div className='col-4 d-flex justify-content-center gap-3'>
          <img src={TimeIcon} className='dashboard-icon'/>
          <span>12 min</span>
        </div>
        <div className='col-4 d-flex justify-content-center gap-3'>
          <img src={CalendarIcon} className='dashboard-icon'/>
          <span>14 may, 2022</span>
        </div>
      </div>
      <div className='row d-flex' style={{ height: 'calc(50vh - 50px)', maxHeight: 500 }}>
        <div className='d-flex flex-column align-items-center col-sm-4 col-md-3 col-lg-2' >
          <div className='card p-3 py-4 mt-4'>
            <h4 className='text-center '>Average<br/>attention</h4>
            <AverageValueDisplay
              percentage={Math.floor(Math.random() * 101)}
            />
          </div>
        </div>
        <div className='col-sm-8 col-md-9 col-lg-10'>
          <div className='card chart-small'>
            <MixedChart
              frames={frames}
              data={data.framesArray}
              accuracy={accuracy}
              isThumbnail={true}
              color={colors.primaryDarkBlue}
              type={AGGREGATE}
            />
          </div>
        </div>
      </div>
      <div className='row' style={{ height: 'calc(50vh - 50px)', maxHeight: 500 }}>
        <div className='d-flex flex-column align-items-center col-sm-4 col-md-2 col-lg-2 pb-6'>
          <div className='card p-3' >
            <h4 className='text-center'>Average<br/>mood</h4>
            <AverageValueDisplay
              percentage={Math.floor(Math.random() * 101)}
            />
          </div>
        </div>
        <div className='col-sm-4 col-md-5 col-lg-5'>
          <div className='card chart-small'>
            {data && < ChartToggler
              frames={frames}
              dataType={'attentionScore'}
              data={data.framesArray}
              accuracy={accuracy}
              isBarChartOnInit={true}
              type={ATTENTION}
              color={colors.primaryRed}
              isThumbnail={true}
            />}
          </div>
        </div>
        <div className='col-sm-4 col-md-5 col-lg-5 '>
          <div className='card chart-small'>
            {data && <ChartToggler
              frames={frames}
              dataType={'moodScore'}
              data={data.framesArray}
              accuracy={accuracy}
              isBarChartOnInit={false}
              type={MOOD}
              color={colors.primaryGreen}
              isThumbnail={true}
            />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

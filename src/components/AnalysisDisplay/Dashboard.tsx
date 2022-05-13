import React from 'react';

import './dashboard.css';
import MixedChart from './MixedChart/MixedChart';
import { colors } from './colors';
import AverageValueDisplay from './AverageValueDisplay/AverageValueDisplay';
import { AGGREGATE, ATTENTION, MOOD } from './constants';
import ChartToggler from './ChartToggler/ChartToggler';
import { useLocation, useNavigate } from 'react-router-dom';
import { todoType } from '../../types';

const Dashboard = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const { accuracy, data }: todoType = location.state;

  const toggleView = () => {
    navigate('/detailed', {state:{ accuracy, data }});
  };

  return (
    <div className='container-fluid px-4 mt-3 '>
      <div className='row d-flex' style={{ height: 'calc(50vh - 50px)', maxHeight: 500 }}>
        <div className='d-flex flex-column align-items-center col-sm-4 col-md-3 col-lg-2' >
          <div className="btn-group d-flex mb-2" >
            <button className={'p-1 py-2 mb-0 btn btn-primary shadow-none toggle-view-btn'} type="button" style={{background: colors.headers}}>Dashboard</button>
            <button className={'p-1 py-2 mb-0 btn btn-primary shadow-none toggle-view-btn'} onClick={toggleView} type="button" style={{background: colors.headers}}>Detailed</button>
          </div>
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
        <div className='col-sm-4 col-md-5 col-lg-5'>
          <div className='card chart-small'>
            {data && <ChartToggler
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

import React, {useState} from 'react';
import Toast from 'react-bootstrap/Toast';

import MixedChart from '../../Charts/MixedChart/MixedChart';
import { colors } from '../../../colors';
import AverageValueDisplay from '../../Charts/AverageValueDisplay/AverageValueDisplay';
import { AGGREGATE, ATTENTION, BASE_URL, MOOD } from '../../../constants';
import ChartToggler from '../../Charts/ChartToggler/ChartToggler';
import { todoType } from '../../../types';
import TimeIcon from '../../../assets/icons/TimeIcon.svg';
import VideoIcon from '../../../assets/icons/VideoIcon.svg';
import CalendarIcon from '../../../assets/icons/CalendarIcon.svg';
import CopyLinkIcon from '../../../assets/icons/CopyLinkIcon.svg';
import HelpTooltip from '../../HelpTooltip/HelpTooltip';
import { niceDuration, niceDate, capitalise } from './utils';
import { aggregateHelp, attentionHelp, moodHelp } from '../../../constants';

const Dashboard = ({ data }: todoType) => {

  const [showToast, setShowToast] = useState(false);

  const handleShareLink = () => {
    const linkToShare = `${BASE_URL}analysis/${data.videoId}`;
    navigator.clipboard.writeText(linkToShare);
    setShowToast(true);
  };

  return (
    <div className='container-fluid px-4 mt-3' style={{ height: 'calc(100vh - 130px)'}}>
      <div className='row pb-2' style={{ height: '50%' }}>
        <div className='fill-height col-sm-8 col-md-9 col-lg-10'>
          <div className='card chart-small' style={{ paddingBottom: 25 }}>
            <div className='help-button-container help-button-container-big-chart'>
              <HelpTooltip
                placement='right'
                header={<>{aggregateHelp.header}</>}
                body={<>{aggregateHelp.body}</>}
              />
            </div>
            <MixedChart
              data={data.framesArray}
              accuracy={data.accuracy}
              isThumbnail={true}
              color={colors.primaryDarkBlue}
              type={AGGREGATE}
            />
          </div>
        </div>
        <div className='col-sm-4 col-md-3 col-lg-2 '>
          <div className='card d-flex flex-column justify-content-around pb-4 font-weight-bolder'>
            <div className='d-flex gap-3'>
              <img src={VideoIcon} className='dashboard-icon'/>
              <span>{capitalise(data.videoName)}</span>
            </div>
            <div className='d-flex gap-3'>
              <img src={TimeIcon} className='dashboard-icon'/>
              <span>{niceDuration(data.duration)}</span>
            </div>
            <div className='d-flex gap-3'>
              <img src={CalendarIcon} className='dashboard-icon'/>
              <span>{niceDate(data.videoDate)}</span>
            </div>
            <div className='d-flex gap-3 d-flex justify-content-center'>
              <button className='btn copy-link-btn mb-0 d-flex gap-3 d-flex justify-content-center align-items-center' onClick={handleShareLink}>
                <img src={CopyLinkIcon} className='dashboard-icon'/>
                <span>Share Analysis</span>
              </button>
              <div className='copy-link-toast'>
                <Toast onClose={() => setShowToast(false)} show={showToast} delay={2000} autohide>
                  <Toast.Header style={{
                    backgroundColor: '#34556e',
                    color: 'white',
                    borderRadius: '0 0 8px 8px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    height: 30,
                  }}>
                    <strong>Link copied!</strong>
                  </Toast.Header>
                </Toast>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='row pt-2 pb-2' style={{ height: '50%' }}>
        <div className='col-6 fill-height'>
          <div className='row card d-flex flex-row me-1 ms-0'>
            <div className='help-button-container'>
              <HelpTooltip
                placement='right'
                header={<>{attentionHelp.header}</>}
                body={<>{attentionHelp.body}</>}
              />
            </div>
            <div className='col-2 d-flex flex-column align-items-center ps-2 pt-4' style={{ flex: 1, justifyContent: 'center' }}>
              <h4 className='text-center fs-6'>Average</h4>
              <AverageValueDisplay
                percentage={Number((data.averages.attentionAverage * 100).toFixed(0))}
              />
              <div className='mt-3'>
                <div className='d-flex justify-content-between gap-3'>
                  <h4 className='fs-6 text-start'>Max: </h4>
                  <h4 className='fs-6 text-end'>{(data.peaks.attentionPeak * 100).toFixed(0)}%</h4>
                </div>
                <div className='d-flex gap-3'>
                  <h4 className='fs-6 text-start'>Min: </h4>
                  <h4 className='fs-6 text-end'>{(data.valleys.attentionValley * 100).toFixed(0)}%</h4>
                </div>
              </div>
            </div>
            <div className='col-10 chart-small single-chart-small' style={{ flex: 4 }}>
              {data && < ChartToggler
                dataType={'attentionScore'}
                data={data.framesArray}
                accuracy={data.accuracy}
                isBarChartOnInit={true}
                type={ATTENTION}
                color={colors.primaryRed}
                isThumbnail={true}
              />}
            </div>
          </div>
        </div>
        <div className='col-6 fill-height'>
          <div className='row card d-flex flex-row ms-1 me-0' >
            <div className='help-button-container'>
              <HelpTooltip
                placement='top'
                header={<>{moodHelp.header}</>}
                body={<>{moodHelp.body}</>}
              />
            </div>
            <div className='col-2 d-flex flex-column align-items-center ps-2 pt-4' style={{ flex: 1, justifyContent: 'center' }}>
              <h4 className='text-center fs-6'>Average</h4>
              <AverageValueDisplay
                percentage={Number((data.averages.moodAverage * 100).toFixed(0))}
              />
              <div className='mt-3'>
                <div className='d-flex justify-content-between gap-3'>
                  <h4 className='fs-6 text-start'>Max: </h4>
                  <h4 className='fs-6 text-end'>{(data.peaks.moodPeak * 100).toFixed(0)}%</h4>
                </div>
                <div className='d-flex gap-3'>
                  <h4 className='fs-6 text-start'>Min: </h4>
                  <h4 className='fs-6 text-end'>{(data.valleys.moodValley * 100).toFixed(0)}%</h4>
                </div>
              </div>
            </div>
            <div className='col-10 chart-small single-chart-small' style={{ flex: 4 }}>
              {data && <ChartToggler
                dataType={'moodScore'}
                data={data.framesArray}
                accuracy={data.accuracy}
                isBarChartOnInit={false}
                type={MOOD}
                color={colors.primaryGreen}
                isThumbnail={true}
              />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

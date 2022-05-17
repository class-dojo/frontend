import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import { colors } from '../../colors';
import { todoType } from '../../types';
import Dashboard from './Dashboard/Dashboard';
import DetailedView from './DetailedView/DetailedView';
import './analysis.css';
import useWindowDimensions from '../../utils/useWindowDimensions';
import { DataAnalysis } from '../UploadVideo/types';
import { getAnalysisRecord } from '../../services/backendService';


const Analysis = () => {

  const { width } = useWindowDimensions();

  const location = useLocation();
  const params = useParams();

  const [data, setData] = useState<DataAnalysis>();

  const [isDesktop, setIsDesktop] = useState(width >= 768);
  const [isInDashboard, setIsInDashboard] = useState(isDesktop);

  useEffect(() => {
    if (location.state) {
      const analysisData = location.state as DataAnalysis;
      setData(analysisData);
    } else {
      getAnalysisRecord(params.videoId as string).then(data => {
        setData(data);
      });
    }
  }, []);

  useEffect(() => {
    setIsDesktop(width >= 768);
  }, [width]);

  useEffect(() => {
    if (width < 768) {
      setIsInDashboard(false);
    }
  }, [width]);

  const toggleView = (event: todoType) => {
    if (!event.target.className.split(' ').includes('selected')) {
      setIsInDashboard(!isInDashboard);
    }
  };

  return (
    <div>
      {data && isDesktop && <div className="analysis-tab-container mb-2">
        <button className={`py-2 mb-0 btn btn-primary shadow-none tab-button ${isInDashboard ? '' : 'not-selected-tab'}` }  onClick={toggleView} type="button" style={{background: colors.headers, borderRadius: 0}}>Dashboard</button>
        <button className={`py-2 mb-0 btn btn-primary shadow-none tab-button ${isInDashboard ? 'not-selected-tab' : ''}` }  onClick={toggleView} style={{background: colors.headers, borderRadius: 0}}>Detailed</button>
      </div>}
      {data && isDesktop && isInDashboard &&
        <Dashboard
          data={data}
        />
      }
      {data && !isInDashboard &&
        <DetailedView
          data={data}
        />
      }
    </div>
  );
};

export default Analysis;

import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { colors } from '../../colors';
import { todoType } from '../../types';
import Dashboard from './Dashboard/Dashboard';
import DetailedView from './DetailedView/DetailedView';
import './analysis.css';
import useWindowDimensions from '../../utils/useWindowDimensions';

const Analysis = () => {

  const { width } = useWindowDimensions();

  const location = useLocation();
  const { accuracy, data }: todoType = location.state;

  const [isDesktop, setIsDesktop] = useState(width >= 768);
  const [isInDashboard, setIsInDashboard] = useState(isDesktop);

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
      {isDesktop && <div className="analysis-tab-container mb-2">
        <button className={`py-2 mb-0 btn btn-primary shadow-none tab-button ${isInDashboard ? '' : 'not-selected-tab'}` }  onClick={toggleView} type="button" style={{background: colors.headers, borderRadius: 0}}>Dashboard</button>
        <button className={`py-2 mb-0 btn btn-primary shadow-none tab-button ${isInDashboard ? 'not-selected-tab' : ''}` }  onClick={toggleView} style={{background: colors.headers, borderRadius: 0}}>Detailed</button>
      </div>}
      {isDesktop && isInDashboard &&
        <Dashboard
          accuracy={accuracy}
          data={data}
        />
      }
      {!isInDashboard &&
        <DetailedView
          accuracy={accuracy}
          data={data}
        />
      }
    </div>
  );
};

export default Analysis;

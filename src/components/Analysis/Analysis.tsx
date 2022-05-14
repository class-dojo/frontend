import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

import { colors } from '../../colors';
import { todoType } from '../../types';
import Dashboard from './Dashboard/Dashboard';
import DetailedView from './DetailedView/DetailedView';
import './analysis.css';

const Analysis = () => {

  const location = useLocation();
  const { accuracy, data }: todoType = location.state;

  const [isInDashboard, setIsInDashboard] = useState(true);

  const toggleView = (event: todoType) => {
    if (!event.target.className.split(' ').includes('selected')) {
      setIsInDashboard(!isInDashboard);
    }
  };

  return (
    <div>
      <div className="analysis-tab-container mb-2">
        <button className={`py-2 mb-0 btn btn-primary shadow-none tab-button ${isInDashboard ? 'selected' : 'not-selected'}` }  onClick={toggleView} type="button" style={{background: colors.headers, borderRadius: 0}}>Dashboard</button>
        <button className={`py-2 mb-0 btn btn-primary shadow-none tab-button ${isInDashboard ? 'not-selected' : 'selected'}` }  onClick={toggleView} style={{background: colors.headers, borderRadius: 0}}>Detailed</button>
      </div>
      {isInDashboard &&
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

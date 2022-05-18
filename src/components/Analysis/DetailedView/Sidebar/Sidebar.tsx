import React, { MouseEventHandler } from 'react';

import './sidebar.css';
import { ReactComponent as AggregateIcon } from '../../../../assets/icons/AggregateIcon.svg';
import { ReactComponent as MoodIcon } from '../../../../assets/icons/MoodIcon.svg';
import { ReactComponent as AttentionIcon } from '../../../../assets/icons/AttentionIcon.svg';
import { ReactComponent as HeadcountIcon } from '../../../../assets/icons/HeadcountIcon.svg';
import { AGGREGATE, ATTENTION, HEADCOUNT, MOOD } from '../../../../constants';

type SidebarProps = {
  handleAggregateClick: MouseEventHandler<HTMLElement>;
  handleAttentionClick: MouseEventHandler<HTMLElement>;
  handleMoodClick: MouseEventHandler<HTMLElement>;
  handleHeadcountClick: MouseEventHandler<HTMLElement>;
  currentSelectedIcon: string;
}

const Sidebar = ({ handleAggregateClick, handleAttentionClick, handleMoodClick, handleHeadcountClick, currentSelectedIcon }: SidebarProps) => {

  return (
    <div className="l-navbar" id="nav-bar">
      <nav className="nav">
        <div>
          <div className="nav_list">
            <a className={`nav_link ${currentSelectedIcon === AGGREGATE ? 'active' : ''}`} onClick={handleAggregateClick}>
              <AggregateIcon
                fill='white'
                className='bx bx-grid-alt nav_icon'
              />
            </a>
            <a className={`nav_link ${currentSelectedIcon === ATTENTION ? 'active' : ''}`} onClick={handleAttentionClick}>
              <AttentionIcon
                fill='white'
                className='bx bx-grid-alt nav_icon'
              />
            </a>
            <a className={`nav_link ${currentSelectedIcon === MOOD ? 'active' : ''}`} onClick={handleMoodClick}>
              <MoodIcon
                fill='white'
                className='bx bx-grid-alt nav_icon'
              />
            </a>
            <a className={`nav_link ${currentSelectedIcon === HEADCOUNT ? 'active' : ''}`} onClick={handleHeadcountClick}>
              <HeadcountIcon
                fill='white'
                className='bx bx-grid-alt nav_icon'
              />
              {/* <span className="nav_name">HC</span> */}
            </a>
          </div>

        </div>
      </nav>
    </div>
  );
};

export default Sidebar;

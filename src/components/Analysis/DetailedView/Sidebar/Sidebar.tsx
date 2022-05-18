import React, { MouseEventHandler } from 'react';

import './sidebar.css';
import { ReactComponent as AggregateIcon } from '../../../../assets/icons/AggregateIcon.svg';
import { ReactComponent as MoodIcon } from '../../../../assets/icons/MoodIcon.svg';
import { ReactComponent as AttentionIcon } from '../../../../assets/icons/AttentionIcon.svg';
import { ReactComponent as HeadcountIcon } from '../../../../assets/icons/HeadcountIcon.svg';
import { AGGREGATE, ATTENTION, HEADCOUNT, MOOD } from '../../../../constants';
import { OverlayTrigger, Popover, Tooltip } from 'react-bootstrap';
import { todoType } from '../../../../types';

type SidebarProps = {
  handleAggregateClick: MouseEventHandler<HTMLElement>;
  handleAttentionClick: MouseEventHandler<HTMLElement>;
  handleMoodClick: MouseEventHandler<HTMLElement>;
  handleHeadcountClick: MouseEventHandler<HTMLElement>;
  currentSelectedIcon: string;
}

const Sidebar = ({ handleAggregateClick, handleAttentionClick, handleMoodClick, handleHeadcountClick, currentSelectedIcon }: SidebarProps) => {

  const renderTooltip = (text: string, props: todoType) => (
    <Tooltip id="button-tooltip" {...props}>
      {text}
    </Tooltip>
  );

  return (
    <div className="l-navbar" id="nav-bar">
      <nav className="nav">
        <div>
          <div className="nav_list">
            <a className={`nav_link ${currentSelectedIcon === AGGREGATE ? 'active' : ''}`} onClick={handleAggregateClick}>
              <OverlayTrigger
                placement='right'
                delay={{ show: 250, hide: 400 }}
                overlay={(props) => renderTooltip(AGGREGATE, props)}
              >
                <AggregateIcon
                  fill='white'
                  className='bx bx-grid-alt nav_icon'
                />
              </OverlayTrigger>
            </a>
            <a className={`nav_link ${currentSelectedIcon === ATTENTION ? 'active' : ''}`} onClick={handleAttentionClick}>
              <OverlayTrigger
                placement='right'
                delay={{ show: 250, hide: 400 }}
                overlay={(props) => renderTooltip(ATTENTION, props)}
              >
                <AttentionIcon
                  fill='white'
                  className='bx bx-grid-alt nav_icon'
                />
              </OverlayTrigger>
            </a>
            <a className={`nav_link ${currentSelectedIcon === MOOD ? 'active' : ''}`} onClick={handleMoodClick}>
              <OverlayTrigger
                placement='right'
                delay={{ show: 250, hide: 400 }}
                overlay={(props) => renderTooltip(MOOD, props)}
              >
                <MoodIcon
                  fill='white'
                  className='bx bx-grid-alt nav_icon'
                />
              </OverlayTrigger>
            </a>
            <a className={`nav_link ${currentSelectedIcon === HEADCOUNT ? 'active' : ''}`} onClick={handleHeadcountClick}>
              <OverlayTrigger
                placement='right'
                delay={{ show: 250, hide: 400 }}
                overlay={(props) => renderTooltip(HEADCOUNT, props)}
              >
                <HeadcountIcon
                  fill='white'
                  className='bx bx-grid-alt nav_icon'
                />
              </OverlayTrigger>
              {/* <span className="nav_name">HC</span> */}
            </a>
          </div>

        </div>
      </nav>
    </div>
  );
};

export default Sidebar;

import React from 'react';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { colors } from '../colors';

const getColor = (percentage: number) => {
  if (percentage <= 30) {
    return colors.primaryRed;
  } else if (percentage > 30 && percentage <= 65) {
    return colors.primaryYellow;
  } else {
    return colors.primaryGreen;
  }
};

type AverageValueDisplayProps = {
  percentage: number,
}

const AverageValueDisplay = ({ percentage }: AverageValueDisplayProps) => {

  return (
    <div style={{ maxHeight: 170, maxWidth: 170, minWidth: 140, minHeight: 140 }}>
      <CircularProgressbar
        value={percentage}
        text={`${percentage}%`}
        strokeWidth={4}
        circleRatio={0.75}
        styles={buildStyles({
          rotation: 1 / 2 + 1 / 8,
          strokeLinecap: 'round',
          textSize: '35px',
          pathTransitionDuration: 0.5,
          pathColor: getColor(percentage),
          textColor:  getColor(percentage),
          trailColor: '#d6d6d6',
          backgroundColor: '#3e98c7',
        })}
      />;
    </div>
  );
};

export default AverageValueDisplay;

import React, { useEffect, useRef, useState } from 'react';
import { todoType } from '../../../types';
import ChartToggler from '../../Charts/ChartToggler/ChartToggler';
import { colors } from '../../../colors';
import { AGGREGATE, ATTENTION, HEADCOUNT, MOOD } from '../../../constants';
import MixedChart from '../../Charts/MixedChart/MixedChart';
import Sidebar from './Sidebar/Sidebar';

const useScroll = () => {
  const aggregateRef: todoType = useRef();
  const aggregateScroll = () => aggregateRef.current.scrollIntoView();
  const attentionRef: todoType = useRef();
  const attentionScroll = () => attentionRef.current.scrollIntoView();
  const moodRef: todoType = useRef();
  const moodScroll = () => moodRef.current.scrollIntoView();
  const headcountRef: todoType = useRef();
  const headcountScroll = () => headcountRef.current.scrollIntoView();

  return [aggregateScroll, aggregateRef, attentionScroll, attentionRef, moodScroll, moodRef, headcountScroll, headcountRef];
};

const AnalysisDisplay = ({ data }: todoType) => {

  const [aggregateScroll, aggregateRef, attentionScroll, attentionRef, moodScroll, moodRef, headcountScroll, headcountRef] = useScroll();

  const [scrollPosition, setScrollPosition] = useState(0);
  const [currentSelectedIcon, setCurrentSelectedIcon] = useState(AGGREGATE);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!isScrolling) {
      const scrollPositionWithNavbar = scrollPosition + 105.8 + 20;
      const chartHeight = window.innerHeight - 105.8;

      if (scrollPositionWithNavbar <= chartHeight) {
        setCurrentSelectedIcon(AGGREGATE);
      } else if (scrollPositionWithNavbar > chartHeight && scrollPositionWithNavbar <= 2 * chartHeight) {
        setCurrentSelectedIcon(ATTENTION);
      } else if (scrollPositionWithNavbar > 2 * chartHeight && scrollPositionWithNavbar <= 3 * chartHeight) {
        setCurrentSelectedIcon(MOOD);
      } else {
        setCurrentSelectedIcon(HEADCOUNT);
      }
    }
  }, [scrollPosition]);

  const handleAggregateClick = (): void => {
    setCurrentSelectedIcon(AGGREGATE);
    aggregateScroll();
    setScrollTimeOut();
  };
  const handleAttentionClick = (): void => {
    setCurrentSelectedIcon(ATTENTION);
    attentionScroll();
    setScrollTimeOut();
  };

  const handleMoodClick = (): void => {
    setCurrentSelectedIcon(MOOD);
    moodScroll();
    setScrollTimeOut();
  };

  const handleHeadcountClick = (): void => {
    setCurrentSelectedIcon(HEADCOUNT);
    headcountScroll();
    setScrollTimeOut();
  };

  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  const setScrollTimeOut = () => {
    setIsScrolling(true);
    setTimeout(() => {
      setIsScrolling(false);
    }, 800);
  };

  return (
    <div>
      <Sidebar
        currentSelectedIcon={currentSelectedIcon}
        handleAggregateClick={handleAggregateClick}
        handleAttentionClick={handleAttentionClick}
        handleMoodClick={handleMoodClick}
        handleHeadcountClick={handleHeadcountClick}
      />
      <div className='big-chart-container big-chart-aggregate-container' ref={aggregateRef}>
        <MixedChart
          type={AGGREGATE}
          color={colors.primaryDarkBlue}
          accuracy={data.accuracy}
          data={data.framesArray}
        />
      </div>
      <div className='big-chart-container' ref={attentionRef}>
        <ChartToggler
          dataType={'attentionScore'}
          data={data.framesArray}
          accuracy={data.accuracy}
          isBarChartOnInit={true}
          type={ATTENTION}
          color={colors.primaryRed}
        />
      </div>
      <div className='big-chart-container' ref={moodRef}>
        <ChartToggler
          dataType={'moodScore'}
          data={data.framesArray}
          accuracy={data.accuracy}
          isBarChartOnInit={false}
          color={colors.primaryGreen}
          type={MOOD}
        />
      </div>
      <div className='big-chart-container' ref={headcountRef}>
        <ChartToggler
          dataType={'amountOfPeople'}
          data={data.framesArray}
          accuracy={data.accuracy}
          isBarChartOnInit={true}
          color={colors.primaryPurple}
          type={HEADCOUNT}
        />
      </div>
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

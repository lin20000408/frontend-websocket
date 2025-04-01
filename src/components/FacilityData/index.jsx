import React, { useState, useEffect, useContext } from 'react';
import { Column, Pie } from '@ant-design/plots';
import { Row, Col } from 'antd';
import { MAIN_COLOR, DARKGRAY_COLOR } from '@/constants';
import Icon_Duration from '@/assets/images/common/DurationIcon.svg';
import Icon_Duration_Active from '@/assets/images/common/DurationIcon_Active.svg';
import Icon_Green from '@/assets/images/common/GreenIcon.svg';
import Icon_Green_Active from '@/assets/images/common/GreenIcon_Active.svg';
import Icon_ErrorStatistics from '@/assets/images/common/ErrorStatisticsIcon.svg';
import Icon_ErrorStatistics_Active from '@/assets/images/common/ErrorStatisticsIcon_Active.svg';
import Icon_Search from '@/assets/images/common/SearchIcon.svg';

import { useNavigate } from "react-router-dom";
import { Content } from "@/App";
// css 的模組引入
import styles from "@/css/local.module.css";
const FacilityData = () => {
  const { scaleH, setScaleH, scaleV, setScaleV, isPortrait, setIsPortrait } =
   useContext(Content);

  const [durationIconState, setDurationIconState] = useState(false);
  const [greenIconState, setGreenIconState] = useState(false);
  const [errorStatisticsIconState, setErrorStatisticsIconState] =
    useState(false);
  const [listViewState, setListViewState] = useState(false);
  const [chartState, setChartState] = useState(false);
  const [weekState, setWeekState] = useState(false);
  const [monthState, setMonthState] = useState(false);
  const [yearState, setYearState] = useState(false);
  const [dateRangeState, setDateRangeState] = useState(false);
  const [lifeTimeState, setLifeTimeState] = useState(false);
  const [selectDatesState, setSelectDatesState] = useState(false);

  // const navigate = useNavigate()

  // 直條圖的數據和配置
  const columnData = [
    {
      type: '1-3秒',
      value: 0.16,
    },
    {
      type: '4-10秒',
      value: 0.125,
    },
    {
      type: '11-30秒',
      value: 0.24,
    },
    {
      type: '31-60秒',
      value: 0.19,
    },
    {
      type: '1-3分',
      value: 0.22,
    },
    {
      type: '3-10分',
      value: 0.05,
    },
    {
      type: '10-30分',
      value: 0.01,
    },
    {
      type: '30+分',
      value: 0.015,
    },
  ];

  const paletteSemanticRed = '#F4664A'; // 顏色定義
  const brandColor = '#5B8FF9'; // 顏色定義

  const columnConfig = {
    data: columnData,
    xField: 'type',
    yField: 'value',
    seriesField: '',
    color: ({ type }) => {
      if (type === '10-30分' || type === '30+分') {
        return paletteSemanticRed;
        // return MAIN_COLOR
      }

      if (type === '1-3秒') {
        return MAIN_COLOR;
      }

      if (type === '4-10秒') return DARKGRAY_COLOR;

      return brandColor;
    },
    label: {
      content: (originData) => {
        const val = parseFloat(originData.value);

        if (val < 0.05) {
          return (val * 100).toFixed(1) + '%';
        }
      },
      offset: 10,
    },
    legend: false,
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
  };

  // Pie 圖的數據和配置
  const pieData = [
    {
      type: '分类一',
      value: 27,
    },
    {
      type: '分类二',
      value: 25,
    },
    {
      type: '分类三',
      value: 18,
    },
    {
      type: '分类四',
      value: 15,
    },
    {
      type: '分类五',
      value: 10,
    },
    {
      type: '其他',
      value: 5,
    },
  ];

  const pieConfig = {
    appendPadding: 10,
    data: pieData,
    angleField: 'value',
    colorField: 'type',
    radius: 0.9,
    label: {
      type: 'inner',
      offset: '-30%',
      content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
      style: {
        fontSize: 14,
        textAlign: 'center',
      },
    },
    interactions: [
      {
        type: 'element-active',
      },
    ],
  };

  const initialState = (icon) => {
    setDurationIconState(false);
    setGreenIconState(false);
    setErrorStatisticsIconState(false);

    if (icon === 'Duration') {
      setDurationIconState(true);
      return;
    }
    if (icon === 'Green') {
      setGreenIconState(true);
      return;
    }
    if (icon === 'ErrorStatistics') {
      setErrorStatisticsIconState(true);
      return;
    }
  };

  const initialDateState = (icon) => {
    setDateRangeState(false);
    setWeekState(false);
    setMonthState(false);
    setYearState(false);
    setLifeTimeState(false);
    setSelectDatesState(false);

    if (icon === 'DataRange') {
      setDateRangeState(true);
      return;
    }

    if (icon === 'Week') {
      setWeekState(true);
      return;
    }

    if (icon === 'Month') {
      setMonthState(true);
      return;
    }

    if (icon === 'Year') {
      setYearState(true);
      return;
    }

    if (icon === 'LifeTime') {
      setLifeTimeState(true);
      return;
    }

    if (icon === 'SelectDates') {
      setSelectDatesState(true);
      return;
    }
  };

  const pressDuration = () => {
    console.log('pressDuration');
    initialState('Duration');
  };

  const pressGreen = () => {
    console.log('pressGreen');
    initialState('Green');
  };

  const pressErrorStatistics = () => {
    console.log('pressErrorStatistics');
    initialState('ErrorStatistics');
  };

  const pressListView = () => {
    setListViewState(true);
    setChartState(false);
  };

  const pressChartView = () => {
    setListViewState(false);
    setChartState(true);
  };

  const pressDateRange = () => {
    console.log('pressDataRange');
    initialDateState('DataRange');
  };

  const pressWeek = () => {
    console.log('pressWeek');
    initialDateState('Week');
  };

  const pressMonth = () => {
    console.log('pressMonth');
    initialDateState('Month');
  };

  const pressYear = () => {
    console.log('pressYear');
    initialDateState('Year');
  };

  const pressLifeTime = () => {
    console.log('pressLifeTime');
    initialDateState('LifeTime');
  };

  const pressSelectDates = () => {
    console.log('pressSelectDates');
    initialDateState('SelectDates');
  };

  return (
    <div>
      {/* <div style={{ width: '1063px', height: '600px' }}> */}
      {/* 直式顯示 */}
      {isPortrait ? (
        <div style={{ width: 375 }}>
          <Row
            justify="center"
            style={{ backgroundColor: MAIN_COLOR, textAlign: 'center' }}
          >
            <Col span={12} style={{ textAlign: 'center' }}>
              {/* 三行文字顯示 */}
              <Row justify="center" style={{ textAlign: 'center' }}>
                <Col>Club Green Energy</Col>
              </Row>
              <Row justify="center" style={{ textAlign: 'center' }}>
                <Col>89,177</Col>
              </Row>
              <Row justify="center" style={{ textAlign: 'center' }}>
                <Col>10.960,069,34</Col>
              </Row>
            </Col>

            <Col span={12} style={{ textAlign: 'center' }}>
              {/* 三行文字顯示 */}
              <Row justify="center" style={{ textAlign: 'center' }}>
                <Col>Global Green Energy</Col>
              </Row>
              <Row justify="center" style={{ textAlign: 'center' }}>
                <Col>89,177</Col>
              </Row>
              <Row justify="center" style={{ textAlign: 'center' }}>
                <Col>10.960,069,34</Col>
              </Row>
            </Col>
          </Row>

          <Row justify={'center'} style={{ textAlign: 'center' }}>
            <Col span={11} style={{}}>
              LIST VIEW
            </Col>

            <Col span={2}>{'//'}</Col>

            <Col span={11}>CHART VIEW</Col>
          </Row>

          <div style={{ backgroundColor: '#ffff' }}>
            <Row justify={'center'}>
              <Col span={24} style={{ textAlign: 'center' }}>
                TIME INTERVAL
              </Col>
            </Row>

            <Row>
              <Col span={4}>1 Minutes</Col>
              <Col span={4}>3 Minutes</Col>
              <Col span={4}>5 Minutes</Col>
              <Col span={4}>10 Minutes</Col>
              <Col span={4}> stop loop </Col>
            </Row>

            <Row>
              <Col> Machine Usage in Facility</Col>
            </Row>
            <div style={{ height: 400 }}>
              <Column {...columnConfig} />
            </div>
            <Pie {...pieConfig} />
          </div>
        </div>
      ) : (
        // 橫式顯示
        <div style={{ width: 1607, height: 1384 }}>
          {/* <div> Iam 橫式 facility</div> */}
          <Row justify={'space-between'} style={{ marginTop: 10 }}>
            <Col
              span={3}
              style={{
                fontSize: 25,
                color: listViewState ? MAIN_COLOR : DARKGRAY_COLOR,
              }}
              onClick={pressListView}
            >
              LIST VIEW
            </Col>
            <Col style={{ fontSize: 25 }}> {'/'} </Col>
            <Col
              span={3}
              style={{
                fontSize: 25,
                color: chartState ? MAIN_COLOR : DARKGRAY_COLOR,
              }}
              onClick={pressChartView}
            >
              CHART
            </Col>

            <Col onClick={pressDuration}>
              <img
                src={durationIconState ? Icon_Duration_Active : Icon_Duration}
                alt=""
              />
            </Col>
            <Col
              span={3}
              style={{
                fontSize: 25,
                color: durationIconState ? MAIN_COLOR : DARKGRAY_COLOR,
              }}
              onClick={pressDuration}
            >
              Duration
            </Col>

            <Col onClick={pressGreen}>
              <img
                src={greenIconState ? Icon_Green_Active : Icon_Green}
                alt=""
              />
            </Col>
            <Col
              span={3}
              style={{
                fontSize: 25,
                color: greenIconState ? MAIN_COLOR : DARKGRAY_COLOR,
              }}
              onClick={pressGreen}
            >
              Green
            </Col>

            <Col onClick={pressErrorStatistics}>
              <img
                src={
                  errorStatisticsIconState
                    ? Icon_ErrorStatistics_Active
                    : Icon_ErrorStatistics
                }
                alt=""
              />
            </Col>

            <Col
              span={3}
              style={{
                fontSize: 25,
                color: errorStatisticsIconState ? MAIN_COLOR : DARKGRAY_COLOR,
              }}
              onClick={pressErrorStatistics}
            >
              Error Statistics
            </Col>

            <Col
              span={3}
              style={{
                fontSize: 25,
                width: 254,
                height: 46,
                backgroundColor: '#f2f2f2',
                borderRadius: 5,
                textAlign: 'center',
              }}
            >
              <Row justify={'center'} style={{ fontSize: 20, lineHeight: 2.5 }}>
                <Col>Search Facility </Col>
                <Col style={{ marginLeft: 10 }}>
                  <img src={Icon_Search} alt="" />
                </Col>
              </Row>
            </Col>
          </Row>

          <Row justify={'space-between'}>
            <Col span={3} style={{ fontSize: 25 }}>
              Duration
            </Col>
            <Col
              span={3}
              style={{
                fontSize: 20,
                color: dateRangeState ? MAIN_COLOR : DARKGRAY_COLOR,
              }}
              onClick={pressDateRange}
            >
              DATE RANGE
            </Col>
            <Col
              span={3}
              style={{
                fontSize: 20,
                color: weekState ? MAIN_COLOR : DARKGRAY_COLOR,
              }}
              onClick={pressWeek}
            >
              WEEK
            </Col>
            <Col
              span={3}
              style={{
                fontSize: 20,
                color: monthState ? MAIN_COLOR : DARKGRAY_COLOR,
              }}
              onClick={pressMonth}
            >
              MONTH
            </Col>
            <Col
              span={3}
              style={{
                fontSize: 20,
                color: yearState ? MAIN_COLOR : DARKGRAY_COLOR,
              }}
              onClick={pressYear}
            >
              YEAR
            </Col>
            <Col
              span={3}
              style={{
                fontSize: 20,
                color: lifeTimeState ? MAIN_COLOR : DARKGRAY_COLOR,
              }}
              onClick={pressLifeTime}
            >
              LIFETIME
            </Col>
            <Col
              span={3}
              style={{
                fontSize: 20,
                color: selectDatesState ? MAIN_COLOR : DARKGRAY_COLOR,
              }}
              onClick={pressSelectDates}
            >
              SELECT DATES
            </Col>
          </Row>

          {/* <Column {...columnConfig} /> */}

          <div style={{ height: 400 }}>
            <Column {...columnConfig} />
          </div>
          <div style={{ height: 400 }}>
            <Pie {...pieConfig} />
          </div>
        </div>
      )}
    </div>
  );
};

export default FacilityData;

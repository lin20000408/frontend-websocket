// 有氧系統的即時值
import React, { useEffect, useState, useContext, useRef } from "react";
import { Col, Row, Input, Select } from "antd";
import {
  BACKGROUND_COLOR,
  DARKBLACK_COLOR,
  DARKGRAY_COLOR,
  MAIN_COLOR,
  NAVIBAR_SIZE,
} from "@/constants";

import { useNavigate } from "react-router-dom";
import { Content } from "@/App";
// css 的模組引入
import styles from "@/css/local.module.css";
export default function RealtimeCardio(props) {
  const workoutData = JSON.parse(sessionStorage.getItem("realTimeWorkout"))
    ? JSON.parse(sessionStorage.getItem("realTimeWorkout"))
    : {
        // 如果機台沒有連線我是得不到這個值的,所以必須有初值
        //device program
        devType: "01-Treadmill",
        timeInterval: "1",
        //realtime data
        heartRate: "0",
        speed: "10",
        calories: "2",
        distance: "3",
        time: "1:54",
        //?
        humanWatt: "1",
        energy: "23",
        //scale
        speedScale: "1-x1/10Km/h",
        caloriesScale: "2-x1Kcal",
        humanWatts_EnergyScale: "2-x1",
        timeScale: "1",   //?
     
        distanceScale: "0-x1/100Km",
        //unit
        speedUnit: "0-km/hour", 
        timeUnit: "0-Second", //?
        distanceUnit: "1-Km",
        humanWatts_EnergyUnit: "0-Watt",
      };
  // console.log("進入logCardio..................................");
  const {
    setCurrentSub1Screen,
    activeScreen,
    setActiveScreen,
    setCurrentScreen,
    currentSub1Screen,
  } = useContext(Content);
  const { scaleV } = useContext(Content);

  /**
   * 作用:     // 將ISO 8601格式的日期時間轉換為Date對象
   * 但它必須轉成系統的時差
   * @param {*} isoDate
   * @returns formattedDate
   */

  function convertDateFormat(isoDate) {
    // 將ISO 8601格式的日期時間轉換為Date對象
    var date = new Date(isoDate);

    // 獲取日期、月份和年份
    var day = date.getDate();
    var month = date.getMonth() + 1; // 月份是從0開始的，所以需要加1
    var year = date.getFullYear();

    // 將日期、月份和年份組合成所需的格式
    var formattedDate =
      (day < 10 ? "0" : "") +
      day +
      "/" +
      (month < 10 ? "0" : "") +
      month +
      "/" +
      year;

    return formattedDate;
  } //2025-03-11T06:40:39.073Z ->"11/03/2025"

  useEffect(() => {
    /**
     * 還取原先 sessionStorage的值
     * 用currentSub1Screen = 'quickConnectRealTimeMonitorScreen' 覆將原來的currentSub1Screen 的值
     * 用回存到流灠器的 sessionStorage用
     */
    let data = sessionStorage.getItem("sauser_currentScreen");
    let dataObj = JSON.parse(data || "{}");
    let newDataObj = {
      ...dataObj,
      currentSub1Screen: "quickConnectRealTimeMonitorScreen",
      caridioState: "true",
    };
    sessionStorage.setItem("sauser_currentScreen", JSON.stringify(newDataObj));
  }, []);

 

  const pressEnd = () => {
    // 先回到Scan QR code 的主頁後續再跳回
    setCurrentSub1Screen("quickConnectHomeScreen");
  };

  // 函数用于计算元素到视口底部的距离
  const elementRef = useRef(null);
  const [distanceToBottom, setDistanceToBottom] = useState(0);
  useEffect(() => {
    // 函数用于计算元素到视口底部的距离
    const calculateDistanceToBottom = () => {
      if (elementRef.current) {
        const elementRect = elementRef.current.getBoundingClientRect();
        const distance = window.innerHeight - elementRect.bottom;
        setDistanceToBottom(distance);
      }
    };
    // 初始化计算一次距离
    calculateDistanceToBottom();
  }, []);
  //original data change to showing data
  //? Metric 長度 重量 速度有關息
  //const imperialOrMetric = workoutData.unitType.split("-")[1];
  //km mi & kg lb

  const devType = workoutData.devType.split("-")[1]; // GreenBike
  //input data
  //!distance km
  //0-x1/100Km->1/100 
    const match = workoutData.distanceScale.match(/\d+\/\d+/);
  const fraction = match ? match[0] : "";
  // distanceScale轉換成數值
  const distanceScale = fraction
    ? fraction.split("/").reduce((a, b) => a / b)
    : NaN;
    //value*scale
  const distanceShow = workoutData.distance * distanceScale;
  //unit
  const distanceUnit = workoutData.distanceUnit.split("-")[1];; // 或 distanceUnit.slice(2)
  const distance = `${distanceShow} ${distanceUnit}`;
  //!time mm:ss
  const [minutes, seconds] = workoutData.time.split(":");
  const formattedTime = `${minutes}:${seconds.padStart(2, "0")}`;

  const time = `${formattedTime} mm:ss`;
  //!calories kcal
  //?cal/h
  // * 將分:秒 換算成秒來計算為了求Cal/h
  //  * 公式: 3600 / totalSec * calories
  // */
  //unit 2-x1Kcal->Kcal
  const caloriesMatch = workoutData.caloriesScale.match(/x1([A-Za-z]+)/);
  const caloriesUnit = caloriesMatch ? caloriesMatch[1] : "";
  const calories = `${workoutData.calories}  ${caloriesUnit}`;
  //!speed kph
//scale 1-x1/10Km/h->1/10  
const speedMatch = workoutData.speedScale.match(/\d+\/\d+/);
  const speedFraction = speedMatch ? speedMatch[0] : "";
  // distanceScale轉換成數值
  const speedScale = speedFraction
    ? speedFraction.split("/").reduce((a, b) => a / b)
    : NaN;
  console.log(speedScale);

  const speedShow = (workoutData.speed * speedScale).toFixed(1);
  console.log(speedShow);
//unit 
const speedMatchunit = workoutData.speedUnit.match(/-\s*([A-Za-z\/]+)/);
const speedUnit = speedMatchunit  ?speedMatchunit [1] : "";
  const speed = `${speedShow} ${speedUnit}`;
  //!heartRate bpm 
  const heartRate = `${workoutData.heartRate} bpm`;

  //?其他有在顯示 hiddle
  const incline = workoutData.incline ? `${workoutData.incline} %` : undefined;
  //humanwatt  & energy
  const humanWattsMatch = workoutData.humanWatts_EnergyScale.match(/\d+$/);
  //2-x1->1
const humanWattsMatchValue = humanWattsMatch ? humanWattsMatch[0] : "";
//unit
const humanWattsUnitMatch = workoutData.humanWatts_EnergyUnit.match(/-\s*([A-Za-z]+)/);
const humanWattsUnitMatchunit = humanWattsUnitMatch ? humanWattsUnitMatch[1] : "";
  const mechanicalEnergy = workoutData.humanWatt
    ? `${(workoutData.humanWatt*humanWattsMatchValue)} ${humanWattsUnitMatchunit}`
    : undefined;
  const greenEnergy = workoutData.energy
    ? `${workoutData.energy*humanWattsMatchValue} ${humanWattsUnitMatchunit}`
    : undefined;
  const data = [
    { x: "Distance", y: distance },
    { x: "Speed", y: speed },
    { x: "Duration", y: time },
    { x: "Calories", y: calories },
    { x: "HeartRate", y: heartRate },
    { x: "Incline", y: incline },
    { x: "GreenEnergy", y: greenEnergy },
    { x: "mechanicalEnergy", y: mechanicalEnergy },
  ];
  // 篩選掉沒有 y 值的項目
  const filteredData = data.filter(
    (item) => item.y !== undefined && item.y !== null,
  );

  return (
    <div style={{ fontSize: "16rem", textAlign: "center" }}>
      <Row className="mt-[100rem] justify-center text-[22rem] font-bold">
        TRAINING PROGRESS
      </Row>
      <Row className=" mb-[10rem] justify-center text-[16rem]">
        Machine Type:{devType}
      </Row>
      <div className="text-[16rem]">
        <div className="flex flex-wrap justify-around">
          {filteredData.map((item, index) => (
            <div key={index}>
              <div className="text-[14rem]">{item.x}</div>
              <Input
                variant="borderless"
                maxLength={36}
                style={{
                  textAlign: "center",
                  width: "calc(162rem)",
                  height: "calc(42rem)",
                  border: `2rem solid ${MAIN_COLOR}`,
                }}
                className={`text-[14rem] font-semibold ${styles.signUpInputBigFrame} mb-[20rem] `}
                placeholder="10"
                readOnly
                value={item.y}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center">
        <Col
          style={{
            background: `linear-gradient(to top left, #80c342, #bae642)`,
            border: "2rem solid white",
          }}
          className="
                h-[calc(38.49rem)] w-[calc(160rem)] cursor-pointer text-center text-[calc(20rem)]
              leading-[calc(35rem)] text-white
            
              "
          onClick={pressEnd}
        >
          <span> END</span>
        </Col>
      </div>
    </div>
  );
}

// 上面的MENU 已知有縮放了你這個還要再一次嗎？
// 目前看起來 Menu 並沒有做縮放功能
import React from "react";
import { useEffect, useState, useContext, useRef } from "react";
import { axiosPost, axiosGet } from "@/components/Axios";
import { BACKGROUND_COLOR, DARKBLACK_COLOR, MAIN_COLOR } from "@/constants";
import { Row, Col, Progress } from "antd";
import { GlobalStateContext } from "@/App";
import Icon_Duration from "@/assets/icons/DurationIcon.svg?react";
import Icon_Distance from "@/assets/icons/DistanceIcon.svg?react";
import Icon_Speed from "@/assets/icons/SpeedIcon.svg?react";
import Icon_Workouts from "@/assets/icons/WorkoutsIcon.svg?react";
import Icon_Calories from "@/assets/icons/CaloriesIcon.svg?react";
import Icon_HeartRate from "@/assets/icons/HeartRateIcon.svg?react";
import Icon_WattsGenerated from "@/assets/icons/WattIcon.svg?react";
import Icon_HumanWatts from "@/assets/icons/HumanWattsIcon.svg?react";
import Icon_Goal from "@/assets/icons2/GoalIcon.svg?react";
import Icon_Reps from "@/assets/icons/RepsIcon.svg?react";
import Icon_Weight from "@/assets/icons/WeightIcon.svg?react";

import { useNavigate } from "react-router-dom";
import { Content } from "@/App";
// css 的模組引入
import "@/css/global.css";

import styles from "@/css/local.module.css";

import { NAVIBAR_SIZE } from "../../constants";

import Icon from "@ant-design/icons/lib/components/Icon";
// import axios from "axios";
// import { data } from "autoprefixer";
import WebsiteMaintenance from "@/components/WebsiteMaintenance";
import CardioSummaryCard from "@/components/Dashboard/CardioSummaryCard";
import ProgressGoal from "@/components/Dashboard/ProgressGoal";
const Dashboard = () => {
  const conicColors = { "0%": "#80c342", "100%": "#bae642" };
  const { globalstate } = useContext(GlobalStateContext);
  const {
    retSetUserProfileState,
    setRetSetUserProfileState,

    isBack,
    setIsBack,

    logout,
    setLogout,

    // 按上一頁, 返回鍵在用的

    //  mac.js
    mac,
    setMac,
    macErr,
    setMacErr,
    isLogin,
    // google
    googleSub,
    setGoogleSub,
    googleSubBackup,
    setGoogleSubBackup,
    // instagram
    instagramSub,
    setInstagramSub,
    // instagramSubBackup,
    // setInstagramSubBackup,
    //
    googleState,
    setGoogleState,
    instagramState,
    setInstagramState,

    //
    rebindingState,
    setRebindingState,

    userRegState,
    setUserRegState,
    ws,
    setWs,
    weekData,
    setWeekData,
  } = useContext(Content);

  // 重新渲染背景
  useEffect(() => {
    document.body.style.backgroundColor = BACKGROUND_COLOR;
  }, []);

  const [gap, setGap] = useState(window.innerWidth);
  const [matches, setMatches] = useState(false);

  const countingGap = () => {
    /** 判斷是否<=640rem 的值 */
    if (window.innerWidth <= 640) {
      setMatches(true);
    } else {
      setMatches(false);
    }

    console.log("window.innerWidth =", window.innerWidth);
    for (let i = 1; i <= 9; i++) {
      // -20 是最小預留它就要變化數量n了
      if (window.innerWidth - 20 < 167 * i) {
        let n = i - 1;
        let result = (window.innerWidth - 167 * n) / (n + 1);
        console.log("n =", n);
        console.log("result =", result);
        setGap(result);
        break;
      }
      if (i === 9) {
        let n = i - 1;
        let result = (window.innerWidth - 167 * n) / (n + 1);
        setGap(result);
      }
    }
  };

  // 每30sec 執行一次傳送UserWeekData 使用周的資料
  //   useEffect(() => {
  //     // 第一次進來先執行一次
  //     console.log("userWeekData......");
  //     const res = JSON.stringify({
  //       opCode: "userWeekData",
  //       mac,
  //     });
  //     if (ws) ws.send(res);

  //     // 之後每隔30秒再執行UserWeekData
  //     const t1 = setInterval(() => {
  //       console.log("userWeekData......");
  //       const res = JSON.stringify({
  //         opCode: "userWeekData",
  //         mac,
  //       });
  //       if (ws) ws.send(res);
  //     }, 30000);

  //     return () => {
  //       clearInterval(t1);
  //     };
  //   }, [ws]);

  useEffect(() => {
    // Initial calculation
    countingGap();

    // Add event listener
    window.addEventListener("resize", countingGap);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener("resize", countingGap);
    };
  }, []);

  /**
   * 現在的問題點是         fontFamily: "Proxima_Nova",
   * 必須寫在Col 才能有作用, 寫在Row 卻沒有作用為什麼
   */

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

  const [editDistanceGoalPage, setEditDistanceGoalPage] = useState(false);
  const [editWeightGoalPage, setEditWeightGoalPage] = useState(false);

  const handleEditDistanceGoalClick = () => {
    console.log("Edit Distance Goal clicked");
    setEditDistanceGoalPage(true);
  };

  const handleEditDistanceGoalCancelClick = () => {
    console.log("Edit Distance Goal clicked");
    setEditDistanceGoalPage(false);
  };
  //不確定 save
  const handleEditDistanceGoalSaveClick = () => {
    console.log("Edit Weight Goal clicked");
    setEditWeightGoalPage(true);
  };
  //weight
  const handleEditWeightGoalClick = () => {
    console.log("Edit Weight Goal clicked");
    setEditWeightGoalPage(true);
  };

  const handleEditWeightGoalCancelClick = () => {
    console.log("Edit Weight Goal clicked");
    setEditWeightGoalPage(false);
  };
  //不確定 save
  const handleEditWeightGoalSaveClick = () => {
    console.log("Edit Weight Goal clicked");
    setEditWeightGoalPage(true);
  };
  const [goalType, setGoalType] = useState("duration");
  const handleDurationClick = () => {
    console.log("Calories clicked");
    setGoalType("duration");
  };
  const handleWeightClick = () => {
    console.log("Weight clicked");
    setGoalType("Weight");
  };
  const handleDistanceClick = () => {
    console.log("Calories clicked");
    setGoalType("distance");
  };

  const handleCalroriesClick = () => {
    console.log("Calories clicked");
    setGoalType("calories");
  };
  //getmaintance

  const getMaintenanceNotifier = localStorage.getItem("maintenanceNotifier");
  console.log(getMaintenanceNotifier);
  const [websiteMaintenancePage, setWebsiteMaintenancePage] = useState(false);
  useEffect(() => {
    console.log(isLogin);
    if (isLogin === "success" && getMaintenanceNotifier === "true") {
      //當登入成功到首頁並且需要跳維護通知時顯示

      setWebsiteMaintenancePage(true);
      console.log("success");
    } else if (isLogin === "success" && getMaintenanceNotifier !== "true") {
      setWebsiteMaintenancePage(false);
    }
  }, [isLogin, getMaintenanceNotifier]);
  const goBackLogin = () => {
    setWebsiteMaintenancePage(false);
  };
  console.log(websiteMaintenancePage);
  //當刷新到首頁並且需要跳維護通知時顯示
  const screen = sessionStorage.getItem("sauser_currentScreen");
  console.log(screen);
  useEffect(() => {
    let parsedScreen;
    try {
      // 將 screen 轉換為物件
      parsedScreen = screen ? JSON.parse(screen) : null;
    } catch (error) {
      console.error("無法解析 screen:", error);
    }
    if (
      isLogin === "isRefreshSuccess" &&
      parsedScreen?.currentScreen === "dashboardScreen" &&
      getMaintenanceNotifier === "true"
    ) {
      setWebsiteMaintenancePage(true);
      console.log("success");
    } else if (
      isLogin === "isRefreshSuccess" &&
      parsedScreen?.currentScreen === "dashboardScreen" &&
      getMaintenanceNotifier !== "true"
    ) {
      setWebsiteMaintenancePage(false);
    }
  }, [isLogin, screen, getMaintenanceNotifier]);
  // main-return
  return (
    <div className="z-0   h-dvh  overflow-y-auto bg-[#F5F5F5]">
      {/* editDistanceGoalPage */}
      {websiteMaintenancePage && (
        <WebsiteMaintenance goBackLogin={goBackLogin} />
      )}
      {editDistanceGoalPage && (
        <div className="slide-in-from-bottom flex justify-center">
          <div className="text-[20rem] text-red-500">
            <div className="flex flex-col justify-center pt-[70rem]">
              <div
                className="flex h-[575rem] max-h-[calc((105dvh-140rem))] w-[351rem]  flex-col items-center overflow-auto  border-mainColor bg-[#efefef] text-darkColor "
                style={{ borderWidth: "3rem" }}
              >
                <div
                  className=" mt-[18.8rem] text-[20rem] font-bold text-darkColor  "
                  style={{
                    letterSpacing: "2.5rem",
                    lineHeight: "30rem",
                    height: "31rem",
                  }}
                >
                  EDIT WEEKLY CARDIO GOAL
                </div>
                <div className=" h-[42rem]">
                  <div className=" text-[16rem] font-medium text-darkColor">
                    Week of:
                  </div>
                  <div
                    className="mb-[17.7rem]  text-[16rem] font-medium text-darkColor"
                    style={{ lineHeight: "18rem" }}
                  >
                    June 4, 2003 - June 10, 2023
                  </div>
                </div>

                {/* 內  */}
                <div className="  flex h-[369rem] w-[322rem] flex-col  bg-white pt-[18.3rem] ">
                  <section
                    className="flex justify-center  text-[16rem] text-darkColor"
                    style={{
                      letterSpacing: "2rem",
                      lineHeight: "22rem",
                      height: "29rem",
                    }}
                  >
                    GOAL TYPE
                  </section>
                  {/* 第二列 */}
                  <section className="flex pt-[10rem] ">
                    <section className="flex-1">
                      <div
                        className="flex  items-center justify-center"
                        onClick={handleDurationClick}
                      >
                        <Icon_Duration
                          stroke={
                            goalType === "duration" ? MAIN_COLOR : "#333f48"
                          }
                          className=" w-[25rem]"
                        />
                      </div>
                      <div
                        style={{
                          color:
                            goalType === "duration" ? MAIN_COLOR : "#333f48",
                          borderBottomColor:
                            goalType === "duration"
                              ? MAIN_COLOR
                              : "transparent",
                          borderBottomStyle:
                            goalType === "duration" ? "solid" : "none",
                          borderBottomWidth:
                            goalType === "duration" ? "2px" : "0",
                          lineHeight: "18rem",
                          height: "24rem",
                        }}
                        className="mb-[8rem] ml-[15rem] mr-[15rem] flex  justify-center  text-[16rem] font-bold"
                      >
                        &nbsp;Duration&nbsp;
                      </div>
                    </section>

                    <section className="flex-1">
                      <div
                        className="flex  items-center justify-center"
                        onClick={handleDistanceClick}
                      >
                        <Icon_Distance
                          stroke={
                            goalType === "distance" ? MAIN_COLOR : "#333f48"
                          }
                          className=" w-[23rem]"
                        />
                      </div>
                      <div
                        style={{
                          color:
                            goalType === "distance" ? MAIN_COLOR : "#333f48",
                          lineHeight: "18rem",
                          height: "24rem",

                          borderBottomColor:
                            goalType === "distance"
                              ? MAIN_COLOR
                              : "transparent",
                          borderBottomStyle:
                            goalType === "distance" ? "solid" : "none",
                          borderBottomWidth:
                            goalType === "distance" ? "2px" : "0",
                        }}
                        className="mb-[8rem] ml-[15rem] mr-[15rem]  flex justify-center  text-[16rem]  font-bold"
                      >
                        Distance
                      </div>
                    </section>

                    <section className="flex-1">
                      <div
                        className="flex  items-center justify-center"
                        onClick={handleCalroriesClick}
                      >
                        <Icon_Calories
                          stroke={
                            goalType === "calories" ? MAIN_COLOR : "#333f48"
                          }
                          className=" w-[22rem]"
                        />
                      </div>
                      <div
                        style={{
                          color:
                            goalType === "calories" ? MAIN_COLOR : "#333f48",
                          lineHeight: "18rem",
                          height: "24rem",
                          borderBottomColor:
                            goalType === "calories"
                              ? MAIN_COLOR
                              : "transparent",
                          borderBottomStyle:
                            goalType === "calories" ? "solid" : "none",
                          borderBottomWidth:
                            goalType === "calories" ? "2px" : "0",
                        }}
                        className="mb-[8rem] ml-[15rem] mr-[15rem] flex justify-center  text-[16rem]   font-bold "
                      >
                        Calories
                      </div>
                    </section>
                  </section>

                  {/*第三列 */}
                  <section>
                    {/* duration */}
                    {goalType === "duration" ? (
                      <div className="flex flex-col ">
                        {/* hours */}
                        <div className="mt-[20rem] flex flex-col">
                          <div className="flex w-full justify-center">
                            <input
                              type="text"
                              placeholder="00"
                              className="flex h-[57.45rem] w-[212rem] items-center border-[3rem] border-mainColor bg-white text-center text-[25rem] font-bold font-semibold   "
                            />
                          </div>
                          <div className="flex w-full justify-center text-[18rem]">
                            Hours
                          </div>
                        </div>
                        {/* minutes */}
                        <div className="mt-[20rem] flex flex-col">
                          <div className="flex w-full justify-center">
                            <input
                              type="text"
                              placeholder="00"
                              className="flex h-[57.45rem] w-[212rem] items-center border-[3rem] border-mainColor bg-white text-center text-[25rem] font-bold font-semibold   "
                            />
                          </div>
                          <div className="flex w-full justify-center text-[18rem] ">
                            Minutes
                          </div>
                        </div>
                      </div>
                    ) : goalType === "distance" ? (
                      <div>
                        <div className="flex w-full justify-center pt-[76.8rem]">
                          <input
                            type="text"
                            placeholder="00"
                            className="flex h-[57.45rem] w-[212rem] items-center border-[3rem] border-mainColor bg-white text-center text-[25rem] font-bold font-semibold   "
                          />
                        </div>
                        <div className="mb-[98.6rem]  flex w-full  justify-center text-[18rem]  text-darkColor">
                          Miles
                        </div>{" "}
                      </div>
                    ) : goalType === "calories" ? (
                      <div>
                        <div className="flex w-full justify-center pt-[76.8rem]">
                          <input
                            type="text"
                            placeholder="00"
                            className="flex h-[57.45rem] w-[212rem] items-center border-[3rem] border-mainColor bg-white text-center text-[25rem] font-bold font-semibold   "
                          />
                        </div>
                        <div className="mb-[98.6rem]  flex w-full  justify-center text-[18rem]  text-darkColor">
                          Kcal
                        </div>{" "}
                      </div>
                    ) : null}
                  </section>
                </div>

                <section className="mb-[25.5rem] mt-[22rem] flex justify-center">
                  <div
                    style={{
                      // 具有漸層色
                      background: `linear-gradient(to top, #80c342, #bae642)`,
                      lineHeight: "1rem",
                    }}
                    className="mr-[23rem]  flex h-[49rem] w-[127rem] items-center justify-center border-[2rem] border-white bg-yellow-500 text-[20rem] font-bold  text-white"
                    onClick={handleEditDistanceGoalSaveClick}
                  >
                    SAVE
                  </div>

                  <div
                    style={{
                      // 具有漸層色
                      background: `linear-gradient(to top, #80c342, #bae642)`,
                      lineHeight: "1rem",
                    }}
                    className="flex  h-[49rem]  w-[127rem] items-center  justify-center border-[2rem] border-white text-[20rem]  font-bold text-white  "
                    onClick={handleEditDistanceGoalCancelClick}
                  >
                    CANCEL
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* editWeightGoalPage */}

      {editWeightGoalPage && (
        <div className="slide-in-from-bottom flex justify-center">
          <div className="text-[20rem] text-red-500">
            <div className="flex flex-col justify-center pt-[70rem]">
              <div className="flex h-[575rem] max-h-[calc((105dvh-140rem))] w-[351rem]  flex-col items-center overflow-auto border-2 border-mainColor bg-[#efefef] text-darkColor ">
                <div
                  className=" pt-[18.8rem] text-[20rem] font-bold text-darkColor  "
                  style={{ letterSpacing: "0.5rem", lineHeight: "30rem" }}
                >
                  EDIT WEEKLY STRENGTH GOAL
                </div>
                <div className=" text-[16rem] font-medium text-darkColor">
                  Week of:
                </div>
                <div
                  className="mb-[17.7rem]  text-[16rem] font-medium text-darkColor"
                  style={{ lineHeight: "18rem" }}
                >
                  June 4, 2003 - June 10, 2023
                </div>

                {/* 內  */}
                <div className="  flex h-[369rem] w-[322rem] flex-col  bg-white pt-[18.3rem] ">
                  <section
                    className="flex justify-center  text-[16rem] text-darkColor"
                    style={{
                      letterSpacing: "2.5rem",
                      lineHeight: "22rem",
                      height: "29rem",
                    }}
                  >
                    GOAL TYPE
                  </section>
                  {/* 第二列 */}
                  <section className="flex pt-[10rem] ">
                    <section className="flex-1">
                      <div
                        className="flex  items-center justify-center"
                        onClick={handleWeightClick}
                      >
                        <Icon_Weight
                          stroke={MAIN_COLOR}
                          className="w-[33.48rem]"
                        />
                      </div>
                      <div
                        style={{
                          color: MAIN_COLOR,
                        }}
                        className="flex justify-center  text-[16rem]  font-bold"
                      >
                        &nbsp;Weight&nbsp;
                      </div>
                    </section>
                  </section>

                  {/*第三列 */}
                  <section className="flex w-full justify-center pt-[76.8rem]">
                    <input
                      type="text"
                      placeholder="00"
                      className="flex h-[57.45rem] w-[212rem] items-center border-[3rem] border-mainColor bg-white text-center text-[25rem] font-bold font-semibold   "
                    />
                  </section>

                  <div className="flex  w-full justify-center pb-[20rem] text-darkColor">
                    Lbs
                  </div>
                </div>

                <section className="mb-[25.5rem] mt-[22rem] flex justify-center">
                  <div
                    style={{
                      // 具有漸層色
                      background: `linear-gradient(to top, #80c342, #bae642)`,
                      lineHeight: "1rem",
                    }}
                    className="mr-[23rem]  flex h-[49rem] w-[127rem] items-center justify-center border-[2rem] border-white bg-yellow-500 text-[20rem] font-bold  text-white"
                    onClick={handleEditWeightGoalSaveClick}
                  >
                    SAVE
                  </div>

                  <div
                    style={{
                      // 具有漸層色
                      background: `linear-gradient(to top, #80c342, #bae642)`,
                      lineHeight: "1rem",
                    }}
                    className="flex  h-[49rem]  w-[127rem] items-center  justify-center border-[2rem] border-white text-[20rem]  font-bold text-white  "
                    onClick={handleEditWeightGoalCancelClick}
                  >
                    CANCEL
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FIXME:一般狀態 沒有修改 */}
      <div
        style={{
          color: "#53565a",
        }}
        // 高度絕對不能設成100% 否則捲動到下面會被切掉
        className=" h-[100%] overflow-y-auto "
      >
        {/* 先把上面的空間佔了 */}
        <div className="flex pt-[calc(57rem)]"></div>
        {/* 真正的內容 */}
        <Row className="flex w-dvw pl-[calc(15rem)] text-mainColor">
          <Col
            className=" mb-[calc(5rem)] flex  text-[calc(16rem)] text-mainColor"
            style={{ letterSpacing: "0.5rem" }}
          >
            {"WEEK OF: JUNE 4, 2023 - JUNE 10, 2023"}
          </Col>
        </Row>

        {/* 橘字 */}
        <Row className=" w-screen justify-start">
          <Col className=" pl-[calc(15rem)]   text-[calc(20rem)] text-orangeColor">
            {"Weekly Cardio Summary"}
          </Col>
        </Row>

        {/* 卡片式排列 */}
        <div className="mb-[20rem] flex justify-center">
          <div className="h-[450rem] w-[350rem]">
            <Row className=" mt-2  flex flex-wrap justify-around" wrap={true}>
              {/* 第一個  Duration*/}

              <CardioSummaryCard
                title={"Duartion"}
                time={weekData.weekDuration}
                content={"Hours : Minutes"}
                icon={Icon_Duration}
                height={37.58}
              />
              {/* 第2個  Distance */}

              <CardioSummaryCard
                title={"Distance"}
                time={weekData.weekDistance}
                content={" Miles"}
                icon={Icon_Distance}
                height={34.82}
              />
              {/* 第3個  Average Speed*/}

              <CardioSummaryCard
                title={"Average Speed"}
                time={weekData.weekAverageSpeed}
                content={" MPH"}
                icon={Icon_Speed}
                height={30.85}
              />
              {/* 第4個  Workouts*/}

              <CardioSummaryCard
                title={"Workouts"}
                time={weekData.weekWorkouts}
                content={"BPM"}
                icon={Icon_Workouts}
                height={33.73}
              />

              {/* 第5個  calories Burned*/}

              <CardioSummaryCard
                title={"Calories Burned"}
                time={weekData.weekCaloriesBurned}
                content={" Kcal"}
                icon={Icon_Calories}
                height={37.19}
              />
              {/* 第6個 Average Heart Rate*/}

              <CardioSummaryCard
                title={"Average Heart Rate"}
                time={weekData.weekAverageHeartRate}
                content={"BPM"}
                icon={Icon_HeartRate}
                height={30.67}
              />
              {/* 第7個 Watts Generated*/}

              <CardioSummaryCard
                title={"Watts Generated"}
                time={weekData.weekWattsGenerated}
                content={"Hours : Minutes"}
                icon={Icon_WattsGenerated}
                height={33.6}
              />
              {/* 第8個 Watts Generated*/}

              <CardioSummaryCard
                title={"HumanWatts"}
                time={375}
                content={"W"}
                icon={Icon_HumanWatts}
                height={34.35}
              />
            </Row>
          </div>
        </div>

        <Row className="mt-[calc(10rem)]">
          <Col
            className="
            pl-[calc(15rem)]
            text-[calc(20rem)] text-orangeColor"
          >
            {"Weekly Cardio Goal"}
          </Col>
        </Row>
        <div className="flex justify-center ">
          <Row className=" flex justify-center   h-[calc(124.5rem)] w-[calc(350rem)]  flex-col  bg-white text-[15rem]">
          <section className=" mb-[25.5rem] mt-[32rem] flex justify-center">
                      <div
                        style={{
                          background: `linear-gradient(to top, #80c342, #bae642)`,
                          lineHeight: "1rem",
                        }}
                        className="flex h-[49rem] w-[207rem] items-center justify-center border-[2rem] border-white text-[20rem] font-bold text-white"
                        onClick={handleEditDistanceGoalClick}
                      >
                        {globalstate === "en" ? (
                          <span> Add Cardio Goal</span>
                        ) : (
                          <span className="font-['Open_Sans']">增加有氧目標</span>
                        )}
                      </div>
                    </section>
          
          </Row>
          
        </div>
        {/* 如果有goal在顯示 並且將原本資料顯示 */}
        {/* <ProgressGoal
          title={"Distance Goal"}
          percent={7 / 10}
          unit={"Miles/km"}
          icon={Icon_Goal}
          handleEditGoalClick={handleEditDistanceGoalClick}
        /> */}

        {/* 畫一條黑斜線 */}
        <Row
          className="mb-[calc(18rem)]  ml-[calc(9.7rem)]    mr-[calc(9.7rem)]
              mt-[calc(18rem)] text-darkColor"
        >
          <Col span={24}>
            {/* 一條斜線使用css實現 */}
            <div
              className={`${styles.diagonalLineBlack} text-darkColor`}
              style={{ fontWeight: "500" }}
            ></div>
          </Col>
        </Row>

        {/* <Row style={{}}>
          <Col
            className="
           
          pl-[calc(16rem)]
          text-[calc(20rem)]
          text-orangeColor
          "
            style={{ lineHeight: "30rem" }}
          >
            {"Weekly Strength Summary"}
          </Col>
        </Row>
        <div className="flex justify-around">
          <div className="w-[350rem]">
            <Row className="mb-[20rem] mt-[calc(3.7rem)] flex flex-wrap justify-around">
              <CardioSummaryCard
                title={"Repetitions"}
                time={weekData.weekWattsGenerated}
                content={"Reps"}
                icon={Icon_Reps}
                height={33.6}
              />
          

              <CardioSummaryCard
                title={"Cummulative Weight"}
                time={375}
                content={"Lbs"}
                icon={Icon_Weight}
                height={33.341}
                fontSize={"14rem"}
              />
            </Row>
          </div>
        </div> */}

        {/* <Row>
          <Col
            className="
            mt-[calc(11.4rem)]
          pl-[calc(16rem)]
          text-[calc(20rem)]
          text-orangeColor
          "
            style={{ lineHeight: "30rem", height: "28.91rem" }}
          >
            {"Weekly Strength Goal"}
          </Col>
        </Row> */}
        {/* <div className="flex justify-center ">
          <Row className=" flex justify-center   h-[calc(124.5rem)] w-[calc(350rem)]  flex-col  bg-white text-[15rem]">
          <section className=" mb-[25.5rem] mt-[32rem] flex justify-center">
                      <div
                        style={{
                          background: `linear-gradient(to top, #80c342, #bae642)`,
                          lineHeight: "1rem",
                        }}
                        className="flex h-[49rem] w-[207rem] items-center justify-center border-[2rem] border-white text-[20rem] font-bold text-white"
                        onClick={handleEditDistanceGoalClick}
                      >
                        {globalstate === "en" ? (
                          <span> Add Strength Goal</span>
                        ) : (
                          <span className="font-['Open_Sans']">增加重量目標</span>
                        )}
                      </div>
                    </section>
          
          </Row>
          
        </div> */}
        {/* <ProgressGoal
          title={" Weight Goal"}
          percent={50 / 100}
          unit={"Lbs"}
          icon={Icon_Goal}
          handleEditGoalClick={handleEditWeightGoalClick}
        /> */}
        <div className="pt-[40rem]"> </div>
      </div>
    </div>
  );
};
export default Dashboard;

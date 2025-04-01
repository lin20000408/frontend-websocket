import { SyncOutlined, UserOutlined } from "@ant-design/icons";
import { axiosPost, axiosGet } from "@/components/Axios";
import { Avatar, Col, Row } from "antd";
import { useContext, useEffect, useRef, useState } from "react";
import { Area, Column } from "@ant-design/plots";

import { v4 as uuidv4 } from "uuid";

import _Dashboard from "@/components/Dashboard";



import Icon_Dashboard from "@/assets/icons/DashboardIcon.svg";

import Icon_WorkoutLog from "@/assets/icons/WorkoutLogIcon.svg";

//
//
// import Icon_Logout from '@/assets/images/common/Logout.svg';
import {
  BACKGROUND_COLOR,
  DARKBLACK_COLOR,
  MAIN_COLOR,
  MEDIUMGRAY_COLOR,
  ORANGE_COLOR
} from "@/constants";

import { Content } from "@/App";
import { useNavigate } from "react-router-dom";
// css 的模組引入
import { NAVIBAR_SIZE } from "../../constants";

import ResultsCardio from "@/components/Results/ResultsCardio";
import ResultsStrengthTime from "@/components/Results/ResultsStrength/ResultsStrengthTime";
import ResultsHistory from "@/components/Results/ResultsHistory";
import ResultsCompetition from "@/components/Results/ResultsCompetition";

const Results = () => {
  // 重新渲染背景
  useEffect(() => {
    document.body.style.backgroundImage = "none";
    document.body.style.backgroundColor = BACKGROUND_COLOR;

  }, []);

  let navigate = useNavigate();
  const [open, setOpen] = useState(false); // 一進來就打開

  const {
    //
    setActiveScreen,

    // Connect
 
    connectState,
    setConnectState,
    currentScreen,
    setCurrentScreen,
    currentSub1Screen,
    setCurrentSub1Screen,
    currentSub2Screen,
    setCurrentSub2Screen,
  } = useContext(Content);

  // console.log('currentScreen [menu] = ', currentScreen)
  // console.log('currentSub1Screen [menu] = ', currentSub1Screen)

  // PWA 偵測到有支援PWA 就是顯示, 並在addBtn 的位置上出現 Install App

  // 觸發 socketio connectState 狀態  **********************
  useEffect(() => {
    if (connectState === "connected") {
      console.log("connect (Login)");
      return () => {};
    }

    if (connectState === "disconnect") {
      console.log("disconnect (Login)");
      return () => {};
    }

    if (connectState === "reconnected") {
      console.log("reconnected  (Login)");
      setConnectState("init");
      // 跳往login 畫面
      setTimeout(() => {
        setActiveScreen("loginScreen");
      }, 10);
      return () => {};
    }

    if (connectState === "error") {
      console.log("Error (Login)");
      setConnectState("init");
      // 跳往error 畫面
      setTimeout(() => {
        // navigate("/wserror");
      });
      return () => {};
    }
  }, [connectState]);



  const pressCardio = () => {
    console.log("pressCardio");
    setOpen(false);

    setCurrentScreen("resultsScreen");
    setCurrentSub1Screen("cardio")
    let p = {   currentScreen: "resultsScreen" ,currentSub1Screen:'cardio'};
    sessionStorage.setItem("sauser_currentScreen", JSON.stringify(p));

    /**
     * 必須判斷目前的所在頁面,如果相同頁面則不做任何變更
     */
    //  console.log ('currentScreen [menu] = ', currentScreen)

    if (currentSub1Screen !== "cardio") {
      // 存路由
      console.log("存路由cardio");
      const stateData = {  currentScreen: "resultsScreen",currentSub1Screen:'cardio' };
      const title = ""; // 页面标题（可选）
      const encodedData = encodeURIComponent(JSON.stringify(stateData));
      const newUrl = `/?data=${encodedData}`; // 新的 URL（可选） 這個會改變名稱
      window.history.pushState(stateData, title, newUrl);
    }
  };

  const pressStrength = () => {
    console.log("pressStrength");
    setOpen(false);

    setCurrentScreen("resultsScreen");
    setCurrentSub1Screen("resultsStrengthTime");
    setCurrentSub2Screen("resultsStrengthToday");
    let p = {   currentScreen: "resultsScreen",
        currentSub1Screen:  "resultsStrengthTime",
        currentSub2Screen:"resultsStrengthToday",};
    sessionStorage.setItem("sauser_currentScreen", JSON.stringify(p));


    if (currentSub1Screen !== "resultsStrengthTime") {
      // 存路由
      console.log("存路由strength");
      const stateData = {    currentScreen: "resultsScreen",
        currentSub1Screen: "resultsStrengthTime",
        currentSub2Screen: "resultsStrengthToday", };
      const title = ""; // 页面标题（可选）
      const encodedData = encodeURIComponent(JSON.stringify(stateData));
      const newUrl = `/?data=${encodedData}`; // 新的 URL（可选） 這個會改變名稱
      window.history.pushState(stateData, title, newUrl);
    }
  };
  const pressHistory = () => {
    console.log("pressHistory");
    setOpen(false);

    setCurrentScreen("resultsScreen");
    setCurrentSub1Screen("history")
    let p = {    currentScreen: "resultsScreen" ,currentSub1Screen:'history'};
    sessionStorage.setItem("sauser_currentScreen", JSON.stringify(p));


    if (currentSub1Screen !== "history") {
      // 存路由
      console.log("存路由history");
      const stateData = {  currentScreen: "resultsScreen",currentSub1Screen:'history' };
      const title = ""; // 页面标题（可选）
      const encodedData = encodeURIComponent(JSON.stringify(stateData));
      const newUrl = `/?data=${encodedData}`; // 新的 URL（可选） 這個會改變名稱
      window.history.pushState(stateData, title, newUrl);
    }
  };
  const pressCompetition = () => {
    console.log("pressCompetition");
    setOpen(false);

    setCurrentScreen("resultsScreen");
    setCurrentSub1Screen("competition")
    let p = {     currentScreen: "resultsScreen" ,currentSub1Screen:'competition'};
    sessionStorage.setItem("sauser_currentScreen", JSON.stringify(p));


    if (currentSub1Screen !== "competition") {
      // 存路由
      console.log("存路由competition");
      const stateData = {  currentScreen: "resultsScreen",currentSub1Screen:'competition', };
      const title = ""; // 页面标题（可选）
      const encodedData = encodeURIComponent(JSON.stringify(stateData));
      const newUrl = `/?data=${encodedData}`; // 新的 URL（可选） 這個會改變名稱
      window.history.pushState(stateData, title, newUrl);
    }
  };
  // 重複了
  // const pressLogout = ()

  return (
    <>
      <div className=" mt-[calc(40rem)] pt-[20rem]">
        <Row
          justify={"space-between"}
          className="mx-[calc(12rem)] mb-[14rem] h-[26rem] w-[354rem]"
        >
          <Col
       
            onClick={pressCardio}
            style={{
              color: currentSub1Screen === "cardio"  ? MAIN_COLOR : "#53565A",
            }}
            className="text-[calc(16rem)] font-bold"
          >
            {" "}
            Cardio{" "}
          </Col>
         
      
          <Col style={{ color: ORANGE_COLOR }} className="text-[calc(20rem)]">
            {"//"}
          </Col>

    
          <Col
            onClick={pressStrength}
            style={{
             color: currentSub1Screen === "resultsStrengthTime" ? MAIN_COLOR : "#53565A",
            }}
             className="text-[calc(16rem)]"
          >
              Strength
          </Col>

          <Col style={{ color: ORANGE_COLOR }} className="text-[calc(20rem)]">
             {"//"}
          </Col>
            <Col  onClick={pressHistory}
           style={{
               color: currentSub1Screen === "history" ? MAIN_COLOR : "#53565A",
             }}
            className="text-[calc(16rem)]"
          >
             History
           </Col>

           <Col style={{ color: ORANGE_COLOR }} className="text-[calc(20rem)]">
             {"//"}
          </Col>

          <Col
           onClick={pressCompetition}
           style={{
              color: currentSub1Screen === "competition" ? MAIN_COLOR : "#53565A",
             }}
          className="text-[calc(16rem)]"
          >
             {"Competition"}
           </Col>
        </Row>
      </div>
  {/* --- --- --- --- --- --- --- --- --- --- --- */}

      <div>
        {currentScreen==='resultsScreen'&&currentSub1Screen === "cardio" && (
          <ResultsCardio  />
        )}

        {currentScreen==='resultsScreen'&& currentSub1Screen=== "resultsStrengthTime" && (
          <ResultsStrengthTime />
        )}
        {currentScreen==='resultsScreen'&&currentSub1Screen === "history" && (
          <ResultsHistory  />
        )}
        {currentScreen==='resultsScreen'&&currentSub1Screen === "competition" && (
          <ResultsCompetition  />
        )}
      </div>
    </>
  );
};
export default Results;

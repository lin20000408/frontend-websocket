import { useState, useContext, useRef, useEffect } from "react";
import EditPowrPage from "@/components/CreateWorkout/CreateWorkoutStepTwo/EditPowrPage";

import { MAIN_COLOR, BACKGROUND_COLOR } from "@/constants";

// 判斷它是手機或桌面流灠器
import { isMobile } from "react-device-detect";

import { Col, Row } from "antd";

import { useNavigate } from "react-router-dom";
import { Content } from "@/App";
// css 的模組引入
import styles from "@/css/local.module.css";

export default function CreateWorkoutStepOne({
  setCreateNewWorkout,
  cancelNewWorkoutClick,
}) {
  const { scaleV, isPortrait } = useContext(Content);
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
    currentSub3Screen,
    setCurrentSub3Screen,
    currentSub4Screen,
    setCurrentSub4Screen,
    backToAddOrEditStepTwo,
    setBackToAddOrEditStepTwo,
    stepOneToTwoWorkoutType,
    setStepOneToTwoWorkoutType,
    workoutbuilderStepTwoId,
    setWorkoutbuilderStepTwoId,
  } = useContext(Content);
  let navigate = useNavigate();

  // 變數最好在前面定義比較好

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

  // 函數當作父傳子組件
  const updateSetCurrentScreen = (newScreen) => {
    setCurrentScreen(newScreen);
  };

  // main-return

  // Select 組件

  const elementRef = useRef(null);
  const realElementRef = useRef(null);
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

  const pressTreadmill = () => {
    console.log("pressTreadmill");

    setStepOneToTwoWorkoutType("treadmill");
    sessionStorage.setItem(
      "stepOneToTwoWorkoutType",
      JSON.stringify("treadmill"),
    );
    setBackToAddOrEditStepTwo("add");
    sessionStorage.setItem(
        "backToAddOrEditStepTwo",
        JSON.stringify("add"),
      );
    setWorkoutbuilderStepTwoId("");
    const newScreenState = {
      currentScreen: "workoutType",
      currentSub1Screen: "createWorkoutStepOne",
      currentSub2Screen: "createWorkoutStepTwo",
    };
    console.log('123');

    setCurrentScreen(newScreenState.currentScreen);
    setCurrentSub1Screen(newScreenState.currentSub1Screen);
    setCurrentSub2Screen(newScreenState.currentSub2Screen);

    // Update sessionStorage and URL
    sessionStorage.setItem(
      "sauser_currentScreen",
      JSON.stringify(newScreenState),
    );
    if (currentSub2Screen !== "createWorkoutStepTwo") {
      
        //不用currentsub2Screen !== "resultsScreen"
    const encodedData = encodeURIComponent(JSON.stringify(newScreenState));
    const newUrl = `/?data=${encodedData}`;
    window.history.pushState(newScreenState, "", newUrl);
      }
   
  };
  const pressElliptical = () => {
    console.log("pressElliptical");
    // setOpen(false);
    setStepOneToTwoWorkoutType("elliptical");
    sessionStorage.setItem(
      "stepOneToTwoWorkoutType",
      JSON.stringify("elliptical"),
    );
    setBackToAddOrEditStepTwo("add");
    sessionStorage.setItem(
        "backToAddOrEditStepTwo",
        JSON.stringify("add"),
      );
    setWorkoutbuilderStepTwoId("");


    const newScreenState = {
      currentScreen: "workoutType",
      currentSub1Screen: "createWorkoutStepOne",
      currentSub2Screen: "createWorkoutStepTwo",
    };
    console.log();

    setCurrentScreen(newScreenState.currentScreen);
    setCurrentSub1Screen(newScreenState.currentSub1Screen);
    setCurrentSub2Screen(newScreenState.currentSub2Screen);

    // Update sessionStorage and URL
    sessionStorage.setItem(
      "sauser_currentScreen",
      JSON.stringify(newScreenState),
    );
    //不用currentsub2Screen !== "resultsScreen"
    const encodedData = encodeURIComponent(JSON.stringify(newScreenState));
    const newUrl = `/?data=${encodedData}`;
    window.history.pushState(newScreenState, "", newUrl);
  };
  const pressCycle = () => {
    console.log("pressCycle");
    // setOpen(false);
    setStepOneToTwoWorkoutType("cycle");
    sessionStorage.setItem(
      "stepOneToTwoWorkoutType",
      JSON.stringify("cycle"),
    );
    setBackToAddOrEditStepTwo("add");
    sessionStorage.setItem(
        "backToAddOrEditStepTwo",
        JSON.stringify("add"),
      );
    setWorkoutbuilderStepTwoId("");
    const newScreenState = {
      currentScreen: "workoutType",
      currentSub1Screen: "createWorkoutStepOne",
      currentSub2Screen: "createWorkoutStepTwo",
    };
    console.log();

    setCurrentScreen(newScreenState.currentScreen);
    setCurrentSub1Screen(newScreenState.currentSub1Screen);
    setCurrentSub2Screen(newScreenState.currentSub2Screen);

    // Update sessionStorage and URL
    sessionStorage.setItem(
      "sauser_currentScreen",
      JSON.stringify(newScreenState),
    );
    //不用currentsub2Screen !== "resultsScreen"
    const encodedData = encodeURIComponent(JSON.stringify(newScreenState));
    const newUrl = `/?data=${encodedData}`;
    window.history.pushState(newScreenState, "", newUrl);
  };
  const pressCrossTrainer = () => {
    console.log("pressCrossTrainer");
    // setOpen(false);
    setStepOneToTwoWorkoutType("crossTrainer");
    sessionStorage.setItem(
      "stepOneToTwoWorkoutType",
      JSON.stringify("crossTrainer"),
    );
    setBackToAddOrEditStepTwo("add");
    sessionStorage.setItem(
        "backToAddOrEditStepTwo",
        JSON.stringify("add"),
      );
    setWorkoutbuilderStepTwoId("");
    const newScreenState = {
      currentScreen: "workoutType",
      currentSub1Screen: "createWorkoutStepOne",
      currentSub2Screen: "createWorkoutStepTwo",
    };
    console.log();

    setCurrentScreen(newScreenState.currentScreen);
    setCurrentSub1Screen(newScreenState.currentSub1Screen);
    setCurrentSub2Screen(newScreenState.currentSub2Screen);

    // Update sessionStorage and URL
    sessionStorage.setItem(
      "sauser_currentScreen",
      JSON.stringify(newScreenState),
    );
    //不用currentsub2Screen !== "resultsScreen"
    const encodedData = encodeURIComponent(JSON.stringify(newScreenState));
    const newUrl = `/?data=${encodedData}`;
    window.history.pushState(newScreenState, "", newUrl);
  };
  const pressRower = () => {
    console.log("pressRower");
    // setOpen(false);
    setStepOneToTwoWorkoutType("rower");
    sessionStorage.setItem(
      "stepOneToTwoWorkoutType",
      JSON.stringify("rower"),
    );
    setBackToAddOrEditStepTwo("add");
    sessionStorage.setItem(
        "backToAddOrEditStepTwo",
        JSON.stringify("add"),
      );
    setWorkoutbuilderStepTwoId("");
    const newScreenState = {
      currentScreen: "workoutType",
      currentSub1Screen: "createWorkoutStepOne",
      currentSub2Screen: "createWorkoutStepTwo",
    };
    console.log();

    setCurrentScreen(newScreenState.currentScreen);
    setCurrentSub1Screen(newScreenState.currentSub1Screen);
    setCurrentSub2Screen(newScreenState.currentSub2Screen);

    // Update sessionStorage and URL
    sessionStorage.setItem(
      "sauser_currentScreen",
      JSON.stringify(newScreenState),
    );
    //不用currentsub2Screen !== "resultsScreen"
    const encodedData = encodeURIComponent(JSON.stringify(newScreenState));
    const newUrl = `/?data=${encodedData}`;
    window.history.pushState(newScreenState, "", newUrl);
  };
  const pressStepper = () => {
    console.log("pressStepper");
    // setOpen(false);
    setStepOneToTwoWorkoutType("stepper");
    sessionStorage.setItem(
      "stepOneToTwoWorkoutType",
      JSON.stringify("stepper"),
    );
    setBackToAddOrEditStepTwo("add");
    sessionStorage.setItem(
        "backToAddOrEditStepTwo",
        JSON.stringify("add"),
      );
    setWorkoutbuilderStepTwoId("");
    const newScreenState = {
      currentScreen: "workoutType",
      currentSub1Screen: "createWorkoutStepOne",
      currentSub2Screen: "createWorkoutStepTwo",
    };
    console.log();

    setCurrentScreen(newScreenState.currentScreen);
    setCurrentSub1Screen(newScreenState.currentSub1Screen);
    setCurrentSub2Screen(newScreenState.currentSub2Screen);

    // Update sessionStorage and URL
    sessionStorage.setItem(
      "sauser_currentScreen",
      JSON.stringify(newScreenState),
    );
    //不用currentsub2Screen !== "resultsScreen"
    const encodedData = encodeURIComponent(JSON.stringify(newScreenState));
    const newUrl = `/?data=${encodedData}`;
    window.history.pushState(newScreenState, "", newUrl);
  };
  //
  // 主程式 main-return 返回點
  return (
    <div
      style={{
        height: `100dvh`, // 這個height可能要有

        width: "100dvw",
        // minWidth:'320rem',

        //  maxWidth:'1024px'
      }}
      className="flex items-center justify-center  "
    >
      {/* 子 */}
      <div
        style={{
          // width: "90%",
          maxHeight: "90%",
          backgroundColor: "#efefef", // 這個不要指定大小要由組件自己去決定
          color: "black",
          textAlign: "center",
          fontSize: "1rem",
          border: `2rem solid ${MAIN_COLOR}`,
          overflowY: "auto",
          overflowX: "hidden",
        }}
        className="flex flex-col items-center justify-start
         "
      >
        <Row justify={"center"}>
          <Col className="mt-[26.3rem] text-[18rem]">CREATE YOUR </Col>
        </Row>

        <Row justify={"center"}>
          <Col className="text-[20rem]">OWN WORKOUT</Col>
        </Row>

        <Row justify={"center"} className="mt-[28.8rem]">
          <Col className="text-[16rem] ">CHOOSE WORKOUT TYPE</Col>
        </Row>

        {/* 第一 */}
        <div className="mx-[22rem] flex items-center justify-evenly gap-x-[20.3rem]">
          <div
            className="flex h-[103rem] w-[131rem]
           items-center justify-center border-[3rem] border-mainColor 
           text-[24rem]
           "
            onClick={pressTreadmill}
          >
            Treadmil
          </div>

          <div
            className="flex h-[103rem] w-[131rem]
         items-center justify-center border-[3rem] border-mainColor 
         text-[24rem]
         "
            onClick={pressElliptical}
          >
            Elliptical
          </div>
        </div>

        {/* 第二 */}
        <div className=" flex items-center justify-evenly gap-x-[20.3rem]">
          <div
            className="flex h-[103rem] w-[131rem]
           items-center justify-center border-[3rem] border-mainColor 
           text-[24rem]
           "
            onClick={pressCycle}
          >
            Cycle
          </div>
          <div
            className="flex h-[103rem] w-[131rem]
         items-center justify-center border-[3rem] border-mainColor 
         text-[24rem]
         "
            onClick={pressCrossTrainer}
          >
            CrossTrainer
          </div>
        </div>

        {/* 第三 */}
        <div className=" flex items-center justify-evenly gap-x-[20.3rem]">
          <div
            className="flex h-[103rem] w-[131rem]
           items-center justify-center border-[3rem] border-mainColor 
           text-[24rem]
           "
            onClick={pressRower}
          >
            Rower
          </div>
          <div
            className="flex h-[103rem] w-[131rem]
         items-center justify-center border-[3rem] border-mainColor 
         text-[24rem]
         "
            onClick={pressStepper}
          >
            Stepper
          </div>
        </div>

        <Row
          justify={"center"}
          style={{ paddingBottom: "19rem", marginTop: "33.2rem" }}
        >
          <Col
            style={{
              width: "127rem",
              height: "49rem",
              border: "2rem solid #fff",
              backgroundColor: MAIN_COLOR,
              lineHeight: "49rem",
              color: "#fff",
              fontSize: "20rem",
            }}
            onClick={cancelNewWorkoutClick}
          >
            CANCEL
          </Col>
        </Row>
      </div>
      <div>
        {currentSub2Screen === "createWorkoutStepTwo" && <EditPowrPage />}
      </div>
    </div>
  );
}

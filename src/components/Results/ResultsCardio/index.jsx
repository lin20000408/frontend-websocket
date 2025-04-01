import { useEffect, useState, useContext, useRef } from "react";
import {
  BACKGROUND_COLOR,
  DARKBLACK_COLOR,
  DARKGRAY_COLOR,
  MAIN_COLOR,
  ORANGE_COLOR,
} from "@/constants";
import { Col, Row } from "antd";
// https://ant-design-charts.antgroup.com/examples/column/basic/#basic
// import { Area, Column } from "@ant-design/plots";
import { Column } from "@antv/g2plot";
import { Content } from "@/App";

// css 的模組引入
import styles from "@/css/local.module.css";

import Icon_DropDownArrow from "@/assets/icons/LanguageDropDownArrow.svg";
import Icon_DownArrowBlack from "@/assets/icons2/DownArrow-Black.svg?react";
import Icon_UpArrowBlack from "@/assets/icons2/UpArrow-Black.svg?react";
import { useNavigate } from "react-router-dom";
import Icon_MoreArrow from "@/assets/icons/MoreArrow.svg";
import { NAVIBAR_SIZE } from "../../../constants";
//CHART
import Duration from "@/components/Results/ResultsCardio/Chart/Duration";
import Distance from "@/components/Results/ResultsCardio/Chart/Distance";
import Calories from "@/components/Results/ResultsCardio/Chart/Calories";
import WattsGenerated from "@/components/Results/ResultsCardio/Chart/WattsGenerated";
import HumanWatts from "@/components/Results/ResultsCardio/Chart/HumanWatts";
import AverageSpeed from "@/components/Results/ResultsCardio/Chart/AverageSpeed";
import AverageHeartRate from "@/components/Results/ResultsCardio/Chart/AverageHeartRate";
//MORE(TODAY)
import CardioDurationTime from "@/components/Results/ResultsCardio/CardioDuration/CardioDurationTime";
import CardioWattsGeneratedTime from "@/components/Results/ResultsCardio/CardioWattsGenerated/CardioWattsGeneratedTime";
import CardioHumanWattsTime from "@/components/Results/ResultsCardio/CardioHumanWatts/CardioHumanWattsTime";
import CardioAverageSpeedTime from "@/components/Results/ResultsCardio/CardioAverageSpeed/CardioAverageSpeedTime";
import CardioAverageHeartRateTime from "@/components/Results/ResultsCardio/CardioAverageHeartRate/CardioAverageHeartRateTime";
import CardioDistanceTime from "@/components/Results/ResultsCardio/CardioDistance/CardioDistanceTime";
import CardioCaloriesTime from "@/components/Results/ResultsCardio/CardioCalories/CardioCaloriesTime";
import { useSearchParams } from "react-router-dom";
const ResultsCardio = () => {
  // 重新渲染背景
  const [searchParams] = useSearchParams();

  useEffect(() => {
    document.body.style.backgroundImage = "none";
    // document.body.style.backgroundColor = BACKGROUND_COLOR;
    document.body.style.color = "backgroundColor";
  }, []);
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
  } = useContext(Content);
  const [durationArrowDirection, setDurationArrowDirection] = useState("down");
  const [distanceArrowDirection, setDistanceArrowDirection] = useState("down");
  const [averageSpeedArrowDirection, setAverageSpeedArrowDirection] =
    useState("down");
  const [averageHeartRateArrowDirection, setAverageHeartRateArrowDirection] =
    useState("down");
  const [caloriesArrowDirection, setCaloriesArrowDirection] = useState("down");
  const [wattsGeneratedArrowDirection, setWattsGeneratedArrowDirection] =
    useState("down");
  const [humanWattsArrowDirection, setHumanWattsArrowDirection] =
    useState("down");

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

  useEffect(() => {
    document.body.style.backgroundImage = "none";
    document.body.style.backgroundColor = BACKGROUND_COLOR;

  }, []);

  const [open, setOpen] = useState(true);
  useEffect(() => {
    const handlePopState = () => {
      setOpen(true); // Set open to true when navigating back
    };

    window.addEventListener('popstate', handlePopState);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);
  //duration
  const handleDurationMore = () => {
    console.log("duration");
    setOpen(false);
    
    setCurrentScreen("resultsScreen");
    setCurrentSub1Screen("cardio");
    setCurrentSub2Screen("durationTime");
    setCurrentSub3Screen("durationToday");

    let p = {
      currentScreen: "resultsScreen",
      currentSub1Screen: "cardio",
      currentSub2Screen: "durationTime",
      currentSub3Screen: "durationToday",
    //   currentSub4Screen: "today",
    };
    sessionStorage.setItem("sauser_currentScreen", JSON.stringify(p));

    if (currentSub2Screen !== "duration") {
      // 存路由
      console.log("存路由duration");
      const stateData = {
        currentScreen: "resultsScreen",
        currentSub1Screen: "cardio",
        currentSub2Screen: "durationTime",
        currentSub3Screen: "durationToday",
        // currentSub4Screen: "today",
      };
      const title = ""; // 页面标题（可选）
      const encodedData = encodeURIComponent(JSON.stringify(stateData));
      const newUrl = `/?data=${encodedData}`; // 新的 URL（可选） 這個會改變名稱
      window.history.pushState(stateData, title, newUrl);
    }
  };
 // Use effect to handle popstate event


  const handleDistanceMore = () => {
    console.log("distance");
    setOpen(false);

    setCurrentScreen("resultsScreen");
    setCurrentSub1Screen("cardio");
    setCurrentSub2Screen("distanceTime");
    setCurrentSub3Screen("distanceToday");

    let p = {
      currentScreen: "resultsScreen",
      currentSub1Screen: "cardio",
      currentSub2Screen: "distanceTime",
      currentSub3Screen: "distanceToday",
    };
    sessionStorage.setItem("sauser_currentScreen", JSON.stringify(p));

    if (currentSub2Screen !== "distance") {
      // 存路由
      console.log("存路由distance");
      const stateData = {
        currentScreen: "resultsScreen",
        currentSub1Screen: "cardio",
        currentSub2Screen: "distanceTime",
        currentSub3Screen: "distanceToday",
      };
      const title = ""; // 页面标题（可选）
      const encodedData = encodeURIComponent(JSON.stringify(stateData));
      const newUrl = `/?data=${encodedData}`; // 新的 URL（可选） 這個會改變名稱
      window.history.pushState(stateData, title, newUrl);
    }
  };

  const handleAverageSpeedMore = () => {
    console.log("averageSpeed");
    setOpen(false);

    setCurrentScreen("resultsScreen");
    setCurrentSub1Screen("cardio");
    setCurrentSub2Screen("averageSpeedTime");
    setCurrentSub3Screen("averageSpeedToday");
    let p = {
      currentScreen: "resultsScreen",
      currentSub1Screen: "cardio",
      currentSub2Screen: "averageSpeedTime",
      currentSub3Screen: "averageSpeedToday",
    };
    sessionStorage.setItem("sauser_currentScreen", JSON.stringify(p));

    if (currentSub2Screen !== "averageSpeed") {
      // 存路由
      console.log("存路由averageSpeed");
      const stateData = {
        currentScreen: "resultsScreen",
        currentSub1Screen: "cardio",
        currentSub2Screen: "averageSpeedTime",
        currentSub3Screen: "averageSpeedToday",
      };
      const title = ""; // 页面标题（可选）
      const encodedData = encodeURIComponent(JSON.stringify(stateData));
      const newUrl = `/?data=${encodedData}`; // 新的 URL（可选） 這個會改變名稱
      window.history.pushState(stateData, title, newUrl);
    }
  };
  const handleCaloriesMore = () => {
    console.log("calories");
    setOpen(false);

    setCurrentScreen("resultsScreen");
    setCurrentSub1Screen("cardio");
    setCurrentSub2Screen("caloriesTime");
    setCurrentSub3Screen("caloriesToday");

    let p = {
      currentScreen: "resultsScreen",
      currentSub1Screen: "cardio",
      currentSub2Screen: "caloriesTime",
      currentSub3Screen: "caloriesToday",
    };
    sessionStorage.setItem("sauser_currentScreen", JSON.stringify(p));

    if (currentSub2Screen !== "calories") {
      // 存路由
      console.log("存路由calories");
      const stateData = {
        currentScreen: "resultsScreen",
        currentSub1Screen: "cardio",
        currentSub2Screen: "caloriesTime",
      currentSub3Screen: "caloriesToday",
      };
      const title = ""; // 页面标题（可选）
      const encodedData = encodeURIComponent(JSON.stringify(stateData));
      const newUrl = `/?data=${encodedData}`; // 新的 URL（可选） 這個會改變名稱
      window.history.pushState(stateData, title, newUrl);
    }
  };
  const handleHumanWattsMore = () => {
    console.log("humanWatts");
    setOpen(false);

    setCurrentScreen("resultsScreen");
    setCurrentSub1Screen("cardio");
    setCurrentSub2Screen("humanWattsTime");
    setCurrentSub3Screen("humanWattsToday");
    let p = {
      currentScreen: "resultsScreen",
      currentSub1Screen: "cardio",
      currentSub2Screen: "humanWattsTime",
      currentSub3Screen: "humanWattsToday",
    };
    sessionStorage.setItem("sauser_currentScreen", JSON.stringify(p));

    if (currentSub2Screen !== "humanWatts") {
      // 存路由
      console.log("存路由humanWatts");
      const stateData = {
        currentScreen: "resultsScreen",
        currentSub1Screen: "cardio",
        currentSub2Screen: "humanWattsTime",
      currentSub3Screen: "humanWattsToday",
      };
      const title = ""; // 页面标题（可选）
      const encodedData = encodeURIComponent(JSON.stringify(stateData));
      const newUrl = `/?data=${encodedData}`; // 新的 URL（可选） 這個會改變名稱
      window.history.pushState(stateData, title, newUrl);
    }
  };
  const handleWattsGeneratedMore = () => {
    console.log("wattsGenerated");
    setOpen(false);

    setCurrentScreen("resultsScreen");
    setCurrentSub1Screen("cardio");
    setCurrentSub2Screen("wattsGeneratedTime");
    setCurrentSub3Screen("wattsGeneratedToday");
    let p = {
      currentScreen: "resultsScreen",
      currentSub1Screen: "cardio",
      currentSub2Screen: "wattsGeneratedTime",
      currentSub3Screen: "wattsGeneratedToday",
    };
    sessionStorage.setItem("sauser_currentScreen", JSON.stringify(p));

    if (currentSub2Screen !== "wattsGenerated") {
      // 存路由
      console.log("存路由wattsGenerated");
      const stateData = {
        currentScreen: "resultsScreen",
        currentSub1Screen: "cardio",
        currentSub2Screen: "wattsGeneratedTime",
        currentSub3Screen: "wattsGeneratedToday",
      };
      const title = ""; // 页面标题（可选）
      const encodedData = encodeURIComponent(JSON.stringify(stateData));
      const newUrl = `/?data=${encodedData}`; // 新的 URL（可选） 這個會改變名稱
      window.history.pushState(stateData, title, newUrl);
    }
  };
  const handleAverageHeartRateMore = () => {
    console.log("averageHeartRate");
    setOpen(false);

    setCurrentScreen("resultsScreen");
    setCurrentSub1Screen("cardio");
    setCurrentSub2Screen("averageHeartRateTime");
    setCurrentSub3Screen("averageHeartRateToday");
    let p = {
      currentScreen: "resultsScreen",
      currentSub1Screen: "cardio",
      currentSub2Screen: "averageHeartRateTime",
      currentSub3Screen: "averageHeartRateToday",
    };
    sessionStorage.setItem("sauser_currentScreen", JSON.stringify(p));

    if (currentSub2Screen !== "averageHeartRate") {
      // 存路由
      console.log("存路由averageHeartRate");
      const stateData = {
        currentScreen: "resultsScreen",
        currentSub1Screen: "cardio",
        currentSub2Screen: "averageHeartRateTime",
        currentSub3Screen: "averageHeartRateToday",
      };
      const title = ""; // 页面标题（可选）
      const encodedData = encodeURIComponent(JSON.stringify(stateData));
      const newUrl = `/?data=${encodedData}`; // 新的 URL（可选） 這個會改變名稱
      window.history.pushState(stateData, title, newUrl);
    }
  };

  return (
    <>
      {open && (
        <div>
          <div
            className="  bg-backgroundColor text-[calc(16rem)] text-darkColor"
            style={{
              height: `calc(100vh)`, // 這個height可能要有
              position: "relative",

              overflow: "auto",
            }}
          >
            {/*duration */}
            <div>
              <Row
                style={{ backgroundColor: "#ffffff" }}
                justify={"space-between"}
                className=" mx-[calc(15rem)] mt-[14rem] flex pt-[5rem] "
              >
                <Col
                  onClick={() => {
                    console.log("click");

                    if (durationArrowDirection === "down") {
                      setDurationArrowDirection("up");
                    } else {
                      setDurationArrowDirection("down");
                    }
                  }}
                  className="flex flex cursor-pointer items-center pl-[6rem] text-[calc(16rem)] "
                >
                  <div className="flex font-bold ">Duration</div>
                  <div className="flex   ">
                    {durationArrowDirection === "down" ? (
                      <Icon_DownArrowBlack className=" flex   w-[calc(15rem)] pl-[calc(5rem)]" />
                    ) : (
                      <Icon_UpArrowBlack className="flex  w-[calc(15rem)]   pl-[calc(5rem)]" />
                    )}
                  </div>
                </Col>

                <Col
                  className="flex  h-[20rem] items-center text-[14rem] text-mainColor "
                  onClick={handleDurationMore}
                >
                  <div className="flex h-[23rem] items-end text-[14rem]">
                    {"More"}
                  </div>

                  <span className="pl-[calc(5rem)] pr-[calc(10rem)] ">
                    {" "}
                    <img
                      src={Icon_MoreArrow}
                      alt=""
                      className="h-[calc(10rem)] w-[calc(10rem)]"
                    />{" "}
                  </span>
                </Col>
              </Row>
              <Row
                style={{
                  display: durationArrowDirection === "up" ? "block" : "none",
                }}
              >
                {" "}
                <Duration />
              </Row>
            </div>

            {/* Distance */}
            <div>
              <Row
                style={{ backgroundColor: "#ffffff" }}
                justify={"space-between"}
                className=" mx-[calc(15rem)] mt-[14rem] flex pt-[5rem] "
              >
                <Col
                  onClick={() => {
                    console.log("click");

                    if (distanceArrowDirection === "down") {
                      setDistanceArrowDirection("up");
                    } else {
                      setDistanceArrowDirection("down");
                    }
                  }}
                  className="flex flex cursor-pointer items-center pl-[6rem] text-[calc(16rem)] "
                >
                  <div className="flex font-bold ">Distance</div>
                  <div className="flex   ">
                    {distanceArrowDirection === "down" ? (
                      <Icon_DownArrowBlack className=" flex   w-[calc(15rem)] pl-[calc(5rem)]" />
                    ) : (
                      <Icon_UpArrowBlack className="flex  w-[calc(15rem)]   pl-[calc(5rem)]" />
                    )}
                  </div>
                </Col>

                <Col
                  className="flex  h-[20rem] items-center text-[14rem] text-mainColor "
                  onClick={handleDistanceMore}
                >
                  <div className="flex h-[23rem] items-end text-[14rem]">
                    {"More"}
                  </div>

                  <span className="pl-[calc(5rem)] pr-[calc(10rem)] ">
                    {" "}
                    <img
                      src={Icon_MoreArrow}
                      alt=""
                      className="h-[calc(10rem)] w-[calc(10rem)]"
                    />{" "}
                  </span>
                </Col>
              </Row>
              <Row
                style={{
                  display: distanceArrowDirection === "up" ? "block" : "none",
                }}
              >
                {" "}
                <Distance />
              </Row>
            </div>

            {/* Average Speed */}

            <div>
              <Row
                style={{ backgroundColor: "#ffffff" }}
                justify={"space-between"}
                className=" mx-[calc(15rem)] mt-[14rem] flex pt-[5rem] "
              >
                <Col
                  onClick={() => {
                    console.log("click");

                    if (averageSpeedArrowDirection === "down") {
                      setAverageSpeedArrowDirection("up");
                    } else {
                      setAverageSpeedArrowDirection("down");
                    }
                  }}
                  className="flex flex cursor-pointer items-center pl-[6rem] text-[calc(16rem)] "
                >
                  <div className="flex font-bold ">AverageSpeed</div>
                  <div className="flex   ">
                    {averageSpeedArrowDirection === "down" ? (
                      <Icon_DownArrowBlack className=" flex   w-[calc(15rem)] pl-[calc(5rem)]" />
                    ) : (
                      <Icon_UpArrowBlack className="flex  w-[calc(15rem)]   pl-[calc(5rem)]" />
                    )}
                  </div>
                </Col>

                <Col
                  className="flex  h-[20rem] items-center text-[14rem] text-mainColor "
                  onClick={handleAverageSpeedMore}
                >
                  <div className="flex h-[23rem] items-end text-[14rem]">
                    {"More"}
                  </div>

                  <span className="pl-[calc(5rem)] pr-[calc(10rem)] ">
                    {" "}
                    <img
                      src={Icon_MoreArrow}
                      alt=""
                      className="h-[calc(10rem)] w-[calc(10rem)]"
                    />{" "}
                  </span>
                </Col>
              </Row>
              <Row
                style={{
                  display:
                    averageSpeedArrowDirection === "up" ? "block" : "none",
                }}
              >
                {" "}
                <AverageSpeed />
              </Row>
            </div>

            {/* Average Heart Rate */}

            <div>
              <Row
                style={{ backgroundColor: "#ffffff" }}
                justify={"space-between"}
                className=" mx-[calc(15rem)] mt-[14rem] flex pt-[5rem] "
              >
                <Col
                  onClick={() => {
                    console.log("click");

                    if (averageHeartRateArrowDirection === "down") {
                      setAverageHeartRateArrowDirection("up");
                    } else {
                      setAverageHeartRateArrowDirection("down");
                    }
                  }}
                  className="flex flex cursor-pointer items-center pl-[6rem] text-[calc(16rem)] "
                >
                  <div className="flex font-bold ">AverageHeartRate</div>
                  <div className="flex   ">
                    {averageHeartRateArrowDirection === "down" ? (
                      <Icon_DownArrowBlack className=" flex   w-[calc(15rem)] pl-[calc(5rem)]" />
                    ) : (
                      <Icon_UpArrowBlack className="flex  w-[calc(15rem)]   pl-[calc(5rem)]" />
                    )}
                  </div>
                </Col>

                <Col
                  className="flex  h-[20rem] items-center text-[14rem] text-mainColor "
                  onClick={handleAverageHeartRateMore}
                >
                  <div className="flex h-[23rem] items-end text-[14rem]">
                    {"More"}
                  </div>

                  <span className="pl-[calc(5rem)] pr-[calc(10rem)] ">
                    {" "}
                    <img
                      src={Icon_MoreArrow}
                      alt=""
                      className="h-[calc(10rem)] w-[calc(10rem)]"
                    />{" "}
                  </span>
                </Col>
              </Row>
              <Row
                style={{
                  display:
                    averageHeartRateArrowDirection === "up" ? "block" : "none",
                }}
              >
                {" "}
                <AverageHeartRate />
              </Row>
            </div>

            {/* Calories */}

            <div>
              <Row
                style={{ backgroundColor: "#ffffff" }}
                justify={"space-between"}
                className=" mx-[calc(15rem)] mt-[14rem] flex pt-[5rem] "
              >
                <Col
                  onClick={() => {
                    console.log("click");

                    if (caloriesArrowDirection === "down") {
                      setCaloriesArrowDirection("up");
                    } else {
                      setCaloriesArrowDirection("down");
                    }
                  }}
                  className="flex flex cursor-pointer items-center pl-[6rem] text-[calc(16rem)] "
                >
                  <div className="flex font-bold ">Calories</div>
                  <div className="flex   ">
                    {caloriesArrowDirection === "down" ? (
                      <Icon_DownArrowBlack className=" flex   w-[calc(15rem)] pl-[calc(5rem)]" />
                    ) : (
                      <Icon_UpArrowBlack className="flex  w-[calc(15rem)]   pl-[calc(5rem)]" />
                    )}
                  </div>
                </Col>

                <Col
                  className="flex  h-[20rem] items-center text-[14rem] text-mainColor "
                  onClick={handleCaloriesMore}
                >
                  <div className="flex h-[23rem] items-end text-[14rem]">
                    {"More"}
                  </div>

                  <span className="pl-[calc(5rem)] pr-[calc(10rem)] ">
                    {" "}
                    <img
                      src={Icon_MoreArrow}
                      alt=""
                      className="h-[calc(10rem)] w-[calc(10rem)]"
                    />{" "}
                  </span>
                </Col>
              </Row>
              <Row
                style={{
                  display: caloriesArrowDirection === "up" ? "block" : "none",
                }}
              >
                {" "}
                <Calories />
              </Row>
            </div>

            {/* Watt Generated */}
            <div>
              <Row
                style={{ backgroundColor: "#ffffff" }}
                justify={"space-between"}
                className=" mx-[calc(15rem)] mt-[14rem] flex pt-[5rem] "
              >
                <Col
                  onClick={() => {
                    console.log("click");

                    if (wattsGeneratedArrowDirection === "down") {
                      setWattsGeneratedArrowDirection("up");
                    } else {
                      setWattsGeneratedArrowDirection("down");
                    }
                  }}
                  className="flex flex cursor-pointer items-center pl-[6rem] text-[calc(16rem)] "
                >
                  <div className="flex font-bold ">WattsGenerated</div>
                  <div className="flex   ">
                    {wattsGeneratedArrowDirection === "down" ? (
                      <Icon_DownArrowBlack className=" flex   w-[calc(15rem)] pl-[calc(5rem)]" />
                    ) : (
                      <Icon_UpArrowBlack className="flex  w-[calc(15rem)]   pl-[calc(5rem)]" />
                    )}
                  </div>
                </Col>

                <Col
                  className="flex  h-[20rem] items-center text-[14rem] text-mainColor "
                  onClick={handleWattsGeneratedMore}
                >
                  <div className="flex h-[23rem] items-end text-[14rem]">
                    {"More"}
                  </div>

                  <span className="pl-[calc(5rem)] pr-[calc(10rem)] ">
                    {" "}
                    <img
                      src={Icon_MoreArrow}
                      alt=""
                      className="h-[calc(10rem)] w-[calc(10rem)]"
                    />{" "}
                  </span>
                </Col>
              </Row>
              <Row
                style={{
                  display:
                    wattsGeneratedArrowDirection === "up" ? "block" : "none",
                }}
              >
                {" "}
                <WattsGenerated />
              </Row>
            </div>

            {/* Human Watts */}

            <div>
              <Row
                style={{ backgroundColor: "#ffffff" }}
                justify={"space-between"}
                className=" mx-[calc(15rem)] mt-[14rem] flex pt-[5rem] "
              >
                <Col
                  onClick={() => {
                    console.log("click");

                    if (humanWattsArrowDirection === "down") {
                      setHumanWattsArrowDirection("up");
                    } else {
                      setHumanWattsArrowDirection("down");
                    }
                  }}
                  className="flex flex cursor-pointer items-center pl-[6rem] text-[calc(16rem)] "
                >
                  <div className="flex font-bold ">HumanWatts</div>
                  <div className="flex   ">
                    {humanWattsArrowDirection === "down" ? (
                      <Icon_DownArrowBlack className=" flex   w-[calc(15rem)] pl-[calc(5rem)]" />
                    ) : (
                      <Icon_UpArrowBlack className="flex  w-[calc(15rem)]   pl-[calc(5rem)]" />
                    )}
                  </div>
                </Col>

                <Col
                  className="flex  h-[20rem] items-center text-[14rem] text-mainColor "
                  onClick={handleHumanWattsMore}
                >
                  <div className="flex h-[23rem] items-end text-[14rem]">
                    {"More"}
                  </div>

                  <span className="pl-[calc(5rem)] pr-[calc(10rem)] ">
                    {" "}
                    <img
                      src={Icon_MoreArrow}
                      alt=""
                      className="h-[calc(10rem)] w-[calc(10rem)]"
                    />{" "}
                  </span>
                </Col>
              </Row>
              <Row
                style={{
                  display: humanWattsArrowDirection === "up" ? "block" : "none",
                }}
              >
                {" "}
                <HumanWatts />
              </Row>
            </div>
          </div>
        </div>
      )}

      <div>
        {currentSub2Screen === "durationTime" && (
          <CardioDurationTime  />
        )}

        {currentSub2Screen === "distanceTime" && (
          <CardioDistanceTime/>
        )}
        {currentSub2Screen === "caloriesTime" && (
          <CardioCaloriesTime />
        )}
        {currentSub2Screen === "averageSpeedTime" && (
          <CardioAverageSpeedTime/>
        )}
        {currentSub2Screen === "averageHeartRateTime" && (
          <CardioAverageHeartRateTime  />
        )}
        {currentSub2Screen === "humanWattsTime" && (
          <CardioHumanWattsTime  />
        )}
        {currentSub2Screen === "wattsGeneratedTime" && (
          <CardioWattsGeneratedTime />
        )}
      </div>
    </>
  );
};

export default ResultsCardio;

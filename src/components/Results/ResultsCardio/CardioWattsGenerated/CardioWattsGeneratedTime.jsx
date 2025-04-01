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
import { Area, Column } from "@ant-design/plots";

import { Content } from "@/App";
// css 的模組引入
import styles from "@/css/local.module.css";

import { NAVIBAR_SIZE } from "../../../../constants";

//time range components
import CardioWattsGeneratedToday from "@/components/Results/ResultsCardio/CardioWattsGenerated/CardioWattsGeneratedToday";
import CardioWattsGeneratedWeek from "@/components/Results/ResultsCardio/CardioWattsGenerated/CardioWattsGeneratedWeek";
import CardioWattsGeneratedMonth from "@/components/Results/ResultsCardio/CardioWattsGenerated/CardioWattsGeneratedMonth";
import CardioWattsGeneratedYear from "@/components/Results/ResultsCardio/CardioWattsGenerated/CardioWattsGeneratedYear";
import CardioWattsGeneratedLifetime from "@/components/Results/ResultsCardio/CardioWattsGenerated/CardioWattsGeneratedLifetime";
import CardioWattsGeneratedSelectDates from "@/components/Results/ResultsCardio/CardioWattsGenerated/CardioWattsGeneratedSelectDates";

const CardioWattsGeneratedTime = () => {
  // 重新渲染背景
  useEffect(() => {
    document.body.style.backgroundImage = "none";
    document.body.style.backgroundColor = BACKGROUND_COLOR;

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
  //   const [open, setOpen] = useState(false); // 一進來就打開
  const pressToday = () => {
    console.log("pressToday");
    // setOpen(false);

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

    if (currentSub3Screen !== "wattsGeneratedToday") {
      // 存路由
      console.log("存路由today");
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
  const pressWeek = () => {
    console.log("pressWeek");
    // setOpen(false);

    setCurrentScreen("resultsScreen");
    setCurrentSub1Screen("cardio");
    setCurrentSub2Screen("wattsGeneratedTime");
    setCurrentSub3Screen("wattsGeneratedWeek");

    let p = {
      currentScreen: "resultsScreen",
      currentSub1Screen: "cardio",
      currentSub2Screen: "wattsGeneratedTime",
      currentSub3Screen: "wattsGeneratedWeek",
    };
    sessionStorage.setItem("sauser_currentScreen", JSON.stringify(p));

    if (currentSub3Screen !== "wattsGeneratedWeek") {
      // 存路由
      console.log("存路由Week");
      const stateData = {
        currentScreen: "resultsScreen",
        currentSub1Screen: "cardio",
        currentSub2Screen: "wattsGeneratedTime",
        currentSub3Screen: "wattsGeneratedWeek",
      };
      const title = ""; // 页面标题（可选）
      const encodedData = encodeURIComponent(JSON.stringify(stateData));
      const newUrl = `/?data=${encodedData}`; // 新的 URL（可选） 這個會改變名稱
      window.history.pushState(stateData, title, newUrl);
    }
  };
  const pressMonth = () => {
    console.log("pressMonth");
    // setOpen(false);

    setCurrentScreen("resultsScreen");
    setCurrentSub1Screen("cardio");
    setCurrentSub2Screen("wattsGeneratedTime");
    setCurrentSub3Screen("wattsGeneratedMonth");

    let p = {
      currentScreen: "resultsScreen",
      currentSub1Screen: "cardio",
      currentSub2Screen: "wattsGeneratedTime",
      currentSub3Screen: "wattsGeneratedMonth",
    };
    sessionStorage.setItem("sauser_currentScreen", JSON.stringify(p));

    if (currentSub3Screen !== "wattsGeneratedMonth") {
      // 存路由
      console.log("存路由Month");
      const stateData = {
        currentScreen: "resultsScreen",
        currentSub1Screen: "cardio",
        currentSub2Screen: "wattsGeneratedTime",
        currentSub3Screen: "wattsGeneratedMonth",
      };
      const title = ""; // 页面标题（可选）
      const encodedData = encodeURIComponent(JSON.stringify(stateData));
      const newUrl = `/?data=${encodedData}`; // 新的 URL（可选） 這個會改變名稱
      window.history.pushState(stateData, title, newUrl);
    }
  };
  const pressYear = () => {
    console.log("pressYear");
    // setOpen(false);

    setCurrentScreen("resultsScreen");
    setCurrentSub1Screen("cardio");
    setCurrentSub2Screen("wattsGeneratedTime");
    setCurrentSub3Screen("wattsGeneratedYear");

    let p = {
      currentScreen: "resultsScreen",
      currentSub1Screen: "cardio",
      currentSub2Screen: "wattsGeneratedTime",
      currentSub3Screen: "wattsGeneratedYear",
    };
    sessionStorage.setItem("sauser_currentScreen", JSON.stringify(p));

    if (currentSub3Screen !== "wattsGeneratedYear") {
      // 存路由
      console.log("存路由Year");
      const stateData = {
        currentScreen: "resultsScreen",
        currentSub1Screen: "cardio",
        currentSub2Screen: "wattsGeneratedTime",
        currentSub3Screen: "wattsGeneratedYear",
      };
      const title = ""; // 页面标题（可选）
      const encodedData = encodeURIComponent(JSON.stringify(stateData));
      const newUrl = `/?data=${encodedData}`; // 新的 URL（可选） 這個會改變名稱
      window.history.pushState(stateData, title, newUrl);
    }
  };
  const pressLifetime = () => {
    console.log("pressLifetime");
    // setOpen(false);

    setCurrentScreen("resultsScreen");
    setCurrentSub1Screen("cardio");
    setCurrentSub2Screen("wattsGeneratedTime");
    setCurrentSub3Screen("wattsGeneratedLifetime");

    let p = {
      currentScreen: "resultsScreen",
      currentSub1Screen: "cardio",
      currentSub2Screen: "wattsGeneratedTime",
      currentSub3Screen: "wattsGeneratedLifetime",
    };
    sessionStorage.setItem("sauser_currentScreen", JSON.stringify(p));

    if (currentSub3Screen !== "wattsGeneratedLifetime") {
      // 存路由
      console.log("存路由Lifetime");
      const stateData = {
        currentScreen: "resultsScreen",
        currentSub1Screen: "cardio",
        currentSub2Screen: "wattsGeneratedTime",
        currentSub3Screen: "wattsGeneratedLifetime",
      };
      const title = ""; // 页面标题（可选）
      const encodedData = encodeURIComponent(JSON.stringify(stateData));
      const newUrl = `/?data=${encodedData}`; // 新的 URL（可选） 這個會改變名稱
      window.history.pushState(stateData, title, newUrl);
    }
  };
  const pressSelectDates = () => {
    console.log("pressSelectDates");
    // setOpen(false);

    setCurrentScreen("resultsScreen");
    setCurrentSub1Screen("cardio");
    setCurrentSub2Screen("wattsGeneratedTime");
    setCurrentSub3Screen("wattsGeneratedSelectDates");

    let p = {
      currentScreen: "resultsScreen",
      currentSub1Screen: "cardio",
      currentSub2Screen: "wattsGeneratedTime",
      currentSub3Screen: "wattsGeneratedSelectDates",
    };
    sessionStorage.setItem("sauser_currentScreen", JSON.stringify(p));

    if (currentSub3Screen !== "wattsGeneratedSelectDates") {
      // 存路由
      console.log("存路由SelectDates");
      const stateData = {
        currentScreen: "resultsScreen",
        currentSub1Screen: "cardio",
        currentSub2Screen: "wattsGeneratedTime",
        currentSub3Screen: "wattsGeneratedSelectDates",
      };
      const title = ""; // 页面标题（可选）
      const encodedData = encodeURIComponent(JSON.stringify(stateData));
      const newUrl = `/?data=${encodedData}`; // 新的 URL（可选） 這個會改變名稱
      window.history.pushState(stateData, title, newUrl);
    }
  };
  //Start
  const [dateStart, setDateStart] = useState(null);
  const [openStart, setOpenStart] = useState(false);
  const [selectDateStart, setSelectDateStart] = useState("08/07/1971");

  const handleDateSelectStart = (value) => {
    setDateStart(value);
    setOpenStart(false);
  };
  const changeSelectDateStart = (dateStart, dateStartString) => {
    console.log("changeSelectDate = ", dateStart, dateStartString);
    console.log("changeSelectDateString = ", dateStartString); // 08/07/1971
    setSelectDateStart(dateStartString);
  };
  //end
  const [dateEnd, setDateEnd] = useState(null);
  const [openEnd, setOpenEnd] = useState(false);
  const [selectDateEnd, setSelectDateEnd] = useState("08/07/1971");

  const handleDateSelectEnd = (value) => {
    setDateEnd(value);
    setOpenEnd(false);
  };
  const changeSelectDateEnd = (dateStart, dateStartString) => {
    console.log("changeSelectDate = ", dateStart, dateStartString);
    console.log("changeSelectDateString = ", dateStartString); // 08/07/1971
    setSelectDateEnd(dateStartString);
  };

  return (
    <>
      <div className="flex h-[50rem] flex-col  items-center ">
        <div
          style={{ color: "#333F48", letterSpacing: "2.5rem" }}
          className="mb-[3rem] h-[18rem] text-[11rem] "
        >
          {" "}
          DATE&nbsp;RANGE
        </div>
        <div className=" flex flex-row  ">
          <div
            className="mr-[7rem] flex h-[28rem] w-[53rem]  items-center justify-center    text-[11rem] text-[#333F48]"
            style={{
              borderColor: "#333F48",
              borderWidth:
                currentSub3Screen === "wattsGeneratedToday" ? "2rem" : "1rem",
              fontWeight:
                currentSub3Screen === "wattsGeneratedToday" ? "bold" : "normal",
            }}
            onClick={pressToday}
          >
            Today
          </div>
          <div
            className="mr-[7rem] flex h-[28rem] w-[53rem]  items-center justify-center    text-[11rem] text-[#333F48] "
            style={{
              borderColor: "#333F48",
              borderWidth:
                currentSub3Screen === "wattsGeneratedWeek" ? "2rem" : "1rem",
              fontWeight:
                currentSub3Screen === "wattsGeneratedWeek" ? "bold" : "normal",
            }}
            onClick={pressWeek}
          >
            Week
          </div>
          <div
            className="mr-[7rem] flex h-[28rem] w-[53rem]  items-center justify-center    text-[11rem] text-[#333F48]"
            style={{
              borderColor: "#333F48",
              borderWidth:
                currentSub3Screen === "wattsGeneratedMonth" ? "2rem" : "1rem",
              fontWeight:
                currentSub3Screen === "wattsGeneratedMonth" ? "bold" : "normal",
            }}
            onClick={pressMonth}
          >
            Month
          </div>
          <div
            className="mr-[7rem] flex h-[28rem] w-[53rem]  items-center justify-center    text-[11rem] text-[#333F48]"
            style={{
              borderColor: "#333F48",
              borderWidth:
                currentSub3Screen === "wattsGeneratedYear" ? "2rem" : "1rem",
              fontWeight:
                currentSub3Screen === "wattsGeneratedYear" ? "bold" : "normal",
            }}
            onClick={pressYear}
          >
            Year
          </div>
          <div
            className="mr-[7rem] flex h-[28rem] w-[53rem]  items-center justify-center    text-[11rem] text-[#333F48]"
            style={{
              borderColor: "#333F48",
              borderWidth:
                currentSub3Screen === "wattsGeneratedLifetime" ? "2rem" : "1rem",
              fontWeight:
                currentSub3Screen === "wattsGeneratedLifetime" ? "bold" : "normal",
            }}
            onClick={pressLifetime}
          >
            Lifetime
          </div>
          <div
            className=" flex h-[28rem] w-[53rem] flex-col   text-[11rem] text-[#333F48]"
            style={{
              borderColor: "#333F48",
              borderWidth:
                currentSub3Screen === "wattsGeneratedSelectDates" ? "2rem" : "1rem",
              fontWeight:
                currentSub3Screen === "wattsGeneratedSelectDates" ? "bold" : "normal",
            }}
            onClick={pressSelectDates}
          >
            <div className="flex h-[14rem] items-center justify-center">
              Select{" "}
            </div>
            <div className="flex h-[13rem] items-center justify-center">
              {" "}
              Dates{" "}
            </div>
          </div>
        </div>
      
      </div>
      <div>
        {currentSub3Screen === "wattsGeneratedToday" && <CardioWattsGeneratedToday />}
        {currentSub3Screen === "wattsGeneratedWeek" && <CardioWattsGeneratedWeek />}
        {currentSub3Screen === "wattsGeneratedYear" && <CardioWattsGeneratedYear />}
        {currentSub3Screen === "wattsGeneratedMonth" && <CardioWattsGeneratedMonth />}
        {currentSub3Screen === "wattsGeneratedLifetime" && <CardioWattsGeneratedLifetime />}
        {currentSub3Screen === "wattsGeneratedSelectDates" && (
          <CardioWattsGeneratedSelectDates />
        )}
      </div>
    </>
  );
};

export default CardioWattsGeneratedTime;

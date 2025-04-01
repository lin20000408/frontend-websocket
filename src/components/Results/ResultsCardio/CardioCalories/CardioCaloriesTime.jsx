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
import CardioCaloriesToday from "@/components/Results/ResultsCardio/CardioCalories/CardioCaloriesToday";
import CardioCaloriesWeek from "@/components/Results/ResultsCardio/CardioCalories/CardioCaloriesWeek";
import CardioCaloriesMonth from "@/components/Results/ResultsCardio/CardioCalories/CardioCaloriesMonth";
import CardioCaloriesYear from "@/components/Results/ResultsCardio/CardioCalories/CardioCaloriesYear";
import CardioCaloriesLifetime from "@/components/Results/ResultsCardio/CardioCalories/CardioCaloriesLifetime";
import CardioCaloriesSelectDates from "@/components/Results/ResultsCardio/CardioCalories/CardioCaloriesSelectDates";

const CardioCaloriesTime = () => {
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
    setCurrentSub2Screen("caloriesTime");
    setCurrentSub3Screen("caloriesToday");

    let p = {
      currentScreen: "resultsScreen",
      currentSub1Screen: "cardio",
      currentSub2Screen: "caloriesTime",
      currentSub3Screen: "caloriesToday",
    };
    sessionStorage.setItem("sauser_currentScreen", JSON.stringify(p));

    if (currentSub3Screen !== "caloriesToday") {
      // 存路由
      console.log("存路由today");
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
  const pressWeek = () => {
    console.log("pressWeek");
    // setOpen(false);

    setCurrentScreen("resultsScreen");
    setCurrentSub1Screen("cardio");
    setCurrentSub2Screen("caloriesTime");
    setCurrentSub3Screen("caloriesWeek");

    let p = {
      currentScreen: "resultsScreen",
      currentSub1Screen: "cardio",
      currentSub2Screen: "caloriesTime",
      currentSub3Screen: "caloriesWeek",
    };
    sessionStorage.setItem("sauser_currentScreen", JSON.stringify(p));

    if (currentSub3Screen !== "caloriesWeek") {
      // 存路由
      console.log("存路由Week");
      const stateData = {
        currentScreen: "resultsScreen",
        currentSub1Screen: "cardio",
        currentSub2Screen: "caloriesTime",
        currentSub3Screen: "caloriesWeek",
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
    setCurrentSub2Screen("caloriesTime");
    setCurrentSub3Screen("caloriesMonth");

    let p = {
      currentScreen: "resultsScreen",
      currentSub1Screen: "cardio",
      currentSub2Screen: "caloriesTime",
      currentSub3Screen: "caloriesMonth",
    };
    sessionStorage.setItem("sauser_currentScreen", JSON.stringify(p));

    if (currentSub3Screen !== "caloriesMonth") {
      // 存路由
      console.log("存路由Month");
      const stateData = {
        currentScreen: "resultsScreen",
        currentSub1Screen: "cardio",
        currentSub2Screen: "caloriesTime",
        currentSub3Screen: "caloriesMonth",
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
    setCurrentSub2Screen("caloriesTime");
    setCurrentSub3Screen("caloriesYear");

    let p = {
      currentScreen: "resultsScreen",
      currentSub1Screen: "cardio",
      currentSub2Screen: "caloriesTime",
      currentSub3Screen: "caloriesYear",
    };
    sessionStorage.setItem("sauser_currentScreen", JSON.stringify(p));

    if (currentSub3Screen !== "caloriesYear") {
      // 存路由
      console.log("存路由Year");
      const stateData = {
        currentScreen: "resultsScreen",
        currentSub1Screen: "cardio",
        currentSub2Screen: "caloriesTime",
        currentSub3Screen: "caloriesYear",
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
    setCurrentSub2Screen("caloriesTime");
    setCurrentSub3Screen("caloriesLifetime");

    let p = {
      currentScreen: "resultsScreen",
      currentSub1Screen: "cardio",
      currentSub2Screen: "caloriesTime",
      currentSub3Screen: "caloriesLifetime",
    };
    sessionStorage.setItem("sauser_currentScreen", JSON.stringify(p));

    if (currentSub3Screen !== "caloriesLifetime") {
      // 存路由
      console.log("存路由Lifetime");
      const stateData = {
        currentScreen: "resultsScreen",
        currentSub1Screen: "cardio",
        currentSub2Screen: "caloriesTime",
        currentSub3Screen: "caloriesLifetime",
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
    setCurrentSub2Screen("caloriesTime");
    setCurrentSub3Screen("caloriesSelectDates");

    let p = {
      currentScreen: "resultsScreen",
      currentSub1Screen: "cardio",
      currentSub2Screen: "caloriesTime",
      currentSub3Screen: "caloriesSelectDates",
    };
    sessionStorage.setItem("sauser_currentScreen", JSON.stringify(p));

    if (currentSub3Screen !== "caloriesSelectDates") {
      // 存路由
      console.log("存路由SelectDates");
      const stateData = {
        currentScreen: "resultsScreen",
        currentSub1Screen: "cardio",
        currentSub2Screen: "caloriesTime",
        currentSub3Screen: "caloriesSelectDates",
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
                currentSub3Screen === "caloriesToday" ? "2rem" : "1rem",
              fontWeight:
                currentSub3Screen === "caloriesToday" ? "bold" : "normal",
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
                currentSub3Screen === "caloriesWeek" ? "2rem" : "1rem",
              fontWeight:
                currentSub3Screen === "caloriesWeek" ? "bold" : "normal",
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
                currentSub3Screen === "caloriesMonth" ? "2rem" : "1rem",
              fontWeight:
                currentSub3Screen === "caloriesMonth" ? "bold" : "normal",
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
                currentSub3Screen === "caloriesYear" ? "2rem" : "1rem",
              fontWeight:
                currentSub3Screen === "caloriesYear" ? "bold" : "normal",
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
                currentSub3Screen === "caloriesLifetime" ? "2rem" : "1rem",
              fontWeight:
                currentSub3Screen === "caloriesLifetime" ? "bold" : "normal",
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
                currentSub3Screen === "caloriesSelectDates" ? "2rem" : "1rem",
              fontWeight:
                currentSub3Screen === "caloriesSelectDates" ? "bold" : "normal",
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
        {currentSub3Screen === "caloriesToday" && <CardioCaloriesToday />}
        {currentSub3Screen === "caloriesWeek" && <CardioCaloriesWeek />}
        {currentSub3Screen === "caloriesYear" && <CardioCaloriesYear />}
        {currentSub3Screen === "caloriesMonth" && <CardioCaloriesMonth />}
        {currentSub3Screen === "caloriesLifetime" && <CardioCaloriesLifetime />}
        {currentSub3Screen === "caloriesSelectDates" && (
          <CardioCaloriesSelectDates />
        )}
      </div>
    </>
  );
};

export default CardioCaloriesTime;

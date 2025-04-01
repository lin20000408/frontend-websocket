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



//time range components
import ResultsStrengthToday from "@/components/Results/ResultsStrength/ResultsStrengthToday";
import ResultsStrengthWeek from "@/components/Results/ResultsStrength/ResultsStrengthWeek";
import ResultsStrengthMonth from "@/components/Results/ResultsStrength/ResultsStrengthMonth";
import ResultsStrengthYear from "@/components/Results/ResultsStrength/ResultsStrengthYear";
import ResultsStrengthLifetime from "@/components/Results/ResultsStrength/ResultsStrengthLifetime";
import ResultsStrengthSelectDates from "@/components/Results/ResultsStrength/ResultsStrengthSelectDates";

const ResultsStrengthTime = () => {
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
    setCurrentSub1Screen("resultsStrengthTime");
    setCurrentSub2Screen("resultsStrengthToday");
    

    let p = {
      currentScreen: "resultsScreen",
      currentSub1Screen:  "resultsStrengthTime",
      currentSub2Screen:"resultsStrengthToday",
      
    };
    sessionStorage.setItem("sauser_currentScreen", JSON.stringify(p));

    if (currentSub2Screen !== "resultsStrengthToday") {
      // 存路由
      console.log("存路由today");
      const stateData = {
        currentScreen: "resultsScreen",
        currentSub1Screen: "resultsStrengthTime",
        currentSub2Screen: "resultsStrengthToday",
       
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
    setCurrentSub1Screen("resultsStrengthTime");
    setCurrentSub2Screen("resultsStrengthWeek");


    let p = {
      currentScreen: "resultsScreen",
      currentSub1Screen:  "resultsStrengthTime",
      currentSub2Screen:  "resultsStrengthWeek",
     
    };
    sessionStorage.setItem("sauser_currentScreen", JSON.stringify(p));

    if (currentSub2Screen !== "resultsStrengthWeek") {
      // 存路由
      console.log("存路由Week");
      const stateData = {
        currentScreen: "resultsScreen",
        currentSub1Screen: "resultsStrengthTime",
        currentSub2Screen: "resultsStrengthWeek",
       
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
    setCurrentSub1Screen("resultsStrengthTime");
    setCurrentSub2Screen("resultsStrengthMonth");
   

    let p = {
      currentScreen: "resultsScreen",
      currentSub1Screen: "resultsStrengthTime",
      currentSub2Screen: "resultsStrengthMonth",
      
    };
    sessionStorage.setItem("sauser_currentScreen", JSON.stringify(p));

    if (currentSub2Screen !== "resultsStrengthMonth") {
      // 存路由
      console.log("存路由Month");
      const stateData = {
        currentScreen: "resultsScreen",
        currentSub1Screen: "resultsStrengthTime",
        currentSub2Screen:"resultsStrengthMonth",
      
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
    setCurrentSub1Screen("resultsStrengthTime");
    setCurrentSub2Screen("resultsStrengthYear");
  

    let p = {
      currentScreen: "resultsScreen",
      currentSub1Screen: "resultsStrengthTime",
      currentSub2Screen:"resultsStrengthYear",

    };
    sessionStorage.setItem("sauser_currentScreen", JSON.stringify(p));

    if (currentSub2Screen !== "resultsStrengthYear") {
      // 存路由
      console.log("存路由Year");
      const stateData = {
        currentScreen: "resultsScreen",
        currentSub1Screen:"resultsStrengthTime",
        currentSub2Screen: "resultsStrengthYear",
       
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
    setCurrentSub1Screen("resultsStrengthTime");
    setCurrentSub2Screen("resultsStrengthLifetime");
   

    let p = {
      currentScreen: "resultsScreen",
      currentSub1Screen:  "resultsStrengthTime",
      currentSub2Screen: "resultsStrengthLifetime",
  
    };
    sessionStorage.setItem("sauser_currentScreen", JSON.stringify(p));

    if (currentSub2Screen !== "resultsStrengthLifetime") {
      // 存路由
      console.log("存路由Lifetime");
      const stateData = {
        currentScreen: "resultsScreen",
        currentSub1Screen: "resultsStrengthTime",
        currentSub2Screen: "resultsStrengthLifetime",
       
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
    setCurrentSub1Screen("resultsStrengthTime");
    setCurrentSub2Screen("resultsStrengthSelectDates");
   

    let p = {
      currentScreen: "resultsScreen",
      currentSub1Screen: "resultsStrengthTime",
      currentSub2Screen:"resultsStrengthSelectDates",
     
    };
    sessionStorage.setItem("sauser_currentScreen", JSON.stringify(p));

    if (currentSub2Screen !== "resultsStrengthSelectDates") {
      // 存路由
      console.log("存路由SelectDates");
      const stateData = {
        currentScreen: "resultsScreen",
        currentSub1Screen:"resultsStrengthTime",
        currentSub2Screen: "resultsStrengthSelectDates",
     
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
                currentSub2Screen === "resultsStrengthToday" ? "2rem" : "1rem",
              fontWeight:
                currentSub2Screen === "resultsStrengthToday" ? "bold" : "normal",
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
                currentSub2Screen === "resultsStrengthWeek" ? "2rem" : "1rem",
              fontWeight:
                currentSub2Screen === "resultsStrengthWeek" ? "bold" : "normal",
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
                currentSub2Screen === "resultsStrengthMonth" ? "2rem" : "1rem",
              fontWeight:
                currentSub2Screen === "resultsStrengthMonth" ? "bold" : "normal",
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
                currentSub2Screen === "resultsStrengthYear" ? "2rem" : "1rem",
              fontWeight:
                currentSub2Screen === "resultsStrengthYear" ? "bold" : "normal",
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
                currentSub2Screen === "resultsStrengthLifetime" ? "2rem" : "1rem",
              fontWeight:
                currentSub2Screen === "resultsStrengthLifetime" ? "bold" : "normal",
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
                currentSub2Screen === "resultsStrengthSelectDates" ? "2rem" : "1rem",
              fontWeight:
                currentSub2Screen === "resultsStrengthSelectDates" ? "bold" : "normal",
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
        {currentSub2Screen === "resultsStrengthToday" && <ResultsStrengthToday />}
        {currentSub2Screen === "resultsStrengthWeek" && <ResultsStrengthWeek />}
        {currentSub2Screen === "resultsStrengthYear" && <ResultsStrengthYear />}
        {currentSub2Screen === "resultsStrengthMonth" && <ResultsStrengthMonth />}
        {currentSub2Screen === "resultsStrengthLifetime" && <ResultsStrengthLifetime />}
        {currentSub2Screen === "resultsStrengthSelectDates" && (
          <ResultsStrengthSelectDates />
        )}
      </div>
    </>
  );
};

export default ResultsStrengthTime;

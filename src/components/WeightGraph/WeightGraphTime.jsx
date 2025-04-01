import { useContext, useEffect, useState, useRef } from "react";
import { Area } from "@ant-design/plots";
import { Col, Row, Input } from "antd";
import { Content } from "@/App";

// css 的模組引入
import styles from "@/css/local.module.css";
import { BACKGROUND_COLOR, DARKBLACK_COLOR } from "@/constants";
import { NAVIBAR_SIZE } from "../../constants";
import WeightGraphWeek from "@/components/WeightGraph/WeightGraphWeek";
import WeightGraphYear from "@/components/WeightGraph/WeightGraphYear";
import WeightGraphMonth from "@/components/WeightGraph/WeightGraphMonth";
import WeightGraphLifetime from "@/components/WeightGraph/WeightGraphLifetime";
import WeightGraphSelectDates from "@/components/WeightGraph/WeightGraphSelectDates";
const WeightGraphTime = () => {
  const {
    //
    setActiveScreen,
    setAddNewWeight,
    addNewWeight,
    // Connect
    ws,
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
    isMetric,
    setIsMetric,
  } = useContext(Content);
  // 重新渲染背景
  useEffect(() => {
    document.body.style.backgroundImage = "none";
    document.body.style.backgroundColor = BACKGROUND_COLOR;

    document.body.style.userSelect = "none";
  }, []);

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

  //press 路由
  const pressWeek = () => {
    console.log("pressWeek");
    // setOpen(false);

    setCurrentScreen("weightGraphTime");
    setCurrentSub1Screen("weightGraphWeek");

    let p = {
      currentScreen: "weightGraphTime",
      currentSub1Screen: "weightGraphWeek",
    };
    sessionStorage.setItem("sauser_currentScreen", JSON.stringify(p));

    if (currentSub1Screen !== "weightGraphWeek") {
      // 存路由
      console.log("存路由Week");
      const stateData = {
        currentScreen: "weightGraphTime",
        currentSub1Screen: "weightGraphWeek",
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

    setCurrentScreen("weightGraphTime");
    setCurrentSub1Screen("weightGraphMonth");

    let p = {
      currentScreen: "weightGraphTime",
      currentSub1Screen: "weightGraphMonth",
    };
    sessionStorage.setItem("sauser_currentScreen", JSON.stringify(p));

    if (currentSub1Screen !== "weightGraphMonth") {
      // 存路由
      console.log("存路由Month");
      const stateData = {
        currentScreen: "weightGraphTime",
        currentSub1Screen: "weightGraphMonth",
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

    setCurrentScreen("weightGraphTime");
    setCurrentSub1Screen("weightGraphYear");

    let p = {
      currentScreen: "weightGraphTime",
      currentSub1Screen: "weightGraphYear",
    };
    sessionStorage.setItem("sauser_currentScreen", JSON.stringify(p));

    if (currentSub1Screen !== "weightGraphYear") {
      // 存路由
      console.log("存路由Year");
      const stateData = {
        currentScreen: "weightGraphTime",
        currentSub1Screen: "weightGraphYear",
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

    setCurrentScreen("weightGraphTime");
    setCurrentSub1Screen("weightGraphLifetime");

    let p = {
      currentScreen: "weightGraphTime",
      currentSub1Screen: "weightGraphLifetime",
    };
    sessionStorage.setItem("sauser_currentScreen", JSON.stringify(p));

    if (currentSub1Screen !== "weightGraphLifetime") {
      // 存路由
      console.log("存路由Lifetime");
      const stateData = {
        currentScreen: "weightGraphTime",
        currentSub1Screen: "weightGraphLifetime",
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

    setCurrentScreen("weightGraphTime");
    setCurrentSub1Screen("weightGraphSelectDates");

    let p = {
      currentScreen: "weightGraphTime",
      currentSub1Screen: "weightGraphSelectDates",
    };
    sessionStorage.setItem("sauser_currentScreen", JSON.stringify(p));

    if (currentSub1Screen !== "weightGraphSelectDates") {
      // 存路由
      console.log("存路由SelectDates");
      const stateData = {
        currentScreen: "weightGraphTime",
        currentSub1Screen: "weightGraphSelectDates",
      };
      const title = ""; // 页面标题（可选）
      const encodedData = encodeURIComponent(JSON.stringify(stateData));
      const newUrl = `/?data=${encodedData}`; // 新的 URL（可选） 這個會改變名稱
      window.history.pushState(stateData, title, newUrl);
    }
  };
  //logNewWeight PAGE
  const [logNewWeight, setLogNewWeight] = useState(false);
  const logNewWeightClick = () => {
    console.log("logNewWeightClick");
    setLogNewWeight(true);
  };
  const logNewBodyWeightSaveClick = () => {
    console.log("logNewBodyWeightSaveClick");
    setLogNewWeight(false);
    //!存insert post到資料庫
    let sauser_accessToken = localStorage.getItem("sauser_accessToken");
    const inputObject = {
      addNewWeight: {
        sauser_accessToken: sauser_accessToken,
        weight: logNewWeightInput,
        units: isMetric ? "kg" : "Lbs",
      },
    };

    if (ws) {
      try {
        ws.send(JSON.stringify(inputObject));
        console.log(inputObject);
      } catch (error) {
        console.error("Error sending data:", error);
      }
    } else {
      console.error("WebSocket is not initialized");
    }
  };
  useEffect(() => {
    if (addNewWeight === "success") {
      setCurrentScreen("weightGraphTime");
      setCurrentSub1Screen("weightGraphWeek");
      let p = {
        currentScreen: "weightGraphTime",
        currentSub1Screen: "weightGraphWeek",
      };
      sessionStorage.setItem("sauser_currentScreen", JSON.stringify(p));

      if (currentScreen !== "weightGraphTime") {
        // 存路由
        const stateData = {
          activeScreen: "menuScreen",
          currentScreen: "weightGraphTime",
          currentSub1Screen: "weightGraphWeek",
        };
        const title = ""; // 页面标题（可选）
        const encodedData = encodeURIComponent(JSON.stringify(stateData));
        const newUrl = `/?data=${encodedData}`; // 新的 URL（可选） 這個會改變名稱
        window.history.pushState(stateData, title, newUrl);
      }
    }
  }, [addNewWeight]);
  const logNewBodyWeightCancelClick = () => {
    console.log("logNewBodyWeightSaveClick");
    setLogNewWeight(false);
  };
  //INPUT  logNewWeightInput VALUE
  const [logNewWeightInput, setLogNewWeightInput] = useState("");
  const changeLogNewWeight = (e) => {
    setLogNewWeightInput(e.target.value);
  };
  return (
    <>
      <div
        style={{
          // 操作符(+,-,*,/) 要有空格不然計算會錯誤
          width: "100dvw",
          height: "100hdv",
          overflow: "scroll",
          zIndex: 0,
        }}
        className="pt-[60rem]"
      >
        <div
          className="mb-[11rem] ml-[12rem] text-[16rem] font-bold text-[#84BD00]"
          onClick={logNewWeightClick}
        >
          + Log New Weight
        </div>
        <div className="flex   flex-col  items-center ">
          <div
            style={{ color: "#333F48", letterSpacing: "2.5rem" }}
            className="mb-[3rem] h-[18rem] text-[11rem] "
          >
            {" "}
            DATE&nbsp;RANGE
          </div>
          <div className=" flex flex-row  ">
            <div
              className="mr-[7rem] flex h-[28rem] w-[53rem]  items-center justify-center    text-[11rem] text-[#333F48] "
              style={{
                borderColor: "#333F48",
                borderWidth:
                  currentSub1Screen === "weightGraphWeek" ? "2rem" : "1rem",
                fontWeight:
                  currentSub1Screen === "weightGraphWeek" ? "bold" : "normal",
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
                  currentSub1Screen === "weightGraphMonth" ? "2rem" : "1rem",
                fontWeight:
                  currentSub1Screen === "weightGraphMonth" ? "bold" : "normal",
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
                  currentSub1Screen === "weightGraphYear" ? "2rem" : "1rem",
                fontWeight:
                  currentSub1Screen === "weightGraphYear" ? "bold" : "normal",
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
                  currentSub1Screen === "weightGraphLifetime" ? "2rem" : "1rem",
                fontWeight:
                  currentSub1Screen === "weightGraphLifetime"
                    ? "bold"
                    : "normal",
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
                  currentSub1Screen === "weightGraphSelectDates"
                    ? "2rem"
                    : "1rem",
                fontWeight:
                  currentSub1Screen === "weightGraphSelectDates"
                    ? "bold"
                    : "normal",
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
      </div>
      <div>
        {currentSub1Screen === "weightGraphWeek" && <WeightGraphWeek />}
        {currentSub1Screen === "weightGraphMonth" && <WeightGraphMonth />}
        {currentSub1Screen === "weightGraphYear" && <WeightGraphYear />}
        {currentSub1Screen === "weightGraphLifetime" && <WeightGraphLifetime />}
        {currentSub1Screen === "weightGraphSelectDates" && (
          <WeightGraphSelectDates />
        )}
      </div>
      {logNewWeight && (
        <>
          {" "}
          <div className="slide-in-from-bottom flex h-dvh items-center justify-center">
            <div
              className=" flex h-[367rem] w-[92%] flex-col items-center justify-center"
              style={{ border: "3rem solid #84BD00 " }}
            >
              <div className="mt-[23rem]  flex h-[53rem] flex-col items-center  justify-center">
                <div
                  className="text-[20rem] font-bold text-[#333F48]"
                  style={{ letterSpacing: "1rem" }}
                >
                  Log New{" "}
                </div>
                <div
                  className="text-[20rem] font-bold text-[#333F48]"
                  style={{ letterSpacing: "1rem" }}
                >
                  Body Weight{" "}
                </div>
              </div>
              <div className="mt-[24rem] flex h-[147rem] w-[281rem] flex-col items-center justify-center bg-[#ffffff] ">
                {/* <div
                className="mt-[41rem] h-[57rem] w-[220rem]  "
                style={{ border: "3rem solid #84BD00" }}
              ></div> */}
                <div className="flex justify-center   ">
                  <Input
                    type="text"
                    placeholder="00"
                    className="mt-[41rem] flex h-[57rem] w-[220rem] items-center border-[3rem] border-mainColor bg-white text-center text-[25rem] font-bold font-semibold   "
                    value={logNewWeightInput}
                    onChange={changeLogNewWeight}
                  />
                </div>
                <div className="h-[22rem] text-[18rem] text-[#333F48] ">
                  {isMetric ? "kg" : "Lbs"}
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
                  onClick={logNewBodyWeightSaveClick}
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
                  onClick={logNewBodyWeightCancelClick}
                >
                  CANCEL
                </div>
              </section>
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default WeightGraphTime;

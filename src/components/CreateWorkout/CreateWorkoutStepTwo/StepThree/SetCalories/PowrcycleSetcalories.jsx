import React, { useState, useEffect, useContext } from "react";
import { Row, Col, Input, Modal } from "antd";
// css 引入

import { Content } from "@/App";
// css 的模組引入
import styles from "@/css/local.module.css";
import { Radio } from "antd";
export default function PowrcycleSetcalories({ boxType }) {
  const {
    squares,
    setSquares,
    // Connect
    squareId,
    setSquareId,
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
    workoutbuilderStepTwoId,
    setWorkoutbuilderStepTwoId,
    backToAddOrEditStepTwo,
    setBackToAddOrEditStepTwo,
    setSquareType,
    squareType,
  } = useContext(Content);
  //設ｉｎｐｕｔ 控制項
  console.log(squares);

  const findValue = JSON.parse(sessionStorage.getItem("squaresValue"));

  //OriginalSecond如果truely就寫OriginalSecond   如果falsy裡 是０就寫０ 如果都不是寫""
  //   const filteredProgram= findValue[0].data
  const [phaseName, setPhaseName] = useState(findValue[0]?.data?.name || "");
  const [calories, setCalories] = useState(findValue[0]?.data?.calories || "");

 
  const [resistance, setResistance] = useState(
    findValue[0]?.data?.resistance || "",
  );
  const handleOKClick = () => {
    console.log(squares);
    const programUpdateData = {
      name: phaseName,
      totalValue: calories,
      calories: calories,    
  
      resistance: resistance,
    };
    //檢查 squares 陣列中是否已經存在指定的 id，如果存在則更新 type 和 data，否則新增一個新的物件到陣列中。

    // 找到對應 id 的 square
    const existingSquare = squares.find((square) => square.id === squareId);
    console.log(squareType);

    if (existingSquare) {
      // 如果找到，更新 type 和 data
      existingSquare.type = squareType;
      existingSquare.data = programUpdateData;
    } else {
      // 如果沒有找到，新增新的物件
      squares.push({ id: squareId, type: squareType, data: programUpdateData });
    }
    sessionStorage.setItem("workoutSquares", JSON.stringify(squares));
    console.log(squareId);

    const newScreenState = {
      currentScreen: "workoutType",
      currentSub1Screen: "createWorkoutStepOne",
      currentSub2Screen: "createWorkoutStepTwo",
      currentSub3Screen: "",
    };
    setCurrentScreen(newScreenState.currentScreen);
    setCurrentSub1Screen(newScreenState.currentSub1Screen);
    setCurrentSub2Screen(newScreenState.currentSub2Screen);
    setCurrentSub3Screen(newScreenState.currentSub3Screen);
    // Update sessionStorage and URL
    sessionStorage.setItem(
      "sauser_currentScreen",
      JSON.stringify(newScreenState),
    );
    const encodedData = encodeURIComponent(JSON.stringify(newScreenState));
    const newUrl = `/?data=${encodedData}`;
    window.history.pushState(newScreenState, "", newUrl);
  };

  useEffect(() => {
    if (handleOKClick) {
      setBackToAddOrEditStepTwo("addStepThreeContent"); // 設定內容
      sessionStorage.setItem(
        "backToAddOrEditStepTwo",
        JSON.stringify("addStepThreeContent"),
      );
    }
  }, [backToAddOrEditStepTwo, handleOKClick]); // 監聽 backToAddOrEditStepTwo 變化
  //back
  const handleBACKClick = () => {
    const newScreenState = {
      currentScreen: "workoutType",
      currentSub1Screen: "createWorkoutStepOne",
      currentSub2Screen: "createWorkoutStepTwo",
      currentSub3Screen: "",
    };
    setCurrentScreen(newScreenState.currentScreen);
    setCurrentSub1Screen(newScreenState.currentSub1Screen);
    setCurrentSub2Screen(newScreenState.currentSub2Screen);
    setCurrentSub3Screen(newScreenState.currentSub3Screen);
    // Update sessionStorage and URL
    sessionStorage.setItem(
      "sauser_currentScreen",
      JSON.stringify(newScreenState),
    );
    const encodedData = encodeURIComponent(JSON.stringify(newScreenState));
    const newUrl = `/?data=${encodedData}`;
    window.history.pushState(newScreenState, "", newUrl);
  };

  return (
    <div style={{ width: "100%" }} className="h-dvh ">
      <div
        id="element"
        style={{
          border: "2rem solid green",
          color: "#333f48",

          textAlign: "center",
          // width: '100%',
          backgroundColor: "#efefef",
          width: "352rem",

          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          marginLeft: "auto",
          marginRight: "auto",
        }}
        className="h-dvh overflow-auto  "
      >
        <div className="flex flex-col items-center justify-center text-center text-[#333f48]">
          <div
            className="mt-[8rem] h-[29rem] text-[20rem]  font-bold text-[#333f48] "
            style={{ letterSpacing: "1rem" }}
          >
            SET CALORIES
          </div>
          <div className="mt-[18rem] h-[455rem] w-[293rem] bg-white ">
            <div>
              <div
                className="mt-[18rem] h-[27rem]  text-[16rem] text-[#333f48]"
                style={{ letterSpacing: "1rem" }}
              >
                CALORIES PHASE NAME
              </div>
              <div>
                {" "}
                <Input
                  className="mb-[20rem] h-[42rem] w-[240rem] text-[14rem] font-semibold"
                  style={{
                    letterSpacing: "0.2rem",
                    border: "#84BD00 solid 2rem",
                  }}
                  placeholder="Run1"
                  type="text"
                  value={phaseName}
                  onChange={(e) => setPhaseName(e.target.value)}
                />
              </div>
            </div>
            <div className="mb-[30rem]">
          
              <div>
                <div
                  className="mt-[18rem] h-[27rem]  text-[16rem] text-[#333f48]"
                  style={{ letterSpacing: "1rem" }}
                >
                  CALORIES
                </div>
                <div>
                  {" "}
                  <Input
                    className=" h-[42rem] w-[240rem] text-[14rem] font-semibold"
                    style={{
                      letterSpacing: "0.2rem",
                      border: "#84BD00 solid 2rem",
                    }}
                    placeholder="Run1"
                    type="text"
                    value={calories}
                    onChange={(e) => setCalories(e.target.value)}
                  />
                </div>
                <div className="mb-[30rem] h-[19rem] text-[12rem]">
                  {" "}
                  (30-9999 CAL)
                </div>
              </div>
            </div>

           
            <div>
              <div
                className="h-[28rem]  text-[16rem]   text-[#333f48]"
                style={{ letterSpacing: "1rem" }}
              >
                RESISTANCE
              </div>
              <div>
                {" "}
                <Input
                  placeholder="7 mph"
                  type="text"
                  value={resistance}
                  onChange={(e) => setResistance(e.target.value)}
                  className="h-[42rem] w-[240rem] text-[14rem] font-semibold"
                  style={{
                    letterSpacing: "0.2rem",
                    border: "#84BD00 solid 2rem",
                  }}
                />
              </div>
              <div className="mb-[30rem] h-[19rem] text-[12rem]"> (1-40)</div>
            </div>
          </div>
          <section className="mb-[25rem] mt-[22rem] flex justify-center">
            <div
              style={{
                // 具有漸層色
                background: `linear-gradient(to top, #80c342, #bae642)`,
                lineHeight: "1rem",
              }}
              className="mr-[23rem]  flex h-[49rem] w-[127rem] items-center justify-center border-[2rem] border-white bg-yellow-500 text-[20rem] font-bold  text-white"
              onClick={handleOKClick}
            >
              OK
            </div>

            <div
              style={{
                // 具有漸層色
                background: `linear-gradient(to top, #80c342, #bae642)`,
                lineHeight: "1rem",
              }}
              className="flex  h-[49rem]  w-[127rem] items-center  justify-center border-[2rem] border-white text-[20rem]  font-bold text-white  "
              onClick={handleBACKClick}
            >
              BACK
            </div>
          </section>
          {currentSub2Screen === "createWorkoutTreadmill" && (
            <createWorkoutTreadmill />
          )}
        </div>
      </div>
    </div>
  );
}

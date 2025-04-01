import React, { useState, useEffect, useContext } from "react";
import { Row, Col, Input, Modal } from "antd";
// css 引入

import { Content } from "@/App";
// css 的模組引入
import styles from "@/css/local.module.css";
import { Radio } from "antd";
export default function NaturalcrossTrainerSetdistance({ boxType }) {
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
  
const [distance,setDistance]=useState(findValue[0]?.data?.distance || "")
  //將push run 用toggle true /false 更改select
  const [selectedOption, setSelectedOption] = useState("");

  const toggleUnit = (option) => {
    setSelectedOption((prev) => (prev === option ? "" : option));
  }; 
  console.log(selectedOption);
  useEffect(() => {
    setSelectedOption(findValue[0]?.data?.functionMode || "");
  }, []);

  const [strideLeft, setStrideLeft] = useState(findValue[0]?.data?.strideLeft);
  const [strideRight, setStrideRight] = useState(
    findValue[0]?.data?.strideRight,
  );

  const [resistance, setResistance] = useState(findValue[0]?.data?.resistance);

  const handleOKClick = () => {
    console.log(squares);
    const programUpdateData = {
      name: phaseName,
      totalValue: distance,
      distance:distance,
      functionMode: selectedOption,
      strideLeft:strideLeft,
      strideRight:strideRight,

      resistance:resistance,
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
            SET DISTANCE
          </div>
          <div className="mt-[18rem] h-[580rem] w-[293rem] bg-white ">
            <div>
              <div
                className="mt-[18rem] h-[27rem]  text-[16rem] text-[#333f48]"
                style={{ letterSpacing: "1rem" }}
              >
                DISTANCE PHASE NAME
              </div>
              <div>
                {" "}
                <Input
                  className="mb-[30rem] h-[42rem] w-[240rem] text-[14rem] font-semibold"
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
            <div>
              <div
                className="h-[28rem]  text-[16rem]   text-[#333f48]"
                style={{ letterSpacing: "1rem" }}
              >
                DISTANCE
              </div>
              <div>
                {" "}
                <Input
                  placeholder="7 mph"
                  type="text"
                  value={distance}
                  onChange={(e) => setDistance(e.target.value)}
                  className="h-[42rem] w-[240rem] text-[14rem] font-semibold"
                  style={{
                    letterSpacing: "0.2rem",
                    border: "#84BD00 solid 2rem",
                  }}
                />
              </div>
              <div className="mb-[30rem] h-[19rem] text-[12rem]"> (0.1-99.99 MILES)</div>
            </div>
            <div className="mb-[30rem]">
              <div
                className="h-[27rem] text-[16rem]  text-[#333f48]"
                style={{ letterSpacing: "1rem" }}
              >
                MODE
              </div>

              <Row justify={"center"}>
                {/* RUN */}
                <Col
                  className="flex h-[calc(42rem)] w-[calc(90rem)] items-center justify-center text-[calc(14rem)]"
                  style={{ border: "2rem solid #84bd00" }}
                >
                  <div
                    className={`font-semibold ${selectedOption === "elliptical" ? styles.signUpUnits : "none"}`}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignContent: "center",
                    }}
                    onClick={() => toggleUnit("elliptical")}
                  >
                    <span className="text-[12rem]">ELLIPTICAL</span>
                  </div>
                </Col>
                <div className="w-[8rem]"></div>
                {/* PUSH */}
                <Col
                  className="flex h-[calc(42rem)] w-[calc(90rem)] items-center justify-center text-[calc(14rem)] font-semibold"
                  style={{ border: "2rem solid #84bd00" }}
                >
                  <div
                    className={`font-semibold ${selectedOption === "cycle" ? styles.signUpUnits : "none"}`}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignContent: "center",
                    }}
                    onClick={() => toggleUnit("cycle")}
                  >
                    <span className="text-[12rem]">CYCLE</span>
                  </div>
                </Col>
                <div className="w-[8rem]"></div>
                {/* JUMP */}
                <Col
                  className="flex h-[calc(42rem)] w-[calc(90rem)] items-center justify-center text-[calc(14rem)] font-semibold"
                  style={{ border: "2rem solid #84bd00" }}
                >
                  <div
                    className={`font-semibold ${selectedOption === "stepper" ? styles.signUpUnits : "none"}`}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignContent: "center",
                    }}
                    onClick={() => toggleUnit("stepper")}
                  >
                    <span className="text-[12rem]">STEPPER</span>
                  </div>
                </Col>
              </Row>
            </div>
            <div className="flex justify-around" >
              <div>
                <div
                  className="h-[28rem]  text-[16rem]   text-[#333f48]"
                  style={{ letterSpacing: "1rem" }}
                >
                  Stride
                </div>
                <div>
                  {" "}
                  <Input
                    placeholder="7 mph"
                    type="text"
                    value={strideLeft}
                    onChange={(e) => setStrideLeft(e.target.value)}
                    className="h-[42rem] w-[110rem] text-[14rem] font-semibold"
                    style={{
                      letterSpacing: "0.2rem",
                      border: "#84BD00 solid 2rem",
                    }}
                  />
                </div>
                <div className="mb-[30rem] h-[19rem] text-[12rem]"> (1-3)</div>
              </div>
              <div>
                <div
                  className="h-[28rem]  text-[16rem]   text-[#333f48]"
                  style={{ letterSpacing: "1rem" }}
                >
                  Stride
                </div>
                <div>
                  {" "}
                  <Input
                    placeholder="7 mph"
                    type="text"
                    value={strideRight}
                    onChange={(e) => setStrideRight(e.target.value)}
                    className="h-[42rem] w-[110rem] text-[14rem] font-semibold"
                    style={{
                      letterSpacing: "0.2rem",
                      border: "#84BD00 solid 2rem",
                    }}
                  />
                </div>
                <div className="mb-[30rem] h-[19rem] text-[12rem]"> (1-9)</div>
              </div>
            </div>

            <div>
              <div
                className="h-[28rem]  text-[16rem]   text-[#333f48]"
                style={{ letterSpacing: "1rem" }}
              >
                Resistance
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


          <section className="mb-[25rem] mt-[50rem] flex justify-center ">
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

import { useState, useContext, useRef, useEffect } from "react";

// import _Elliptical from "@/components/CreateWorkout/CreateWorkoutElliptical";
// import _SetTime from "@/components/SetTime";

import { MAIN_COLOR, BACKGROUND_COLOR } from "@/constants";

// 判斷它是手機或桌面流灠器
import { isMobile } from "react-device-detect";

import { Col, Row, Button, Modal } from "antd";

import { useNavigate } from "react-router-dom";
import { Content } from "@/App";
// css 的模組引入
import styles from "@/css/local.module.css";
import { NAVIBAR_SIZE } from "../../constants";
import CreateWorkoutStepOne from "@/components/CreateWorkout/CreateWorkoutStepOne";
import { GlobalStateContext } from "@/App";
import EditPowrPage from "@/components/CreateWorkout/CreateWorkoutStepTwo/EditPowrPage";
import WorkoutBuilderSectionDisplayBox from "@/components/CreateWorkout/Components/WorkoutBuilderSectionDisplayBox";
import WorkoutBuilderSectionEditBox from "@/components/CreateWorkout/Components/WorkoutBuilderSectionEditBox";
import StepOneTypeDetails from "@/components/CreateWorkout/CreateWorkoutStepOne/StepOneTypeDetails";
const WorkoutBuilder = () => {
  const { globalstate } = useContext(GlobalStateContext);
  const {
    //

    setActiveScreen,
    setDeleteWorkout,
    deleteWorkout,
    // Connect
    ws,
    setWs,
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
    squareId,
    setSquareId,
    sessionWorkoutBuilderData,
    setSessionWorkoutBuilderData,
    addNewWorkoutbuilder,
    setAddNewWorkoutbuilder,
    setSelected,
    selected,
  } = useContext(Content);

  const elementRef = useRef(null);
  const [errStrArray, setErrStrArray] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOk = () => {
    setErrStrArray([]);
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setErrStrArray([]);
    setIsModalOpen(false);
  };
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
  //load all data from database
  useEffect(() => {}, []);

  //delete workoutbuilder id from database

  const [createNewWorkout, setCreateNewWorkout] = useState(false);
  const createNewWorkoutClick = () => {
    console.log("pressTreadmill");
    // setOpen(false);
    setCreateNewWorkout(true);
    setCurrentScreen("workoutType");
    setCurrentSub1Screen("createWorkoutStepOne");

    let p = {
      currentScreen: "workoutType",
      currentSub1Screen: "createWorkoutStepOne",
    };
    sessionStorage.setItem("sauser_currentScreen", JSON.stringify(p));

    if (currentSub1Screen !== "createWorkoutStepOne") {
      // 存路由

      const stateData = {
        currentScreen: "workoutType",
        currentSub1Screen: "createWorkoutStepOne",
      };
      const title = ""; // 页面标题（可选）
      const encodedData = encodeURIComponent(JSON.stringify(stateData));
      const newUrl = `/?data=${encodedData}`; // 新的 URL（可选） 這個會改變名稱
      window.history.pushState(stateData, title, newUrl);
    }
  };
  const cancelNewWorkoutClick = () => {
    setCreateNewWorkout(false);
    setCreateNewWorkout(true);
    setCurrentScreen("workoutType");
    setCurrentSub1Screen("");
    let p = {
      currentScreen: "workoutType",
      currentSub1Screen: "",
    };
    sessionStorage.setItem("sauser_currentScreen", JSON.stringify(p));

    // Store route only if current screen is different
    if (currentSub1Screen) {
      const stateData = {
        currentScreen: "workoutType",
        currentSub1Screen: "",
      };
      const title = "";
      const encodedData = encodeURIComponent(JSON.stringify(stateData));
      const newUrl = `/?data=${encodedData}`;
      window.history.pushState(stateData, title, newUrl);
    }
  };

  const seeMoreClick = (type, category) => {
    console.log(type);
    setSelected({ type: type, category: category });

    //go to page
    setCurrentScreen("workoutType");
    setCurrentSub1Screen("stepOneTypeDetails");

    let p = {
      currentScreen: "workoutType",
      currentSub1Screen: "stepOneTypeDetails",
    };
    sessionStorage.setItem("sauser_currentScreen", JSON.stringify(p));

    if (currentSub1Screen !== "stepOneTypeDetails") {
      const stateData = {
        currentScreen: "workoutType",
        currentSub1Screen: "stepOneTypeDetails",
      };
      const title = "";
      const encodedData = encodeURIComponent(JSON.stringify(stateData));
      const newUrl = `/?data=${encodedData}`;
      window.history.pushState(stateData, title, newUrl);
    }
    const OnlyTypeDataBefore = sessionWorkoutBuilderData
      ? sessionWorkoutBuilderData.filter(
          (workout) => workout.type === type && workout.powrOrNot === category,
        )
      : [];
    sessionStorage.setItem("OnlyTypeData", JSON.stringify(OnlyTypeDataBefore));
    console.log(JSON.stringify(OnlyTypeDataBefore));
  };
  console.log(sessionWorkoutBuilderData);
  const filterConditions = [
    { x: "treadmill", y: "powr" },
    { x: "elliptical", y: "powr" },
    { x: "cycle", y: "powr" },
    { x: "crossTrainer", y: "powr" },
    { x: "rower", y: "powr" },
    { x: "stepper", y: "powr" },
    { x: "treadmill", y: "natural" },
    { x: "elliptical", y: "natural" },
    { x: "cycle", y: "natural" },
    { x: "cross trainer", y: "natural" },
    { x: "rower", y: "natural" },
    { x: "stepper", y: "natural" },
  ];

  console.log(workoutbuilderStepTwoId);
  console.log(sessionWorkoutBuilderData);

  return (
    <>
      {" "}
      <div
        style={{
          paddingTop: "60rem",

          width: "100dvw",
          // minWidth:'320rem',

          //  maxWidth:'1024px'
        }}
        className="mt-[13rem] flex  items-center  justify-center bg-[#F5F5F5]"
      >
        <Modal
          title={
            <div style={{ color: "orange", fontSize: "14rem" }} className=" ">
              Warning
            </div>
          }
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          // 使用footer定義按鍵
          footer={[
            <Button
              key="submit"
              type="primary"
              onClick={handleOk}
              className=" "
            >
              ok
            </Button>,
          ]}
        >
          <ul>
            {errStrArray.map((errStr, index) => (
              <li key={index} style={{ color: "black", fontSize: "12rem" }}>
                {`${errStr}`}
              </li>
            ))}
          </ul>
        </Modal>

        <div className="flex  w-[93%] flex-col justify-center ">
          <div className="flex items-center justify-center ">
            <div
              style={{
                width: "293rem",

                border: "2rem solid #fff",
                background:
                  "linear-gradient(270deg, rgba(128, 195, 66, 1),rgba(186, 230, 66, 1), rgba(128, 195, 66, 1))",
                color: "#fff",
                fontSize: "20rem",

                letterSpacing: "2rem",
              }}
              className="flex  h-[49rem] items-center justify-center font-bold leading-[21rem] "
              onClick={createNewWorkoutClick}
            >
              Create New Workout
            </div>
          </div>

          {/* all data map display */}
          {filterConditions.map(({ x, y }) => {
            const filteredData = sessionWorkoutBuilderData
              ? sessionWorkoutBuilderData
                  .filter(
                    (workout) => workout.type === x && workout.powrOrNot === y,
                  )
                  .sort((a, b) => a.order - b.order) // 依據 order 屬性排序
                  .slice(0, 4) // 只取前 4 項
              : [];

            return (
              <div key={`${x}-${y}`} className="mb-16 text-[16rem]">
                <h2 className="mb-6 font-bold text-[#ff7f30] ">
                  {x.toUpperCase()} {y.toUpperCase()} WORKOUTS
                </h2>
                {filteredData.length > 0 ? (
                  <>
                    <div
                      onClick={() => seeMoreClick(x, y)}
                      className="mt-6 cursor-pointer text-[15rem] text-blue-500"
                    >
                      See More{" "}
                    </div>
                    <div className="flex flex-wrap gap-36 text-[16rem]">
                      {filteredData.map((data) => (
                        <WorkoutBuilderSectionDisplayBox
                          key={data.workoutbuilderId}
                          totalValue={data.totalValue}
                          name={data.filename}
                          workoutId={data.workoutbuilderId}
                          workoutType={data.type}
                          workoutPowrOrNot={data.powrOrNot}
                          workoutPhaseinfo={data.phaseinfo}
                        />
                      ))}
                    </div>
                  </>
                ) : (
                  <p className=" text-[16rem] text-gray-500">
                    No workouts available
                  </p>
                )}
              </div>
            );
          })}
          {currentSub2Screen === "createWorkoutStepTwo" && <EditPowrPage />}
          {currentSub1Screen === "stepOneTypeDetails" && (
            <StepOneTypeDetails
              type={selected.type}
              category={selected.category}
            />
          )}
          {currentSub1Screen === "createWorkoutStepOne" && (
            <div className="slide-in-from-bottom ">
              <CreateWorkoutStepOne
                cancelNewWorkoutClick={cancelNewWorkoutClick}
              />{" "}
            </div>
          )}

        </div>
      </div>
    </>
  );
};
export default WorkoutBuilder;

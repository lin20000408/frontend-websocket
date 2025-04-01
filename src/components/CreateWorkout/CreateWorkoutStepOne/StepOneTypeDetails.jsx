import { useState, useContext, useRef, useEffect } from "react";
import { Col, Row, Button, Modal } from "antd";
import { Content } from "@/App";
import EditPowrPage from "@/components/CreateWorkout/CreateWorkoutStepTwo/EditPowrPage";
import { GlobalStateContext } from "@/App";
import WorkoutBuilderSectionEditBox from "@/components/CreateWorkout/Components/WorkoutBuilderSectionEditBox";
import { MAIN_COLOR, BACKGROUND_COLOR } from "@/constants";

export default function StepOneTypeDetails({ type, category }) {
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

    selected,
    setSelected,
    sessionWorkoutBuilderData,
    setSessionWorkoutBuilderData,
    setUpdateWorkoutbuilder,
    updateWorkoutbuilder,
    setDeleteWorkoutbuilder,
  } = useContext(Content);
  console.log(selected);

  const OnlyTypeData = JSON.parse(sessionStorage.getItem("OnlyTypeData"));

  const handleOk = () => {
    setErrStrArray([]);
    setIsModalOpen(false);
  };
  const [errStrArray, setErrStrArray] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [draggedItem, setDraggedItem] = useState(null);

  const handleDragStart = (e, index) => {
    setDraggedItem(OnlyTypeData[index]);
    e.currentTarget.style.opacity = "0.4";
  };

  const handleDragEnd = (e) => {
    e.currentTarget.style.opacity = "1";
    setDraggedItem(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const treadmillStepTwoClick = (workoutbuilderId) => {
    console.log("pressTreadmill");
    setBackToAddOrEditStepTwo("edit");
    sessionStorage.setItem("backToAddOrEditStepTwo", JSON.stringify("edit"));
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
    setWorkoutbuilderStepTwoId(workoutbuilderId);
    sessionStorage.setItem(
      "workoutbuilderStepTwoId",
      JSON.stringify(workoutbuilderId),
    );
  };

  //delete workoutbuilder id from database
  const deleteWorkoutIdToDBClick = (workoutbuilderId) => {
    //-有需要多一個verify modal？
    setErrStrArray([]);
    setErrStrArray((prev) => [
      ...prev,
      globalstate === "en" ? "delete successfully." : "已經刪除",
    ]);
    setIsModalOpen(true);
    const updatedSquares = OnlyTypeData.filter(
      (square) => square.workoutbuilderId !== workoutbuilderId,
    );
    console.log(updatedSquares);
    sessionStorage.setItem("OnlyTypeData", JSON.stringify(updatedSquares));
  };

  const handleDrop = (e, index) => {
    e.preventDefault();
    const newItems = [...OnlyTypeData];

    const draggedItemIndex = OnlyTypeData.findIndex(
      (item) => item.workoutbuilderId === draggedItem.workoutbuilderId,
    );

    // 移除拖曳的項目
    const [removedItem] = newItems.splice(draggedItemIndex, 1);
    // 插入到新的位置
    newItems.splice(index, 0, removedItem);

    // 重新設定 order
    newItems.forEach((item, idx) => {
      item.order = idx + 1; // 確保 order 是從 1 開始
    });

    // 存入 sessionStorage
    sessionStorage.setItem("OnlyTypeData", JSON.stringify(newItems));
  };
//!cell
// 手機觸控事件
const handleTouchStart = (e, index) => {
    const touch = e.touches[0];
    setDraggedItem(OnlyTypeData[index]);
    e.currentTarget.style.opacity = "0.4";
  };
  
  const handleTouchMove = (e) => {
    e.preventDefault(); // 防止頁面滾動
    const touch = e.touches[0];
    const elementUnderTouch = document.elementFromPoint(touch.clientX, touch.clientY);
    // 可選：根據需要實現動態反饋，例如高亮目標區域
  };
  
  const handleTouchEnd = (e, index) => {
    e.currentTarget.style.opacity = "1";
    const touch = e.changedTouches[0];
    const dropTarget = document.elementFromPoint(touch.clientX, touch.clientY);
    const dropIndex = OnlyTypeData.findIndex(
      (item) => item.workoutbuilderId === dropTarget?.closest('[draggable]')?.dataset.id
    );
  
    if (dropIndex !== -1 && dropIndex !== OnlyTypeData.indexOf(draggedItem)) {
      const newItems = [...OnlyTypeData];
      const [removedItem] = newItems.splice(OnlyTypeData.indexOf(draggedItem), 1);
      newItems.splice(dropIndex, 0, removedItem);
      newItems.forEach((item, idx) => (item.order = idx + 1));
      sessionStorage.setItem("OnlyTypeData", JSON.stringify(newItems));
    }
    setDraggedItem(null);
  };


  const workoutComponents = OnlyTypeData.sort((a, b) => a.order - b.order).map(
    (data) => {
      console.log("Logging data:", data.filename);

      return (
        <div
          key={data.workoutbuilderId.toString()}
          draggable
          onDragStart={(e) => handleDragStart(e, OnlyTypeData.indexOf(data))}
          onDragEnd={handleDragEnd}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, OnlyTypeData.indexOf(data))}
          className="h-[170rem] w-[300rem] cursor-move rounded-lg border bg-white p-3 transition-colors duration-200 hover:bg-gray-50"
        
          onTouchStart={(e) => handleTouchStart(e, OnlyTypeData.indexOf(data))}
    onTouchMove={handleTouchMove}
    onTouchEnd={(e) => handleTouchEnd(e, OnlyTypeData.indexOf(data))}
    data-id={data.workoutbuilderId} // 用於觸控時識別目標
        >
          <div className="mb-[8.9rem]   flex h-[170rem] w-[300rem] flex-col bg-[#fff] pl-[10rem]">
            <div className="mt-[7.4rem] text-[15rem] font-bold">
              {" "}
              {data.filename}
            </div>
            <div className="h-[52rem] text-[25rem] font-bold text-[#84bd00]">
              {data.totalValue}
            </div>
            <div className="flex justify-between">
              <div
                className="mb-[3rem] h-[15rem] text-[12rem]  "
                onClick={() => treadmillStepTwoClick(data.workoutbuilderId)}
              >
                Edit
              </div>
              <div
                className="mb-[3rem] mr-[10rem] h-[15rem] text-[12rem]"
                onClick={() => deleteWorkoutIdToDBClick(data.workoutbuilderId)}
              >
                Delete
              </div>
            </div>
          </div>
        </div>
      );
    },
  );
  console.log(type);
  //save
  const saveClick = () => {
    //save 有排序資料變動再傳save to db

    // workoutBuilderData(取出原始資料from session storage
    const workoutBuilderSessionData = JSON.parse(
      sessionStorage.getItem("OnlyTypeData"),
    );
    //phaseinfo
    const updatedWorkoutBuilderOrder = workoutBuilderSessionData.map(
      (item, index) => ({
        workoutbuilderId: item.workoutbuilderId,
        order: String(index + 1), // 使用索引 + 1 作為順序
        filename: item.filename,
        type: item.type,
        powrOrNot: item.powrOrNot,
        program_type: item.program_type,
        phaseinfo: item.phaseinfo,
        totalValue: item.totalValue,
      }),
    );

    //看要整個workoutbuilder  data change or only type & powrOrNot 同一組變動？
    //?合併到sessionWorkoutBuilderData 主資料
    // const filteredNoIDData = sessionWorkoutBuilderData
    //   ? sessionWorkoutBuilderData.filter(
    //       (item) => !(item.type === type && item.powrOrNot === category),
    //     )
    //   : [];

    // console.log(filteredNoIDData);
    // const updateSessionWorkoutBuilderData = [
    //   ...filteredNoIDData,
    //   ...updatedWorkoutBuilderOrder,
    // ];
    // console.log(updateSessionWorkoutBuilderData);

    // sessionStorage.setItem(
    //   "workoutBuilderData",
    //   JSON.stringify(updateSessionWorkoutBuilderData),
    // );
    // setSessionWorkoutBuilderData(updateSessionWorkoutBuilderData);
    //? need deleteId (一個/多個/全部/ ０)
    const filteredIDData = sessionWorkoutBuilderData
      ? sessionWorkoutBuilderData.filter(
          (item) => item.type === type && item.powrOrNot === category,
        )
      : [];
    console.log(filteredIDData);

    // Extract workout builder IDs from both arrays
    const updatedIDs = updatedWorkoutBuilderOrder.map(
      (item) => item.workoutbuilderId,
    );
    console.log(updatedIDs);

    const filteredIDs = filteredIDData.map((item) => item.workoutbuilderId);
    console.log(filteredIDs);

    // 找出所有需要刪除的 ID（存在 filteredIDs 但不存在 updatedIDs）
    const deleteIDs = filteredIDs.filter((id) => !updatedIDs.includes(id));

    console.log(deleteIDs);
    //?個別需要更新ｉｄ(一個/多個/全部/ ０)
    const needUpdateWorkouts = updatedWorkoutBuilderOrder.map((item) => ({
      workoutbuilderId: item.workoutbuilderId,
      data: { ...item },
    }));

    console.log(needUpdateWorkouts);
    //send to db
    //!（資料庫）找到type&powrOrNot 有哪 些id  只更新那些
    let sauser_accessToken = localStorage.getItem("sauser_accessToken");
    if (deleteIDs) {
      //delete deleteID map
      setDeleteWorkoutbuilder("init");
      deleteIDs.forEach((id) => {
        const dataJson = JSON.stringify({
          deleteWorkoutbuilder: {
            sauser_accessToken: sauser_accessToken,
            _id: id, // 使用迴圈中的id
          },
        });

        console.log(dataJson);

        if (ws) {
          ws.send(dataJson);
          console.log("send");
        } else {
          console.log("not send successfully");
        }
      });
    }

    if (needUpdateWorkouts) {
      setUpdateWorkoutbuilder("init");
      console.log(updateWorkoutbuilder);
      //update  updatedWorkoutBuilderOrder(id) map
      needUpdateWorkouts.forEach((item) => {
        const dataJson = JSON.stringify({
          updateWorkoutbuilder: {
            sauser_accessToken: sauser_accessToken,
            _id: item.workoutbuilderId, // 使用迴圈中的 id
            data: item.data,
          },
        });

        console.log(dataJson);

        if (ws) {
          ws.send(dataJson);
          console.log("send");
        } else {
          console.log("not send successfully");
        }
      });
    }

    //back page
    setCurrentScreen("workoutType");
    setCurrentSub1Screen("");

    let p = {
      currentScreen: "workoutType",
      currentSub1Screen: "",
    };
    sessionStorage.setItem("sauser_currentScreen", JSON.stringify(p));

    if (currentScreen !== "workoutType") {
      const stateData = {
        currentScreen: "workoutType",
      };
      const title = "";
      const encodedData = encodeURIComponent(JSON.stringify(stateData));
      const newUrl = `/?data=${encodedData}`;
      window.history.pushState(stateData, title, newUrl);
    }

    //clear

    sessionStorage.setItem("OnlyTypeData", JSON.stringify([]));
  };
  //back
  const backClick = () => {
    //back page
    setCurrentScreen("workoutType");
    setCurrentSub1Screen("");

    let p = {
      currentScreen: "workoutType",
      currentSub1Screen: "",
    };
    sessionStorage.setItem("sauser_currentScreen", JSON.stringify(p));

    if (currentScreen !== "workoutType") {
      const stateData = {
        currentScreen: "workoutType",
      };
      const title = "";
      const encodedData = encodeURIComponent(JSON.stringify(stateData));
      const newUrl = `/?data=${encodedData}`;
      window.history.pushState(stateData, title, newUrl);
    }
    //clear

    sessionStorage.setItem("OnlyTypeData", JSON.stringify([]));
  };
  //delete success show success modal and go to step01Page or show error modal
  //  useEffect(() => {
  //     if (deleteWorkout === "success") {
  //       setErrStrArray([]);
  //       setErrStrArray((prev) => [
  //         ...prev,
  //         globalstate === "en" ? "Delete successfully." : "刪除成功",
  //       ]);
  //       setIsModalOpen(true);
  //     } else if (deleteWorkout === "fail") {
  //       setErrStrArray([]);
  //       setErrStrArray((prev) => [
  //         ...prev,
  //         globalstate === "en" ? "Delete fail." : "刪除失敗",
  //       ]);
  //       setIsModalOpen(true);
  //     }
  //   }, [deleteWorkout]);
  return (
    <div className="slide-in-from-bottom h-dvh ">
      <div className="relative flex h-dvh   w-dvw items-center justify-center  bg-[#EFEFEF] pt-[57rem] text-darkColor  opacity-[.8] ">
        <Modal
          title={
            <div style={{ color: "orange", fontSize: "14rem" }} className=" ">
              Warning
            </div>
          }
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleOk}
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
              <li key={index} style={{ fontSize: "12rem" }}>
                {`${errStr}`}
              </li>
            ))}
          </ul>
        </Modal>
        {/* 子 */}
        <div
          style={{
            width: "calc(330rem)",
            height: "90%",
            maxHeight: "90%",
            backgroundColor: "#efefef", // 這個不要指定大小要由組件自己去決定
            color: "black",
            textAlign: "center",

            border: `2rem solid ${MAIN_COLOR}`,
          }}
          className=" overflow-auto  p-[calc(13rem)] text-[calc(14rem)]"
        >
          <div className="flex items-center justify-center text-[20rem]">
            {" "}
            {selected.type.toString().toUpperCase()}{" "}
            {selected.category.toString().toUpperCase()} WORKOUTS
          </div>
          {/* section */}
          {OnlyTypeData && OnlyTypeData.length > 0 ? (
            <div className="flex items-center justify-center">
              <div className="flex flex-wrap gap-36">{workoutComponents}</div>
            </div>
          ) : (
            <div className="text-[20rem]">尚無資料</div>
          )}
          <section className="mb-[25.5rem] mt-[22rem] flex w-[300rem] justify-around">
            <div
              style={{
                background: `linear-gradient(to top, #80c342, #bae642)`,
                lineHeight: "1rem",
              }}
              className="flex h-[49rem] w-[120rem] items-center justify-center border-[2rem] border-white text-[20rem] font-bold text-white"
              onClick={saveClick}
            >
              {globalstate === "en" ? (
                <span> Save</span>
              ) : (
                <span className="font-['Open_Sans']">儲存</span>
              )}
            </div>
            <div
              style={{
                background: `linear-gradient(to top, #80c342, #bae642)`,
                lineHeight: "1rem",
              }}
              className="flex h-[49rem] w-[120rem] items-center justify-center border-[2rem] border-white text-[20rem] font-bold text-white"
              onClick={backClick}
            >
              {globalstate === "en" ? (
                <span> Back</span>
              ) : (
                <span className="font-['Open_Sans']">上一頁</span>
              )}
            </div>
          </section>
        </div>
      </div>{" "}
      {currentSub2Screen === "createWorkoutStepTwo" && (
        <div className="slide-in-from-bottom">
          <EditPowrPage />
        </div>
      )}
    </div>
  );
}
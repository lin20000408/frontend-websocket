import { useState, useEffect, useRef, useContext, useCallback } from "react";
import { Row, Col, Button, Input, Modal } from "antd";

import { v4 as uuidv4 } from "uuid";
import { MAIN_COLOR, DARKBLACK_COLOR, BACKGROUND_COLOR } from "@/constants";

import Icon_Remove from "@/assets/icons/RemoveIcon.svg?react";

// 外部組件
//setTIME
import PowrellipticalSettime from "@/components/CreateWorkout/CreateWorkoutStepTwo/StepThree/SetTime/PowrellipticalSettime";
import PowrtreadmillSettime from "@/components/CreateWorkout/CreateWorkoutStepTwo/StepThree/SetTime/PowrtreadmillSettime";
import PowrcycleSettime from "@/components/CreateWorkout/CreateWorkoutStepTwo/StepThree/SetTime/PowrcycleSettime";
import PowrcrossTrainerSettime from "@/components/CreateWorkout/CreateWorkoutStepTwo/StepThree/SetTime/PowrcrossTrainerSettime";
import PowrrowerSettime from "@/components/CreateWorkout/CreateWorkoutStepTwo/StepThree/SetTime/PowrrowerSettime";
import PowrstepperSettime from "@/components/CreateWorkout/CreateWorkoutStepTwo/StepThree/SetTime/PowrstepperSettime";

import NaturaltreadmillSettime from "@/components/CreateWorkout/CreateWorkoutStepTwo/StepThree/SetTime/NaturaltreadmillSettime";
import NaturalellipticalSettime from "@/components/CreateWorkout/CreateWorkoutStepTwo/StepThree/SetTime/NaturalellipticalSettime";
import NaturalcycleSettime from "@/components/CreateWorkout/CreateWorkoutStepTwo/StepThree/SetTime/NaturalcycleSettime";
import NaturalcrossTrainerSettime from "@/components/CreateWorkout/CreateWorkoutStepTwo/StepThree/SetTime/NaturalcrossTrainerSettime";
import NaturalrowerSettime from "@/components/CreateWorkout/CreateWorkoutStepTwo/StepThree/SetTime/NaturalrowerSettime";
import NaturalstepperSettime from "@/components/CreateWorkout/CreateWorkoutStepTwo/StepThree/SetTime/NaturalstepperSettime";

//SETDISTANCE
import PowrtreadmillSetdistance from "@/components/CreateWorkout/CreateWorkoutStepTwo/StepThree/SetDistance/PowrtreadmillSetdistance";
import PowrellipticalSetdistance from "@/components/CreateWorkout/CreateWorkoutStepTwo/StepThree/SetDistance/PowrellipticalSetdistance";
import PowrcycleSetdistance from "@/components/CreateWorkout/CreateWorkoutStepTwo/StepThree/SetDistance/PowrcycleSetdistance";
import PowrcrossTrainerSetdistance from "@/components/CreateWorkout/CreateWorkoutStepTwo/StepThree/SetDistance/PowrcrossTrainerSetdistance";
import PowrrowerSetdistance from "@/components/CreateWorkout/CreateWorkoutStepTwo/StepThree/SetDistance/PowrrowerSetdistance";
import PowrstepperSetdistance from "@/components/CreateWorkout/CreateWorkoutStepTwo/StepThree/SetDistance/PowrstepperSetdistance";

import NaturaltreadmillSetdistance from "@/components/CreateWorkout/CreateWorkoutStepTwo/StepThree/SetDistance/NaturaltreadmillSetdistance";
import NaturalellipticalSetdistance from "@/components/CreateWorkout/CreateWorkoutStepTwo/StepThree/SetDistance/NaturalellipticalSetdistance";
import NaturalcycleSetdistance from "@/components/CreateWorkout/CreateWorkoutStepTwo/StepThree/SetDistance/NaturalcycleSetdistance";
import NaturalcrossTrainerSetdistance from "@/components/CreateWorkout/CreateWorkoutStepTwo/StepThree/SetDistance/NaturalcrossTrainerSetdistance";
import NaturalrowerSetdistance from "@/components/CreateWorkout/CreateWorkoutStepTwo/StepThree/SetDistance/NaturalrowerSetdistance";
import NaturalstepperSetdistance from "@/components/CreateWorkout/CreateWorkoutStepTwo/StepThree/SetDistance/NaturalstepperSetdistance";

//setCalories
import PowrtreadmillSetcalories from "@/components/CreateWorkout/CreateWorkoutStepTwo/StepThree/SetCalories/PowrtreadmillSetcalories";
import PowrellipticalSetcalories from "@/components/CreateWorkout/CreateWorkoutStepTwo/StepThree/SetCalories/PowrellipticalSetcalories";
import PowrcycleSetcalories from "@/components/CreateWorkout/CreateWorkoutStepTwo/StepThree/SetCalories/PowrcycleSetcalories";
import PowrcrossTrainerSetcalories from "@/components/CreateWorkout/CreateWorkoutStepTwo/StepThree/SetCalories/PowrcrossTrainerSetcalories";
import PowrrowerSetcalories from "@/components/CreateWorkout/CreateWorkoutStepTwo/StepThree/SetCalories/PowrrowerSetcalories";
import PowrstepperSetcalories from "@/components/CreateWorkout/CreateWorkoutStepTwo/StepThree/SetCalories/PowrstepperSetcalories";

import NaturaltreadmillSetcalories from "@/components/CreateWorkout/CreateWorkoutStepTwo/StepThree/SetCalories/NaturaltreadmillSetcalories";
import NaturalellipticalSetcalories from "@/components/CreateWorkout/CreateWorkoutStepTwo/StepThree/SetCalories/NaturalellipticalSetcalories";
import NaturalcycleSetcalories from "@/components/CreateWorkout/CreateWorkoutStepTwo/StepThree/SetCalories/NaturalcycleSetcalories";
import NaturalcrossTrainerSetcalories from "@/components/CreateWorkout/CreateWorkoutStepTwo/StepThree/SetCalories/NaturalcrossTrainerSetcalories";
import NaturalrowerSetcalories from "@/components/CreateWorkout/CreateWorkoutStepTwo/StepThree/SetCalories/NaturalrowerSetcalories";
import NaturalstepperSetcalories from "@/components/CreateWorkout/CreateWorkoutStepTwo/StepThree/SetCalories/NaturalstepperSetcalories";

//setwatts
import PowrtreadmillSetwatts from "@/components/CreateWorkout/CreateWorkoutStepTwo/StepThree/SetWatts/PowrtreadmillSetwatts";
import PowrellipticalSetwatts from "@/components/CreateWorkout/CreateWorkoutStepTwo/StepThree/SetWatts/PowrellipticalSetwatts";
import PowrcycleSetwatts from "@/components/CreateWorkout/CreateWorkoutStepTwo/StepThree/SetWatts/PowrcycleSetwatts";
import PowrcrossTrainerSetwatts from "@/components/CreateWorkout/CreateWorkoutStepTwo/StepThree/SetWatts/PowrcrossTrainerSetwatts";
import PowrrowerSetwatts from "@/components/CreateWorkout/CreateWorkoutStepTwo/StepThree/SetWatts/PowrrowerSetwatts";
import PowrstepperSetwatts from "@/components/CreateWorkout/CreateWorkoutStepTwo/StepThree/SetWatts/PowrstepperSetwatts";
//setLoop
import SetLoop from "@/components/CreateWorkout/CreateWorkoutStepTwo/StepThree/SetLoop/SetLoop";

import StepTwoBackButton from "@/components/CreateWorkout/CreateWorkoutStepTwo/StepTwoBackButton";
import StepTwoDeleteButton from "@/components/CreateWorkout/CreateWorkoutStepTwo/StepTwoDeleteButton";

// 模組化的引入

import { useNavigate } from "react-router-dom";
import { Content } from "@/App";
// css 的模組引入
import styles from "@/css/local.module.css";
import { log } from "@antv/g2plot/lib/utils";

// import { zIndex } from "html2canvas-pro/dist/types/css/property-descriptors/z-index";

const EditPowrPage = () => {
  // 全局
  const {
    backToAddOrEditStepTwo,
    setBackToAddOrEditStepTwo,
    squareId,
    setSquareId,
    sessionWorkoutBuilderData,
    setSessionWorkoutBuilderData,
    workoutbuilderStepTwoId,
    setWorkoutbuilderStepTwoId,
    squares,
    setSquares,
    stepOneToTwoWorkoutType,
    setStepOneToTwoWorkoutType,
    ecoPowr,

    ecoNatural,
    setEcoNatural,

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
    setSquareType,
    ws,
    setAddNewWorkoutbuilder,
    setUpdateWorkoutbuilder,
    updateWorkoutbuilder,
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

  const [workoutNaturalName, setWorkoutNaturalName] = useState("1");
  const [orderNatural, setOrderNatural] = useState("1");
  const [workoutName, setWorkoutName] = useState("workoutName");
  const [order, setOrder] = useState("1");
  const [boxType, setBoxType] = useState("");
  const [fileType, setFileType] = useState(stepOneToTwoWorkoutType);
  const [firstSelectedType, setFirstSelectedType] = useState("");
  const [powrOrNot, setPowrOrNot] = useState("powr");
  //-當第二次squareData 更新
  console.log(stepOneToTwoWorkoutType);

  useEffect(() => {
    // Load squares data from session storage on component mount

    if (backToAddOrEditStepTwo === "addStepThreeContent") {
      const storedSquares = sessionStorage.getItem("workoutSquares");
      console.log(storedSquares);
      setSquares(JSON.parse(storedSquares));
    }
  }, [backToAddOrEditStepTwo]);
  // 如果 sessionStorage 中的資料不存在，提前處理

  console.log(sessionWorkoutBuilderData);

  useEffect(() => {
    if (backToAddOrEditStepTwo === "edit") {
      //-當第一次workoutBuilderData 從edit按鈕點擊進來 & 當第一次squares 從edit按鈕點擊進來
      const workoutId = workoutbuilderStepTwoId;
      const data = sessionWorkoutBuilderData
        ? sessionWorkoutBuilderData.find(
            (workout) => workout.workoutbuilderId === workoutId,
          )
        : [];
      console.log(data);
      // 在 sessionWorkoutBuilderData 中尋找對應的 workout

      // 輸出結果

      // foundWorkout.phaseinfo＝單個filename裡面的program 陣列 ;Initialize squares based on the new structure
      const initialSquares = data.phaseinfo.map((phase) => ({
        id: phase.programId,
        type: phase.program_type,
        data: phase.programInfo,
      }));
      console.log(initialSquares);

      sessionStorage.setItem("workoutSquares", JSON.stringify(initialSquares));
      setSquares(initialSquares);
      setFileType(data.type);
      console.log(fileType);

      const programType =
        data.phaseinfo[0].program_type !== "loop"
          ? data.phaseinfo[0].program_type
          : null;
      console.log(programType);

      setBoxType(programType);
      setFirstSelectedType(programType);
      console.log();
      setPowrOrNot(data.powrOrNot);
      setWorkoutName(data.filename);
      setOrder(data.order);
      try {
        const squaresData = sessionStorage.getItem("workoutSquares");
        setSquares(JSON.parse(squaresData));

        // return squaresData ? JSON.parse(squaresData) : [];
      } catch (error) {
        console.error("讀取 userStrengthtHistory 失敗:", error);
        return [];
      }
    } else if (workoutbuilderStepTwoId&&backToAddOrEditStepTwo === "addStepThreeContent") {
      //workoutBuilderData edit更新過後或是addStepThreeContent 新增或更改all data save in session
      const data = sessionWorkoutBuilderData
        ? sessionWorkoutBuilderData.find(
            (workout) => workout.workoutbuilderId === workoutbuilderStepTwoId,
          )
        : [];
      setFileType(data.type);
      const tempUpdateWorkoutBuilderData = JSON.parse(
        sessionStorage.getItem("tempUpdateWorkoutBuilderData"),
      );
      setBoxType(tempUpdateWorkoutBuilderData.program_type);
      console.log(tempUpdateWorkoutBuilderData.program_type);

      setFirstSelectedType(tempUpdateWorkoutBuilderData.program_type);
      setPowrOrNot(tempUpdateWorkoutBuilderData.powrOrNot);
      setWorkoutName(tempUpdateWorkoutBuilderData.filename);
      setOrder(tempUpdateWorkoutBuilderData.order);
    }
  }, [backToAddOrEditStepTwo]);

  // 輸出結果

  //!全部

  //change powr natural

  const pressEcoPowr = () => {
    setPowrOrNot("powr");
  };

  const pressEcoNatural = () => {
    setPowrOrNot("natural");
  };

  //!only ecoPowr

  const changeWorkoutName = (e) => {
    setWorkoutName(e.target.value);
  };
  const changeOrder = (e) => {
    setOrder(e.target.value);
  };
  //?data:[] 如果原本有資料就放資料進去

  //初始化三個 state：
  //-squares：存儲方塊數據
  //- selectedSquareId：當前選中的方塊 ID
  //- firstSelectedType：第一個方塊的類型（如果有的話）

  const [selectedSquareId, setSelectedSquareId] = useState(null);

  console.log(firstSelectedType);
  const droppableRef = useRef(null);
  //判斷是否禁用某個類型的方塊：
  //-loop 類型永遠可用
  //-與第一個方塊相同類型的可用
  //-其他類型被禁用
  const isDisabled = useCallback(
    (type) => {
      console.log(firstSelectedType);

      if (type === "loop" || type === firstSelectedType) return false;
      if (firstSelectedType && type !== firstSelectedType) return true;
      return false;
    },
    [firstSelectedType],
  );

  //- 如果只有一個方塊且不是 loop 類型，設置它的類型為 firstSelectedType
  const handleDragStart = (e, type, id) => {
    if (squares.length >= 0 && type !== "loop") {
      setFirstSelectedType(type);
      console.log(firstSelectedType);
    }
    //如果本來沒有就新增type方型如果有就set session方型 id
    if (id) {
      e.dataTransfer.setData("application/reactflow", id);
    } else {
      e.dataTransfer.setData("text/plain", type);
    }
  };

  //處理拖動進入事件，改變放置區域的背景顏色。
  const handleDragEnter = (e) => {
    e.preventDefault();
    const droppableElement = droppableRef.current;
    if (droppableElement) {
      droppableElement.style.backgroundColor = "#e6e6e6";
    }
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    const droppableElement = droppableRef.current;
    if (droppableElement) {
      droppableElement.style.backgroundColor = "#f1f1f1";
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };
  const [renderTrigger, setRenderTrigger] = useState(0);
  //這樣當squares 陣列長度達到6 時，id="droppable" 的寬度會自動增加，可以容納更多的方塊。
  const handleDrop = (e) => {
    e.preventDefault();
    const droppableElement = droppableRef.current;
    //-取得可以接收拖放的目標dom元素
    //拖動時區塊會變顏色
    if (droppableElement) {
      droppableElement.style.backgroundColor = "#f1f1f1";
    }
    //從拖放事件中取得拖動的方塊的 ID
    const droppedId = e.dataTransfer.getData("application/reactflow");
    console.log(droppedId);
    //?已經生成droppedId（現有的方塊）
    if (droppedId) {
      const draggedSquareIndex = squares.findIndex((sq) => sq.id === droppedId);
      console.log(draggedSquareIndex);

      if (draggedSquareIndex === -1) return;
      //從 squares 中取得被拖動的方塊對象 draggedSquare，並生成一個 updatedSquares 陣列，這個新陣列去除了被拖動的方塊。
      const draggedSquare = squares[draggedSquareIndex];
      let updatedSquares = squares.filter((sq) => sq.id !== droppedId);
      //獲取當前鼠標的 X 座標（e.clientX），並將插入位置設置為當前 updatedSquares 陣列的長度（即插入在最後）。squareElements 取得目標區域內所有的方塊元素。
      const dropX = e.clientX;
      let insertIndex = updatedSquares.length;
      const squareElements = droppableRef.current.children;
      //通過遍歷 droppableRef.current.children 中的每個方塊元素，獲取它的邊界矩形（getBoundingClientRect()）。然後比較鼠標的 X 座標 (dropX) 是否小於當前方塊的中間點，從而確定插入點的位置。
      for (let i = 0; i < squareElements.length; i++) {
        const rect = squareElements[i].getBoundingClientRect();
        if (dropX < rect.left + rect.width / 2) {
          insertIndex = i;
          break;
        }
      }
      //根據 insertIndex 的值，將拖動的方塊插入到 updatedSquares 的正確位置。如果插入位置是最後一個位置，則使用 push 直接添加；如果是中間位置，則使用 splice 插入。
      if (insertIndex === updatedSquares.length) {
        updatedSquares.push(draggedSquare);
      } else {
        updatedSquares.splice(insertIndex, 0, draggedSquare);
      }
      //更新 state 和 sessionStorage      // 強制重新渲染
      setSquares(updatedSquares);
      sessionStorage.setItem("workoutSquares", JSON.stringify(updatedSquares));

      setRenderTrigger((prev) => prev + 1);
    } else {
      //?還沒生成droppedId
      // 新增的方塊（剛拖出來），則會根據 e.dataTransfer.getData("text") 提取方塊類型 type，並創建一個新的方塊 ID（根據該類型和已有的方塊數量）。新方塊會被添加到 updatedSquares 陣列中，並更新 squares 和 sessionStorage
      const type = e.dataTransfer.getData("text");
      const typeCount = squares
        .map((item) => parseInt(item.id.split("_")[1])) // 取得 "_" 後的數字並轉為整數
        .reduce((max, num) => Math.max(max, num), 0); // 找出最大值
      // 取出 id 後面數字的最大值
      const newId = `${type}_${typeCount + 1}`;
      console.log(newId);

      const newSquare = { id: newId, type: type, data: {} };
      const updatedSquares = [...squares, newSquare];
      setSquares(updatedSquares);
      sessionStorage.setItem("workoutSquares", JSON.stringify(updatedSquares));

      // 強制重新渲染
      setRenderTrigger((prev) => prev + 1);
    }
  };
  console.log(workoutbuilderStepTwoId);
  //go to step3 將id傳給step3 page
  const handleSquareClick = (id, type) => {
    setSelectedSquareId(id);
    setSquareType(type);

    console.log(type);

    setSquareId(id);
    const squaresValue = squares
      ? squares.filter((program) => program.id === id)
      : [];
    console.log(squaresValue);

    sessionStorage.setItem("squaresValue", JSON.stringify(squaresValue));
    sessionStorage.setItem("squareId", JSON.stringify(id));

    const maxOrderItem = filteredData
      ? filteredData.reduce(
          (max, item) => (Number(item.order) > Number(max.order) ? item : max),
          filteredData[0],
        )
      : {};
    const newOrder = maxOrderItem ? String(Number(maxOrderItem.order) + 1) : "";
    console.log(newOrder);

    console.log(workoutbuilderStepTwoId);
    //workoutBuilderData edit更新過後或是addStepThreeContent 新增或更改all data save in session
    const tempWorkoutBuilderData = {
      filename: workoutName,
      type: !workoutbuilderStepTwoId ? stepOneToTwoWorkoutType : fileType, //無法在此頁更改
      powrOrNot: powrOrNot,

      order: workoutbuilderStepTwoId ? order : newOrder ? newOrder : "1", //無法在此頁更改//原本有id ,原本沒有id但有其他值,原本沒有id也沒有其他值
      program_type: firstSelectedType,
    };
    console.log(tempWorkoutBuilderData);

    sessionStorage.setItem(
      "tempUpdateWorkoutBuilderData",
      JSON.stringify(tempWorkoutBuilderData),
    );
    console.log(`${powrOrNot}${fileType}Set${type}`);

    setCurrentScreen("workoutType");
    setCurrentSub1Screen("createWorkoutStepOne");
    setCurrentSub2Screen("createWorkoutStepTwo");
    setCurrentSub3Screen(`${powrOrNot}${fileType}Set${type}`);

    let p = {
      currentScreen: "workoutType",
      currentSub1Screen: "createWorkoutStepOne",
      currentSub2Screen: "createWorkoutStepTwo",
      currentSub3Screen: `${powrOrNot}${fileType}Set${type}`,
    };
    sessionStorage.setItem("sauser_currentScreen", JSON.stringify(p));

    if (currentSub3Screen !== `${powrOrNot}${fileType}Set${type}`) {
      const stateData = {
        currentScreen: "workoutType",
        currentSub1Screen: "createWorkoutStepOne",
        currentSub2Screen: "createWorkoutStepTwo",
        currentSub3Screen: `${powrOrNot}${fileType}Set${type}`,
      };
      const title = "";
      const encodedData = encodeURIComponent(JSON.stringify(stateData));
      const newUrl = `/?data=${encodedData}`;
      window.history.pushState(stateData, title, newUrl);
    }
  };

  //將所有square 資料暫存在sessionStorage

  //remove one id square and content
  const [removeModal, setRemoveModal] = useState(false);
  const [squareToRemove, setSquareToRemove] = useState(null);
  const handleRemoveSquare = (id) => {
    setRemoveModal(true);
    setSquareToRemove(id);
  };
  const deleteCancelClick = () => {
    setRemoveModal(false);
    setSquareToRemove(null);
  };

  const deleteConfirmClick = (e) => {
    // Prevent the click from bubbling up to the parent div
    // Remove the square from the state
    const updatedSquares = squares
      ? squares.filter((square) => square.id !== squareToRemove)
      : [];
    console.log(updatedSquares);

    setSquares(updatedSquares);
    // Update sessionStorage
    sessionStorage.setItem("workoutSquares", JSON.stringify(updatedSquares));
    setRemoveModal(false);
    setSquareToRemove(null);
    if (updatedSquares.length === 0) {
      setFirstSelectedType(null);
    }
  }; //savePowrToDBClick

  //! --------Natural workout management--------
  const changeNaturalWorkoutName = (e) => {
    setWorkoutNaturalName(e.target.value);
  };
  const changeNaturalOrder = (e) => {
    setOrderNatural(e.target.value);
  };

  const [selectedNaturalId, setSelectedNaturalId] = useState(null);
  const [naturals, setNaturals] = useState([]);
  const droppableNaturalRef = useRef(null);

  const handleNaturalDragStart = (e, type) => {
    e.dataTransfer.setData("text/plain", type);
  };

  const handleNaturalDragOver = (e) => {
    e.preventDefault();
  };

  const handleNaturalDrop = (e) => {
    e.preventDefault();
    const type = e.dataTransfer.getData("text");
    const typeCount = naturals.filter(
      (natural) => natural.type === type,
    ).length;
    const newId = `${type}${typeCount + 1}CreateWorkoutTreadmillNatural`;

    const newNatural = {
      id: newId,
      type: type,
      data: {},
    };

    if (naturals.length === 5) {
      droppableNaturalRef.current.style.width = "968rem";
    }

    const updatedNaturals = [...naturals, newNatural];
    setNaturals(updatedNaturals);
    sessionStorage.setItem("workoutNaturals", JSON.stringify(updatedNaturals));
  };
  const filteredData = sessionWorkoutBuilderData
    ? sessionWorkoutBuilderData.filter(
        (workout) =>
          workout.type ===
            (!workoutbuilderStepTwoId ? stepOneToTwoWorkoutType : fileType) &&
          workout.powrOrNot === powrOrNot,
      )
    : [];
  const handleNaturalClick = (id, type) => {
    setSelectedNaturalId(id);
    console.log(`${id} clicked with type: ${type}`);
    setCurrentScreen("workoutType");
    setCurrentSub1Screen("createWorkoutStepOne");
    setCurrentSub2Screen("createWorkoutStepTwo");
    setCurrentSub3Screen(`eCONaturalSet${type}`);

    let p = {
      currentScreen: "workoutType",
      currentSub1Screen: "createWorkoutStepOne",
      currentSub2Screen: "createWorkoutStepTwo",
      currentSub3Screen: `eCONaturalSet${type}`,
    };
    sessionStorage.setItem("sauser_currentScreen", JSON.stringify(p));

    if (currentSub3Screen !== `eCONaturalSet${type}`) {
      const stateData = {
        currentScreen: "workoutType",
        currentSub1Screen: "createWorkoutStepOne",
        currentSub2Screen: "createWorkoutStepTwo",
        currentSub3Screen: `eCONaturalSet${type}`,
      };
      const title = "";
      const encodedData = encodeURIComponent(JSON.stringify(stateData));
      const newUrl = `/?data=${encodedData}`;
      window.history.pushState(stateData, title, newUrl);
    }
  };

  useEffect(() => {
    const storedNaturals = sessionStorage.getItem("workoutNaturals");
    if (storedNaturals) {
      setNaturals(JSON.parse(storedNaturals));
    }
  }, []);

  const updateNaturalData = (data) => {
    const updatedNaturals = naturals.map((natural) =>
      natural.id === selectedNaturalId ? { ...natural, data: data } : natural,
    );
    setNaturals(updatedNaturals);
    sessionStorage.setItem("workoutNaturals", JSON.stringify(updatedNaturals));
  };

  const [removeNaturalModal, setRemoveNaturalModal] = useState(false);
  const handleRemoveNatural = (id) => {
    setRemoveNaturalModal(true);
    setSquareNaturalToRemove(id);
  };
  const deleteNaturalCancelClick = () => {
    setRemoveNaturalModal(false);
    setSquareNaturalToRemove(null);
  };
  const [squareNaturalToRemove, setSquareNaturalToRemove] = useState(null);
  const deleteNaturalConfirmClick = (e) => {
    e.stopPropagation(); // Prevent the click from bubbling up to the parent div
    // Remove the square from the state
    const updatedNaturals = naturals.filter(
      (natural) => natural.id !== squareNaturalToRemove,
    );
    setNaturals(updatedNaturals);
    // Update sessionStorage
    sessionStorage.setItem("workoutNaturals", JSON.stringify(updatedNaturals));
    setRemoveNaturalModal(false);
    setSquareNaturalToRemove(null);
  };

  //! --------全部--------
  //!需要判斷是否只有loop 必須要有其他四項其中一項
  const [newId, setNewId] = useState("");
  //   useEffect(() => {
  //     let generatedId;
  //     let isDuplicate = true;

  //     while (isDuplicate) {
  //       generatedId = Math.floor(Math.random() * 10000)
  //         .toString()
  //         .padStart(4, "0"); // 產生 4 碼數字
  //       isDuplicate = sessionWorkoutBuilderData
  //         ? sessionWorkoutBuilderData.some(
  //             (item) => item.workoutbuilderId === parseInt(generatedId),
  //           )
  //         : [];
  //     }

  //     setNewId(generatedId);
  //   }, []);

  console.log(powrOrNot);

  const savePowrToDBClick = (e) => {
    e.preventDefault();

    //latest  squares Data //!! Prepare 1.workoutBuilderData without phaseinfo & 2.data(squares or naturals) from sessionstorge to send 資料庫
    const squaresData = JSON.parse(sessionStorage.getItem("workoutSquares"));
    console.log(squaresData);

    setSquares(squaresData);

    console.log(squares);

    // workoutBuilderData(取出原始資料from session storage

    //phaseinfo
    const updatedWorkoutPhaseinfo = squaresData.map((item, index) => ({
      programId: item.id,
      order: String(index + 1), // 使用索引 + 1 作為順序
      program_type: item.type,
      programInfo: item.data,
    }));

    console.log(updatedWorkoutPhaseinfo);
    //-totalValue=(每個不是loop的squares的 programInfo .totalValue 加起來)*loop  的 programInfo .count
    const nonLoopItems = updatedWorkoutPhaseinfo.filter(
      (item) => item.program_type !== "loop",
    );
    console.log(nonLoopItems);

    // 使用 reduce() 方法計算總和
    const nonLoopTotalValueSum = nonLoopItems.reduce(
      (acc, current) => acc + Number(current.programInfo.totalValue),
      0,
    );
    console.log(nonLoopTotalValueSum);
    //不一定會有loop loop只會有一個
    const loopItems = updatedWorkoutPhaseinfo.filter(
      (item) => item.program_type === "loop",
    );
    // 從陣列中取出第一個元素（假設只有一個元素）
    const firstItem = loopItems ? loopItems[0] : null;
    // 再從該元素中取出 programInfo.count 的值
    const countValue = firstItem ? firstItem.programInfo.count : null;
    //如果沒有loop就不用
    const foundWorkoutTotalValue = countValue
      ? nonLoopTotalValueSum * countValue
      : nonLoopTotalValueSum;
    //type &powrOrNot多少順序

    const lowerType = fileType;

    // 使用 reduce 找出最大的 order 值
    const maxOrder = filteredData.reduce((max, item) => {
      const orderValue = parseInt(item.order, 10); // 確保 order 是數字
      return orderValue > max ? orderValue : max;
    }, 0); // 0 是初始值，確保當陣列為空時返回 0

    const newMaxOrder = String(maxOrder + 1); // 確保 order 還是字串

    //updated founddata object
    const updatedWorkout = {
      filename: workoutName,
      type: !workoutbuilderStepTwoId ? stepOneToTwoWorkoutType : fileType,
      powrOrNot: powrOrNot,
      order: workoutbuilderStepTwoId ? order : newMaxOrder ? newMaxOrder : "1",
      program_type: firstSelectedType,
      phaseinfo: updatedWorkoutPhaseinfo, // 刪除原本的 phaseinfo
      totalValue: String(foundWorkoutTotalValue),
    };

    console.log(updatedWorkout);

    // //all data session array
    // const filteredMatrix = sessionWorkoutBuilderData
    //   ? sessionWorkoutBuilderData.filter(
    //       (item) => item.workoutbuilderId !== workoutbuilderStepTwoId,
    //     )
    //   : [];
    // //全部
    // console.log(filteredMatrix);

    // const updateAllData = [...filteredMatrix, ...[updatedWorkout]];

    // setSessionWorkoutBuilderData(updateAllData);
    // sessionStorage.setItem("workoutBuilderData", JSON.stringify(updateAllData));
    // console.log(updateAllData);
    // console.log(workoutbuilderStepTwoId);

    //!send updatedWorkout資料庫// 如果原本有id 就更改(api:update) 新的id就新增(api:add)
    if (workoutbuilderStepTwoId === "") {
      //api:add
      console.log("11");
      setAddNewWorkoutbuilder("init");
      let sauser_accessToken = localStorage.getItem("sauser_accessToken");
      const dataJson = JSON.stringify({
        addNewWorkoutbuilder: {
            sauser_accessToken:sauser_accessToken,
          data: updatedWorkout,
        },
      });
      console.log(dataJson);

      if (ws) {
        ws.send(dataJson);
        console.log("send");
      } else {
        console.log("not send successfully");
      }
    } else {
      //更改(api:update)
      setUpdateWorkoutbuilder("init");
      console.log(updateWorkoutbuilder);
      let data = localStorage.getItem("sauser_accessToken");
      const dataJson = JSON.stringify({
        updateWorkoutbuilder: {
          sauser_accessToken: data,
          _id: workoutbuilderStepTwoId,
          data: updatedWorkout,
        },
      });

      if (ws) {
        ws.send(dataJson);
        console.log(dataJson);
      } else {
        console.log("not send successfully");
      }
    }
    // Navigate back to workoutType
    console.log("Returning to workoutType");
    const newScreenState = {
      currentScreen: "workoutType",
      currentSub1Screen: "",
      currentSub2Screen: "",
    };
    setCurrentScreen(newScreenState.currentScreen);
    setCurrentSub1Screen(newScreenState.currentSub1Screen);
    setCurrentSub2Screen(newScreenState.currentSub2Screen);

    // Update sessionStorage and URL
    sessionStorage.setItem(
      "sauser_currentScreen",
      JSON.stringify(newScreenState),
    );
    const encodedData = encodeURIComponent(JSON.stringify(newScreenState));
    const newUrl = `/?data=${encodedData}`;
    window.history.pushState(newScreenState, "", newUrl);

    // Clear states and sessionStorage
    setBackToAddOrEditStepTwo("init");
    sessionStorage.setItem("backToAddOrEditStepTwo", JSON.stringify("init"));
    setSquares([]);
    setNaturals([]);
    setWorkoutbuilderStepTwoId("");
    setSquareId("");
    setStepOneToTwoWorkoutType("");
    sessionStorage.removeItem("workoutSquares");
    sessionStorage.removeItem("workoutNaturals");
    sessionStorage.removeItem("tempUpdateWorkoutBuilderData");
    sessionStorage.removeItem("workoutbuilderStepTwoId");
    console.log("All workout data has been cleared");
  };

  //backclick
  const [backModal, setBackModal] = useState(false);
  const backToStep1Click = () => {
    setBackModal(true);
  };
  const backToStep1ClickCancel = () => {
    setBackModal(false);
  };
  const backToStep1ClickConfirm = (e) => {
    e.stopPropagation(); // Prevent the click from bubbling up to the parent div

    console.log("Returning to step1");
    const newScreenState = {
      currentScreen: "workoutType",
      currentSub1Screen: "",
      currentSub2Screen: "",
    };
    setCurrentScreen(newScreenState.currentScreen);
    setCurrentSub1Screen(newScreenState.currentSub1Screen);
    setCurrentSub2Screen(newScreenState.currentSub2Screen);

    // Update sessionStorage and URL
    sessionStorage.setItem(
      "sauser_currentScreen",
      JSON.stringify(newScreenState),
    );
    const encodedData = encodeURIComponent(JSON.stringify(newScreenState));
    const newUrl = `/?data=${encodedData}`;
    window.history.pushState(newScreenState, "", newUrl);

    // Clear states and sessionStorage
    setBackToAddOrEditStepTwo("init");
    sessionStorage.setItem("backToAddOrEditStepTwo", JSON.stringify("init"));
    setSquares([]);
    setNaturals([]);
    setWorkoutbuilderStepTwoId("");
    setSquareId("");
    setStepOneToTwoWorkoutType("");
    sessionStorage.removeItem("workoutbuilderStepTwoId");
    sessionStorage.removeItem("workoutSquares");
    sessionStorage.removeItem("workoutNaturals");
    sessionStorage.removeItem("tempUpdateWorkoutBuilderData");
    console.log("All workout data has been cleared");
  };
  const dragType =
    powrOrNot === "powr"
      ? ["time", "distance", "calories", "watts", "loop"]
      : ["time", "distance", "calories", "loop"];

  return (
    <div
      className="flex    h-dvh w-dvw min-w-[367rem] items-center justify-center bg-white 

      "
    >
      <div
        style={{
          height: `97%`,
          overflow: "auto",
          width: "calc(100dvw* 0.96)",
          // backgroundColor: BACKGROUND_COLOR,
          fontSize: "16rem",
          color: "black",
          border: "2rem solid #84bd00",
          textAlign: "center",
        }}
        className="bg-white  pt-[1rem]   "
      >
        <Row justify={"center"}>
          <Col className="mt-[8rem] h-[49rem] text-[20rem]">
            <div
              className="text-[20rem] font-bold leading-[21rem]"
              style={{ letterSpacing: "1.5rem" }}
            >
              CREATE YOUR
            </div>
            <div
              className="text-[20rem] font-bold  leading-[21rem] "
              style={{ letterSpacing: "1.5rem" }}
            >
              {backToAddOrEditStepTwo === "edit"
                ? fileType.toString().toUpperCase()
                : stepOneToTwoWorkoutType.toString().toUpperCase()}{" "}
              WORKOUT
            </div>
          </Col>
        </Row>
        <Row justify={"center"} className="mb-[29rem] mt-[10rem]">
          <Col
            style={{ textAlign: "center", marginRight: "30rem" }}
            onClick={pressEcoPowr}
          >
            <div
              style={{
                color: `${powrOrNot === "powr" ? MAIN_COLOR : DARKBLACK_COLOR}`,
                borderBottom: `2rem solid ${powrOrNot === "powr" ? MAIN_COLOR : "transparent"}`,
              }}
              className=" h-[26rem]"
            >
              <div className="text-[18rem] font-semibold ">
                ECO-POWR™
                {/* 上標字, span 包在div內成一整體 */}
              </div>
            </div>
          </Col>

          <Col
            style={{
              textAlign: "center",
              color: `${powrOrNot === "natural" ? MAIN_COLOR : DARKBLACK_COLOR}`,
              borderBottom: `2rem solid ${powrOrNot === "natural" ? MAIN_COLOR : "transparent"}`,
            }}
            className=" h-[26rem]"
            onClick={pressEcoNatural}
          >
            <div className="text-[18rem] font-semibold ">ECO-NATURAL™</div>
          </Col>
        </Row>

        <div className="flex flex-col  items-center justify-center">
          {" "}
          {/* changeWorkoutName */}
          <div className="mt-4 flex flex-row justify-evenly gap-[10rem]">
            {/* 左邊那一塊 子1 */}
            <div className="flex items-center text-[14rem] ">
              <div style={{ letterSpacing: "2rem" }} className="text-[12rem]">
                {" "}
                WORKOUT NAME
              </div>
              {/* <div style={{ letterSpacing: "2rem" }}></div> */}
              <div
                style={{
                  color: "black",
                  width: "166rem",
                  height: "42rem",
                  border: "2rem solid #84bd00",
                  textAlign: "center",
                  // lineHeight: '42rem',
                  margin: "auto 0",
                  display: "flex",
                }}
              >
                <Input
                  value={workoutName}
                  maxLength={"32rem"}
                  type="text"
                  variant="borderless"
                  style={{
                    textAlign: "center",
                    fontSize: "14rem",
                  }}
                  className="font-semibold"
                  placeholder="Treadmill intervals"
                  onChange={changeWorkoutName}
                />
              </div>
            </div>

            {/* 右邊那一塊 (子2)*/}
          </div>
          {/*  */}
          <Row
            justify={"center"}
            style={{ marginTop: "30.2rem", marginBottom: "10rem" }}
          >
            <Col
              style={{ letterSpacing: "2rem" }}
              className="text-[16rem]"
              span={"24rem"}
            >
              WORKOUT PHASES
            </Col>
          </Row>
          {/* 具備水平捲動的功能 -> 拖曳時一次會出現兩個是因為它在嚴格模式下沒有關係係 
        shrink-0 不壓縮
        */}
          {/* 父 */}
          <div
            style={{
              display: "flex",
              height: "85rem",
              width: "90%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              className={styles.invisibleScrollbar}
              style={{
                marginRight: "10rem",
                display: "flex",
                height: "100%",
                width: "640rem",
                alignItems: "center",
                justifyContent: "space-evenly",
                overflow: "auto",
                overflowY: "hidden",
              }}
              //   className="mr-[10rem] flex h-[100%] w-[640rem] items-center justify-evenly gap-4 overflow-auto"
            >
              {dragType.map((type, index) => (
                <div
                  key={index}
                  draggable={!isDisabled(type)}
                  onDragStart={(e) => handleDragStart(e, type)}
                  className="flex h-[70rem] w-[131rem] shrink-0 items-center justify-center border-2 border-mainColor font-bold"
                  style={{
                    cursor: isDisabled(type) ? "not-allowed" : "move",
                    opacity: isDisabled(type) ? 0.5 : 1,
                  }}
                >
                  {type}
                </div>
              ))}
            </div>
          </div>
          <Row justify={"center"} style={{ marginTop: "29.9rem" }}>
            <Col span={"24rem"} className="text-[16rem]">
              <div style={{ letterSpacing: "2rem" }}>
                {" "}
                DRAG WORKOUT PHASES HERE
              </div>
              <div style={{ letterSpacing: "2rem" }}>
                {" "}
                TO BUILD YOUR WORKOUT
              </div>
            </Col>
          </Row>
          {/* 水平捲動虛框 */}
          <div
            style={{ overflow: "auto", width: "90%" }}
            className={styles.invisibleScrollbar}
          >
            <div
              id="droppable"
              ref={droppableRef}
              onDragOver={handleDragOver}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              style={{
                display: "flex",
                width: "838rem",
                height: "140rem",
                borderLeft: "4rem dotted #84BD00",
                borderTop: "4rem dotted #84BD00",
                borderBottom: "4rem dotted #84BD00",
                backgroundColor: "#f1f1f1",

                color: "black",
                overflowX: "auto",
                whiteSpace: "nowrap", // 设置为nowrap以确保子元素在一行内排列
                flexDirection: "row",
                flexWrap: "nowrap", // 设置为nowrap以确保子元素在一行内排列
                marginTop: "8.8rem",
                position: "relative",
              }}
              className="flex items-center"
            >
              {squares
                ? squares.map((square) => (
                    <div
                      key={square.id || ""}
                      draggable={!isDisabled(square.type || "")}
                      onDragStart={(e) =>
                        handleDragStart(e, square.type || "", square.id || "")
                      }
                      style={{
                        position: "relative",
                        opacity: isDisabled(square.type || "") ? 0.5 : 1,
                        cursor: isDisabled(square.type || "")
                          ? "not-allowed"
                          : "move",
                      }}
                    >
                      <div
                        style={{
                          width: "130rem",
                          height: "119rem",
                          backgroundColor: "white",
                          margin: "0 5rem",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,

                          border: "2rem #84BD00 solid",
                          zIndex: "0",
                        }}
                        onClick={() =>
                          handleSquareClick(square.id || "", square.type || "")
                        } // 設置 onClick 事件
                      >
                        <div className="flex flex-col">
                          <div className="h-[16rem] text-[16rem] font-bold">
                            {square.type || ""}
                          </div>
                          {/* map顯示step3資料 */}
                          {Object.entries(square.data || "")
                            .slice(0)
                            .map(([key, value]) => (
                              <p
                                key={key}
                                className="h-[14rem] text-[14rem] font-bold"
                              >
                                {value}
                              </p>
                            ))}
                        </div>
                      </div>
                      <div style={{ zIndex: "100" }}>
                        {" "}
                        <Icon_Remove
                          style={{
                            position: "absolute",
                            bottom: "5rem", // Adjust as needed for spacing
                            right: "10rem", // Adjust as needed for spacing
                            width: "17rem",
                            height: "17rem",
                          }}
                          onClick={() => handleRemoveSquare(square.id || "")}
                        />
                      </div>
                    </div>
                  ))
                : []}
              {/* display:'none' 它佔空間也可以讀出來但是不顯示 */}
              <div
                id="ecoworkout"
                data-reserved="rerserved"
                style={{ display: "none" }}
              >
                {" "}
              </div>
            </div>
          </div>
        </div>

        <Row wrap={false} style={{ marginTop: "30rem" }}>
          <Col
            // onClick={pressSaveWorkout}
            style={{
              lineHeight: "49rem",
              width: "208rem",
              height: "49rem",
              // backgroundColor: '#84bd00',
              border: "white solid 2rem",
              background: `linear-gradient(to right, #80c342, #bae642)`,
              fontSize: "20rem",
              marginRight: "14rem",
              marginLeft: "14rem",
              color: "#fff",
            }}
            className="font-bold"
            onClick={savePowrToDBClick}
          >
            SAVE WORKOUT
          </Col>

          <Col
            // onClick={pressBack}
            style={{
              fontSize: "20rem",
              lineHeight: "49rem",
              width: "102rem ",
              height: "49rem",
              color: "#fff",
              border: "white solid 2rem",
              background: `linear-gradient(to right, #80c342, #bae642)`,
            }}
            onClick={backToStep1Click}
            className="font-bold"
          >
            BACK
          </Col>
        </Row>
        <Row className="h-[80rem]">
          <Col></Col>
        </Row>
        {removeModal && (
          <div className="slide-in-from-bottom h-dvh">
            <StepTwoDeleteButton
              deleteConfirmClick={deleteConfirmClick}
              deleteCancelClick={deleteCancelClick}
            />
          </div>
        )}
        {removeNaturalModal && (
          <div className="slide-in-from-bottom h-dvh">
            <StepTwoDeleteButton
              deleteConfirmClick={deleteNaturalConfirmClick}
              deleteCancelClick={deleteNaturalCancelClick}
            />
          </div>
        )}
        {backModal && (
          <div className="slide-in-from-bottom h-dvh">
            <StepTwoBackButton
              backToStep1ClickCancel={backToStep1ClickCancel}
              backToStep1ClickConfirm={backToStep1ClickConfirm}
            />
          </div>
        )}
      </div>

      <div>
        {/* FIXME:time */}
        {currentSub3Screen === "powrtreadmillSettime" && (
          <div className="slide-in-from-bottom">
            <PowrtreadmillSettime squareId={selectedSquareId} />
          </div>
        )}
        {currentSub3Screen === "powrellipticalSettime" && (
          <div className="slide-in-from-bottom">
            <PowrellipticalSettime squareId={selectedSquareId} />
          </div>
        )}
        {currentSub3Screen === "powrcycleSettime" && (
          <div className="slide-in-from-bottom">
            <PowrcycleSettime /> squareId={selectedSquareId}
          </div>
        )}

        {currentSub3Screen === "powrcrossTrainerSettime" && (
          <div className="slide-in-from-bottom">
            <PowrcrossTrainerSettime squareId={selectedSquareId} />
          </div>
        )}
        {currentSub3Screen === "powrrowerSettime" && (
          <div className="slide-in-from-bottom">
            <PowrrowerSettime squareId={selectedSquareId} />
          </div>
        )}
        {currentSub3Screen === "powrstepperSettime" && (
          <div className="slide-in-from-bottom">
            <PowrstepperSettime squareId={selectedSquareId} />
          </div>
        )}

        {/* natural */}

        {currentSub3Screen === "naturaltreadmillSettime" && (
          <div className="slide-in-from-bottom">
            <NaturaltreadmillSettime squareId={selectedSquareId} />
          </div>
        )}
        {currentSub3Screen === "naturalellipticalSettime" && (
          <div className="slide-in-from-bottom">
            <NaturalellipticalSettime squareId={selectedSquareId} />
          </div>
        )}
        {currentSub3Screen === "naturalcycleSettime" && (
          <div className="slide-in-from-bottom">
            <NaturalcycleSettime squareId={selectedSquareId} />
          </div>
        )}

        {currentSub3Screen === "naturalcrossTrainerSettime" && (
          <div className="slide-in-from-bottom">
            <NaturalcrossTrainerSettime squareId={selectedSquareId} />
          </div>
        )}
        {currentSub3Screen === "naturalrowerSettime" && (
          <div className="slide-in-from-bottom">
            <NaturalrowerSettime squareId={selectedSquareId} />
          </div>
        )}
        {currentSub3Screen === "naturalstepperSettime" && (
          <div className="slide-in-from-bottom">
            <NaturalstepperSettime squareId={selectedSquareId} />
          </div>
        )}
        {/* FIXME:distance */}
        {currentSub3Screen === "powrtreadmillSetdistance" && (
          <div className="slide-in-from-bottom">
            <PowrtreadmillSetdistance squareId={selectedSquareId} />
          </div>
        )}
        {currentSub3Screen === "powrellipticalSetdistance" && (
          <div className="slide-in-from-bottom">
            <PowrellipticalSetdistance squareId={selectedSquareId} />
          </div>
        )}
        {currentSub3Screen === "powrcycleSetdistance" && (
          <div className="slide-in-from-bottom">
            <PowrcycleSetdistance squareId={selectedSquareId} />
          </div>
        )}

        {currentSub3Screen === "powrcrossTrainerSetdistance" && (
          <div className="slide-in-from-bottom">
            <PowrcrossTrainerSetdistance squareId={selectedSquareId} />
          </div>
        )}
        {currentSub3Screen === "powrrowerSetdistance" && (
          <div className="slide-in-from-bottom">
            <PowrrowerSetdistance squareId={selectedSquareId} />
          </div>
        )}
        {currentSub3Screen === "powrstepperSetdistance" && (
          <div className="slide-in-from-bottom">
            <PowrstepperSetdistance squareId={selectedSquareId} />
          </div>
        )}
        {/* natural */}
        <div>
          {currentSub3Screen === "naturaltreadmillSetdistance" && (
            <div className="slide-in-from-bottom">
              <NaturaltreadmillSetdistance squareId={selectedSquareId} />
            </div>
          )}
          {currentSub3Screen === "naturalellipticalSetdistance" && (
            <div className="slide-in-from-bottom">
              <NaturalellipticalSetdistance squareId={selectedSquareId} />
            </div>
          )}
          {currentSub3Screen === "naturalcycleSetdistance" && (
            <div className="slide-in-from-bottom">
              <NaturalcycleSetdistance squareId={selectedSquareId} />
            </div>
          )}

          {currentSub3Screen === "naturalcrossTrainerSetdistance" && (
            <div className="slide-in-from-bottom">
              <NaturalcrossTrainerSetdistance squareId={selectedSquareId} />
            </div>
          )}
          {currentSub3Screen === "naturalrowerSetdistance" && (
            <div className="slide-in-from-bottom">
              <NaturalrowerSetdistance squareId={selectedSquareId} />
            </div>
          )}
          {currentSub3Screen === "naturalstepperSetdistance" && (
            <div className="slide-in-from-bottom">
              <NaturalstepperSetdistance squareId={selectedSquareId} />
            </div>
          )}
          {/* FIXME:calories */}
          {currentSub3Screen === "powrtreadmillSetcalories" && (
            <div className="slide-in-from-bottom">
              <PowrtreadmillSetcalories squareId={selectedSquareId} />
            </div>
          )}
          {currentSub3Screen === "powrellipticalSetcalories" && (
            <div className="slide-in-from-bottom">
              <PowrellipticalSetcalories squareId={selectedSquareId} />
            </div>
          )}
          {currentSub3Screen === "powrcycleSetcalories" && (
            <div className="slide-in-from-bottom">
              <PowrcycleSetcalories squareId={selectedSquareId} />
            </div>
          )}

          {currentSub3Screen === "powrcrossTrainerSetcalories" && (
            <div className="slide-in-from-bottom">
              <PowrcrossTrainerSetcalories squareId={selectedSquareId} />
            </div>
          )}
          {currentSub3Screen === "powrrowerSetcalories" && (
            <div className="slide-in-from-bottom">
              <PowrrowerSetcalories squareId={selectedSquareId} />
            </div>
          )}
          {currentSub3Screen === "powrstepperSetcalories" && (
            <div className="slide-in-from-bottom">
              <PowrstepperSetcalories squareId={selectedSquareId} />
            </div>
          )}
          {/* natural */}
          <div>
            {currentSub3Screen === "naturaltreadmillSetcalories" && (
              <div className="slide-in-from-bottom">
                <NaturaltreadmillSetcalories squareId={selectedSquareId} />
              </div>
            )}
            {currentSub3Screen === "naturalellipticalSetcalories" && (
              <div className="slide-in-from-bottom">
                <NaturalellipticalSetcalories squareId={selectedSquareId} />
              </div>
            )}
            {currentSub3Screen === "naturalcycleSetcalories" && (
              <div className="slide-in-from-bottom">
                <NaturalcycleSetcalories squareId={selectedSquareId} />
              </div>
            )}

            {currentSub3Screen === "naturalcrossTrainerSetcalories" && (
              <div className="slide-in-from-bottom">
                <NaturalcrossTrainerSetcalories squareId={selectedSquareId} />
              </div>
            )}
            {currentSub3Screen === "naturalrowerSetcalories" && (
              <div className="slide-in-from-bottom">
                <NaturalrowerSetcalories squareId={selectedSquareId} />
              </div>
            )}
            {currentSub3Screen === "naturalstepperSetcalories" && (
              <div className="slide-in-from-bottom">
                <NaturalstepperSetcalories squareId={selectedSquareId} />
              </div>
            )}
            {/* FIXME:watts */}
            {currentSub3Screen === "powrtreadmillSetwatts" && (
              <div className="slide-in-from-bottom">
                <PowrtreadmillSetwatts squareId={selectedSquareId} />
              </div>
            )}
            {currentSub3Screen === "powrellipticalSetwatts" && (
              <div className="slide-in-from-bottom">
                <PowrellipticalSetwatts squareId={selectedSquareId} />
              </div>
            )}
            {currentSub3Screen === "powrcycleSetwatts" && (
              <div className="slide-in-from-bottom">
                <PowrcycleSetwatts squareId={selectedSquareId} />
              </div>
            )}

            {currentSub3Screen === "powrcrossTrainerSetwatts" && (
              <div className="slide-in-from-bottom">
                <PowrcrossTrainerSetwatts squareId={selectedSquareId} />
              </div>
            )}
            {currentSub3Screen === "powrrowerSetwatts" && (
              <div className="slide-in-from-bottom">
                <PowrrowerSetwatts squareId={selectedSquareId} />
              </div>
            )}
            {currentSub3Screen === "powrstepperSetwatts" && (
              <div className="slide-in-from-bottom">
                <PowrstepperSetwatts squareId={selectedSquareId} />
              </div>
            )}
            {/* FIXME:loop */}
            {(currentSub3Screen === "powrtreadmillSetloop" ||
              currentSub3Screen === "powrellipticalSetloop" ||
              currentSub3Screen === "powrcycleSetloop" ||
              currentSub3Screen === "powrcrossTrainerSetloop" ||
              currentSub3Screen === "powrrowerSetloop" ||
              currentSub3Screen === "powrstepperSetloop" ||
              currentSub3Screen === "naturaltreadmillSetloop" ||
              currentSub3Screen === "naturalellipticalSetloop" ||
              currentSub3Screen === "naturalcyclelSetloop" ||
              currentSub3Screen === "naturalcrossTrainerSetloop" ||
              currentSub3Screen === "naturalrowerSetloop" ||
              currentSub3Screen === "naturalstepperSetloop") && (
              <div className="slide-in-from-bottom">
                <SetLoop squareId={selectedSquareId} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default EditPowrPage;

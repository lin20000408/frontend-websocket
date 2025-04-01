//menu
import {
  SyncOutlined,
  UserOutlined,
  CaretDownOutlined,
  DownOutlined,
} from "@ant-design/icons";
import { axiosPost, axiosGet } from "@/components/Axios";
import { Avatar, Col, Row, Space, Dropdown, Button, Select } from "antd";
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  CSSProperties,
} from "react";
import React from "react";
import { v4 as uuidv4 } from "uuid";

// from 0 to n
import _About from "@/components/About";
import _Contact from "@/components/Contact";

import _TermsAndPrivacy from "@/components/TermsAndPrivacy";
import Faq from "@/components/FAQ";
import _Results from "@/components/Results";

// import _WorkoutLog from "@/components/WorkoutLog";
import _UserGetWorkoutData from "@/components/UserGetWorkoutData";

import WorkoutBuilder from "@/components/CreateWorkout";
import _Dashboard from "@/components/Dashboard";
import _AccountDetails from "@/components/ProfileSettings";
import _QuickConnect from "@/components/QuickConnect";
import _Rewards from "@/components/Rewards";
import WeightGraphTime from "@/components/WeightGraph/WeightGraphTime";
import Logo from "@/assets/logo/Power.svg?react";
import Close from "@/assets/icons/RemoveIcon.svg?react";
import Icon from "@ant-design/icons/lib/components/Icon";
import Icon_QuickConnect from "@/assets/icons/ConnectIcon.svg";
import Icon_Dashboard from "@/assets/icons/DashboardIcon.svg";
import Icon_Help from "@/assets/icons/HelpIcon.svg";
import Icon_Logout from "@/assets/icons/LogoutIcon.svg";
import Icon_Menu from "@/assets/icons/MenuIcon.svg";
import Icon_ProfileSettings from "@/assets/icons/ProfileIcon.svg";
import Icon_Results from "@/assets/icons/ResultsIcon.svg";
import Icon_Language from "@/assets/icons/Language.svg";
import Icon_WeightGraph from "@/assets/icons/WeightGraphIcon.svg";
import Icon_WorkoutBuilder from "@/assets/icons/WorkoutBuilderIcon.svg";
import Icon_WorkoutLog from "@/assets/icons/WorkoutLogIcon.svg";
import Icon_Rewards from "@/assets/icons/Rewards.svg";
import DefaultAvatar from "@/assets/avatar/DefaultAvatar.svg";
import allWorkoutBuilderData from "@/components/CreateWorkout/AllWorkoutBuilderData";
//
// import Icon_Logout from '@/assets/images/common/Logout.svg';
import {
  BACKGROUND_COLOR,
  DARKBLACK_COLOR,
  MAIN_COLOR,
  MEDIUMGRAY_COLOR,
} from "@/constants";

import { Content } from "@/App";
import { GlobalStateContext } from "@/App";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
// css 的模組引入
import styles from "@/css/local.module.css";
import { NAVIBAR_SIZE } from "../../constants";
import { FormattedMessage } from "react-intl";
import { IntlManager } from "@/components/IntlManager";
// const base64Data =

const Menu = () => {
  const { globalstate } = useContext(GlobalStateContext);

  let navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [open, setOpen] = useState(false); // 一進來就打開
  const [helpState, setHelpState] = useState(false);

  const {
    ws,

    // pwa

    //
    setActiveScreen,
    retSetUserProfileState,
    setRetSetUserProfileState,
    // Scale
    scaleH,
    setScaleH,
    scaleV,
    setScaleV,
    isPortrait,
    setIsPortrait,

    // Connect
    isLogin,
    setIsLogin,
    isSupportLocalStorage,
    setIsSupportLocalStorage,
    socketio,
    setSocketio,
    connectState,
    setConnectState,

    userProfile,
    setUserProfile,
    currentScreen,
    setCurrentScreen,
    currentSub1Screen,
    setCurrentSub1Screen,
    refreshToken,
    //mac
    mac,
    setMac,
    macErr,
    setMacErr,

    //
    rememberMe,
    setRememberMe,
    logout,
    setLogout,
    setIsClickOpCode,
    setSessionWorkoutBuilderData,
    sessionWorkoutBuilderData,
    deleteWorkoutbuilder,
    setDeleteWorkoutbuilder,
    addNewWorkoutbuilder,
    setAddNewWorkoutbuilder,
    updateWorkoutbuilder,
    setUpdateWorkoutbuilder,
  } = useContext(Content);

  const { setGlobalState } = useContext(GlobalStateContext);
  // console.log('currentScreen [menu] = ', currentScreen)
  // console.log('currentSub1Screen [menu] = ', currentSub1Screen)
  const handleChange = (value) => {
    setGlobalState(value);
  };

  // 取得浮動視窗
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
    const savedProfile = JSON.parse(
      sessionStorage.getItem("workoutBuilderData"),
    );
    setSessionWorkoutBuilderData(savedProfile ? savedProfile : []);
  }, []);

  // PWA 偵測到有支援PWA 就是顯示, 並在addBtn 的位置上出現 Install App

  // 觸發 socketio connectState 狀態  **********************
  useEffect(() => {
    if (connectState === "init") {
      console.log("init (Login)");
      return () => {};
    }

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

      setActiveScreen("loginScreen");

      return () => {};
    }

    if (connectState === "error") {
      console.log("Error (Login)");
      setConnectState("init");
      // 跳往error 畫面

      return () => {};
    }
  }, [connectState]);
  useEffect(() => {
    if (isLogin === "success") {
      console.log("onload");
      let sauser_accessToken = localStorage.getItem("sauser_accessToken");
      const getObject = {
        getUserProfile: { sauser_accessToken: sauser_accessToken },
      };

      if (ws) {
        try {
          setIsClickOpCode(true);
          ws.send(JSON.stringify(getObject));
        } catch (error) {
          console.error("Error sending data:", error);
        }
      } else {
        console.error("WebSocket is not initialized");
      }
    }
  }, [isLogin]);

  useEffect(() => {
    //refresh access token
    if (userProfile === "tokenHasExpired") {
      const dataInValid = localStorage.getItem("sauser_refreshToken");
      const inputObject = {
        refreshUserToken: {
          sauser_refreshToken: dataInValid,
        },
      };

      if (ws) {
        setIsClickOpCode(true);
        ws.send(JSON.stringify(inputObject));
        console.log(inputObject);
      }
    } else {
      console.log("fail");
    }
    //重新傳
    if (refreshToken === "success" && userProfile === "tokenHasExpired") {
      let sauser_accessToken = localStorage.getItem("sauser_accessToken");
      const getObject = {
        getUserProfile: { sauser_accessToken: sauser_accessToken },
      };

      if (ws) {
        try {
          setIsClickOpCode(true);
          ws.send(JSON.stringify(getObject));
        } catch (error) {
          console.error("Error sending data:", error);
        }
      } else {
        console.error("WebSocket is not initialized");
      }
    }
  }, [userProfile, refreshToken]);
  // 重新渲染背景
  useEffect(() => {
    // setDisp('block');
    document.body.style.backgroundImage = "none";
    document.body.style.backgroundColor = BACKGROUND_COLOR;
    document.body.style.color = DARKBLACK_COLOR;
    // 禁止圈選
    document.body.style.userSelect = "none";

    /**
     * 判斷所有的圖片完全載入後才把顯示打開
     */

    const imageElements = document.querySelectorAll("img");
    const totalImages = imageElements.length;
    let loadedImages = 0;
    let sauser_accessToken = localStorage.getItem("sauser_accessToken");
    const getObject = {
      getUserProfile: { sauser_accessToken: sauser_accessToken },
    };

    if (ws) {
      try {
        setIsClickOpCode(true);
        ws.send(JSON.stringify(getObject));
      } catch (error) {
        console.error("Error sending data:", error);
      }
    } else {
      console.error("WebSocket is not initialized");
    }
  }, []);
  useEffect(() => {
    let sauser_accessToken = localStorage.getItem("sauser_accessToken");
    const getObject = {
      getUserProfile: { sauser_accessToken: sauser_accessToken },
    };

    if (ws) {
      try {
        setIsClickOpCode(true);
        ws.send(JSON.stringify(getObject));
      } catch (error) {
        console.error("Error sending data:", error);
      }
    } else {
      console.error("WebSocket is not initialized");
    }
  }, [ws]);
  useEffect(() => {
    const remember = localStorage.getItem("sauser_rememberme");
    console.log(remember);
  }, []);

  //logout
  const pressLogout = () => {
    console.log("pressLogout ");
    const remember = localStorage.getItem("sauser_rememberme");
    console.log(remember);

    if (remember) {
      try {
        localStorage.removeItem("userProfile");
        console.log("Successfully removed userProfile");
      } catch (error) {
        console.error("Error removing userProfile:", error);
      }
      setOpen(false);
      // 回到原來未登入的狀態
      setIsLogin("init");
      // 刪除Token 記錄嗎?

      //

      // 要延遲一段時間不然狀態 state 不會改變
      localStorage.removeItem("pageState");

      setActiveScreen("loginScreen");
      // 依賴改變了就會觸發login裡面的useEffect

      setTimeout(() => {
        navigate("/", { replace: true });
        // 進行更新, 這個是有順序的
        setLogout(uuidv4());
      }, 10);
    } else {
      localStorage.removeItem("sauser_accessToken");
      localStorage.removeItem("sauser_refreshToken");
      try {
        localStorage.removeItem("userProfile");
        console.log("Successfully removed userProfile");
      } catch (error) {
        console.error("Error removing userProfile:", error);
      }
      setOpen(false);
      // 回到原來未登入的狀態
      setIsLogin("init");
      // 刪除Token 記錄嗎?

      //

      // 要延遲一段時間不然狀態 state 不會改變
      localStorage.removeItem("pageState");

      setActiveScreen("loginScreen");
      // 依賴改變了就會觸發login裡面的useEffect

      setTimeout(() => {
        navigate("/", { replace: true });
        // 進行更新, 這個是有順序的
        setLogout(uuidv4());
      }, 10);
    }
  };

  //Results
  const pressResults = () => {
    console.log("pressResults");
    setOpen(false);

    setCurrentScreen("resultsScreen");
    setCurrentSub1Screen("cardio");
    let p = { currentScreen: "resultsScreen", currentSub1Screen: "cardio" };
    sessionStorage.setItem("sauser_currentScreen", JSON.stringify(p));

    if (currentScreen !== "resultsScreen") {
      // 存路由
      const stateData = {
        activeScreen: "menuScreen",
        currentScreen: "resultsScreen",
        currentSub1Screen: "cardio",
      };
      const title = ""; // 页面标题（可选）
      const encodedData = encodeURIComponent(JSON.stringify(stateData));
      const newUrl = `/?data=${encodedData}`; // 新的 URL（可选） 這個會改變名稱
      window.history.pushState(stateData, title, newUrl);
    }
  };
  //WorkoutLog
  console.log(sessionWorkoutBuilderData);

  //   const pressWorkoutLog = () => {
  //     console.log("WorkoutLog");

  //     setOpen(false); //漢堡選單關起來
  //     // Simulate loading delay

  //     setCurrentScreen("workoutLogScreen");

  //     // Save to session storage
  //     let p = { currentScreen: "workoutLogScreen" };
  //     sessionStorage.setItem("sauser_currentScreen", JSON.stringify(p));

  //     // Update browser history if screen changed
  //     if (currentScreen !== "workoutLogScreen") {
  //       const stateData = {
  //         activeScreen: "menuScreen",
  //         currentScreen: "workoutLogScreen",
  //       };
  //       const encodedData = encodeURIComponent(JSON.stringify(stateData));
  //       const newUrl = `/?data=${encodedData}`;
  //       window.history.pushState(stateData, "", newUrl);
  //     }
  //   };
  //ProfileSettings
  const pressProfileSettings = () => {
    console.log("ProfileSettings");

    setOpen(false);

    setCurrentScreen("profileSettingsScreen");
    let p = { currentScreen: "profileSettingsScreen" };
    sessionStorage.setItem("sauser_currentScreen", JSON.stringify(p));

    if (currentScreen !== "profileSettingsScreen") {
      // 存路由
      const stateData = {
        activeScreen: "menuScreen",
        currentScreen: "profileSettingsScreen",
      };
      const title = ""; // 页面标题（可选）
      const encodedData = encodeURIComponent(JSON.stringify(stateData));
      const newUrl = `/?data=${encodedData}`; // 新的 URL（可选） 這個會改變名稱
      window.history.pushState(stateData, title, newUrl);
    }

    console.log("onload");
    let sauser_accessToken = localStorage.getItem("sauser_accessToken");
    const inputObject = {
      getUserProfile: { sauser_accessToken: sauser_accessToken },
    };

    if (ws) {
      try {
        setIsClickOpCode(true);
        ws.send(JSON.stringify(inputObject));
      } catch (error) {
        console.error("Error sending data:", error);
      }
    } else {
      console.error("WebSocket is not initialized");
    }
  };
  useEffect(() => {
    //refresh access token
    if (userProfile === "tokenHasExpired") {
      const dataInValid = localStorage.getItem("sauser_refreshToken");
      const inputObject = {
        refreshUserToken: {
          sauser_refreshToken: dataInValid,
        },
      };

      if (ws) {
        setIsClickOpCode(true);
        ws.send(JSON.stringify(inputObject));
        console.log(inputObject);
      }
    } else {
      console.log("fail");
    }
    //重新傳
    if (refreshToken === "success" && userProfile === "tokenHasExpired") {
      let sauser_accessToken = localStorage.getItem("sauser_accessToken");
      const getObject = {
        getUserProfile: { sauser_accessToken: sauser_accessToken },
      };

      if (ws) {
        try {
          setIsClickOpCode(true);
          ws.send(JSON.stringify(getObject));
        } catch (error) {
          console.error("Error sending data:", error);
        }
      } else {
        console.error("WebSocket is not initialized");
      }
    }
  }, [userProfile, refreshToken]);
  //help
  const pressHelp = () => {
    console.log("Help");
    // setOpen(false);
    setHelpState(!helpState);
  };

  const pressContact = () => {
    setOpen(false);
    setCurrentScreen("contactScreen");
    let p = { currentScreen: "contactScreen" };
    sessionStorage.setItem("sauser_currentScreen", JSON.stringify(p));

    if (currentScreen !== "contactScreen") {
      // 存路由
      const stateData = {
        activeScreen: "menuScreen",
        currentScreen: "contactScreen",
        currentSub1Screen: "",
      };
      const title = ""; // 页面标题（可选）
      const encodedData = encodeURIComponent(JSON.stringify(stateData));
      const newUrl = `/?data=${encodedData}`; // 新的 URL（可选） 這個會改變名稱
      window.history.pushState(stateData, title, newUrl);
    }
  };

  const pressFAQ = () => {
    setOpen(false);
    setCurrentScreen("faqScreen");
    let p = { currentScreen: "faqScreen" };
    sessionStorage.setItem("sauser_currentScreen", JSON.stringify(p));

    if (currentScreen !== "faqScreen") {
      // 存路由
      const stateData = {
        activeScreen: "menuScreen",
        currentScreen: "faqScreen",
        currentSub1Screen: "",
      };
      const title = ""; // 页面标题（可选）
      const encodedData = encodeURIComponent(JSON.stringify(stateData));
      const newUrl = `/?data=${encodedData}`; // 新的 URL（可选） 這個會改變名稱
      window.history.pushState(stateData, title, newUrl);
    }
  };

  const pressTermsAndPrivacy = () => {
    setOpen(false);
    setCurrentScreen("termsAndPrivacyScreen");
    let p = { currentScreen: "termsAndPrivacyScreen" };
    sessionStorage.setItem("sauser_currentScreen", JSON.stringify(p));

    if (currentScreen !== "termsAndPrivacyScreen") {
      // 存路由
      const stateData = {
        activeScreen: "menuScreen",
        currentScreen: "termsAndPrivacyScreen",
        currentSub1Screen: "",
      };
      const title = ""; // 页面标题（可选）
      const encodedData = encodeURIComponent(JSON.stringify(stateData));
      const newUrl = `/?data=${encodedData}`; // 新的 URL（可选） 這個會改變名稱
      window.history.pushState(stateData, title, newUrl);
    }
  };

  const pressAbout = () => {
    setOpen(false);
    setCurrentScreen("aboutScreen");
    let p = { currentScreen: "aboutScreen" };
    sessionStorage.setItem("sauser_currentScreen", JSON.stringify(p));

    if (currentScreen !== "aboutScreen") {
      // 存路由
      const stateData = {
        activeScreen: "menuScreen",
        currentScreen: "aboutScreen",
        currentSub1Screen: "",
      };
      const title = ""; // 页面标题（可选）
      const encodedData = encodeURIComponent(JSON.stringify(stateData));
      const newUrl = `/?data=${encodedData}`; // 新的 URL（可选） 這個會改變名稱
      window.history.pushState(stateData, title, newUrl);
    }
  };

  // 重複了
  // const pressLogout = ()
  const [openLanguage, setOpenLanguage] = useState(false);
  const pressLanguage = () => {
    setOpenLanguage(!openLanguage);
  };
  const pressLanguageZh = () => {
    setGlobalState("zh");
  };
  const pressLanguageEn = () => {
    setGlobalState("en");
  };
  const pressClose = () => {
    console.log("Close");
    setOpen(false);
  };
  //avatar
  const avatarClick = () => {
    console.log("ProfileSettings");
    setOpen(false);
    setCurrentScreen("profileSettingsScreen");
    let p = { currentScreen: "profileSettingsScreen" };
    sessionStorage.setItem("sauser_currentScreen", JSON.stringify(p));

    if (currentScreen !== "profileSettingsScreen") {
      // 存路由
      const stateData = {
        activeScreen: "menuScreen",
        currentScreen: "profileSettingsScreen",
      };
      const title = ""; // 页面标题（可选）
      const encodedData = encodeURIComponent(JSON.stringify(stateData));
      const newUrl = `/?data=${encodedData}`; // 新的 URL（可选） 這個會改變名稱
      window.history.pushState(stateData, title, newUrl);
    }
  };
  //FIXME: get 獲取數據
  // 在元件頂部宣告 useEffect
  useEffect(() => {
    // 只有當 retSetUserProfileState 為 true 且 ws 存在時才執行
    if (retSetUserProfileState && ws) {
      const sauser_accessToken = localStorage.getItem("sauser_accessToken");

      // 檢查是否有 accessToken
      if (!sauser_accessToken) {
        console.error("No access token found");
        return;
      }

      const inputObject = {
        getUserProfile: { sauser_accessToken: sauser_accessToken },
      };

      try {
        setIsClickOpCode(true);
        console.log("Sending getUserProfile request:", inputObject);
        ws.send(JSON.stringify(inputObject));
      } catch (error) {
        console.error("Error sending getUserProfile request:", error);
      }
    }
  }, [retSetUserProfileState]); // 依賴於 retSetUs
  useEffect(() => {
    //refresh access token
    if (userProfile === "tokenHasExpired") {
      const dataInValid = localStorage.getItem("sauser_refreshToken");
      const inputObject = {
        refreshUserToken: {
          sauser_refreshToken: dataInValid,
        },
      };

      if (ws) {
        setIsClickOpCode(true);
        ws.send(JSON.stringify(inputObject));
        console.log(inputObject);
      }
    } else {
      console.log("fail");
    }
    //重新傳
    if (refreshToken === "success" && userProfile === "tokenHasExpired") {
      let sauser_accessToken = localStorage.getItem("sauser_accessToken");
      const getObject = {
        getUserProfile: { sauser_accessToken: sauser_accessToken },
      };

      if (ws) {
        try {
          setIsClickOpCode(true);
          ws.send(JSON.stringify(getObject));
        } catch (error) {
          console.error("Error sending data:", error);
        }
      } else {
        console.error("WebSocket is not initialized");
      }
    }
  }, [userProfile, refreshToken]);
  //FIXME: get 獲取數據
  //Dashboard
  const pressDashboard = () => {
    console.log("pressDashboard");
    setOpen(false);

    setCurrentScreen("dashboardScreen");
    let p = { activeScreen: "menuScreen", currentScreen: "dashboardScreen" };
    sessionStorage.setItem("sauser_currentScreen", JSON.stringify(p));

    /**
     * 必須判斷目前的所在頁面,如果相同頁面則不做任何變更
     */
    //  console.log ('currentScreen [menu] = ', currentScreen)

    if (currentScreen !== "dashboardScreen") {
      // 存路由
      console.log("存路由[dashbarodScreen");
      const stateData = { currentScreen: "dashboardScreen" };
      const title = ""; // 页面标题（可选）
      const newUrl = "/"; // 新的 URL（可选）
      window.history.pushState(stateData, title, newUrl);
    }
  };
  //QuickConnect
  const pressQuickConnect = () => {
    console.log("QuickConnect");
    setOpen(false);
    // 主畫面
    setCurrentScreen("quickConnectScreen");
    // 子畫面
    setCurrentSub1Screen("quickConnectHomeScreen");

    let p = {
      lastScreen: "init",
      currentScreen: "quickConnectScreen",
      currentSub1Screen: "quickConnectHomeScreen",
    };
    sessionStorage.setItem("sauser_currentScreen", JSON.stringify(p));

    if (currentScreen !== "quickConnectScreen") {
      // 存路由
      const stateData = {
        lastScreen: "init",
        activeScreen: "menuScreen",
        currentScreen: "quickConnectScreen",
        currentSub1Screen: "quickConnectHomeScreen",
      };
      const title = ""; // 页面标题（可选）
      const encodedData = encodeURIComponent(JSON.stringify(stateData));
      const newUrl = `/?data=${encodedData}`; // 新的 URL（可选） 這個會改變名稱
      window.history.pushState(stateData, title, newUrl);
    }
  };
  //WeightGraph
  const pressWeightGraph = () => {
    console.log("WeightGraph");
    setOpen(false);
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
  };
  console.log(sessionWorkoutBuilderData);

  //WorkoutBuilder
  const pressWorkoutBuilder = () => {
    console.log("pressWorkoutBuilder ");
    setOpen(false);
    setCurrentScreen("workoutType");
    let p = { currentScreen: "workoutType" };
    sessionStorage.setItem("sauser_currentScreen", JSON.stringify(p));

    if (currentScreen !== "workoutType") {
      // 存路由
      const stateData = {
        activeScreen: "menuScreen",
        currentScreen: "workoutType",
      };
      const title = ""; // 页面标题（可选）
      const encodedData = encodeURIComponent(JSON.stringify(stateData));
      const newUrl = `/?data=${encodedData}`; // 新的 URL（可选） 這個會改變名稱
      window.history.pushState(stateData, title, newUrl);
    }
  };
  //Rewards
  const pressRewards = () => {
    console.log("pressRewards ");
    setOpen(false);
    setCurrentScreen("rewardsScreen");
    let p = { currentScreen: "rewardsScreen" };
    sessionStorage.setItem("sauser_currentScreen", JSON.stringify(p));

    if (currentScreen !== "rewardsScreen") {
      // 存路由
      const stateData = {
        activeScreen: "menuScreen",
        currentScreen: "rewardsScreen",
        currentSub1Screen: "",
      };
      const title = ""; // 页面标题（可选）
      const encodedData = encodeURIComponent(JSON.stringify(stateData));
      const newUrl = `/?data=${encodedData}`; // 新的 URL（可选） 這個會改變名稱
      window.history.pushState(stateData, title, newUrl);
    }
  };
  let sauser_accessToken = localStorage.getItem("sauser_accessToken");
  //workoutbuilder  資料更新 add update delete 上層
  useEffect(() => {
    console.log(deleteWorkoutbuilder);
    const dataJson = JSON.stringify({
      getWorkoutbuilders: {
        sauser_accessToken: sauser_accessToken,
      },
    });
    console.log(dataJson);
    if (ws) {
      ws.send(dataJson);
      console.log("send");
    } else {
      console.log("not send successfully");
    }
  }, [deleteWorkoutbuilder, ws]);

  useEffect(() => {
    console.log(addNewWorkoutbuilder);
    const dataJson = JSON.stringify({
      getWorkoutbuilders: { sauser_accessToken: sauser_accessToken },
    });
    console.log(dataJson);
    if (ws) {
      ws.send(dataJson);
      console.log("send");
    } else {
      console.log("not send successfully");
    }
  }, [addNewWorkoutbuilder, ws]);
  useEffect(() => {
    console.log(updateWorkoutbuilder);
    const dataJson = JSON.stringify({
      getWorkoutbuilders: { sauser_accessToken: sauser_accessToken},
    });
    console.log(dataJson);
    if (ws) {
      ws.send(dataJson);
      console.log("send");
    } else {
      console.log("not send successfully");
    }
  }, [updateWorkoutbuilder, ws]);
  return (
    <div className="relative ">
      <_UserGetWorkoutData />
      {loading ? (
        <div className="absolute inset-0 flex h-dvh items-center justify-center bg-[#F5F5F5] bg-black bg-opacity-50">
          <ClipLoader
            color="gray"
            loading={loading}
            size={70}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        <div
          className="  h-dvh  w-dvw  "

          //  bg-backgroundColor
        >
          {/* 轉動icon 的包在div內 確保不會亂跑 */}

          {/* 統包 */}
          {/* 它是裡面的下層的 */}
          <div className="h-dvh ">
            {/* 它是裡面的下層的 */}
            <div className=" h-dvh">
              {/* 自己實現Menu功能好了使用dropdownrender */}

              {/* --------------------------------專門處理下拉式小視窗 開始------------------ */}

              {/* 點擊之後最外層 */}
              {/* 父  點擊之後才跑出來的畫面*/}

              <div
                style={{
                  display: open ? "block" : "none",
                  color: DARKBLACK_COLOR,
                }}
                // 高度用內容撐開即可
                className="fixed  left-0  top-0 z-50 z-[50]  flex  h-dvh w-[calc(239rem)] flex-col text-[calc(20rem)] "
              >
                {/* 外部要包一層指定容器小大? */}

                <div
                  style={{
                    // 漸層底色
                    background:
                      "linear-gradient(to bottom right, #bae642, #8ac942 59.2%, #80c342)",
                  }}
                  className="  h-dvh"
                >
                  {/* 子1 */}
                  <div className="">
                    {/* Menu */}
                    <Row className="mb-[12rem] justify-between pt-[calc(32rem)]">
                      {/* POWR+ Icon */}
                      <Col style={{ display: "flex", paddingLeft: 20 }}>
                        <Logo />
                      </Col>

                      {/* 打叉Icon+ 框 */}
                      <Col
                        style={{
                          // backgroundColor:'red',
                          cursor: "pointer",
                        }}
                        className=" flex  items-center justify-center  pr-[calc(10rem)]
                      "
                        onClick={pressClose}
                      >
                        <Close />
                      </Col>
                    </Row>
                  </div>

                  {/* 子2 */}
                  {/* 為什麼它不能用自己高度去撐開呢
62px 是上面那個logo大小
*/}
                  <div className="max-  h-dvh overflow-y-auto overflow-x-hidden text-[calc(20rem)] ">
                    {/* 此下div 是為了顯示不顯示Install APP 文字而定  */}

                    <Row
                      onClick={pressDashboard}
                      className="mt-[22rem] flex cursor-pointer items-center "
                    >
                      <Col style={{ marginRight: "8rem", marginLeft: "16rem" }}>
                        <img
                          src={Icon_Dashboard}
                          className=" 
                        w-[calc(25rem)]"
                          alt=""
                        />
                        {/* <Icon_Dashboard/> */}
                      </Col>
                      <Col className="text-[calc(20rem)]"> Dashboard</Col>
                    </Row>

                    {/* QuickConnect */}

                    <Row
                      onClick={pressResults}
                      className="mt-[22rem] flex cursor-pointer items-center"
                    >
                      <Col style={{ marginRight: "8rem", marginLeft: "16rem" }}>
                        <img
                          src={Icon_Results}
                          className=" 
                        w-[calc(25rem)]"
                          alt=""
                        />
                        {/* <Icon_Results/> */}
                      </Col>
                      <Col style={{}} className="text-[calc(20rem)]">
                        Results
                      </Col>
                    </Row>

                    {/* Workout   */}

                    {/* <Row
                      onClick={pressWorkoutLog}
                      className="mt-[22rem] flex cursor-pointer items-center"
                    >
                      <Col style={{ marginRight: "8rem", marginLeft: "16rem" }}>
                        <img
                          src={Icon_WorkoutLog}
                          className=" 
                        w-[calc(25rem)]"
                          alt=""
                        />
                        
                      </Col>

                      <Col style={{}} className="text-[calc(20rem)]">
                        Workout Log
                      </Col>
                    </Row> */}

                    {/* Graph */}
                    <Row
                      onClick={pressWeightGraph}
                      className="mt-[22rem] flex cursor-pointer items-center"
                    >
                      <Col style={{ marginRight: "8rem", marginLeft: "16rem" }}>
                        <img
                          src={Icon_WeightGraph}
                          className=" 
                        w-[calc(25rem)]"
                          alt=""
                        />
                        {/* <Icon_WeightGraph/> */}
                      </Col>

                      <Col style={{}} className="text-[calc(20rem)]">
                        Weight Graph
                      </Col>
                    </Row>

                    {/* workout builder */}
                    <Row
                      onClick={pressWorkoutBuilder}
                      className="mt-[22rem] flex cursor-pointer items-center"
                    >
                      <Col style={{ marginRight: "8rem", marginLeft: "16rem" }}>
                        <img
                          src={Icon_WorkoutBuilder}
                          className=" 
                        w-[calc(25rem)]"
                          alt=""
                        />
                      </Col>

                      <Col style={{}} className="text-[calc(20rem)]">
                        Workout Builder
                      </Col>
                    </Row>

                    {/* rewards */}
                    <Row
                      onClick={pressRewards}
                      className="mt-[22rem] flex cursor-pointer items-center"
                    >
                      <Col style={{ marginRight: "8rem", marginLeft: "16rem" }}>
                        <img
                          src={Icon_Rewards}
                          className=" 
                        w-[calc(20rem)]"
                          alt=""
                        />
                      </Col>

                      <Col style={{}} className="text-[calc(20rem)]">
                        Rewards
                      </Col>
                    </Row>

                    {/* profile  */}
                    <Row
                      onClick={pressProfileSettings}
                      className="mt-[22rem] flex cursor-pointer items-center"
                    >
                      <Col style={{ marginRight: "8rem", marginLeft: "16rem" }}>
                        <img
                          src={Icon_ProfileSettings}
                          className=" 
                        w-[calc(25rem)]"
                          alt=""
                        />
                        {/* <Icon_ProfileSettings/> */}
                      </Col>

                      <Col style={{}} className="text-[calc(20rem)]">
                        Profile Settings
                      </Col>
                    </Row>

                    {/* help  */}
                    <Row
                      onClick={pressHelp}
                      className="mb-[30rem] mt-[20rem] flex cursor-pointer items-center"
                    >
                      <Col style={{ marginRight: "8rem", marginLeft: "16rem" }}>
                        <img
                          src={Icon_Help}
                          className=" 
                        w-[calc(25rem)]"
                          alt=""
                        />
                        {/* <Icon_Help/> */}
                      </Col>

                      <Col style={{}} className="text-[calc(20rem)]  ">
                        {globalstate === "en" ? (
                          <span> Help</span>
                        ) : (
                          <span className="font-['Open_Sans']">幫助中心</span>
                        )}
                      </Col>
                      {globalstate === "en" ? (
                        <span>
                          {" "}
                          <Col className="ml-[95rem] mt-[-6rem]">
                            <DownOutlined className="w-[10rem] text-[#00000040] " />
                          </Col>
                        </span>
                      ) : (
                        <span className="font-['Open_Sans']">
                          {" "}
                          <Col className="ml-[55rem] mt-[-6rem]">
                            <DownOutlined className="w-[10rem] text-[#00000040] " />
                          </Col>
                        </span>
                      )}
                    </Row>
                    <div style={{ display: helpState ? "block" : "none" }}>
                      <Row className="">
                        <Col
                          style={{ marginLeft: "calc(45rem )" }}
                          onClick={pressContact}
                          className="text-[calc(16rem)]"
                        >
                          {globalstate === "en" ? (
                            <span>Contact</span>
                          ) : (
                            <span className="font-['Open_Sans']">聯絡我們</span>
                          )}
                        </Col>
                      </Row>

                      <Row className="mt-[22rem]">
                        <Col
                          style={{ marginLeft: "calc(45rem )" }}
                          onClick={pressFAQ}
                          className="text-[calc(16rem)]"
                        >
                          {globalstate === "en" ? (
                            <span>FAQ</span>
                          ) : (
                            <span className="font-['Open_Sans']">常見問題</span>
                          )}
                        </Col>
                      </Row>
                      <Row className="mt-[22rem]">
                        <Col
                          style={{ marginLeft: "calc(45rem )" }}
                          onClick={pressTermsAndPrivacy}
                          className="text-[calc(16rem)]"
                        >
                          {globalstate === "en" ? (
                            <span> Terms & Privacy</span>
                          ) : (
                            <span className="font-['Open_Sans']">
                              服務條款及隱私政策
                            </span>
                          )}
                        </Col>
                      </Row>
                      <Row className="mt-[22rem]">
                        <Col
                          style={{ marginLeft: "calc(45rem )" }}
                          onClick={pressAbout}
                          className="text-[calc(16rem)]"
                        >
                          {globalstate === "en" ? (
                            <span> About</span>
                          ) : (
                            <span className="font-['Open_Sans']">關於我們</span>
                          )}
                        </Col>
                      </Row>
                    </div>
                    <div className="h-[30rem] bg-[transparent]"></div>
                    {/* ?? */}
                    <Row
                      onClick={pressLanguage}
                      className="mb-[30rem] flex cursor-pointer items-center"
                    >
                      <Col style={{ marginRight: "8rem", marginLeft: "16rem" }}>
                        <img
                          src={Icon_Language}
                          className=" 
                        w-[calc(25rem)]"
                          alt=""
                        />
                        {/* <Icon_Help/> */}
                      </Col>

                      <Col style={{}} className="text-[calc(20rem)] ">
                        {globalstate === "en" ? (
                          <span> Language</span>
                        ) : (
                          <span className="font-['Open_Sans']">語言</span>
                        )}
                      </Col>
                      {globalstate === "en" ? (
                        <span>
                          {" "}
                          <Col className="ml-[50rem] mt-[-6rem]">
                            <DownOutlined className="w-[10rem] text-[#00000040] " />
                          </Col>
                        </span>
                      ) : (
                        <span className="font-['Open_Sans']">
                          {" "}
                          <Col className="ml-[95rem] mt-[-6rem]">
                            <DownOutlined className="w-[10rem] text-[#00000040] " />
                          </Col>
                        </span>
                      )}
                    </Row>
                    <div style={{ display: openLanguage ? "block" : "none" }}>
                      <Row className="">
                        <Col
                          style={{ marginLeft: "calc(45rem )" }}
                          onClick={pressLanguageZh}
                          className="text-[calc(16rem)]"
                        >
                          {globalstate === "en" ? (
                            <span>Chinese</span>
                          ) : (
                            <span className="font-['Open_Sans']">中文</span>
                          )}
                        </Col>
                      </Row>

                      <Row className="mt-[22rem]">
                        <Col
                          style={{ marginLeft: "calc(45rem )" }}
                          onClick={pressLanguageEn}
                          className="text-[calc(16rem)]"
                        >
                          {globalstate === "en" ? (
                            <span>English</span>
                          ) : (
                            <span className="font-['Open_Sans']">英文</span>
                          )}
                        </Col>
                      </Row>
                    </div>
                    {/* ?? */}

                    <style jsx="true">{`
                        .custom-select-background .ant-select-selector .ant-select-selection-item{
                        height:30rem !important;
                        line-height:30rem !important;
                        }
                          .custom-select-background .ant-select-selector {
                            font-size: 20rem !important; /* 修改输入框字体大小 */
                            background: transparent !important;
                            border:none !important;
                          }

                          .ant-select-item-option-content {
                            font-size: 14rem !important; /* 修改下拉选项字体大小 */
                               padding:0 !important;
                             
                          }
                          .custom-select-no-border-radius .ant-select-selector {
                            border-radius: 0 !important; /* 去掉圆角 */
                            padding:0 !important;
                             margin:0 !important;
                            {/* border-width: '0.5rem' !important; */}
                          }
                          {/* .custom-select-background .ant-select-item {
                            background-color: transparent !important; /* Text color for options */
                          } */}
                        `}</style>

                    <Row
                      style={{ cursor: "pointer" }}
                      onClick={pressQuickConnect}
                      className="mt-[22rem] flex items-center"
                    >
                      <Col style={{ marginRight: "8rem", marginLeft: "16rem" }}>
                        <img
                          src={Icon_QuickConnect}
                          className=" 
                        w-[calc(25rem)]"
                          alt=""
                        />
                      </Col>
                      <Col style={{}} className="text-[calc(20rem)]">
                        Quick Connect
                      </Col>
                    </Row>
                    <Row
                      onClick={pressLogout}
                      className="mb-[70rem] mt-[70rem]  flex cursor-pointer items-center"
                    >
                      <Col style={{ marginRight: "8rem", marginLeft: "16rem" }}>
                        <img
                          src={Icon_Logout}
                          alt=""
                          className=" 
                        w-[calc(22rem)]"
                        />
                      </Col>
                      <Col style={{}} className="  text-[calc(20rem)]">
                        {globalstate === "en" ? (
                          <span>Logout</span>
                        ) : (
                          <span className="font-['Open_Sans']">登出</span>
                        )}
                      </Col>
                    </Row>
                    <div className="pb-[25rem]"></div>
                  </div>
                </div>
              </div>

              {/* --------------------------------專門處理下拉式視窗 結束 -------------------------------------------- */}

              {/* 處理Menu ICon  */}
              {/* <Flex  wrap="wrap"> */}

              {/* 顶部黄色区域 */}
              <div
                style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  width: "239rem",
                  // 為什麼它不能除以scale ? 因為它是相對的,  不是相對的 不能除以scale
                  //  外框及內容都一起放大及縮小所以不能/scale
                  height: NAVIBAR_SIZE, //

                  backgroundColor: BACKGROUND_COLOR,
                  // backgroundColor: 'yellow',
                  zIndex: 10,
                }}
              >
                {/*導航列的處理 */}
                <div className=" bg-[#f5f5f5]">
                  <Row className="h-[57rem] w-dvw bg-[#f5f5f5]">
                    <Col
                      onClick={() => setOpen(!open)}
                      className="flex w-[30%] cursor-pointer  pl-[calc(15rem)]"
                    >
                      {/* 父 */}
                      <div
                        className="mt-[10.9rem] flex h-[25.9rem]                  
                     flex-row
  "
                      >
                        {/* Icon_Menu */}
                        <img
                          src={Icon_Menu}
                          alt=""
                          className="
                        ml-[5.3rem]
                        mr-[9.2rem]
                        mt-[4.7rem]
                        h-[calc(20rem)]
                        w-[calc(30rem)]
                      "
                        />
                        {/* <Icon_Menu  className="
                        ml-[17.3rem]
                        mr-[9.2rem]
                        mt-[4.7rem]
                        h-[calc(20rem)]
                        w-[calc(20rem)]
                      "/> */}
                        <div
                          className="mt-[5rem]
                        flex
                        cursor-pointer
                        items-center
                        text-[calc(20rem)]
                      
                        font-bold
                        text-darkColor
                        "
                        >
                          {globalstate === "en" ? (
                            <span> Menu</span>
                          ) : (
                            <span className="font-['Open_Sans']">目錄</span>
                          )}
                        </div>
                      </div>
                    </Col>

                    {/* 名字 */}
                    <Col
                      className="mt-[11rem] flex h-[25.9rem]  w-[55%] items-center justify-end
                  text-[calc(16rem)] font-semibold text-darkColor "
                    >
                      <span className="hidden text-darkColor sm:flex ">
                        Welcome&nbsp; , &nbsp;
                      </span>
                      {userProfile.firstName}
                      {/* {storedProfile.firstName} */}
                    </Col>

                    {/* 頭像 */}
                    <Col
                      style={{
                        cursor: "pointer",
                      }}
                      className="w-[15%] cursor-pointer text-center  "
                      onClick={avatarClick}
                    >
                      <Avatar
                        // size={40}

                        // 這種連結是可以用的
                        // src={'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg'}
                        // 使用base64Data 也可以
                        src={
                          userProfile.avatarUrl !== ""
                            ? userProfile.avatarUrl
                            : DefaultAvatar
                        }
                        className="mt-[8rem] h-[calc(30.9rem)] w-[calc(30.9rem)]"
                      />
                    </Col>

                    <Row className=" mt-[0.5rem] w-dvw">
                      <Col className="w-dvw">
                        <div
                          className={`${styles.diagonalLine} h-[4rem]`}
                        ></div>
                      </Col>
                    </Row>
                  </Row>
                </div>
                {/* 導航列結束 */}
              </div>

              <div>
                {currentScreen === "resultsScreen" && (
                  <_Results key={"resultsScreen"} />
                )}

                {/* {currentScreen === "workoutLogScreen" && (
                  <_WorkoutLog key={"workoutLogScreen"} />
                )} */}
                {currentScreen === "profileSettingsScreen" && (
                  <_AccountDetails />
                )}

                {currentScreen === "contactScreen" && (
                  <_Contact key={"contactScreen"} />
                )}

                {currentScreen === "faqScreen" && <Faq key={"faqScreen"} />}

                {currentScreen === "termsAndPrivacyScreen" && (
                  <_TermsAndPrivacy key={"termsAndPrivacyScreen"} />
                )}

                {currentScreen === "aboutScreen" && (
                  <_About key={"aboutScreen"} />
                )}
                {currentScreen === "dashboardScreen" && (
                  <_Dashboard key={"dashboardScreen"} />
                )}

                {currentScreen === "weightGraphTime" && (
                  <WeightGraphTime key={"weightGraphTime"} />
                )}
                {currentScreen === "workoutType" && (
                  <WorkoutBuilder key={"workoutType"} />
                )}
                {currentScreen === "rewardsScreen" && (
                  <_Rewards key={"rewardsScreen"} />
                )}
                {currentScreen === "quickConnectScreen" && (
                  <_QuickConnect key={"quickConnectScreen"} />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Menu;

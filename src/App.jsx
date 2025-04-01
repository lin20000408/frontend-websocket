// App.js
import React, {
  useEffect,
  createContext,
  useState,
  useRef,
  lazy,
  Suspense,
  useContext,
} from "react";
import "@/css/global.css";
import jstz from "jstz";
// 或者使用配置参数进行初始化

import { ConfigProvider } from "antd";

import { IntlManager } from "@/components/IntlManager";
// import { IntlProvider, FormattedMessage } from "react-intl";
import { Routes, Route, useNavigate } from "react-router-dom";
//
import ScreenScale from "./models/scale";
import Connect from "./models/connect";

// 下列是要做懶加載讓第一次體驗更好
const Contact = lazy(() => import("@/pages/Contact"));
const FAQ = lazy(() => import("@/pages/FAQ"));
const ForgotPassword = lazy(() => import("@/pages/ForgotPassword"));
const About = lazy(() => import("./pages/About"));
const Page404 = lazy(() => import("./pages/Page404"));
const SignUp = lazy(() => import("@/pages/SignUp"));
const TermsAndPrivacy = lazy(() => import("./pages/TermsAndPrivacy"));
const WSError = lazy(() => import("@/pages/WSError"));

// 其它無所謂因為它們不讓路由
import Authenticate from "@/pages/Authenticate";
import Rebinding from "@/pages/Rebinding";
import PubSub from "pubsub-js";
import Login from "./pages/Login";
import MAC from "@/pages/MAC";

const TouchContext = createContext();
export const Content = createContext();
export const GlobalStateContext = createContext();

import CookieConsent from "@/components/CookieConsent";

const App = () => {
  //   //!global
  const [globalstate, setGlobalState] = useState("en");
  const [locale, setLocale] = useState("en");

  //! content

  const [isBack, setIsBack] = useState(false);
  // 全局
  const [scaleH, setScaleH] = useState(1);
  const [scaleV, setScaleV] = useState(1);
  const [isPortrait, setIsPortrait] = useState(
    window.matchMedia("(orientation: portrait)").matches,
  );
  // 原modeles -> connect.js 初值
  const [isClickOpCode, setIsClickOpCode] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [retSetUserProfileState, setRetSetUserProfileState] = useState(false);
  const [isLogin, setIsLogin] = useState("init");
  const [isSupportLocalStorage, setIsSupportLocalStorage] = useState(false);
  const [socketio, setSocketio] = useState(null);
  const [connectState, setConnectState] = useState("init");
  const [activeScreen, setActiveScreen] = useState("loginScreen");
  const [currentScreen, setCurrentScreen] = useState("init");
  const [currentSub1Screen, setCurrentSub1Screen] = useState("init"); // 第一階
  const [currentSub2Screen, setCurrentSub2Screen] = useState("init"); // 第二階
  const [currentSub3Screen, setCurrentSub3Screen] = useState("init"); // 第三階
  const [currentSub4Screen, setCurrentSub4Screen] = useState("init"); // 第四階

  const [workoutbuilderStepTwoId, setWorkoutbuilderStepTwoId] = useState(() => {
    try {
      const savedProfile = sessionStorage.getItem("workoutbuilderStepTwoId");
      return savedProfile ? JSON.parse(savedProfile) : 0;
    } catch (error) {
      console.error("讀取 maintenanceTime 失敗:", error);
      return 0;
    }
  });
  const [userProfile, setUserProfile] = useState(() => {
    try {
      const savedProfile = localStorage.getItem("userProfile");
      return savedProfile ? JSON.parse(savedProfile) : {};
    } catch (error) {
      console.error("讀取 userProfile 失敗:", error);
      return {};
    }
  });

  const [updateUserProfile, setUpdateUserProfile] = useState("init");

  // 原models -> mac.js 所定義初值
  const [mac, setMac] = useState("");
  const [macErr, setMacErr] = useState(false);
  const [verifyUserEmail, setVerifyUserEmail] = useState("init");
  const [confirmUserEmail, setConfirmUserEmail] = useState("init");
  // 原models -> saClubToken.js 所定義初值
  const [saClubToken, setSaClubToken] = useState(null);
  // 原models -> creataccount.js
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // 多帳號記錄
  // googlexx
  const [googleSub, setGoogleSub] = useState("");
  // const [googleAccessToken,setGoogleAccessToken] = useState("");
  const [googleSubBackup, setGoogleSubBackup] = useState("");
  // instagram
  const [instagramSub, setInstagramSub] = useState("");
  const [rebindingState, setRebindingState] = useState("init");

  const [googleState, setGoogleState] = useState("init");
  const [instagramState, setInstagramState] = useState("init");
  // 原models ->  WorkoutBuilder.js

  const [ecoPowr, setEcoPowr] = useState(true);
  const [ecoNatural, setEcoNatural] = useState(false);
  const [distance, setDistance] = useState("");

  //原models ->  filter.js

  const [deleteUserID, setDeleteUserID] = useState("init");
  const [userRegState, setUserRegState] = useState("init");
  const [logout, setLogout] = useState(0);
  const [ws, setWs] = useState(null);
  const [weekData, setWeekData] = useState({});
  const [forgetUserPassword, setForgetUserPassword] = useState("init");
  const [confirmForgetUserPasswordCode, setConfirmForgetUserPasswordCode] =
    useState("init");
  const [confirmDeleteUserAccount, setConfirmDeleteUserAccount] =
    useState("init");

  const [confirmUpdateUserPassword, setConfirmUpdateUserPassword] =
    useState("init");
  //?context in App.jsx 預設值from sessionStorage 這樣refresh page 資料還會在
  const [squareId, setSquareId] = useState(() => {
    try {
      const savedProfile = sessionStorage.getItem("squareId");
      return savedProfile ? JSON.parse(savedProfile) : "";
    } catch (error) {
      console.error("讀取 maintenanceTime 失敗:", error);
      return "";
    }
  });
  const [squares, setSquares] = useState(() => {
    try {
      const savedProfile = sessionStorage.getItem("workoutSquares");
      return savedProfile ? JSON.parse(savedProfile) : [];
    } catch (error) {
      console.error("讀取 maintenanceTime 失敗:", error);
      return [];
    }
  });

  console.log();
  const [deleteWorkout, setDeleteWorkout] = useState("init");
  const [backToAddOrEditStepTwo, setBackToAddOrEditStepTwo] = useState(() => {
    try {
      const savedProfile = sessionStorage.getItem("backToAddOrEditStepTwo");
      return savedProfile ? JSON.parse(savedProfile) : "";
    } catch (error) {
      console.error("讀取 maintenanceTime 失敗:", error);
      return "";
    }
  });
  const [stepOneToTwoWorkoutType, setStepOneToTwoWorkoutType] = useState(() => {
    try {
      const savedProfile = sessionStorage.getItem("stepOneToTwoWorkoutType");
      return savedProfile ? JSON.parse(savedProfile) : "";
    } catch (error) {
      console.error("讀取 maintenanceTime 失敗:", error);
      return "";
    }
  });
  const [selected, setSelected] = useState({ type: "", category: "" });
  const [maintanceTime, setMaintanceTime] = useState(() => {
    try {
      const savedProfile = localStorage.getItem("maintenanceTime");
      return savedProfile ? JSON.parse(savedProfile) : "";
    } catch (error) {
      console.error("讀取 maintenanceTime 失敗:", error);
      return "";
    }
  });
  const [addNewWeight,setAddNewWeight]=useState('init')
  const [squareType, setSquareType] = useState("");
  // !確保一進來就寫入 sessionStorage  allWorkoutBuilderData from  api get
  const [getWorkoutbuilders, setGetWorkoutbuilders] = useState("init");

  const [E024ScanQrcode, setE024ScanQrcode] = useState("");
  const [E070ScanQrcode, setE070ScanQrcode] = useState("");
  const [realTimeWorkout, setRealTimeWorkout] = useState("init");
  console.log(realTimeWorkout);

  const [sessionWorkoutBuilderData, setSessionWorkoutBuilderData] = useState(
    () => {
      try {
        const savedProfile = sessionStorage.getItem("workoutBuilderData");
        console.log(savedProfile);

        return savedProfile ? JSON.parse(savedProfile) : [];
      } catch (error) {
        console.error("讀取 workoutBuilderData 失敗:", error);
        return [];
      }
    },
  );

  console.log(sessionWorkoutBuilderData);

  const cardioFilterOptions = [
    "ECO-POWR™ Recumbent Cycle",
    "Treadmill",
    "Elliptical",
    "ECO-POWR™ Indoor Cycle",
    "Upright Cycle",
    "ECO-POWR™ Rower",
    "Recumbent Cycle",
    "ECO-POWR™ Stepper",
    "Indoor Cycle",
    "ECO-POWR™ Cross Trainer",
    "Rower",
    "Other",
    "Stepper",
    "Walking",
    "Cross Trainer",
    "Running",
    "ECO-POWR™ Treadmill",
    "Cycling",
    "ECO-POWR™ Elliptical",
    "ECO-POWR™",
    "Upright Cycle",
  ];

  // 訂閱
  const [refreshToken, setRefreshToken] = useState("fail");

  PubSub.unsubscribe("p");
  PubSub.subscribe("p", (msg, data) => {
    console.log("msg=", msg); // 解出p
    console.log("data=", data); // 解出真正的data內容
  });
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      /**
       * 發佈
       */
      PubSub.publish("p", "註冊的狀態", "成功");
    }, 1000);

    // 清除定時器
    return () => {
      clearTimeout(timeoutId);
    };
  }, []);
  const [
    reconnectionAttemptExceededMaximumNumber,
    setReconnectionAttemptExceededMaximumNumber,
  ] = useState(false);

  const [deleteWorkoutbuilder, setDeleteWorkoutbuilder] = useState("init");

  const [addNewWorkoutbuilder, setAddNewWorkoutbuilder] = useState("init");

  const [updateWorkoutbuilder, setUpdateWorkoutbuilder] = useState("init");
  console.log(updateWorkoutbuilder);

  // isMetric
  let data = JSON.parse(localStorage.getItem("userProfile"));

  
  const [isMetric, setIsMetric] = useState(data?data.units:true);
  // const navigate = useNavigate();
  //no 縮放

  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => setScreenHeight(window.innerHeight);
    window.addEventListener("resize", handleResize);

    document.addEventListener("touchstart", handleTouchStart);
    document.addEventListener("touchend", handleTouchEnd);
    document.addEventListener("touchmove", handleTouchMove);

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchend", handleTouchEnd);
      document.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  const handleTouchStart = (event) => {
    setTouchStart(event.touches[0].clientY);
  };

  const handleTouchEnd = (event) => {
    setTouchEnd(event.changedTouches[0].clientY);
  };

  const handleTouchMove = (event) => {
    // 只在必要時阻止默認行為
    if (Math.abs(touchStart - event.touches[0].clientY) > 10) {
      event.preventDefault();
    }
  };

  const contextValue = {
    touchStart,
    touchEnd,
    screenHeight,
    setTouchStart,
    setTouchEnd,
  };
  // 將兩個 UTC 字串轉換為日期物件
  const maintaniceLocalStorage = JSON.parse(
    localStorage.getItem("maintenanceTime"),
  );
  const maintenanceStartTime = new Date(
    maintaniceLocalStorage ? maintaniceLocalStorage.startTime : "",
  );
  const maintenanceEndTime = new Date(
    maintaniceLocalStorage ? maintaniceLocalStorage.endTime : "",
  );
  const currentTime = new Date();
  const utcDate1 = new Date(
    maintaniceLocalStorage ? maintaniceLocalStorage.startTime : "",
  );
  const utcDate2 = new Date(
    maintaniceLocalStorage ? maintaniceLocalStorage.endTime : "",
  );

  const timezone = jstz.determine();
  const timeZone = timezone.name();

  // 定義轉換格式的函式
  const formatDate = (date) => {
    return date
      .toLocaleString("zh-TW", {
        timeZone: timeZone,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })
      .replace(/\//g, "-")
      .replace(",", "");
  };
  const formattedStarttime = formatDate(utcDate1);
  const formattedEndtime = formatDate(utcDate2);

  console.log(currentTime);

  // 檢查是否在維護期間
  const isMaintenance =
    currentTime >= maintenanceStartTime && currentTime <= maintenanceEndTime;
  //維護時間timezone格式化
  // 將兩個 UTC 字串轉換為日期物件

  if (isMaintenance || reconnectionAttemptExceededMaximumNumber) {
    return (
      <div className=" slide-in-from-bottom-no-width  h-dvh items-center justify-center">
        <div className="text-[3rem] ">
          <div className="flex  h-dvh items-center justify-center   ">
            <div
              className="relative flex h-[16rem] w-dvw flex-col items-center justify-center overflow-auto  border-mainColor bg-[#efefef] text-darkColor "
              style={{ borderWidth: "0.19rem" }}
            >
              <div className="    flex h-[9.4em] items-center justify-center pl-[1.25rem] pr-[1.25rem] text-[1.25rem] font-bold italic   leading-[1.5rem]">
                {globalstate === "en" ? (
                  <div>
                    The website is under maintenance. It will resume at{" "}
                    {formattedEndtime}. We apologize for any inconvenience
                    caused
                  </div>
                ) : (
                  <div className="font-['Open_Sans']">
                    網頁維護中~ 將於{formattedEndtime}恢復，造成不便，敬請見諒！
                  </div>
                )}
              </div>
              <section className="mb-[1.56rem] mt-[1.375rem] flex justify-center"></section>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <TouchContext.Provider value={contextValue}>
      <div className="h-dvh overflow-auto">
        <GlobalStateContext.Provider value={{ globalstate, setGlobalState }}>
          <CookieConsent />
          <IntlManager locale={locale}>
            {/* 具備分類式對象 */}
            <ConfigProvider
              theme={{
                token: {
                  fontFamily: "proxima-nova",
                  colorPrimary: "#84BD00",
                },
                components: {
                  Table: {
                    headerColor: "rgba(132, 189, 0, 1) ",
                    fontSize: "12rem",
                    fontWeightStrong: 600,

                    padding: "13rem",
                  },
                  Form: {
                    labelColor: "#84BD00",
                  },
                  Dropdown: {
                    fontSize: "16rem",
                    paddingBlock: 0,
                  },
                  Select: {
                    activeOutlineColor: "transparent",
                    optionFontSize: "16rem",
                  },
                  Popover: {
                    titleMinWidth: "120rem",
                  },
                },
              }}
            >
              <Content.Provider
                theme={{
                  token: {},
                }}
                value={{
                  //??
                  // 按上一頁, 返回鍵在用的
                  isBack,
                  setIsBack,
                  logout,
                  setLogout,
                  setIsClickOpCode,
                  isClickOpCode,
                  //??
                  //  mac.js
                  mac,
                  setMac,
                  macErr,
                  setMacErr,

                  // saClubToken.js
                  saClubToken,
                  setSaClubToken,

                  // scale.js
                  scaleH,
                  setScaleH,
                  scaleV,
                  setScaleV,
                  isPortrait,
                  setIsPortrait,

                  // Connect.js

                  setReconnectionAttemptExceededMaximumNumber,
                  reconnectionAttemptExceededMaximumNumber,
                  socketio,
                  setSocketio,
                  ws,
                  setWs,
                  connectState,
                  setConnectState,

                  //screen
                  activeScreen,
                  setActiveScreen,
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

                  //userProfile or opcode
                  userRegState,
                  setUserRegState,
                  confirmDeleteUserAccount,
                  setConfirmDeleteUserAccount,
                  userProfile,
                  setUserProfile,
                  setUpdateUserProfile,
                  updateUserProfile,
                  deleteUserID,
                  setDeleteUserID,
                  rebindingState,
                  setRebindingState,
                  confirmForgetUserPasswordCode,
                  setConfirmForgetUserPasswordCode,
                  forgetUserPassword,
                  setForgetUserPassword,
                  email,
                  setEmail,
                  password,
                  setPassword,
                  confirmPassword,
                  setConfirmPassword,
                  newPassword,
                  setNewPassword,
                  setConfirmUpdateUserPassword,
                  confirmUpdateUserPassword,
                  // google instagram
                  googleSub,
                  setGoogleSub,
                  googleSubBackup,
                  setGoogleSubBackup,

                  instagramSub,
                  setInstagramSub,
                  googleState,
                  setGoogleState,
                  instagramState,
                  setInstagramState,
                  //WorkoutBuilder data
                  setIsMetric,
                  isMetric,
                  ecoPowr,
                  setEcoPowr,
                  ecoNatural,
                  setEcoNatural,

                  distance,
                  setDistance,
                  setSessionWorkoutBuilderData,
                  sessionWorkoutBuilderData,

                  setSquares,
                  squares,
                  //WorkoutBuilder others

                  setSquareType,
                  squareType,
                  backToAddOrEditStepTwo,
                  setBackToAddOrEditStepTwo,

                  stepOneToTwoWorkoutType,
                  setStepOneToTwoWorkoutType,
                  setSquareId,
                  squareId,
                  workoutbuilderStepTwoId,
                  setWorkoutbuilderStepTwoId,
                  setGetWorkoutbuilders,
                  getWorkoutbuilders,
                  setAddNewWorkoutbuilder,
                  addNewWorkoutbuilder,
                  updateWorkoutbuilder,
                  setUpdateWorkoutbuilder,

                  setDeleteWorkoutbuilder,
                  deleteWorkoutbuilder,
                  //data-dashboard
                  weekData,
                  setWeekData,

                  //scan
                  E024ScanQrcode,
                  setE024ScanQrcode,
                  setE070ScanQrcode,
                  E070ScanQrcode,
                  setRealTimeWorkout,
                  realTimeWorkout,
                  // data-maintanceTime
                  formatDate,
                  formattedEndtime,
                  formattedStarttime,
                  maintanceTime,
                  setMaintanceTime,
                  //weight
                  setAddNewWeight,
                  addNewWeight,
                  //other data
                  selected,
                  setSelected,
                  cardioFilterOptions,
                  //Connect. opcode state
                  rememberMe,
                  setRememberMe,
                  setRefreshToken,
                  refreshToken,
                  isLogin,
                  setIsLogin,
                  isSupportLocalStorage,
                  setIsSupportLocalStorage,
                  setDeleteWorkout,
                  deleteWorkout,
                  retSetUserProfileState,
                  setRetSetUserProfileState,
                  confirmUserEmail,
                  setConfirmUserEmail,
                  verifyUserEmail,
                  setVerifyUserEmail,
                  // 其它
                }}
              >
                <ScreenScale />
                <Connect />
                <Suspense fallback={<div>Loading...</div>}>
                  <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/FAQ" element={<FAQ />} />
                    <Route
                      path="/forgotPassword"
                      element={<ForgotPassword />}
                    />
                    <Route
                      path="/TermsAndPrivacy"
                      element={<TermsAndPrivacy />}
                    />
                    <Route path="/SignUp" element={<SignUp />} />
                    <Route path="/Authenticate" element={<Authenticate />} />
                    <Route path="/Rebinding" element={<Rebinding />} />
                    <Route path="/WSError" element={<WSError />} />
                    {/* <Route
                      path="/Login/WebsiteMaintenance"
                      element={<WebsiteMaintenance />}
                    /> */}
                    {/* <Route path="/PasswordReset" element={<PasswordReset />} /> */}
                    <Route path="/Contact" element={<Contact />} />
                    <Route path="/About" element={<About />} />
                    <Route path="/mac/:id" element={<MAC />} />
                    <Route path="*" element={<Page404 />} />
                  </Routes>
                </Suspense>
              </Content.Provider>
            </ConfigProvider>
          </IntlManager>
        </GlobalStateContext.Provider>
      </div>
    </TouchContext.Provider>
  );
};

export default App;

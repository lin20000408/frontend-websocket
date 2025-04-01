import { EyeInvisibleOutlined, SyncOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Input,
  Modal,
  Row,
  message,
  Tooltip,
  Select,
  Popover,
} from "antd";
import {
  useCallback,
  useContext,
  useEffect,
  useState,
  useMemo,
  useRef,
} from "react";
import { axiosPost, axiosGet } from "@/components/Axios";
import { GoogleLoginButton } from 'react-social-login-buttons';
import Dashboard from "@/components/Dashboard";
// 引入.env
// import 'dotenv/config';

//
import Icon_Language from "@/assets/icons/Language.svg";
import { LoginSocialGoogle, LoginSocialInstagram } from "reactjs-social-login";

import { Content } from "@/App";
import BackgroundImage from "@/assets/images/common/Background.png";
import BackgroundImageTriangle from "@/assets/images/BackgroundImageTriangle.svg";
import { useLocation, useNavigate } from "react-router-dom";
// css 的模組引入
// import styles from "@/css/local.module.css";
import {
  BACKGROUND_COLOR,
  DARKBLACK_COLOR,
  MAIN_COLOR,
  MEDIUMGRAY_COLOR,
  ORANGE_COLOR,
} from "@/constants";

import Icon_Google from "@/assets/icons/GoogleIcon.svg";
import Icon_Instagram from "@/assets/icons/InstagramIcon.svg";
import Icon_RememberMe from "@/assets/icons/RememberMe.svg";
import Icon_RememberMeActive from "@/assets/icons/RememberMeChecked.svg";
import { InfoCircleOutlined } from "@ant-design/icons";
import { GlobalStateContext } from "@/App";
import WebsiteMaintenance from "@/components/WebsiteMaintenance";
// import Icon_PowrplusLogo from '@/assets/images/icon_user_login/PowrplusLogo.svg'
// 背景組件
// import BackgroundSVG from '@/components/BackgroundSVG

// let ws = null;

const inputObject = {
  account: "",
  password: "",
  rememberme: false,
};

// const REDIRECT_URI =
// 'https://vite-mypowrplus.vercel.app';
//  'http://localhost:5173/';
const REDIRECT_URI = "http://localhost:3000/account/login";

const Login = () => {
  // 全局變量
  const {
    isBack,
    setIsBack,

    // Scale
    scaleV,

    // Connect
    isLogin,
    setIsLogin,
    isSupportLocalStorage,
    socketio,
    connectState,
    setConnectState,
    currentScreen,
    // screen
    activeScreen,
    setActiveScreen,
    setCurrentScreen,
    setCurrentSub1Screen,
    // mac
    mac,
    setMac,
    // saClubToken
    userProfile,
    // google login
    googleSub,
    setGoogleSub,
    googleSubBackup,
    setGoogleSubBackup,
    setIsClickOpCode,
    // instagram login

    // google
    googleState,
    setGoogleState,
    // instagram
    refreshToken,
    logout,
    ws,
    setWs,
  } = useContext(Content);

  const { globalstate } = useContext(GlobalStateContext);
  const { setGlobalState } = useContext(GlobalStateContext);
  useEffect(() => {
    const browserLang = navigator.language || navigator.userLanguage;
    const initialLang = browserLang.startsWith("zh") ? "zh" : "en";
    setGlobalState(initialLang);
    setClickZh(false);
    setClickEn(false);
  }, []);
  const [clickEn, setClickEn] = useState(false);
  const [clickZh, setClickZh] = useState(false);
  const setEn = () => {
    setGlobalState("en");
    setClickEn(true);
  };
  const setZh = () => {
    setGlobalState("zh");
    setClickZh(true);
  };

  const text = (
    <div className="top-[-10rem]   mb-[-22rem] h-[15rem] text-[1rem] text-black"></div>
  );
  const contentPopover = (
    <div className=" top-[1rem] flex text-[18rem] ">
      <p
        className={` ${globalstate === "en" ? "text-[#84BD00]" : "text-black"} `}
        onClick={setEn}
      >
        English
      </p>
      <p style={{ color: "transparent", fontSize: "7rem" }}>12</p>
      <p style={{}}>/</p>
      <p style={{ color: "transparent", fontSize: "7rem" }}>12</p>
      <p
        className={` ${globalstate === "zh" ? "text-[#84BD00]" : "text-black"} `}
        onClick={setZh}
      >
        中文
      </p>
    </div>
  );
  //判斷水平垂直
  const [isPortrait, setIsPortrait] = useState(
    window.matchMedia("(orientation: portrait)").matches,
  );
  // 狀態定義區塊
  const [errStrArray, setErrStrArray] = useState([]);
  useEffect(() => {
    const mediaQuery = window.matchMedia("(orientation: portrait)");

    const handleOrientationChange = (e) => {
      setIsPortrait(e.matches);
    };

    mediaQuery.addListener(handleOrientationChange);
    setErrStrArray([]);
    return () => {
      mediaQuery.removeListener(handleOrientationChange);
    };
  }, []);
  // 產品模式跟生產模式選擇Google ID
  const clientId = import.meta.env.VITE_REACT_APP_GG_APP_ID;

  console.log("clientId[lOGIN] = ", clientId);

  console.log(
    "import.meta.env.VITE_REACT_APP_GG_APP_ID = ",
    import.meta.env.VITE_REACT_APP_GG_APP_ID,
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenWhenPressBack, setIsModalOpenWhenPressBack] =
    useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const [account1, setAccount1] = useState("");
  const [password, setPassword] = useState("");
  const [isDisp, setIsDisp] = useState(false);

  // Google 用
  const [provider, setProvider] = useState("");
  const [profile, setProfile] = useState();

  const onLoginStart = useCallback(() => {
    alert("login start");
  }, []);

  const onLogoutFailure = useCallback(() => {
    alert("logout fail");
  }, []);

  const onLogoutSuccess = useCallback(() => {
    setProfile(null);
    setProvider("");
    alert("logout success");
  }, []);

  const onLogout = useCallback(() => {}, []);
  // Google 登入用

  useEffect(() => {
    localStorage.setItem("cookieConsent", "false");
    if (connectState === "init") {
      console.log("init (Login)");
      return () => {};
    }

    if (connectState === "connect") {
      console.log("connect (Login)");
      return () => {};
    }

    if (connectState === "disconnect") {
      console.log("disconnect (Login)");
      return () => {};
    }

    // 它本來就再login 不用再跳了
    if (connectState === "reconnected") {
      console.log("reconnected  (Login)");
      setConnectState("init");
      // 跳往login 畫面

      navigate("/login");
      ("");

      return () => {};
    }

    if (connectState === "error") {
      console.log("Error (Login)");
      // 設回初值
      setConnectState("init");
      // 跳往error 畫面

      return () => {};
    }
  }, [connectState]);
  const [pixelRatio, setPixelRatio] = useState(window.devicePixelRatio);
  // 觸發 localStorage 判斷
  useEffect(() => {
    console.log("WebSocket status:", ws);
    console.log("isBack:", isBack);

    let data = localStorage.getItem("sauser_accessToken");
    const data1 = localStorage.getItem("sauser_rememberme");

    if (data && data1 === "true") {
      try {
        const dataToSend = {
          userAuth: { sauser_accessToken: data },
        };

        if (ws && ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify(dataToSend));
          console.log("Data sent successfully");
          localStorage.setItem("cookieConsent", "true");
        } else {
          console.error("none");
        }
      } catch (error) {
        console.error("Error in WebSocket send:", error);
      }
    }
  }, [ws, isBack]);
  // 進入第一次就把login狀態
  useEffect(() => {
    const stateData = { activeScreen: "loginScreen" };
    const title = ""; // 页面标题（可选）
    const newUrl = "/"; // 新的 URL（可选）

    window.history.replaceState(stateData, title, newUrl);
    console.log("放入歷史堆棧");

    // 得到螢幕的比例
    setPixelRatio(window.devicePixelRatio);
  }, []); //20240324

  /**
   * 得到url參數解析
   */
  const location = useLocation();
  const params = useMemo(
    () => new URLSearchParams(location.search),
    [location.search],
  );

  useEffect(() => {
    if (localStorage.getItem("sauser_accessToken") === null) return;

    if (params.size === 0) {
      setMac("");
      return;
    }

    const dataParam = params.get("data");
    if (!dataParam) return;

    try {
      const jsonMacData = JSON.parse(dataParam);
      if (jsonMacData.mac) {
        setMac(jsonMacData.mac);
        window.history.replaceState({ currentScreen: "loginScreen" }, "", "/");
      }
    } catch (error) {
      console.error("解析错误", error);
      setMac("");
    }
  }, [params]); // 只依赖 params

  // 觸發 isLogin依賴

  useEffect(() => {
    console.log("[login] trigger");
    if (isLogin === "init") {
      return () => {};
    }
    //當auth失效 傳給refreshUserToken refreshUserToken再傳回new access token 在做一次自動授權

    //當auto login refreshToken =換成新的access
    if (isLogin === "tokenHasExpired") {
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
    }
    //重新傳auth (auto login)
    if (refreshToken === "success" && isLogin === "tokenHasExpired") {
      {
        console.log("success");
        let data = localStorage.getItem("sauser_accessToken");
        const data1 = localStorage.getItem("sauser_rememberme");
        if (data !== undefined && data !== null && data1 === "true") {
          const dataJson = JSON.stringify({
            userAuth: { sauser_accessToken: data },
          });

          if (ws) {
            setIsClickOpCode(true);
            ws.send(dataJson);
            console.log("success");
          }
        }
      }

      // 更新remember me
      let me = localStorage.getItem("sauser_rememberme");
      if (me !== null && me !== undefined) {
        if (me === "true") {
          console.log("me2 = ", me);
          setRememberMe(true);
        } else {
          setRememberMe(false);
        }
      }
    }
    if (isLogin === "fail") {
      console.log("Login 失敗(Login)");
      setErrStrArray([]);
      setErrStrArray((prev) => [
        ...prev,
        globalstate === "en"
          ? "Your account or password is incorrect."
          : "你的帳號或密碼錯誤",
      ]);
      setIsModalOpen(true);
      return () => {};
    }

    if (isLogin === "success") {
      console.log("Login 成功(Login) 要跳往menu");
      const sessionOriginal = JSON.parse(
        localStorage.getItem("workoutBuilderData"),
      );
      if (!sessionOriginal || sessionOriginal.length === 0) {
        let data = localStorage.getItem("sauser_accessToken");
        console.log(data);

        const dataJson = JSON.stringify({
          getWorkoutbuilders: { sauser_accessToken: data },
        });

        if (ws) {
          ws.send(dataJson);

          console.log("send");
        } else {
          console.log("no ws");
        }
      }

      setIsBack(false);
      // 先關閉背景再跳躍這樣就非常好看了不會殘留背景了

      // 讓進去的第一個畫面是0 (首頁)
      // 讀mac
      console.log("mac [login] =", mac);
      setActiveScreen("menuScreen");
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
        const stateData = {
          activeScreen: "menuScreen",
          currentScreen: "dashboardScreen",
        };
        const title = ""; // 页面标题（可选）
        const encodedData = encodeURIComponent(JSON.stringify(stateData));
        const newUrl = `/?data=${encodedData}`; // 新的 URL（可选）
        window.history.pushState(stateData, title, newUrl);
      }
    }
  }, [isLogin, isSupportLocalStorage, refreshToken]);

  const pressContact = () => {
    navigate("/Contact");
  };
  const pressAbout = () => {
    navigate("/About");
  };

  const pressFAQ = () => {
    navigate("/FAQ");
  };

  const pressForgotPassword = () => {
    navigate("/ForgotPassword");
  };

  const pressSignUp = () => {
    navigate("/SignUp");
  };

  const pressTermsAndPrivacy = () => {
    console.log("press Terms & privacy");
    navigate("/TermsAndPrivacy");
  };
  //modal login 檢驗

  const onChangeAccount = (event) => {
    // console.log('event value = ', event.target.value);
    setAccount1(event.target.value);
  };

  const onChangePassword = (event) => {
    // console.log('event value = ', event.target.value);
    setPassword(event.target.value);
  };

  // 更換背景圖片及顏色
  useEffect(() => {
   
    document.body.style.backgroundImage = `url(${BackgroundImage})`;
    document.body.style.backgroundPosition = "0% 0%";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundAttachment = "fixed";
    document.body.style.backgroundSize = "cover"; // 確保圖片覆蓋整個畫面

    // document.body.style.backgroundSize = "100%  50%"
    // document.body.style.backgroundSize = "cover"
    // document.body.style.backgroundColor = BACKGROUND_COLOR;
    // document.body.style.backgroundColor = "cover";

    /**
     * 判斷所有的圖片完全載入後才把顯示打開
     *
     */
    const imageElements = document.querySelectorAll("img");
    const totalImages = imageElements.length;
    let loadedImages = 0;

    const handleImageLoad = () => {
      loadedImages++;
      if (loadedImages === totalImages) {
        setIsDisp(true); // 載完圖片後才改開顯示器
      }
    };

    imageElements.forEach((image) => {
      if (image.complete) {
        handleImageLoad();
      } else {
        image.addEventListener("load", handleImageLoad);
      }
    });

    return () => {
      imageElements.forEach((image) => {
        image.removeEventListener("load", handleImageLoad);
      });
    };
  }, [logout]);

  const pressRememberMe = () => {
    console.log("pressRemeberMe");
    setRememberMe(!rememberMe);

    if (!rememberMe) {
      inputObject.rememberme = false;
      localStorage.setItem("sauser_rememberme", "true");
    } else {
      inputObject.rememberme = true;
      localStorage.setItem("sauser_rememberme", "false");
    }
  };

  const handleOk = () => {
    setIsModalOpenWhenPressBack(false);
    setIsModalOpen(false);
    setIsLogin("init");
  };
  const handleCancel = () => {};

  const handleOkWhenPressBack = () => {
    setIsModalOpenWhenPressBack(false);
    props.updateSetCurrentScreen("mainScreen");
  };

  const handleCancelWhenPressBack = () => {
    setIsModalOpenWhenPressBack(false);
  };

  useEffect(() => {
    console.log(
      "import.meta.env.REACT_APP_GG_APP_ID =  ",
      import.meta.env.VITE_REACT_APP_GG_APP_ID,
    );
  }, []);

  // 這個會誤動件
  useEffect(() => {
    if (ws && googleSub) {
      let inputObj = {};
      let sauser_accessToken = localStorage.getItem("sauser_accessToken");
      if (sauser_accessToken) {
        inputObj = {
          googleUserLogin: {
            sauser_accessToken: sauser_accessToken,
            googleSub: googleSubBackup,
          },
        };
        console.log("inputObj[google-login]", inputObj);
      } else {
        inputObj = {
          googleUserLogin: {
            googleSub: googleSubBackup,
          },
        };
        console.log("inputObj[google-login]", inputObj);
      }
      setIsClickOpCode(true);
      const res = JSON.stringify(inputObj);
      ws.send(res);
      setGoogleSub(""); // 清掉讓下次登錄時才有用
    }
  }, [googleSub]);

  useEffect(() => {
    if (googleState == "init") return;

    //!當auto login refreshToken =換成新的access
    if (googleState === "tokenHasExpired") {
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
    }
    //重新傳googleUserLogin
    if (refreshToken === "success" && googleState === "tokenHasExpired") {
      {
        console.log("success");

        if (ws && googleSub) {
          let inputObj = {};
          let sauser_accessToken = localStorage.getItem("sauser_accessToken");
          if (sauser_accessToken) {
            inputObj = {
              googleUserLogin: {
                sauser_accessToken: sauser_accessToken,
                googleSub: googleSubBackup,
              },
            };
            console.log("inputObj[google-login]", inputObj);
          } else {
            inputObj = {
              googleUserLogin: {
                googleSub: googleSubBackup,
              },
            };
            console.log("inputObj[google-login]", inputObj);
          }
          console.log("success");
          const res = JSON.stringify(inputObj);
          setIsClickOpCode(true);
          ws.send(res);
          setGoogleSub(""); // 清掉讓下次登錄時才有用
        }
      }
    }

    // 偵測到新的google帳號及一般帳號, 但此一般帳號卻是綁定一個舊的google帳號所以要用新google帳號去置換原google帳號所以要確認一下
    if (googleState === "accountBindingConflict") {
      console.log("去授權頁面去確認帳號綁定 ");

      setGoogleState("init");

      navigate("/Rebinding");

      return;
    }
    // 有偵測到新的google帳號, 但此新google帳號未綁定任何帳號
    if (googleState === "needRegisterToBindAccount") {
      setGoogleState("init");
      console.log("跳往授權頁面去綁定帳號及Google");

      navigate("/SignUp");

      return;
    }
  }, [googleState, refreshToken, googleSub]);

  const [isPasswordVisible, setIsPasswordVisible] = useState("password");
  const [passwordEyesOn, setPasswordEyesOn] = useState(false);

  const handlePasswordEyesClick = () => {
    if (isPasswordVisible === "text") {
      setIsPasswordVisible("password");
      setPasswordEyesOn(false);
    } else {
      setIsPasswordVisible("text");
      setPasswordEyesOn(true);
    }
  };
  //translate
  const translations = {
    en: {
      title: "Confirmation",
      message: "Are you sure you want to go back?",
      subMessage: "You will lose unsaved work.",
      ok: "OK",
      cancel: "Cancel",
    },
    zh: {
      title: "確認",
      message: "您确定要返回嗎？",
      subMessage: "您將丟失未保存的資料。",
      ok: "確定",
      cancel: "取消",
    },
  };
  const t = translations[globalstate];
  // 主程式返回點 main-return
  const pressLogin = () => {
    // console.log('socketio in presLogin', socketio);
    // 判斷有沒有記錄打勾 remember me
    // console.log('inputObject.remember = ', inputObject.rememberme);
    setErrStrArray([]); // 清空錯誤訊息陣列
    let errorState = false;
    if (account1 === "") {
      setErrStrArray((prev) => [
        ...prev,

        globalstate === "en"
          ? "The EMAIL field cannot be empty."
          : "請輸入信箱",
      ]);
      errorState = true;
    }

    if (password === "") {
      setErrStrArray((prev) => [
        ...prev,
        globalstate === "en"
          ? "The PASSWORD field cannot be empty."
          : "請輸入密碼",
      ]);
      errorState = true;
    }

    if (errorState) {
      console.log("有錯誤errorState ");
      setIsModalOpen(true);
      return;
    } else {
      console.log("沒有錯誤errorState ");
    }
    const inputObject = {
      userLogin: {
        account: account1,
        password: password,
      },
    };
    console.log("inputObject = ", inputObject);

    if (ws) {
      setIsClickOpCode(true);
      ws.send(JSON.stringify(inputObject));
      console.log("ok");
    }

    // if (isSupportLocalStorage === true) {
    //   localStorage.setItem("sauser_rememberme", rememberMe);
    // }
  };
  console.log(userProfile);

  return (
    <div
      className="relative h-dvh w-dvw "
      style={{
        width: "375rem",
      }}
    >
      <div className="slide-in-from-bottom-no-ease flex h-dvh">
        <img
          className="absolute bottom-0 right-0 w-[111rem] "
          src={BackgroundImageTriangle}
          alt="BackgroundImageTriangle"
        />
      </div>
      {/* 處理背景那個三角形開始 */}

      {/* <BackgroundImageElement/> */}
      {/* 處理背景那個三角形結束 */}

      {/* loading 轉圈圈開始*/}
      {isPortrait ? (
        <div className="relative   w-dvw ">
          {/* 轉動icon 的包在div內 確保不會亂跑 */}
          {/* <div className="slide-in-from-bottom-no-ease flex h-dvh">
            <img
              className="absolute bottom-0 right-0 w-[111rem] "
              src={BackgroundImageTriangle}
              alt="BackgroundImageTriangle"
            />
          </div> */}
          <div
            style={{
              color: MEDIUMGRAY_COLOR,
              display: isDisp ? "none" : "block",
            }}
            className="slide-in-from-bottom h-dvh w-dvw bg-white"
          >
            <div>{/* <SyncOutlined spin /> */}</div>
          </div>

          {/* 下面這一方是統包 */}
          <div>
            <Modal
              title={
                <div style={{ color: ORANGE_COLOR, fontSize: "14rem" }}>
                  Warning
                </div>
              }
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
              okText={t.ok}
              cancelText={t.cancel}
              // 使用footer定義按鍵
              footer={[
                <Button
                  key="submit"
                  type="primary"
                  onClick={handleOk}
                  className="h-[30rem] text-[18rem] leading-[10rem]
              "
                >
                  {t.ok}
                </Button>,
              ]}
            >
              <ul className="">
                {errStrArray.map((errStr, index) => (
                  <li
                    key={index}
                    style={{ color: DARKBLACK_COLOR, fontSize: "12rem" }}
                  >
                    {`${errStr}`}
                  </li>
                ))}
              </ul>
            </Modal>

            <Modal
              title={<div style={{ color: "red", fontSize: "14rem" }}> </div>}
              open={isModalOpenWhenPressBack}
              onOk={handleOkWhenPressBack}
              onCancel={handleCancelWhenPressBack}
              okText={t.ok}
              cancelText={t.cancel}
            >
              {/* 文字內容無法崁入style? */}
              <div style={{ textAlign: "center", fontSize: "12rem" }}>
                <div style={{ textAlign: "center" }}>{t.message}</div>

                <div style={{ textAlign: "center" }}>{t.subMessage}</div>
              </div>
            </Modal>
            {/* loading 轉圈圈結束*/}

            {/* 父 開始*/}
            <div
              style={{
                display: !isDisp ? "none" : "flex",
              }}
              className="flex   w-dvw  justify-center overflow-y-auto  overflow-x-hidden text-center text-[#53565a] "
            >
              {/* 子開始 */}
              <div className="flex w-dvw flex-col">
                {/* 孫1  開始*/}

                <Row justify={"center"} className="pt-[calc(66rem)]">
                  <Col>
                    {/* powplusLogo */}
                    <svg
                      id="Powr_Logo"
                      data-name="Powr+ Logo"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-[calc(235.84rem) h-[calc(41.27rem)] 
                  "
                      viewBox="0 0 235.836 41.273"
                    >
                      <path
                        id="Path_1345"
                        data-name="Path 1345"
                        d="M458.405,0V.768H460.6V6.929h.862V.768h2.2V0Z"
                        transform="translate(-235.988 0)"
                        fill="#333f48"
                      />
                      <path
                        id="Path_1346"
                        data-name="Path 1346"
                        d="M475.521,0,473.36,5.214,471.209,0h-1.236V6.929h.862V1.224l2.349,5.705h.352L475.9,1.224V6.929h.862V0Z"
                        transform="translate(-240.921 0)"
                        fill="#333f48"
                      />
                      <path
                        id="Path_1347"
                        data-name="Path 1347"
                        d="M416.625,39.8l1.911-11.149h-11.1l1.335-7.514H419.91l1.911-11.147h7.771l-1.975,11.147h11.147l-1.331,7.514H426.284L424.31,39.8Z"
                        transform="translate(-214.259 -4.26)"
                        fill="#333f48"
                      />
                      <path
                        id="Path_1348"
                        data-name="Path 1348"
                        d="M70.691,41.275,77.984,0h29.289a6.568,6.568,0,0,1,4.9,1.889,6.472,6.472,0,0,1,1.9,4.819,9.555,9.555,0,0,1-.124,1.5l-1.205,6.767a10.355,10.355,0,0,1-3.705,6.282,10.024,10.024,0,0,1-6.7,2.611H83.175L80.1,41.275ZM84.6,15.559h18.59l1.4-7.911H86.01Z"
                        transform="translate(-70.691 -0.002)"
                        fill="#333f48"
                      />
                      <path
                        id="Path_1349"
                        data-name="Path 1349"
                        d="M152.854,41.275a6.565,6.565,0,0,1-4.9-1.894,6.478,6.478,0,0,1-1.9-4.824,8.688,8.688,0,0,1,.126-1.468l4.237-24.2a10.237,10.237,0,0,1,3.722-6.27,10.124,10.124,0,0,1,6.73-2.612h20.43A6.572,6.572,0,0,1,186.2,1.9a6.472,6.472,0,0,1,1.89,4.817,9.107,9.107,0,0,1-.126,1.481l-4.231,24.2a10.268,10.268,0,0,1-3.727,6.268,10.112,10.112,0,0,1-6.726,2.618Zm2.968-9.491h18.617l3.9-22.29H159.72Z"
                        transform="translate(-102.824 -0.002)"
                        fill="#333f48"
                      />
                      <path
                        id="Path_1350"
                        data-name="Path 1350"
                        d="M256.724,41.272,255.23,16.253l-10.9,25.019h-14.08L227.219,0H236.7l2.493,30.655L252.847,0H263.18l2.58,30.929L279.3,0h9.166L270.849,41.272Z"
                        transform="translate(-137.425 0)"
                        fill="#333f48"
                      />
                      <path
                        id="Path_1351"
                        data-name="Path 1351"
                        d="M357.119,41.275l3.062-17.4H341.588l-3.076,17.4H329.1L336.392,0h29.295a6.571,6.571,0,0,1,4.9,1.89,6.473,6.473,0,0,1,1.891,4.822,9.069,9.069,0,0,1-.122,1.476l-1.2,6.8c-.747,3.864-4.7,5.369-4.7,5.369a4.507,4.507,0,0,1,2.875,5.415l-2.8,15.5ZM342.992,15.649H361.6l1.4-7.91H344.412Z"
                        transform="translate(-180.863 -0.002)"
                        fill="#333f48"
                      />
                    </svg>

                    {/* <img src={Icon_PowrplusLogo} alt='' /> */}
                  </Col>
                </Row>

                {/* 孫1  結束*/}

                {/* 孫2  開始*/}
                {/* 語言切換 中/en */}
                <div className="">
                  <div
                    className=" absolute "
                    style={{ top: "15rem", right: "15rem" }}
                  >
                    {" "}
                    <Row className="relative mb-[20rem]  flex cursor-pointer items-center">
                      {" "}
                      <Popover
                        placement="left"
                        className="  ml-[300rem] rounded-none "
                        style={{}}
                        title={text}
                        content={contentPopover}
                      >
                        <Button
                          className="bg-[transparent] "
                          style={{
                            width: "70rem",
                            fontSize: "14rem",
                            height: "30rem",
                          }}
                        >
                          {globalstate === "en"
                            ? clickEn
                              ? "English"
                              : "Language"
                            : clickZh
                              ? "中文"
                              : "語言"}
                        </Button>
                      </Popover>
                    </Row>
                  </div>

                  <form action="">
                    <section className="mt-[calc(35.3rem)] flex justify-center">
                      <div
                        className="
                    flex
                     text-center    
                     text-[calc(16rem)]
                     text-darkColor                          
                "
                      >
                        {globalstate === "en" ? (
                          <span> Email or Account Name</span>
                        ) : (
                          <span className="font-['Open_Sans']">
                            信箱或帳號名稱
                          </span>
                        )}
                      </div>
                    </section>
                    {/* //!設判斷是否符合 此會員的 info@gosportsart.com or phone number */}
                    <section className=" flex justify-center text-[calc(14rem)]">
                      <div className=" flex h-[calc(42rem)] w-[calc(263.92rem)] items-center justify-center border-2 border-mainColor bg-white  text-[calc(14rem)]">
                        <input
                          required
                          autoComplete="username"
                          type="email"
                          value={account1}
                          // width={'100%'}
                          // height={'100%'}
                          placeholder="Email or Account Name"
                          onChange={onChangeAccount}
                          className="z-[100] h-full w-full bg-transparent text-center
                      "
                        />
                      </div>
                    </section>
                    {/* Password */}
                    <Row justify={"center"} className="mt-[calc(12.5rem)]">
                      <Col
                        className="
                text-center  
                text-[calc(16rem)]
                text-darkColor
"
                      >
                        {globalstate === "en" ? (
                          <span> PASSWORD </span>
                        ) : (
                          <span className="font-['Open_Sans']">密碼</span>
                        )}
                      </Col>
                    </Row>
                    {/* 具備綠色眼精 */}
                    <Row justify={"center"} className="">
                      <section className=" flex justify-center text-[calc(14rem)]">
                        <div className=" flex h-[calc(42rem)] w-[calc(263.92rem)] items-center justify-center border-2 border-mainColor  bg-white">
                          <input
                           autoComplete="current-password"
                            required
                            type={isPasswordVisible}
                            value={password}
                            placeholder="......."
                            onChange={onChangePassword}
                            className="z-[100] h-full w-full bg-transparent pl-[calc(30rem)] text-center
                      "
                          />

                          <div
                            className=" px-[calc(10rem)]"
                            onClick={handlePasswordEyesClick}
                          >
                            {passwordEyesOn ? (
                              <>
                                <EyeInvisibleOutlined className="text-mainColor" />
                              </>
                            ) : (
                              <>
                                <EyeInvisibleOutlined className="text-gray-400" />
                              </>
                            )}
                          </div>
                        </div>
                      </section>
                    </Row>
                    <Row className="mt-[calc(13.4rem)] w-dvw justify-center">
                      {/* 選擇框 -> 子當繼父來用 */}
                      <Col
                        onClick={pressRememberMe}
                        className="flex  items-center  "
                      >
                        <div className="mr-[calc(4.2rem)] cursor-pointer">
                          <img
                            src={
                              rememberMe
                                ? Icon_RememberMeActive
                                : Icon_RememberMe
                            }
                            alt=""
                            style={{
                              border: `1rem solid ${MAIN_COLOR}`,
                            }}
                            className=" h-[calc(16rem)] w-[calc(16rem)]"
                          />
                        </div>

                        <div
                          className=" 
                  cursor-pointer
                  text-[calc(14rem)]

                  "
                        >
                          {globalstate === "en" ? (
                            <span> {"Remember Me"}</span>
                          ) : (
                            <span className="font-['Open_Sans']">保持登入</span>
                          )}
                        </div>
                      </Col>

                      <Col
                        className="
                ml-[calc(40.8rem)]
                   flex
                cursor-pointer
                items-center
                text-[calc(14rem)]
                text-mainColor
                "
                      >
                        <div className="" onClick={pressForgotPassword}>
                          {globalstate === "en" ? (
                            <span> Forgot Password</span>
                          ) : (
                            <span className="font-['Open_Sans']">忘記密碼</span>
                          )}
                        </div>
                      </Col>
                    </Row>
                    <Row justify={"center"} className="mt-[calc(34.3rem)]">
                      <Col
                        style={{
                          background: `linear-gradient(to top left, #80c342, #bae642)`,
                          border: "2rem solid white",
                        }}
                        className="
                h-[calc(38.49rem)] w-[calc(160rem)] cursor-pointer text-center text-[calc(20rem)]
              leading-[calc(35rem)] text-white
            
              "
                        onClick={pressLogin}
                      >
                        {globalstate === "en" ? (
                          <span> LOGIN</span>
                        ) : (
                          <span className="font-['Open_Sans']">登入</span>
                        )}
                      </Col>
                    </Row>
                  </form>

                  <Row justify={"center"}>
                    <Col
                      flex={1}
                      className="
              mt-[calc(10rem)]
              text-[calc(20rem)]
               text-darkColor
              "
                    >
                      {globalstate === "en" ? (
                        <span> Log in with</span>
                      ) : (
                        <>
                          {" "}
                          <span>Google </span>
                          <span className="font-['Open_Sans']">登入</span>
                        </>
                      )}
                    </Col>
                  </Row>

                  <Row
                    justify={"center"}
                    align={"center"}
                    style={{ marginTop: "17rem" }}
                  >
                    {/* Google 登入 */}
                    <Col>
                      <LoginSocialGoogle
                        client_id={clientId}
                        onLogoutFailure={onLogoutFailure}
                        onLoginStart={onLoginStart}
                        onLogoutSuccess={onLogoutSuccess}
                        onResolve={({ provider, data }) => {
                          setProvider(provider);
                          console.log("取得Google 回應的資料 = ", data);
                          setProfile(data);
                          setGoogleSub(data.sub);
                          // 備份
                          setGoogleSubBackup(data.sub);

                          {
                          }
                        }}
                        onReject={(err) => {
                          console.log("reject", err);
                        }}
                        className=" flex"
                      >
                        <GoogleLoginButton/>
                      </LoginSocialGoogle>
                    </Col>

                    
                  </Row>

                  {/*  */}
                  <Row justify={"center"} className="mt-[calc(13.5rem)]">
                    <Col
                      className="
               text-[calc(14rem)]
              text-darkColor
              "
                    >
                      {globalstate === "en" ? (
                        <span> {"Don't have an account?"}</span>
                      ) : (
                        <span className="font-['Open_Sans']">還沒有帳號？</span>
                      )}
                    </Col>
                  </Row>
                  <Row justify={"center"}>
                    <Col
                      onClick={pressSignUp}
                      className="
              cursor-pointer 
               text-[calc(16rem)]
              text-mainColor
              "
                    >
                      {globalstate === "en" ? (
                        <span> {"SIGN UP"}</span>
                      ) : (
                        <span className="font-['Open_Sans']">註冊</span>
                      )}
                    </Col>
                  </Row>

                  {/* CONTACT */}

                  <Row style={{ marginTop: "calc(35.4rem" }}>
                    <Col
                      span={11}
                      onClick={pressContact}
                      className="
                cursor-pointer
                text-[calc(14rem)] 
                "
                    >
                      <div className="absolute right-0">
                        {" "}
                        {globalstate === "en" ? (
                          <span> CONTACT</span>
                        ) : (
                          <span className="font-['Open_Sans']">聯絡我們</span>
                        )}
                      </div>
                    </Col>

                    <Col span={2}>
                      <div
                        style={{
                          position: "relative",
                          top: "calc(5rem)",
                          left: "50%",
                          width: "calc(1rem)",
                          height: "calc(13rem)",
                          background: MAIN_COLOR,
                        }}
                      ></div>
                    </Col>

                    <Col
                      span={11}
                      onClick={pressFAQ}
                      className="
                cursor-pointer
                text-[calc(14rem)] 
                "
                    >
                      <div className=" text-start">
                        {" "}
                        {globalstate === "en" ? (
                          <span> FAQ</span>
                        ) : (
                          <span className="font-['Open_Sans']">常見問題</span>
                        )}
                      </div>
                    </Col>
                  </Row>

                  {/* TERMS & PRIVACY */}

                  <Row className="mt-[calc(5rem)]" justify={"end"}>
                    <Col
                      span={11}
                      onClick={pressTermsAndPrivacy}
                      className="
                cursor-pointer
                text-[calc(14rem)] 
                "
                    >
                      <div className=" absolute right-0">
                        {" "}
                        {globalstate === "en" ? (
                          <span> {"TERMS & PRIVACY"}</span>
                        ) : (
                          <span className="font-['Open_Sans']">
                            {" "}
                            服務條款及隱私政策
                          </span>
                        )}
                      </div>
                    </Col>

                    <Col span={2}>
                      <div
                        style={{
                          position: "relative",
                          top: "calc(5rem)",
                          left: "50%",
                          width: "calc(1rem)",
                          height: "calc(13rem)",
                          background: MAIN_COLOR,
                        }}
                      ></div>
                    </Col>

                    <Col
                      span={11}
                      onClick={pressAbout}
                      className="
                cursor-pointer
                text-[calc(14rem)] 
                "
                    >
                      <div className=" text-start">
                        {" "}
                        {globalstate === "en" ? (
                          <span> ABOUT</span>
                        ) : (
                          <span className="font-['Open_Sans']">關於我們</span>
                        )}{" "}
                      </div>
                    </Col>
                  </Row>

                  <Row style={{ paddingBottom: "5vh" }}>
                    <Col> </Col>
                  </Row>

                  <Row justify={"center"} style={{ marginBottom: "5vh" }}>
                    <Col
                      className="        
                mb-[10rem]
                text-[calc(14rem)]
              text-gray-300
              "
                    >
                      v03.25.02
                    </Col>
                  </Row>
                  {/* //BackgroundImageTriangle absolute */}
                  {/* //BackgroundImageTriangle absolute */}
                  {/* 孫2 結束*/}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative flex h-dvh   w-dvw items-center justify-center  bg-[#EFEFEF] text-darkColor  opacity-[.8]">
          {/* 它是父 */}

          {/* 它是子 */}
          <div
            style={{
              height: "50%",
              width: "calc(250rem)",

              border: `3rem solid ${MAIN_COLOR}`,
            }}
            className=" flex items-center bg-white p-[calc(25rem)] text-[calc(12rem)] italic"
          >
            <div className="flex items-center">
              {globalstate === "en" ? (
                <span>
                  {" "}
                  For a better user experience, please use a vertical monitor.
                  Thank you!
                </span>
              ) : (
                <span className="font-['Open_Sans']">
                  為了更好的使用者體驗，請使用直向顯示，謝謝！
                </span>
              )}
            </div>
          </div>
        </div>
      )}
      {/* {currentScreen === "dashboardScreen" && <Dashboard />} */}
    </div>
  );
};

export default Login;

import React, {
  useState,
  useEffect,
  useRef,
  useContext,
  useCallback,
} from "react";
import { Row, Col, Button, Divider, Input, Modal } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

import BackgroundImage from "@/assets/images/common/Background.png"; // 确保正确导入图片
import { useNavigate } from "react-router-dom";
import { Content } from "@/App";
// css 的模組引入
import styles from "@/css/local.module.css";
import { GlobalStateContext } from "@/App";
import {
  DARKBLACK_COLOR,
  MAIN_COLOR,
  DARKGRAY_COLOR,
  BACKGROUND_COLOR,
  ORANGE_COLOR,
  LIGHTGRAY_COLOR,
  MEDIUMGRAY_COLOR,
} from "@/constants";
import BackgroundImageTriangle from "@/assets/images/BackgroundImageTriangle.svg";
// import Icon_PowrplusLogo from '@/assets/images/icon_user_login/PowrplusLogo.svg'
// 背景組件
// import BackgroundSVG from '@/components/BackgroundSVG

// let ws = null;

// const REDIRECT_URI =
// 'https://vite-mypowrplus.vercel.app';
//  'http://localhost:5173/';
const REDIRECT_URI = "http://localhost:3000/account/login";

const Rebinding = () => {
  const { globalstate } = useContext(GlobalStateContext);
  // 狀態定義區塊
  const [errStrArray, setErrStrArray] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  // 全局變量
  const {
    // Scale
    scaleH,
    setScaleH,
    scaleV,
    setScaleV,
    isPortrait,
    setIsPortrait,

    // Connect
    isLogin,
    isSupportLocalStorage,
    socketio,
    connectState,
    setConnectState,
    setIsClickOpCode,
    // mac
    mac,
    setMac,
    macErr,
    setMacErr,

    // saClubToken
    saClubToken,
    setSaClubToken,
    setActiveScreen,
    // google login
    googleSub,
    setGoogleSub,
    googleSubBackup,
    setGoogleSubBackup,

    // instagram login
    instagramSub,
    setInstagramSub,
    instagramSubBackup,
    setInstagramSubBackup,
    //
    rebindingState,
    setRebindingState,

    // google
    googleState,
    setGoogleState,
    // instagram
    instagramState,
    setInstagramState,
    ws,
    setWs,
  } = useContext(Content);

  // 觸發 isLogin依賴
  useEffect(() => {
    if (isLogin === "init") {
      return () => {};
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
      // 先關閉背景再跳躍這樣就非常好看了不會殘留背景了
      document.body.style.backgroundImage = "none";
      9;

      // 讓進去的第一個畫面是0 (首頁)

      let p = null;
      if (mac !== "") {
        p = {
          currentScreen: "quickConnectScreen",
          currentSub1Screen: "quickConnectRealTimeMonitorScreen",
        };
      } else p = { currentScreen: "workoutLogScreen" };
      sessionStorage.setItem("sauser_currentScreen", JSON.stringify(p));

      // 讀mac
      console.log("mac [login] =", mac);

      setActiveScreen("MenuScreen");

      return () => {};
    }

    if (isLogin === "unauth") {
      console.log("未授權所以不做任何事, 也不提示等等");
    }
  }, [isLogin]);

  // 觸發 socketio connectState 狀態  **********************
  useEffect(() => {
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
    // if (connectState === 'reconnected') {
    //   console.log('reconnected  (Login)');
    //   setConnectState('init')
    //   // 跳往login 畫面

    //   return () => { };
    // }

    if (connectState === "error") {
      console.log("Error (Login)");
      // 設回初值
      setConnectState("init");
      // 跳往error 畫面

      // navigate("/wserror");
      navigate("/wserror");

      return () => {};
    }
  }, [connectState]);

  // 資料庫重綁新的google帳號後的偵測
  useEffect(() => {
    console.log("rebindingState [rebinding] = ", rebindingState);
    if (rebindingState === "init") {
      return () => {};
    }
    if (rebindingState === "success") {
      // setRebindingState('init')
      console.log("綁定成功....");
      // 跳往login 畫面

      navigate("/login");
      // console.log ('聽說你偷偷的執行 ')
    }

    if (rebindingState === "fail") {
      // setRebindingState('init')
      // 提示綁定失敗--- 提示綁定失敗
      setErrStrArray([]);
      console.log("綁定失敗 [Rebinding]");
      setErrStrArray((prev) => [
        ...prev,
        globalstate === "en"
          ? "The binding failed. Please enter the correct account and password."
          : "綁定失敗。請輸入正確的帳號和密碼。",
      ]);
      setIsModalOpen(true);
      setRebindingState("init");
    } else {
      console.log("binding other status 其它狀態");
      setRebindingState("init");
    }
  }, [rebindingState]);

  // 觸發 localStorage 判斷
  useEffect(() => {
    console.log("它應該會進入這個依賴項的判斷才對");
    if (isSupportLocalStorage === false) {
      return () => {};
    }
    // 判斷是否曾經有登錄 --> /
    let data = localStorage.getItem("sauser_accessToken");
    console.log(
      "從LocalStorage 的sauser_accessToken [Login] = 讀到的內容  = ",
      data,
    );

    let data1 = localStorage.getItem("sauser_rememberme");
    console.log(
      "從LocalStorage sauser_rememberme [Login] = 讀到的內容  = ",
      data1,
    );

    if (
      data !== undefined &&
      data !== null &&
      // localStorage.getItem('sauser_rememberme') === 'true'
      data1 === "true"
    ) {
      // console.log ('userAuth [Login]')
      // socketio.emit("userAuth", dataJson);
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
  }, [isSupportLocalStorage]);

  // 檢查是否是 email格式
  function isValidEmail(emailStr) {
    console.log("emailStr = ", emailStr);
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    console.log("emailRegex = ", emailRegex.test(emailStr));
    return emailRegex.test(emailStr);
  }

  const pressBindingAccount = () => {
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
          : "信箱不能留空",
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
      googleUserLoginRebinding: {
        account: account1,
        password: password,
        googleSub: googleSubBackup,
      },
    };

    console.log("inputObject = ", inputObject);

    // 發送到後台
    const res = JSON.stringify(inputObject);
    if (ws) {
      setIsClickOpCode(true);
      ws.send(res);
    }

    // if (isSupportLocalStorage === true) {
    //   localStorage.setItem("sauser_rememberme", rememberMe);
    // }
  };

  const onChangeAccount = (event) => {
    // console.log('event value = ', event.target.value);
    setAccount1(event.target.value);
  };

  const onChangePassword = (event) => {
    // console.log('event value = ', event.target.value);
    setPassword(event.target.value);
  };
  const handlePasswordEyesClick = () => {
    if (isPasswordVisible === "text") {
      setIsPasswordVisible("password");
      setPasswordEyesOn(false);
    } else {
      setIsPasswordVisible("text");
      setPasswordEyesOn(true);
    }
  };
  const [isPasswordVisible, setIsPasswordVisible] = useState("password");
  const [passwordEyesOn, setPasswordEyesOn] = useState(false);

  // 更換背景圖片及顏色
  useEffect(() => {
    document.body.style.backgroundImage = `url(${BackgroundImage})`;
    document.body.style.backgroundPosition = "center center";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundAttachment = "fixed";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundColor = BACKGROUND_COLOR;
    setErrStrArray([]);
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
  }, []);

  const handleOk = () => {
    setErrStrArray([]);
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setErrStrArray([]);
    setIsModalOpen(false);
  };

  useEffect(() => {
    console.log(
      "import.meta.env.REACT_APP_GG_APP_ID =  ",
      import.meta.env.VITE_REACT_APP_GG_APP_ID,
    );
  }, []);

  // 這個會誤動件
  useEffect(() => {
    if (socketio && googleSub) {
      let inputObj = {};
      let sauser_accessToken = localStorage.getItem("sauser_accessToken");
      if (sauser_accessToken) {
        inputObj = {
          sauser_accessToken,
          googleSub: googleSubBackup,
        };
        console.log("inputObj[google-login]", inputObj);
      } else {
        inputObj = { googleSub: googleSubBackup };
        console.log("inputObj[google-login]", inputObj);
      }

      // socketio.emit("googleUserLogin", JSON.stringify(inputObj));
      setGoogleSub(""); // 清掉讓下次登錄時才有用
    }
  }, [socketio, googleSub]);

  // 不是由google進入則跳出
  useEffect(() => {
    if (!googleSubBackup) {
      console.log("這個很奇怪................跳回login");
      navigate("/login");
    }
  }, []);

  return (
    // 使用relative 及設width:'100vw' , height:'100vh 去取得所有整個螢幕的大小
    // 判斷它是直式或橫式得到要縮放的比率
    // 以左上 left=0, top0 為開始點
    <div
      className="relative  w-dvw "
      style={{
        width: "375rem",
      }}
    >
      {/* 下面這一方是統包 */}
      <div className="relative   w-dvw ">
        <div className="slide-in-from-bottom-no-ease flex h-dvh">
          <img
            className="absolute bottom-0 right-0 w-[111rem] "
            src={BackgroundImageTriangle}
            alt="BackgroundImageTriangle"
          />
        </div>
        <Modal
          title={
            <div style={{ color: ORANGE_COLOR, fontSize: 24 }}>Notice</div>
          }
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          // 使用footer定義按鍵
          footer={[
            <Button key="submit" type="primary" onClick={handleOk}>
              {globalstate === "en" ? (
                <span> OK</span>
              ) : (
                <span className="font-['Open_Sans']">確定</span>
              )}
            </Button>,
          ]}
        >
          <ul>
            {errStrArray.map((errStr, index) => (
              <li
                key={index}
                style={{ color: DARKBLACK_COLOR, fontSize: "18rem" }}
              >
                {`${errStr}`}
              </li>
            ))}
          </ul>
        </Modal>

        <div className="flex w-dvw flex-col">
          {/* 孫1  開始*/}

          <Row justify={"center"} className="pt-[calc(86rem)]">
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

          {/* <Row><Col> scaleH = {scaleH}, scaleV = {scaleV}</Col></Row> */}

          <section className="mt-[calc(30rem)] flex justify-center ">
            {/* <div className=" text-[12rem]  text-[#FF7F30] w-[315rem] font-bold  flex justify-center items-center">
            
          </div> */}
            <div
              className="
        
                    flex
                     flex-col    
                     text-center
                     text-[calc(16rem)] 
                     text-darkColor                         
                "
            >
              {globalstate === "en" ? (
                <div className="mb-[20rem] w-[315rem]  text-[14rem] font-bold text-[#FF7F30]">
                  {" "}
                  This Google account conflicts with the one you previously linked. If you wish to switch to this Google account, please enter your account password. The system will then unbind the previous account and rebind the new one.
                </div>
              ) : (
                <div className="mb-[20rem]  w-[315rem] font-['Open_Sans']  text-[14rem] font-bold text-[#FF7F30]">
                此Google帳號與您之前綁定的帳號發生衝突。如果您想更換為此Google帳號，請輸入帳號密碼。系統將會解除之前的綁定，並重新綁定新的帳號。
                </div>
              )}
              {globalstate === "en" ? (
                <div> Email or Account Name</div>
              ) : (
                <div className="font-['Open_Sans']">信箱或帳號名稱</div>
              )}
            </div>
          </section>
          {/* //!設判斷是否符合 此會員的 info@gosportsart.com or phone number */}
          <section className=" flex justify-center text-[calc(14rem)]">
            <div className=" flex h-[calc(42rem)] w-[calc(263.92rem)] items-center justify-center border-2 border-mainColor  bg-white">
              <input
                required
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
          <Row justify={"center"} className="mt-[calc(25.5rem)]">
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
                <span className=" font-['Open_Sans']">密碼</span>
              )}
            </Col>
          </Row>
          {/* 具備綠色眼精 */}
          <Row justify={"center"} className="">
            <section className=" flex justify-center text-[calc(14rem)]">
              <div className=" flex h-[calc(42rem)] w-[calc(263.92rem)] items-center justify-center border-2 border-mainColor  bg-white">
                <input
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

          <div
            style={{
              position: "relative",
              left: "50%",
              transform: "translateX(-50%)",
              fontSize: "20rem",
              color: "#fff",
              background:
                "linear-gradient(90deg, #bae642 0%, #8ac942 64.9%, #80c342 100%)",
              // width: 159,
              width: "220rem",

              height: "40rem",
              // width: 245,
              // height: 50,
              // height: 61,
              lineHeight: "30rem",
              border: "2rem solid white",
              cursor: "pointer",
            }}
            className=" mt-[30rem] flex flex-col items-center justify-center"
            onClick={pressBindingAccount}
          >
            {globalstate === "en" ? (
              <span> Binding Account</span>
            ) : (
              <span className="font-['Open_Sans']">重新綁定</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Rebinding;

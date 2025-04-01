import React, { useEffect, useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Button, Input, message, Modal } from "antd";
import {
  HomeOutlined,
  LoadingOutlined,
  SettingFilled,
  SmileOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import { InfoCircleOutlined } from "@ant-design/icons";
import {
  MAIN_COLOR,
  BACKGROUND_COLOR,
  ORANGE_COLOR,
  DARKBLACK_COLOR,
} from "@/constants";
import { Content } from "@/App";
// css 的模組引入
import "@/css/global.css";
import styles from "@/css/local.module.css";
import { Otptimer } from "otp-timer-ts";
import PasswordReset from "@/components/ForgetPassword/PasswordReset";
import { GlobalStateContext } from "@/App";
// import EmailVerification from "@/components/ForgetPassword/EmailVerification";
const ForgotPassword = () => {
  const { globalstate } = useContext(GlobalStateContext);
  // 引入全局
  const {
    //
    setActiveScreen,

    // Connect
    forgetUserPassword,
    setForgetUserPassword,
    connectState,
    setConnectState,
    currentScreen,
    setCurrentScreen,
    currentSub1Screen,
    setCurrentSub1Screen,
    currentSub2Screen,
    setCurrentSub2Screen,
    ws,
  
    confirmForgetUserPasswordCode,
    setConfirmForgetUserPasswordCode,
    setIsClickOpCode,
    confirmUpdateUserPassword,
    setConfirmUpdateUserPassword,
  } = useContext(Content);
  const [password, setPassword] = useState("");
  const { scaleH, scaleV, isPortrait } = useContext(Content);
  const [errStrArray, setErrStrArray] = useState([]);
  let navigate = useNavigate();

  const handlePinch = (event) => {};
  // 重新渲染背景
  useEffect(() => {
    document.body.style.backgroundImage = "none";
    document.body.style.backgroundColor = BACKGROUND_COLOR;
    setForgetUserPassword("fail");
    setPasswordReset(false);
    setIsModalOpen(false);
    setSendAfterFiveMinutes(false);
    setEmailVerifyOpen(false);
    setErrStrArray([]);
    setConfirmUpdateUserPassword("init");
    setForgetUserPassword("init");
    setConfirmForgetUserPasswordCode("init");
  }, []);
  const [passwordReset, setPasswordReset] = useState(false);
  //send email
  const [email, setEmail] = useState("");
  const emailOnChange = (e) => {
    setEmail(e.target.value);
  };
  const [emailVerifyOpen, setEmailVerifyOpen] = useState(false);
  const [sendAfterFiveMinutes, setSendAfterFiveMinutes] = useState(false);
  useEffect(() => {
    let timer;

    if (emailVerifyOpen) {
      // 設定 5 分鐘後的計時器 (5 * 60 * 1000 毫秒 = 300000 毫秒)
      timer = setTimeout(() => {
        setSendAfterFiveMinutes(true);
      }, 300000);
    } else {
      // 當 emailVerifyOpen 變為 false 時，重置狀態
      setSendAfterFiveMinutes(false);
    }

    // cleanup function - 清除計時器避免記憶體洩漏
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [emailVerifyOpen]);

  //email format
  function isValidEmail(emailStr) {
    console.log("emailStr = ", emailStr);
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    console.log("emailRegex = ", emailRegex.test(emailStr));
    return emailRegex.test(emailStr);
  }
  const pressSend = () => {
    let errorState = false;
    setErrStrArray([]);
    if (!isValidEmail(email)) {
      setErrStrArray((prev) => [
        ...prev,
        globalstate === "en"
          ? "  Please ensure Email format is right."
          : "請確認信箱格式是否正確",
      ]);
      errorState = true;
    }
    if (email === "") {
      setErrStrArray((prev) => [
        ...prev,
        globalstate === "en" ? "Cannot be empty." : "請輸入信箱",
      ]);
      errorState = true;
    }
    if (errorState) {
      setIsModalOpen(true);
      console.log("有錯誤errorState ");
      return;
    } else {
      console.log("沒有錯誤errorState ");
    }
    let sauser_accessToken = localStorage.getItem("sauser_accessToken");
    const inputObject = {
      forgetUserPassword: { email: email },
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

    // send to 後端email (與後端確認是否有這個信箱)
  };
  useEffect(() => {
    if (forgetUserPassword === "success") {
      setEmailVerifyOpen(true);
    } else if (forgetUserPassword === "nonExistentUserEmail") {
      setErrStrArray([]);
      setErrStrArray((prev) => [
        ...prev,
        globalstate === "en" ? "  This mailbox is not found" : "查無此信箱",
      ]);
      setIsModalOpen(true);
      console.log("有錯誤errorState ");
    } else if (forgetUserPassword === "fail") {
      setEmailVerifyOpen(false);
      console.log("fail");
    }
  }, [forgetUserPassword]);
  //verify
  const [verify, setVerify] = useState("");
  const verificationOnChange = (e) => {
    setVerify(e.target.value);
  };
  const [otpVerify, setOtpVerify] = useState("223344");
  const [messageApi, contextHolder] = message.useMessage();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOk = () => {
    setIsModalOpen(false);
    setConfirmForgetUserPasswordCode("init");
    setForgetUserPassword("init");
    setConfirmUpdateUserPassword("init");
  };

  const pressVerify = () => {
    //傳給後端email＆輸入的otp 從後端詢問是否對
    let sauser_accessToken = localStorage.getItem("sauser_accessToken");
    const inputObject = {
      confirmForgetUserPasswordCode: {
        email: email,
        emailVerificationCode: verify,
      },
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
    if (confirmForgetUserPasswordCode === "success") {
      setPasswordReset(true);
    } else if (confirmForgetUserPasswordCode === "fail") {
      setErrStrArray([]);
      setErrStrArray((prev) => [
        ...prev,
        globalstate === "en" ? "    OTP Number is Wrong." : "驗證碼錯誤",
      ]);
      setIsModalOpen(true);
      setConfirmForgetUserPasswordCode("init");
    }
  }, [confirmForgetUserPasswordCode]);
  //? reset password page給資料庫
  const validatePassword = (password) => {
    const hasNumberAndLetter = /^(?=.*[0-9])(?=.*[a-zA-Z])/.test(password);
    const hasUpperAndLowerCase = /^(?=.*[a-z])(?=.*[A-Z])/.test(password);
    const isLongEnough = password.length >= 8;
    return hasNumberAndLetter && hasUpperAndLowerCase && isLongEnough;
  };
  const [confirmPassword, setConfirmPassword] = useState("");
  const passwordSaveChange = () => {
    let errorState = false;
    setErrStrArray([]);
    if (!validatePassword(password)) {
      setErrStrArray((prev) => [
        ...prev,
        globalstate === "en"
          ? " Password must contain numbers and letters, have both uppercase and lowercase characters, and be at least 8 characters long."
          : "密碼必須包含數字和字母，並且必須同時包含大寫和小寫字母，且長度至少為 8 個字符。",
      ]);
      errorState = true;
    }
    if (confirmPassword !== password) {
      setErrStrArray((prev) => [
        ...prev,
        globalstate === "en"
          ? " Please ensure that the Confirm Password matches the Password."
          : "請確保「確認密碼」與「密碼」相符。",
      ]);
      errorState = true;
    }

    if (errorState) {
      setIsModalOpen(true);
      console.log("有錯誤errorState ");
      return;
    } else {
      console.log("沒有錯誤errorState ");
    }

    const inputObject = {
      confirmUpdateUserPassword: {
        email: email,
        emailVerificationCode: verify,
        newPassword: password,
      },
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
    if (confirmUpdateUserPassword === "success") {
      setErrStrArray([]);
      setErrStrArray((prev) => [
        ...prev,
        globalstate === "en"
          ? "Password changed successfully."
          : "更改密碼成功",
      ]);
      setIsModalOpen(true);

      setPasswordReset(false);

      setForgetUserPassword("fail");
      navigate("/Login");
    }
  }, [confirmUpdateUserPassword]);
  const translationsOTP = {
    en: {
      title: "OTP Number is Wrong.",
      message: "Are you sure you want to go back?",
      subMessage: "You will lose unsaved work.",
      ok: "OK",
      cancel: "Cancel",
    },
    zh: {
      title: "驗證碼錯誤",
      message: "您确定要返回嗎？",
      subMessage: "您將丟失未保存的資料。",
      ok: "確定",
      cancel: "取消",
    },
  };
  const tOTP = translationsOTP[globalstate];
  const backToSendNewEmailPage = () => {
    setEmailVerifyOpen(false);
    setForgetUserPassword("init");
  };


//    const msw = useRef(null);
//     const [messages, setMessages] = useState([]);
//     const [message, setMessage] = useState("");
  
//     useEffect(() => {
//       // WebSocket 伺服器的連線
//       msw.current = new WebSocket("wss://example.com");
  
//       // 接收訊息時的處理
//       msw.current.onmessage = (event) => {
//         setMessages((prevMessages) => [...prevMessages, event.data]);
//       };
  
//       return () => {
//         // 組件卸載時關閉 WebSocket 連線
//         msw.current?.close();
//       };
//     }, []);
  
//     const sendMessage = () => {
//       if (!msw.current) {
//         return;
//       }
//       // 發送訊息
//       msw.current.send(message);
//       setMessage("");
//     };
  return (
    <><div
      onTouchMove={handlePinch}
      className="h-dvh h-screen w-screen    bg-backgroundColor"
    >
      <Modal
        title={
          <div style={{ color: ORANGE_COLOR, fontSize: "14rem" }}>Warning</div>
        }
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleOk} // 修改 onCancel 事件為 handleOk
        // 修改 OK 按鈕文字
        okText={tOTP.ok}
        cancelText="  " // 隱藏 Cancel 按鈕
        cancelButtonProps={{
          style: {
            borderColor: "transparent", // 修改 Cancel 按鈕的邊框顏色
          },
        }}
      >
        {" "}
        <ul>
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
      {/* // 直屏顯示 */}
      <div
        style={{
          display: isPortrait ? "block" : "block",
        }}
      >
        <Row
          justify={"center"}
          align={"middle"}
          className=" h-dvh w-dvw bg-backgroundColor "
        >
          {/* bg-[#efefef]   
          使用內容去去撐開高度
          */}

          <Col className="flex max-h-[95%]  w-[336rem] flex-col items-center justify-center overflow-y-auto  border-[3rem] border-mainColor bg-lightgrayColor pt-[calc(20rem)] text-center text-[#333f48]">
            <Row justify={"center"} className="mb-[20rem] h-[31rem]">
              <Col
                className="
                text-[calc(24rem)]
                    font-bold 
                 
                    "
              >
                {globalstate === "en" ? (
                  <span> Reset Password</span>
                ) : (
                  <span className="font-['Open_Sans']">重設密碼</span>
                )}
              </Col>
            </Row>

            <Row className="text-[20rem] font-semibold leading-[33rem]">
              {globalstate === "en" ? (
                <span> Enter Email</span>
              ) : (
                <span className="font-['Open_Sans']">輸入信箱</span>
              )}
            </Row>
            <Row style={{ marginTop: "5rem" }} className="  w-[294rem]">
              <Col className="w-4/5">
                <Input
                  variant="borderless"
                  value={email}
                  type="email"
                  style={{
                    textAlign: "center",
                    backgroundColor: "#fff",
                    border: `2rem solid ${MAIN_COLOR}`,
                    borderRadius: 0,
                    lineHeight: 2.5,
                  }}
                  className="
                  h-[calc(52.91rem)]
                  w-[294rem]
                  text-[calc(16rem)]
                  font-semibold
                  "
                  placeholder="info@sportsart.com.tw"
                  onChange={emailOnChange}
                  disabled={!sendAfterFiveMinutes && emailVerifyOpen}
                />
              </Col>
            </Row>

            {/* SEND Process */}

            <Row
              justify={"space-around"}
              style={{ marginTop: "10rem" }}
              align={"center"}
              className=""
            >
              <Col
                style={{
                  borderRadius: 0,
                  background:
                    !sendAfterFiveMinutes && emailVerifyOpen
                      ? "linear-gradient(to bottom, #A9AAAB, #97989A)"
                      : "linear-gradient(to bottom, #80c342, #bae642)",
                }}
                disabled={!sendAfterFiveMinutes && emailVerifyOpen}
                // 具備線性漸層色
                className={`
              
                  mb-[10rem]
                  flex 
                  h-[calc(39rem)]
                   w-[calc(170rem)]
                    cursor-pointer
                    items-center
                    justify-center
                    rounded-[calc(5rem)]
                    border-[calc(2rem)]
                    border-solid
                    border-white
                    text-center
                     text-[calc(16rem)]
text-white
                `}
                onClick={pressSend}
              >
                {/* //! 當send後 改成‘還沒收到再傳一次’ */}
                <div className="text-[20rem] font-bold leading-[33rem]">
                  {globalstate === "en" ? (
                    <span>
                      {" "}
                      {sendAfterFiveMinutes
                        ? "RESEND"
                        : emailVerifyOpen
                          ? "SENT"
                          : "SEND"}
                    </span>
                  ) : (
                    <span className="font-['Open_Sans']">
                      {sendAfterFiveMinutes
                        ? "重新傳送"
                        : emailVerifyOpen
                          ? "SENT"
                          : "傳送"}
                    </span>
                  )}
                </div>
              </Col>
            </Row>
            {/* {emailVerifyOpen ? (
              <div
                className="text-[14rem] text-[#FF7F30]"
                style={{ letterSpacing: "-0.5rem" }}
              >
             
                    <div>
                      <Otptimer
                        textContainerStyle={{
                          position: "absolute",
                          left: "20rem",
                          top: "155rem",
                          marginTop: "20rem",
                        }}
                        minutes={4}
                        seconds={59}
                        // onResend={backToSendNewEmailPage}
                        textStyle={{
                          textDecoration: "underline",
                          color: "#0000FF",
                          fontSize: "12rem",
                        }}
                        timerStyle={{
                          textDecoration: "underline",
                          color: "#0000FF",
                          fontSize: "12rem",
                        }}
                      />
                    </div>
               
              </div>
            ) : (
              ""
            )} */}

            {emailVerifyOpen && (
              <div className="slide-in-from-bottom-no-width   flex h-dvh w-full flex-col items-center ">
                <div
                  className="relative mt-[200rem] flex h-[382rem] max-h-[calc((100dvh-140rem))] w-[351rem]  flex-col items-center overflow-auto  border-mainColor bg-[#efefef] text-darkColor "
                  style={{ borderWidth: "3rem" }}
                >
                  <div className="mt-[30rem] flex flex-col items-center justify-center ">
                    <Row className="mt-[50rem]  flex justify-center text-[20rem] font-semibold leading-[33rem]">
                      <div className="mb-[15rem] h-[22rem]">
                        {globalstate === "en" ? (
                          <span> Enter Email verification code</span>
                        ) : (
                          <span className="font-['Open_Sans']">
                            {" "}
                            請輸入驗證碼
                          </span>
                        )}
                      </div>{" "}
                    </Row>
                    <Row
                      style={{ marginTop: "0rem" }}
                      className="  flex w-[294rem] "
                    >
                      {" "}
                      <Col className="w-4/5 ">
                        <Input
                          value={verify}
                          variant="borderless"
                          style={{
                            textAlign: "center",
                            backgroundColor: "#fff",
                            border: `2rem solid ${MAIN_COLOR}`,
                            borderRadius: 0,
                            lineHeight: 2.5,
                          }}
                          className="
                  h-[calc(52.91rem)]
                  w-[294rem]
                  text-[calc(16rem)]
                  font-semibold
                  "
                          placeholder="Enter Email verification"
                          onChange={verificationOnChange}
                        />
                      </Col>
                    </Row>
                    <Row>
                      {" "}
                      <Otptimer
                        textContainerStyle={{
                          position: "absolute",
                          left: "20rem",
                          top: "185rem",
                          marginTop: "20rem",
                        }}
                        minutes={4}
                        seconds={59}
                        // onResend={backToSendNewEmailPage}
                        textStyle={{
                          textDecoration: "underline",
                          color: "#0000FF",
                          fontSize: "12rem",
                        }}
                        onResend={backToSendNewEmailPage}
                        timerStyle={{
                          textDecoration: "underline",
                          color: "#0000FF",
                          fontSize: "12rem",
                        }}
                      />
                    </Row>
                    <Row
                      justify={"space-around"}
                      style={{ marginTop: "10rem" }}
                      align={"center"}
                      className=""
                    >
                      <Col
                        style={{ borderRadius: 0 }}
                        // 具備線性漸層色
                        className={`${styles.linearGradient} 
              mt-[70rem]
                  flex
                  h-[calc(39rem)] 
                  w-[calc(170rem)]
                   cursor-pointer
                    items-center
                    justify-center
                    rounded-[calc(5rem)]
                    border-[calc(2rem)]
                    border-solid
                    border-white
                    text-center
                    text-[calc(16rem)]
                     text-white

                `}
                        onClick={pressVerify}
                      >
                        <div className="text-[20rem]  font-bold leading-[33rem]">
                          {globalstate === "en" ? (
                            <span> SUBMIT CODE</span>
                          ) : (
                            <span className="font-['Open_Sans']">
                              傳送驗證碼
                            </span>
                          )}{" "}
                        </div>
                      </Col>
                    </Row>
                  </div>{" "}
                </div>
              </div>
            )}

            <div className="mb-[23rem]"></div>
          </Col>
        </Row>
      </div>
      {passwordReset && (
        <PasswordReset
          passwordSaveChange={passwordSaveChange}
          password={password}
          setPassword={setPassword}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
          errStrArray={errStrArray}
          setErrStrArray={setErrStrArray}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </div>
{/* <form
onSubmit={(event) => {
  event.preventDefault();
  sendMessage();
}}
>
<ul>
  {messages.map((msg, index) => (
    <li key={index}>{msg}</li>
  ))}
</ul>
<input
  type="text"
  value={message}
  className="text-[30rem]"
  onChange={(event) => setMessage(event.target.value)}
/>
<button type="submit">Send</button>
</form> */}</>
  );
};
export default ForgotPassword;

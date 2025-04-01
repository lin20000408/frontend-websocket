import { useContext, useEffect, useState } from "react";
import React from "react";
import { EyeInvisibleOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  DatePicker,
  Flex,
  Calendar,
  Input,
  Modal,
  Row,
  Space,
  message,
} from "antd";
import { axiosPost } from "@/components/Axios";
import {
  BACKGROUND_COLOR,
  DARKBLACK_COLOR,
  MAIN_COLOR,
  ORANGE_COLOR,
} from "@/constants";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import customParseFormat from "dayjs/plugin/customParseFormat";
import localeData from "dayjs/plugin/localeData";
import weekOfYear from "dayjs/plugin/weekOfYear";
import weekYear from "dayjs/plugin/weekYear";
import weekday from "dayjs/plugin/weekday";

dayjs.extend(customParseFormat);
dayjs.extend(advancedFormat);
dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(weekOfYear);
dayjs.extend(weekYear);
const dateFormat = "MM/DD/YYYY";

import { Content } from "@/App";
import { useNavigate } from "react-router-dom";
// css 的模組引入
import styles from "@/css/local.module.css";
import { InfoCircleOutlined } from "@ant-design/icons";
import { CheckCircleOutlined } from "@ant-design/icons";
import { FormattedMessage } from "react-intl";
import { IntlManager } from "@/components/IntlManager";
import { GlobalStateContext } from "@/App";

import * as Select from "@radix-ui/react-select";
import { CaretDownOutlined } from "@ant-design/icons";
import { Otptimer } from "otp-timer-ts";
const SignUp = () => {
    
  // 引入全局
  const {
    // socketio
    verifyUserEmail,
    setVerifyUserEmail,
    confirmUserEmail,
    setConfirmUserEmail,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
   
   
 


 
  
 
  
    // google
    googleSubBackup,
    // instagram
    instagramSubBackup,
    //
    userRegState,
    setUserRegState,
    ws,
    setws,
    setIsClickOpCode,
    connectState,
    setConnectState,

  } = useContext(Content);
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
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [feet, setFeet] = useState("");
  const [inch, setInch] = useState("");
  const [lb, setLb] = useState("");
  const [kg, setKg] = useState("");
  const { globalstate } = useContext(GlobalStateContext);
  const [isModalVerifyOpen, setIsModalVerifyOpen] = useState(false);
  const [errStrArray, setErrStrArray] = useState([]);
  const [sendNewEmailPage, setSendNewEmailPage] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenWhenPressBack, setIsModalOpenWhenPressBack] =
    useState(false);
  const [isMetric, setIsMetric] = useState(true);
  const [emailVerifyOpen, setEmailVerifyOpen] = useState(false);
  const [sendAfterFiveMinutes, setSendAfterFiveMinutes] = useState(false);
  useEffect(() => {
    setErrStrArray([]);
    setIsModalOpen(false);
    setIsModalVerifyOpen(false);
    setIsModalOpenWhenPressBack(false);
    setVerifyUserEmail("init");
    setConfirmUserEmail("init");
    setEmail("");
    setSendNewEmailPage(true);

    setUserRegState("init");
    console.log(isModalVerifyOpen);
  }, []);
  console.log("ie:");
  const navigate = useNavigate();
  const [cm, setCm] = useState("");
  // 更換背景圖片及顏色及初值

  const customFormat = (value) =>
     `                 ${value.format(dateFormat)}`;

  // 做到中間對齊的步驟
  // 先取得元件的尺寸再計算maginTop的值, 記得要減Head的尺寸
  const [accountName, setAccountName] = useState("");
  const accountNameChange = (e) => {
    setAccountName(e.target.value);
  };
  const messagesNewAccoutEqalsAccoutDefault = {
    en: " This account has already been used by someone.",
    zh: "此帳號已經有人使用過",
  };

  //email format
  function isValidEmail(emailStr) {
    console.log("emailStr = ", emailStr);
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    console.log("emailRegex = ", emailRegex.test(emailStr));
    return emailRegex.test(emailStr);
  }

  const emailBlur = () => {
    let errorState = false;
    if (!isValidEmail(email)) {
      setErrStrArray([]);
      setErrStrArray((prev) => [
        ...prev,
        globalstate === "en"
          ? "  Please ensure Email format is right."
          : "請確認信箱格式是否正確",
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
  };

  const changeEmail = (e) => {
    // console.log('changeEmail = ', email);
    setEmail(e.target.value);
  };

  useEffect(() => {
    setVerifyUserEmail("fail");
  }, []);
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

  //? 確認email是否資料庫已經存在
  const pressSkip = () => {
    // setSendNewEmailPage(false);
    setSendNewEmailPage(false);
  };
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

    const getObject = {
      verifyUserEmail: { email: email },
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

    // send to 後端email
    // setIsModalOpen(false);
  };
  useEffect(() => {
    if (verifyUserEmail === "success") {
      setEmailVerifyOpen(true);
      setSendNewEmailPage(false);
    } else if (verifyUserEmail === "existentEmail") {
      let errorState = false;
      setErrStrArray([]);
      setErrStrArray((prev) => [
        ...prev,
        globalstate === "en"
          ? "   This Email has already been used by someone."
          : "此信箱已經有人使用過",
      ]);
      errorState = true;

      if (errorState) {
        setIsModalOpen(true);
        console.log("有錯誤errorState ");
        sendNewEmailPage(true);
      } else {
        console.log("沒有錯誤errorState ");
      }
    } else if (verifyUserEmail === "fail") {
      setEmailVerifyOpen(false);
    }
  }, [verifyUserEmail]);
  const backToSendNewEmailPage = () => {
    setEmailVerifyOpen(false);
    setSendNewEmailPage(true);
    setVerifyUserEmail("init");
  };
  //verify
  const [verify, setVerify] = useState("");
  const verificationOnChange = (e) => {
    setVerify(e.target.value);
  };
  //註冊成功驗證modal
  const handleVerifyOk = () => {
    setIsModalVerifyOpen(false);
    setUserRegState("init");

    const timeoutId = setTimeout(() => {
      navigate("/login");
    }, 1500);

    // 返回一個清除定時器的函數
    return () => clearTimeout(timeoutId);
  };
  //!verify === otpVerify需改成與後端驗證
  const [codeMatch, setCodeMatch] = useState(false);
  const pressVerify = () => {
    // 從後端獲取預期的 OTP
    let sauser_accessToken = localStorage.getItem("sauser_accessToken");
    const getObject = {
      confirmUserEmail: {
        email: email,
        emailVerificationCode: verify,
      },
    };

    if (ws) {
      try {
        setIsClickOpCode(true);
        ws.send(JSON.stringify(getObject));
        console.log(getObject);
      } catch (error) {
        console.error("Error sending data:", error);
      }
    } else {
      console.error("WebSocket is not initialized");
    }
  };

  // OTP 驗證成功
  // const otpVerify = await fetchOtpFromBackend(); // 替換為實際的 API 調用
  useEffect(() => {
    if (confirmUserEmail === "success") {
      setEmailVerifyOpen(false); // 關閉電子郵件驗證模態框
      setErrStrArray([]);
      setErrStrArray((prev) => [
        ...prev,
        globalstate === "en"
          ? "OTP verification code verification successful."
          : "OTP驗證碼驗證成功",
      ]);
      setIsModalOpen(true);
      // 使用 Promise 來確保 emailVerifyOpen 狀態更新後再設置 codeMatch
      const timeoutId =setTimeout(() => {
        setCodeMatch(true);

        console.log(email);
      }, 1000); // 設置為 0 毫秒，立即執行
      return () => clearTimeout(timeoutId);
    } else if (confirmUserEmail === "fail") {
      // OTP 驗證失敗
      setErrStrArray([]);
      setErrStrArray((prev) => [
        ...prev,
        globalstate === "en"
          ? "OTP verification code is wrong."
          : "OTP驗證碼驗證失敗",
      ]);
      setIsModalOpen(true);
    }
  }, [confirmUserEmail]);
  // 使用 setTimeout 確保 emailVerifyOpen 為 false 後再設置 codeMatch

  //password
  const changeConfirmPassword = (e) => {
    // console.log('changeConfirmPassword = ', confirmPassword);
    setConfirmPassword(e.target.value);
  };

  const confirmPasswordBlur = () => {
    if (confirmPassword !== password) {
      let errorState = false;
      setErrStrArray([]);
      setErrStrArray((prev) => [
        ...prev,
        globalstate === "en"
          ? "  Please ensure that the 'Confirm Password' matches the 'Password'."
          : "請確認密碼及確認密碼是否相同",
      ]);
      errorState = true;

      if (errorState) {
        setIsModalOpen(true);
        console.log("有錯誤errorState ");
        return;
      } else {
        console.log("沒有錯誤errorState ");
      }
    }
  };

  const changeFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const changeLastName = (e) => {
    setLastName(e.target.value);
  };

  useEffect(() => {
    // Only perform conversion if all necessary values are present
    if (isMetric) {
      // Check if cm has a valid value
      if (cm && cm !== "0") {
        // Convert cm to feet and inches
        const totalInches = Number(cm) / 2.54;
        setFeet(Math.floor(totalInches / 12).toString());
        setInch(Math.floor(totalInches % 12).toString());
      }
    } else {
      // Check if both feet and inch have valid values
      if (feet && inch && feet !== "0") {
        // Convert feet and inches to cm
        setCm(Math.floor((Number(feet) * 12 + Number(inch)) * 2.54).toString());
      }
    }
  }, [cm, feet, inch, isMetric]);

  useEffect(() => {
    if (isMetric) {
      // Check if kg has a valid value
      if (kg && kg !== "0") {
        // Convert kg to lb
        setLb(Math.floor(Number(kg) * 2.20462).toString());
      }
    } else {
      // Check if lb has a valid value
      if (lb && lb !== "0") {
        // Convert lb to kg
        setKg(Math.floor(Number(lb) * 0.453592).toString());
      }
    }
  }, [kg, lb, isMetric]);

  const handleInputChange = (setter) => (e) => {
    const inputValue = e.target.value;
    if (/^[0-9]\d*$/.test(inputValue) || inputValue === "") {
      setter(inputValue);
    }
  };
  const [heightValue, setHeightValue] = useState(0); // Current height
  const [weightValue, setWeightValue] = useState(0); // Current weight
  const [heightIsMetric, setHeightIsMetric] = useState(true); // Height metric state
  const [weightIsMetric, setWeightIsMetric] = useState(true); // Weight metric state
  
  // Check sessionStorage on initialization
  useEffect(() => {
    const storedHeight = sessionStorage.heightValue;
    const storedHeightMetric = sessionStorage.heightIsMetric === 'true';
    const storedWeight = sessionStorage.weightValue;
    const storedWeightMetric = sessionStorage.weightIsMetric === 'true';
    
    if (storedHeight) {
      setHeightValue(parseFloat(storedHeight));
      setHeightIsMetric(storedHeightMetric);
    }
    if (storedWeight) {
      setWeightValue(parseFloat(storedWeight));
      setWeightIsMetric(storedWeightMetric);
    }
  }, []);
  
  // Toggle units for both height and weight
  const toggleUnit = (unit) => {
      const newHeightIsMetric = unit === "Metric";
      const newWeightIsMetric = unit === "Metric";
      setIsMetric((prev) => !prev);
    console.log(isMetric);
    
    setHeightIsMetric(newHeightIsMetric);
    setWeightIsMetric(newWeightIsMetric);
    
    const storedHeight = sessionStorage.heightValue;
    const storedHeightMetric = sessionStorage.heightIsMetric === 'true';
    const storedWeight = sessionStorage.weightValue;
    const storedWeightMetric = sessionStorage.weightIsMetric === 'true';
    
    // Handle height conversion
    if (storedHeight && storedHeightMetric === newHeightIsMetric) {
      setHeightValue(parseFloat(storedHeight));
    } else {
      const newHeight = convertHeight(heightValue, heightIsMetric, newHeightIsMetric);
      setHeightValue(newHeight);
    }
    
    // Handle weight conversion
    if (storedWeight && storedWeightMetric === newWeightIsMetric) {
      setWeightValue(parseFloat(storedWeight));
    } else {
      const newWeight = convertWeight(weightValue, weightIsMetric, newWeightIsMetric);
      setWeightValue(newWeight);
    }
  }; 
  
  
  // Handle height input
  const handleHeightInput = (e) => {
    const value = parseFloat(e.target.value) || 0;
    setHeightValue(value);
    sessionStorage.heightValue = value;
    sessionStorage.heightIsMetric = heightIsMetric; // Store height's current metric state
  };
  
  // Handle weight input
  const handleWeightInput = (e) => {
    const value = parseFloat(e.target.value) || 0;
    setWeightValue(value);
    sessionStorage.weightValue = value;
    sessionStorage.weightIsMetric = weightIsMetric; // Store weight's current metric state
  };
  
  // Height conversion (cm ↔ in)
  const convertHeight = (value, fromMetric, toMetric) => {
      if (fromMetric && !toMetric) return +(value / 2.54).toFixed(1); // cm to in
      if (!fromMetric && toMetric) return +(value * 2.54).toFixed(1); // in to cm
      return +value.toFixed(1);
    };
    
    // Weight conversion (kg ↔ lbs)
    const convertWeight = (value, fromMetric, toMetric) => {
      if (fromMetric && !toMetric) return +(value * 2.20462).toFixed(1); // kg to lbs
      if (!fromMetric && toMetric) return +(value / 2.20462).toFixed(1); // lbs to kg
      return +value.toFixed(1);
    };
  
//   const toggleUnit = () => {
//     setIsMetric(!isMetric);
//   };



  const handleOk = () => {
    setErrStrArray([]);
    setIsModalOpen(false);
    setUserRegState("init");
  };
  const handleCancel = () => {
    setErrStrArray([]);
    setIsModalOpen(false);
    setIsModalOpenWhenPressBack(false);
  };

  const handleOkWhenPressBack = () => {
    setIsModalOpenWhenPressBack(false);
  };

  const handleCancelWhenPressBack = () => {
    setIsModalOpenWhenPressBack(false);
  };

  const [date, setDate] = useState(null);
  const [open, setOpen] = useState(false);
  console.log(date);

  const handleDateSelect = (date) => {
    // 確保 date 不為 null
    if (date) {
      setDate(date);
      setOpen(false);
      //?birthday輸入的時候需改format
      console.log("選擇的日期:", date.format("MM-DD-YYYY")); // 格式化為 YYYY-MM-DD
    }
  };
  //password verify start
  const validatePassword = (password) => {
    const hasNumberAndLetter = /^(?=.*[0-9])(?=.*[a-zA-Z])/.test(password);
    const hasUpperAndLowerCase = /^(?=.*[a-z])(?=.*[A-Z])/.test(password);
    const isLongEnough = password.length >= 8;
    return hasNumberAndLetter && hasUpperAndLowerCase && isLongEnough;
  };

  const changePassword = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
  };
  const messagesPressNewSend = {
    en: '" Password must contain numbers and letters, have both uppercase and lowercase characters, and be at least 8 characters long."',
    zh: "密碼必須包含數字和字母，並且必須同時包含大寫和小寫字母，且長度至少為 8 個字符。",
  };
  const [messageApi, contextHolder] = message.useMessage();
  const handlePasswordBlur = () => {
    if (!validatePassword(password)) {
      let errorState = false;

      setErrStrArray((prev) => [
        ...prev,
        globalstate === "en"
          ? " Password must contain numbers and letters, have both uppercase and lowercase characters, and be at least 8 characters long."
          : "密碼必須包含數字和字母，並且必須同時包含大寫和小寫字母，且長度至少為 8 個字符。",
      ]);
      errorState = true;

      if (errorState) {
        setIsModalOpen(true);
        console.log("有錯誤errorState ");
        return;
      } else {
        console.log("沒有錯誤errorState ");
      }
    }
  };
  const pressSignUp = () => {
    console.log("pressSignUp");
    let errorState = false;
    //從這裡開始
    setErrStrArray([]); // 清空錯誤訊息陣列
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
          ? "  Please ensure that the 'Confirm Password' matches the 'Password'."
          : "請確認密碼及確認密碼是否相同",
      ]);
      errorState = true;
    }
    if (accountName === "") {
      setErrStrArray((prev) => [
        ...prev,
        globalstate === "en"
          ? "The ACCOUNT NAME field cannot be empty."
          : "請輸入帳號名稱",
      ]);
      errorState = true;
    }

    if (email !== "" && codeMatch === false) {
      setErrStrArray((prev) => [
        ...prev,
        globalstate === "en" ? "The Email need to be verified." : "請驗證信箱",
      ]);
      errorState = true;
    }
    // 判斷格式

    if (password === "") {
      setErrStrArray((prev) => [
        ...prev,
        globalstate === "en"
          ? "The PASSWORD field cannot be empty."
          : "請輸入密碼",
      ]);
      errorState = true;
    }

    if (confirmPassword === "") {
      setErrStrArray((prev) => [
        ...prev,
        globalstate === "en"
          ? "The CONFIRM PASSWORD field cannot be empty."
          : "請輸入確認密碼",
      ]);
      errorState = true;
    }

    if (password !== confirmPassword) {
      setErrStrArray((prev) => [
        ...prev,
        globalstate === "en"
          ? "The PASSWORD and CONFIRM PASSWORD fields do not match."
          : "確認密碼需與密碼相符",
      ]);
      errorState = true;
    }

    if (firstName === "") {
      setErrStrArray((prev) => [
        ...prev,
        globalstate === "en"
          ? "The FIRST NAME field cannot be empty."
          : "請輸入名字",
      ]);
      errorState = true;
    }

    if (lastName === "") {
      setErrStrArray((prev) => [
        ...prev,
        globalstate === "en"
          ? "The LAST NAME field cannot be empty."
          : "請輸入姓氏",
      ]);
      errorState = true;
    }
    if (date === "") {
      setErrStrArray((prev) => [
        ...prev,
        globalstate === "en"
          ? "The BIRTHDAY field cannot be empty."
          : "請填入生日",
      ]);
      errorState = true;
    }
    if (genderValue === "") {
      setErrStrArray((prev) => [
        ...prev,
        globalstate === "en"
          ? "The GENDER field cannot be empty."
          : "請填入性別",
      ]);
      errorState = true;
    }
    
      if (heightValue == "") {
        setErrStrArray((prev) => [
          ...prev,
          globalstate === "en"
            ? "The HEIGHT field cannot be empty."
            : "身高為必填",
        ]);
        errorState = true;
      }

      if (weightValue == "") {
        setErrStrArray((prev) => [
          ...prev,
          globalstate === "en"
            ? "The WEIGHT field cannot be empty."
            : "體重為必填",
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
    // 收集資料
    const inputObject = {
      // opCode: "userRegister",
      userRegister: {
        gender: genderValue,
        units: isMetric,
        cm: isMetric?(heightValue).toString():null,
        // feet: !isMetric?(feet):null,
        inch: !isMetric?(heightValue).toString():null,
        kg: isMetric?(weightValue).toString():null,
        lb: !isMetric?(weightValue).toString():null,
        userID: accountName,
        password: password,
        firstName: firstName,
        lastName: lastName,
        birthday: date.format("                              MM/DD/YYYY"),

        googleSub: googleSubBackup === "" ? undefined : googleSubBackup,
        instagramSub:
          instagramSubBackup === "" ? undefined : instagramSubBackup,
        email: email === "" ? undefined : email,
      },
    };

    // 更好的寫法：
    const userRegisterFiltered = Object.fromEntries(
      Object.entries(inputObject.userRegister).filter(
        ([_, value]) => value !== undefined,
      ),
    );
    const updateObject = {
      userRegister: userRegisterFiltered,
    };
    if (verify && verify.length > 0) {
      updateObject.userRegister.emailVerificationCode = verify; // Store avatar file list if it exists
      console.log(updateObject.userRegister.emailVerificationCode);
    }
    console.log(JSON.stringify(updateObject, null, 2));

    // 傳送資料
    if (ws) {
      try {
        setIsClickOpCode(true);
        ws.send(JSON.stringify(updateObject));
        console.log("Data sent successfully");
      } catch (error) {
        console.error("Error sending data:", error);
      }
    } else {
      console.error("WebSocket is not initialized");
    }
    let sauser_accessToken = localStorage.getItem("sauser_accessToken");
    //add original weight api
    const dataJson = JSON.stringify({
        addNewWeight: {
            sauser_accessToken:sauser_accessToken,
          weight: weightValue,
          units: isMetric ? "kg" : "lb", // lb or kg (內定kg)
        },
      });
      console.log(dataJson);
  
      if (ws) {
        try {
          ws.send(dataJson);
          console.log("success");
        } catch (error) {
          console.error("Error sending data:", error);
        }
      } else {
        console.error("WebSocket is not initialized");
      }
    console.log(userRegState.status);
    //    userRegState=== "init"  userRegState === "init"
    // 清空輸入框
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");

    setConfirmPassword("");
    setIsModalOpen(false);
    //把email verify 恢復預設
    setCodeMatch(false);
    //把otp modal 轉回預設
    setIsModalVerifyOpen(false);
    setIsModalOpenWhenPressBack(false);
    setVerifyUserEmail("fail");
    setConfirmUserEmail("init");
  };
  // 處理註冊狀態變化
  useEffect(() => {
    document.body.style.backgroundImage = "none";
    document.body.style.backgroundColor = BACKGROUND_COLOR;

    if (userRegState === "init") {
      return;
    }

    if (userRegState === "success") {
      setIsModalVerifyOpen(true);

      //   setUserRegState("init");
    } else if (userRegState === "fail") {
      setErrStrArray([]);
      setErrStrArray((prev) => [
        ...prev,
        globalstate === "en" ? "Exist User." : "此帳號已經註冊",
      ]);
      setIsModalOpen(true);
    }
  }, [userRegState]);

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
  const translationsOTP = {
    en: {
      title: "Registered successfully.",
      message: "Are you sure you want to go back?",
      subMessage: "You will lose unsaved work.",
      ok: "OK",
      cancel: "Cancel",
    },
    zh: {
      title: "註冊成功",
      message: "您确定要返回嗎？",
      subMessage: "您將丟失未保存的資料。",
      ok: "確定",
      cancel: "取消",
    },
  };
  const tOTP = translationsOTP[globalstate];
  //gender
  const [genderValue, setGenderValue] = React.useState("");
  return (
    <div
      style={{
        color: "#333f48",
      }}
      className=" "
    >
      <style jsx="true">{`
        .ant-message {
          font-size: 14rem; /* Change font size */
        }
      `}</style>
      {contextHolder}
      <Modal
        title={
          <div style={{ color: ORANGE_COLOR, fontSize: "14rem" }}>Warning</div>
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
            className="h-[30rem] text-[14rem] leading-[10rem]
          "
          >
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
              style={{ color: DARKBLACK_COLOR, fontSize: "12rem" }}
            >
              {`${errStr}`}
            </li>
          ))}
        </ul>
      </Modal>

      <Modal
        title={<div style={{ color: "red", fontSize: "24rem" }}> </div>}
        open={isModalOpenWhenPressBack}
        onOk={handleOkWhenPressBack}
        onCancel={handleCancelWhenPressBack}
        okText={t.ok}
        cancelText={t.cancel}
      >
        {/* 文字內容無法崁入style? */}
        <div style={{ textAlign: "center", fontSize: "30rem" }}>
          <div style={{ textAlign: "center" }}>t.message</div>

          <div style={{ textAlign: "center" }}>t.subMessage</div>
        </div>
      </Modal>

      {/* 父 */}
      <div className=" mt-[10%]   flex h-dvh flex-col  items-center justify-center">
        <div className="  text-[calc(20rem)]  font-bold leading-[30rem]  ">
          {globalstate === "en" ? (
            <span> {"CREATE ACCOUNT"}</span>
          ) : (
            <span className="font-['Open_Sans']">建立帳號</span>
          )}
        </div>

        <div
          className="    h-dvh w-[calc(336rem)]


"
        >
          <div
            className=" border-2
border-solid
border-mainColor "
          >
            {" "}
            <div className="">
              <div
                style={{
                  zIndex: 0,
                  //  width: '100%',
                  // 左右對齊
                  color: "#333f48",
                  textAlign: "center",
                  fontSize: "calc(15rem )",
                }}
                className="mt-[5rem] "
              >
                <Row
                  className={`${styles.signUpBigBold} `}
                  justify={"center"}
                  style={{ marginTop: "12rem" }}
                >
                  <Col className="text-[calc(18rem)] font-bold">
                    {globalstate === "en" ? (
                      <span> {"ACCOUNT INFORMATION"}</span>
                    ) : (
                      <span className="font-['Open_Sans']">帳號設定</span>
                    )}
                  </Col>
                </Row>
                {/* <FormattedMessage id="greeting"/> */}
                <Row className="mt-[10rem] flex justify-center">
                  <Col className="h-[23.7rem] text-[calc(16rem)] font-semibold">
                    {globalstate === "en" ? (
                      <span> {"ACCOUNT NAME"}</span>
                    ) : (
                      <span className="font-['Open_Sans']">帳號名稱</span>
                    )}
                  </Col>
                </Row>
                <Row justify={"center"}>
                  <Col>
                    <Input
                    autoComplete="username"
                      value={accountName}
                      variant="borderless"
                      maxLength={36}
                      style={{
                        textAlign: "center",
                        width: "calc(263rem)",
                        height: "calc(42rem)",
                        border: `2rem solid ${MAIN_COLOR}`,
                        fontSize: "calc(14rem)",
                      }}
                      className={`font-semibold ${styles.signUpInputBigFrame}`}
                      placeholder="Accountname"
                      onChange={accountNameChange}
                    />
                  </Col>
                </Row>
                <Row justify={"center"} style={{ marginTop: "12rem" }}>
                  <Col className="text-[calc(16rem)] font-semibold ">
                    {globalstate === "en" ? (
                      <span>{"PASSWORD"}</span>
                    ) : (
                      <span className="font-['Open_Sans']">密碼</span>
                    )}
                  </Col>
                </Row>

                {/* 具備綠色眼精 */}
                <Input.Password
                   autoComplete="current-password"
                  placeholder="............"
                  value={password}
                  onChange={changePassword}
                  onBlur={handlePasswordBlur}
                  iconRender={(visible) =>
                    visible ? (
                      <svg
                        viewBox="64 64 896 896"
                        focusable="false"
                        data-icon="eye"
                        width="1em"
                        height="1em"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          d="M81.8 537.8a60.3 60.3 0 010-51.5C176.6 286.5 319.8 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 000 51.5C176.6 737.5 319.9 838 512 838c-192.1 0-335.4-100.5-430.2-300.2z"
                          fill="#e6f7ff"
                        ></path>
                        <path
                          d="M512 258c-161.3 0-279.4 81.8-362.7 254C232.6 684.2 350.7 766 512 766c161.4 0 279.5-81.8 362.7-254C791.4 339.8 673.3 258 512 258zm-4 430c-97.2 0-176-78.8-176-176s78.8-176 176-176 176 78.8 176 176-78.8 176-176 176z"
                          fill="#e6f7ff"
                        ></path>
                        <path
                          d="M942.2 486.2C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 000 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM512 766c-161.3 0-279.4-81.8-362.7-254C232.6 339.8 350.7 258 512 258s279.4 81.8 362.7 254C791.5 684.2 673.4 766 512 766z"
                          fill="#84bd00"
                        ></path>
                        <path
                          d="M508 336c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm0 288c-61.9 0-112-50.1-112-112s50.1-112 112-112 112 50.1 112 112-50.1 112-112 112z"
                          fill="#84bd00"
                        ></path>
                      </svg>
                    ) : (
                      <EyeInvisibleOutlined />
                    )
                  }
                  className="font-semibold"
                  style={{
                    textAlign: "center",
                    width: "calc(263rem )",
                    height: "calc(42rem )",
                    border: `2rem solid ${MAIN_COLOR}`,
                    fontSize: "calc(14rem)",
                  }}
                />

                <Row justify={"center"} style={{ marginTop: "12rem" }}>
                  <Col className="text-[calc(16rem)] font-semibold">
                    {globalstate === "en" ? (
                      <span> {"CONFIRM PASSWORD"}</span>
                    ) : (
                      <span className="font-['Open_Sans']">確認密碼</span>
                    )}
                  </Col>
                </Row>

                {/* 具備綠色眼精 */}
                <Input.Password
                   autoComplete="current-password"
                  placeholder="............"
                  value={confirmPassword}
                  onChange={changeConfirmPassword}
                  onBlur={confirmPasswordBlur}
                  iconRender={(visible) =>
                    visible ? (
                      <svg
                        viewBox="64 64 896 896"
                        focusable="false"
                        data-icon="eye"
                        width="1em"
                        height="1em"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          d="M81.8 537.8a60.3 60.3 0 010-51.5C176.6 286.5 319.8 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 000 51.5C176.6 737.5 319.9 838 512 838c-192.1 0-335.4-100.5-430.2-300.2z"
                          fill="#e6f7ff"
                        ></path>
                        <path
                          d="M512 258c-161.3 0-279.4 81.8-362.7 254C232.6 684.2 350.7 766 512 766c161.4 0 279.5-81.8 362.7-254C791.4 339.8 673.3 258 512 258zm-4 430c-97.2 0-176-78.8-176-176s78.8-176 176-176 176 78.8 176 176-78.8 176-176 176z"
                          fill="#e6f7ff"
                        ></path>
                        <path
                          d="M942.2 486.2C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 000 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM512 766c-161.3 0-279.4-81.8-362.7-254C232.6 339.8 350.7 258 512 258s279.4 81.8 362.7 254C791.5 684.2 673.4 766 512 766z"
                          fill="#84bd00"
                        ></path>
                        <path
                          d="M508 336c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm0 288c-61.9 0-112-50.1-112-112s50.1-112 112-112 112 50.1 112 112-50.1 112-112 112z"
                          fill="#84bd00"
                        ></path>
                      </svg>
                    ) : (
                      <EyeInvisibleOutlined />
                    )
                  }
                  className="font-semibold"
                  style={{
                    textAlign: "center",
                    width: "calc(263rem )",
                    height: "calc(42rem )",
                    border: `2rem solid ${MAIN_COLOR}`,
                    fontSize: "calc(14rem )",
                  }}
                />

                {/* 畫點橫線 */}
                <div
                  className={styles.dottedline}
                  style={{
                    width: "225rem",
                    marginLeft: "auto",
                    marginRight: "auto",
                    marginTop: "32rem",
                  }}
                ></div>
                {/* email set start */}

                {codeMatch ? (
                  <>
                    {" "}
                    <Row
                      className="block"
                      justify={"center"}
                      style={{ textAlign: "center", marginTop: "8rem" }}
                    >
                      <Col className="h-[23.7rem] text-[calc(16rem)] font-semibold">
                        {globalstate === "en" ? (
                          <div className="ml-[10rem] font-['Open_Sans']">
                            EMAIL
                            <span className="text-[10rem] ">(Optional)</span>
                          </div>
                        ) : (
                          <div className="ml-[10rem] font-['Open_Sans']">
                            信箱<span className="text-[10rem] ">(選填)</span>
                          </div>
                        )}
                      </Col>
                    </Row>
                    <Row
                      justify={"center"}
                      className="relative mb-[5rem] mt-[10rem] flex flex-col items-center"
                    >
                      <Col>
                        <Input
                          value={email}
                          variant="borderless"
                          maxLength={36}
                          style={{
                            textAlign: "center",
                            width: "calc(263rem)",
                            height: "calc(42rem)",
                            border: `2rem solid ${MAIN_COLOR}`,
                            fontSize: "calc(14rem)",
                          }}
                          className={`font-semibold ${styles.signUpInputBigFrame}`}
                          placeholder="Email"
                          disabled
                          // onChange={changeLastName}
                        />
                      </Col>
                      {codeMatch ? (
                        <Col className="absolute left-[7rem] top-[10rem] ">
                          <CheckCircleOutlined
                            style={{ fontSize: "20rem", color: "#80C342" }}
                          />
                        </Col>
                      ) : (
                        ""
                      )}
                    </Row>
                  </>
                ) : (
                  ""
                )}

                {sendNewEmailPage && (
                  <div className="slide-in-from-bottom  flex h-dvh w-full flex-col items-center ">
                    <div className="text-[20rem] text-red-500">
                      <div
                        className="flex flex-col  pt-[130rem] "
                        style={{ justifyContent: "start" }}
                      >
                        <div
                          className="flex h-[382rem] max-h-[calc((100dvh-140rem))] w-[351rem] flex-col items-center  overflow-auto  border-mainColor bg-[#efefef] text-darkColor "
                          style={{ borderWidth: "3rem" }}
                        >
                          <div className="mt-[38.4rem] w-[306rem] pl-[20rem] pr-[20rem] text-center text-[20rem] font-bold leading-[24rem]">
                            {globalstate === "en" ? (
                              <span>Sign Up</span>
                            ) : (
                              <span className="font-['Open_Sans']">註冊</span>
                            )}
                          </div>
                          <div className="mb-[20rem] mt-[20rem] text-[16rem]"></div>
                          <div className="text-[16rem]">
                            {globalstate === "en" ? (
                              <span>Please Enter Email</span>
                            ) : (
                              <span className="font-['Open_Sans']">
                                請輸入信箱
                              </span>
                            )}
                          </div>

                          <section className=" flex justify-center text-[calc(14rem)]">
                            <div className=" flex h-[calc(42rem)] w-[calc(263.92rem)] items-center justify-center border-2 border-mainColor  bg-white">
                              <input
                                placeholder="Email"
                                required
                                // value={account1}
                                // width={'100%'}
                                // height={'100%'}
                                value={email}
                                onChange={changeEmail}
                                className="b h-full w-full bg-transparent text-center
                      "
                              />
                            </div>
                          </section>
                          <section className="mb-[25.5rem] mt-[22rem] flex w-[300rem] justify-around">
                            <div
                              style={{
                                background: `linear-gradient(to top, #80c342, #bae642)`,
                                lineHeight: "1rem",
                              }}
                              className="flex h-[49rem] w-[120rem] items-center justify-center border-[2rem] border-white text-[20rem] font-bold text-white"
                              onClick={pressSkip}
                            >
                              {globalstate === "en" ? (
                                <span> Skip</span>
                              ) : (
                                <span className="font-['Open_Sans']">略過</span>
                              )}
                            </div>
                            <div
                              style={{
                                background: `linear-gradient(to top, #80c342, #bae642)`,
                                lineHeight: "1rem",
                              }}
                              className="flex h-[49rem] w-[120rem] items-center justify-center border-[2rem] border-white text-[20rem] font-bold text-white"
                              onClick={pressSend}
                            >
                              {globalstate === "en" ? (
                                <span> Send</span>
                              ) : (
                                <span className="font-['Open_Sans']">傳送</span>
                              )}
                            </div>
                          </section>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {emailVerifyOpen && (
                  <div className="slide-in-from-bottom   flex h-dvh w-full flex-col items-center ">
                    <div className="text-[20rem] text-red-500">
                      <div
                        className="flex flex-col  pt-[130rem] "
                        style={{ justifyContent: "start" }}
                      >
                        <div
                          className="relative flex h-[382rem] max-h-[calc((100dvh-140rem))] w-[351rem]  flex-col items-center overflow-auto  border-mainColor bg-[#efefef] text-darkColor "
                          style={{ borderWidth: "3rem" }}
                        >
                          <div className="mt-[38.4rem] w-[306rem] pl-[20rem] pr-[20rem] text-center text-[20rem] font-bold leading-[24rem]">
                            {globalstate === "en" ? (
                              <span> Email Verify</span>
                            ) : (
                              <span className="font-['Open_Sans']">
                                驗證OTP
                              </span>
                            )}
                          </div>
                          <div className="mb-[20rem] mt-[20rem] text-[16rem]"></div>
                          <div className="text-[16rem]">
                            {globalstate === "en" ? (
                              <span>Please Enter OTP Code</span>
                            ) : (
                              <span className="font-['Open_Sans']">
                                請輸OTP驗證碼
                              </span>
                            )}
                          </div>

                          <section className=" flex justify-center text-[calc(14rem)]">
                            <div className=" flex h-[calc(42rem)] w-[calc(263.92rem)] items-center justify-center border-2 border-mainColor  bg-white">
                              <input
                                placeholder="000000"
                                required
                                value={verify}
                                onChange={verificationOnChange}
                                className="b h-full w-full bg-transparent text-center
                      "
                              />
                            </div>
                          </section>

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
                              onResend={backToSendNewEmailPage}
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
                          <section className=" mb-[25.5rem] mt-[32rem] flex justify-center">
                            <div
                              style={{
                                background: `linear-gradient(to top, #80c342, #bae642)`,
                                lineHeight: "1rem",
                              }}
                              className="flex h-[49rem] w-[130rem] items-center justify-center border-[2rem] border-white text-[20rem] font-bold text-white"
                              onClick={pressVerify}
                            >
                              {globalstate === "en" ? (
                                <span> Verify</span>
                              ) : (
                                <span className="font-['Open_Sans']">確認</span>
                              )}
                            </div>
                          </section>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <Modal
                  title={tOTP.title}
                  open={isModalVerifyOpen}
                  onOk={handleVerifyOk}
                  onCancel={handleVerifyOk} // 修改 onCancel 事件為 handleOk
                  // 修改 OK 按鈕文字
                  okText={tOTP.okText}
                  cancelText="  " // 隱藏 Cancel 按鈕
                  cancelButtonProps={{
                    style: {
                      borderColor: "transparent", // 修改 Cancel 按鈕的邊框顏色
                    },
                  }}
                ></Modal>
                {/* email set end */}

                <Row
                  className={styles.signUpBigBold}
                  style={{ marginTop: "32rem" }}
                  justify={"center"}
                >
                  <Col className="text-[calc(18rem)] font-bold">
                    {globalstate === "en" ? (
                      <span> {"PROFILE INFORMATION"}</span>
                    ) : (
                      <span className="font-['Open_Sans']">個人資料</span>
                    )}
                  </Col>
                </Row>
                {/* 從這裡跟setting一樣 */}
                <Row justify={"center"} style={{ marginTop: "12rem" }}>
                  <Col className="text-[calc(16rem)] font-semibold">
                    {globalstate === "en" ? (
                      <span> {"FIRST NAME"}</span>
                    ) : (
                      <span className="font-['Open_Sans']">名字</span>
                    )}
                  </Col>
                </Row>

                <Row justify={"center"}>
                  <Col>
                    <Input
                      value={firstName}
                      variant="borderless"
                      maxLength={36}
                      style={{
                        textAlign: "center",
                        width: "calc(263rem)",
                        height: "calc(42rem)",
                        border: `2rem solid ${MAIN_COLOR}`,
                        fontSize: "calc(14rem)",
                      }}
                      className={`font-semibold ${styles.signUpInputBigFrame}`}
                      placeholder="Firstname"
                      onChange={changeFirstName}
                    />
                  </Col>
                </Row>

                <Row justify={"center"} style={{ marginTop: "12rem" }}>
                  <Col className="text-[calc(16rem)] font-semibold">
                    {globalstate === "en" ? (
                      <span> {"LAST NAME"}</span>
                    ) : (
                      <span className="font-['Open_Sans']">姓氏</span>
                    )}
                  </Col>
                </Row>

                <Row justify={"center"}>
                  <Col>
                    <Input
                      value={lastName}
                      variant="borderless"
                      maxLength={36}
                      style={{
                        textAlign: "center",
                        width: "calc(263rem)",
                        height: "calc(42rem)",
                        border: `2rem solid ${MAIN_COLOR}`,
                        fontSize: "calc(14rem)",
                      }}
                      className={`font-semibold ${styles.signUpInputBigFrame}`}
                      placeholder="Lastname"
                      onChange={changeLastName}
                    />
                  </Col>
                </Row>

                <Row justify={"center"} style={{ marginTop: "12rem" }}>
                  <Col className="text-[calc(16rem)] font-semibold">
                    {" "}
                    {globalstate === "en" ? (
                      <span> {"BIRTHDATE "}</span>
                    ) : (
                      <span className="font-['Open_Sans']">生日</span>
                    )}
                    <span className="text-[12rem]">MM/DD/YY</span>
                  </Col>
                </Row>
                {/* <h1>
        <FormattedMessage id="greeting" />
      </h1> */}
                {/* defaultValue={dayjs('2015/01/01', dateFormat)} format={dateFormat}  */}
                <div className="">
                  {/* Custom Input */}

                  <style jsx="true">{`
                    .custom-picker .ant-picker-input input {
                      color: "#333f48" !important;
                      opacity: 1 !important;
                      font-size: 12rem !important;
                      font-weight: 500 !important;
                    }

                    .custom-picker .ant-picker-input input::placeholder {
                      color: "#bfbfbf" !important;
                    }
                    /* 通过类名覆盖图标样式 */
                    .custom-picker .ant-picker-suffix {
                      font-size: 14rem; /* 改变图标大小 */
                    }
                  `}</style>
                  {/* Ant Design DatePicker with hidden input */}
                  <div className="">
                    <DatePicker
                      placeholder="                              01/01/2024"
                      inputFontSizeLG
                      defaultValue={date}
                      format={customFormat}
                      needConfirm
                      open={open}
                      onChange={handleDateSelect}
                      onClick={() => setOpen(true)}
                      getPopupContainer={(trigger) => trigger.parentElement}
                      popupStyle={{
                        position: "absolute",
                        // 確保不會超出視窗

                        overflow: "auto",
                      }}
                      popupPlacement="bottomLeft"
                      className="custom-picker "
                      style={{
                        width: "calc(263rem)",
                        height: "calc(42rem)",
                        textAlign: "center",
                        width: "calc(263rem)",
                        height: "calc(42rem)",
                        border: `2rem solid ${MAIN_COLOR}`,
                        borderRadius: 0,
                      }}
                      // style={{ display: 'none' }} // Hide the default input
                    />
                  </div>
                  <style jsx="true">{`
                    /* Optional: Adjust DatePicker panel height */
                    .ant-picker-panel {
                      width: 285px !important;
                      height: 300px !important; /* Change to your desired height */
                    }
                    .ant-picker-cell-inner {
                      display: flex;
                      justify-content: center;
                      align-items: center;
                    }
                  `}</style>
                </div>

                {/* <DatePicker defaultValue={dayjs('01/01/2015', dateFormatList[0])} format={dateFormatList} /> */}

                <Row justify={"center"} style={{ marginTop: "12rem" }}>
                  <Col className="text-[calc(16rem)] font-semibold">
                    {globalstate === "en" ? (
                      <span> {"GENDER"}</span>
                    ) : (
                      <span className="font-['Open_Sans']">性別</span>
                    )}
                  </Col>
                </Row>

                {/* 讓它自己選 male /female /?? */}
                <Row justify={"center"} className="">
                  <Col>
                    <>
                      <div className="w-[263rem]">
                        <Select.Root
                          value={genderValue}
                          onValueChange={setGenderValue}
                        >
                          <Select.Trigger
                            className=" relative inline-flex  w-full items-center justify-center rounded-md border border-[2rem] border-mainColor  bg-white px-4 py-2 text-[16rem] text-[#000000] hover:bg-gray-50  focus:outline-none  focus:ring-[#84BD00]"
                            aria-label="Food"
                          >
                            <Select.Value
                              placeholder={
                                globalstate === "en" ? (
                                  <span className="text-[14rem] text-[#00000040]">
                                    Male
                                  </span>
                                ) : (
                                  <span className="font-['Open_Sans'] text-[14rem] text-[#00000040]">
                                    先生
                                  </span>
                                )
                              }
                              className=""
                            />
                            <div className="">
                              <Select.Icon className=" ">
                                <CaretDownOutlined className=" mb-[10rem] mt-[10rem] h-[20rem] w-[0rem] text-transparent" />
                              </Select.Icon>
                            </div>
                          </Select.Trigger>

                          <Select.Portal>
                            <Select.Content
                              className="overflow-hidden rounded-md border border-gray-200 bg-white shadow-lg "
                              position="popper"
                              sideOffset={5}
                            >
                              <Select.ScrollUpButton className="flex h-[60rem] cursor-default items-center justify-center bg-white text-gray-500"></Select.ScrollUpButton>

                              <Select.Viewport className="w-[263rem] p-1   ">
                                <Select.Group>
                                  <SelectItem value="male" className="">
                                    {globalstate === "en" ? (
                                      <div className="pb-[2rem] pt-[2rem] text-[14rem]">
                                        {" "}
                                        Male
                                      </div>
                                    ) : (
                                      <div className="pb-[2rem] pt-[2rem] font-['Open_Sans'] text-[14rem]">
                                        先生
                                      </div>
                                    )}
                                  </SelectItem>
                                  <SelectItem value="female">
                                    {globalstate === "en" ? (
                                      <div className="pb-[2rem] pt-[2rem] text-[14rem]">
                                        {" "}
                                        Female
                                      </div>
                                    ) : (
                                      <div className="pb-[2rem] pt-[2rem] font-['Open_Sans'] text-[14rem]">
                                        女士
                                      </div>
                                    )}
                                  </SelectItem>
                                  <SelectItem value="genderqueer">
                                    {globalstate === "en" ? (
                                      <div className="pb-[2rem] pt-[2rem] text-[14rem]">
                                        Undisclosed
                                      </div>
                                    ) : (
                                      <div className="pb-[2rem] pt-[2rem] font-['Open_Sans'] text-[14rem]">
                                        不透露
                                      </div>
                                    )}
                                  </SelectItem>
                                </Select.Group>

                                <Select.Separator className="my-2 h-px bg-gray-200" />
                              </Select.Viewport>

                              <Select.ScrollDownButton className="flex h-[6rem] cursor-default items-center justify-center bg-white text-gray-500">
                                {/* <CaretDownOutlined className="h-[40rem] w-[40rem]" /> */}
                              </Select.ScrollDownButton>
                            </Select.Content>
                          </Select.Portal>
                        </Select.Root>
                      </div>
                    </>
                  </Col>
                </Row>
                <Row justify={"center"} style={{ marginTop: "20rem" }}>
            <Col className="text-[calc(16rem)] font-semibold">
              {globalstate === "en" ? (
                <span> {"UNITS"}</span>
              ) : (
                <span className="font-['Open_Sans']">單位</span>
              )}
            </Col>
          </Row>
          <Row justify={"center"} className="">
            <Col
              className="flex h-[calc(42rem)] w-[calc(131rem)] items-center justify-center text-[calc(14rem)]"
              style={{
                border: "2rem solid #84bd00",
              }}
            >
              <div
                className={(isMetric) ? styles.signUpUnits : "none"}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignContent: "center",
                }}
                onClick={() => toggleUnit("Metric")}
              >
                {globalstate === "en" ? (
                  <span>Metric</span>
                ) : (
                  <span className="font-['Open_Sans']">公制</span>
                )}
              </div>
            </Col>

            <Col
              // span={10}
              className="flex h-[calc(42rem)] w-[calc(131rem)] items-center justify-center text-[calc(14rem)]  font-semibold "
              style={{
                borderRight: "2rem solid #84bd00",
                borderTop: "2rem solid #84bd00",
                borderBottom: "2rem solid #84bd00",
              }}
            >
              <div
                className={(isMetric) ? "none" : styles.signUpUnits}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignContent: "center",
                }}
                onClick={() => toggleUnit("Imperial")}
              >
                {globalstate === "en" ? (
                  <span> Imperial</span>
                ) : (
                  <span className="font-['Open_Sans']">英制</span>
                )}
              </div>
            </Col>
          </Row>    
                <Row justify={"center"} style={{ marginTop: "12rem" }}>
                  <Col
                    style={{
                      textAlign: "center",
                      width: "131rem",
                      height: "30rem",
                      lineHeight: "40rem",
                    }}
                    className="text-[calc(16rem)] font-semibold"
                  >
                    {globalstate === "en" ? (
                      <span>{"HEIGHT"}</span>
                    ) : (
                      <span className="font-['Open_Sans']">身高</span>
                    )}
                  </Col>
                  <Col
                    style={{
                      textAlign: "center",
                      width: "131rem",
                      height: "30rem",
                      /* // height: 55rem; */
                      // backgroundColor: 'pink',
                      lineHeight: "40rem",
                    }}
                    className="text-[calc(16rem)] font-semibold"
                  >
                    {globalstate === "en" ? (
                      <span> {"WEIGHT"}</span>
                    ) : (
                      <span className="font-['Open_Sans']">體重</span>
                    )}
                  </Col>
                </Row>

                {/* HEIGHT & WEIGHT */}
                {/* 公制 */}
                <div>
            <Row justify="center" className="ml-[10rem]">
              <Col
                className="flex flex-col "
                style={{
                  border: `2rem solid ${MAIN_COLOR}`,
                  marginRight: "10.5rem",
                  width: "126rem",
                  height: "59rem",
                  position: "relative",
                  backgroundColor: "white",
                  fontSize: "14rem",
                }}
              >
                  <Input
                     
                      variant="borderless"
                    
                      value={heightValue}
                      onChange={handleHeightInput}
                      placeholder="1"
                      
                        className="w-full text-[14rem]"
                    />
                {/* {isMetric ? (
                  <Input
                    type="text"
                    value={cm}
                    variant="borderless"
                    onChange={handleInputChange(setCm)}
                    placeholder="180"
                    className="w-full text-[14rem]"
                  />
                ) : (
                  <div className=" flex justify-center space-x-2">
                    <Input
                      inputMode="numeric"
                      variant="borderless"
                      maxLength={3}
                      size="small"
                      value={feet}
                      onChange={handleInputChange(setFeet)}
                      placeholder="6"
                      style={{
                        width: "25%",
                        height: "31rem",
                        textAlign: "center",
                        fontSize: "14rem",
                      }}
                    />
                    <span className="ml-[-10rem] ">'</span>
                    <Input
                      size="small"
                      variant="borderless"
                      inputMode="numeric"
                      value={inch}
                      onChange={handleInputChange(setInch)}
                      placeholder="1"
                      maxLength={3}
                      style={{
                        width: "25%",
                        height: "31rem",
                        textAlign: "center",
                        fontSize: "14rem",
                      }}
                    />{" "}
                    <span className="ml-[-10rem] ">"</span>
                  </div>
                )} */}
                <div
                  className=" mb-[5rem]"
                  style={{
                    color: "#333f48",
                    fontSize: "14rem",
                  }}
                >
                  {globalstate === "en" ? (
                    <span> {isMetric ? 'cm' : 'in'}</span>
                  ) : (
                    <span className="font-['Open_Sans']">
                      {isMetric ? "公分" : "英吋"}
                    </span>
                  )}
                </div>
              </Col>
              <Col
                className="flex flex-col "
                style={{
                  border: `2rem solid ${MAIN_COLOR}`,
                  marginRight: "10.5rem",
                  width: "126rem",
                  height: "59rem",
                  position: "relative",
                  backgroundColor: "white",
                  fontSize: "14rem",
                }}
              >
                <Input
                  type="text"
                  variant="borderless"
                  value={weightValue}
                  onChange={handleWeightInput}
                  placeholder={"60" }
                  className="w-full text-[14rem]"
                />
                <div
                  className=" mb-[5rem]"
                  style={{
                    color: "#333f48",
                    fontSize: "14rem",
                  }}
                >
                  {globalstate === "en" ? (
                    <span> {isMetric ? 'kg' : 'lbs'}</span>
                  ) : (
                    <span className="font-['Open_Sans']">
                      {" "}
                      {isMetric ? "公斤" : "英磅"}
                    </span>
                  )}
                </div>
              </Col>
            </Row>
          </div>
                {/* 先選公英制, 再顯示單位 */}
                {/* <Row justify={"center"} style={{ marginTop: "20rem" }}>
                <Col className="text-[calc(16rem)] font-semibold">
                  {"UNITS"}
                </Col>
              </Row> */}

                {/*  */}

                {/* 到這裡跟setting一樣 */}
                {/* SIGN UP */}
                <Row
                  justify={"center"}
                  style={{
                    lineHeight: 2.5,
                    textAlign: "center",
                    height: "38rem",
                    marginTop: "24rem",
                    marginBottom: "27rem",
                  }}
                >
                  {/* <Col span={6}  > */}
                  {/* </Col> */}
                  <Col
                    span={10}
                    // 按鈕具備漸層色
                    className={`font-bold ${styles.linearGradient1} `}
                    style={{
                      // background:
                      //   'linear-gradient(90deg, #bae642 0%, #8ac942 64.9%, #80c342 100%)',
                      color: "#fff",
                      border: "2rem solid white",
                      fontSize: "20rem",
                    }}
                    onClick={pressSignUp}
                  >
                    {globalstate === "en" ? (
                      <span> {"SIGN UP"}</span>
                    ) : (
                      <span className="font-['Open_Sans']">註冊</span>
                    )}
                  </Col>
                </Row>
              </div>
            </div>
          </div>
          <div className="h-[5%]"></div>
          {/* 孫 */}
        </div>
      </div>
    </div>
  );
};
// SelectItem 子組件
const SelectItem = React.forwardRef(
  ({ children, className, ...props }, forwardedRef) => {
    return (
      <Select.Item
        className="relative   flex cursor-default select-none items-center justify-center rounded-md px-6 py-2 text-[16rem] text-[#000000] hover:bg-[#d3d3d34C] focus:bg-[#d3d3d34C] focus:outline-none data-[highlighted]:bg-[#d3d3d34C] "
        {...props}
        ref={forwardedRef}
      >
        <Select.ItemText className="">{children}</Select.ItemText>
        <Select.ItemIndicator className="absolute left-1 mb-[1rem] mt-[1rem] inline-flex items-center"></Select.ItemIndicator>
      </Select.Item>
    );
  },
);

SelectItem.displayName = "SelectItem";
export default SignUp;

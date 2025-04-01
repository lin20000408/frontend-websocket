import { useState, useEffect, useContext, useRef } from "react";
import React from "react";

import {
  BACKGROUND_COLOR,
  MAIN_COLOR,
  DARKGRAY_COLOR,
  ORANGE_COLOR,
  DARKBLACK_COLOR,
} from "@/constants";
import {
  Row,
  Col,
  Input,
  Calendar,
  Modal,
  Button,
  message,
  Upload,
  DatePicker,
} from "antd";
import * as Select from "@radix-ui/react-select";
import { CaretDownOutlined } from "@ant-design/icons";
import { CheckCircleOutlined } from "@ant-design/icons";
import Icon_check from "@/assets/icons/checkIcon.svg?react";
import { EyeInvisibleOutlined } from "@ant-design/icons";
import ImgCrop from "antd-img-crop";
import { DeleteOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { Content } from "@/App";

// css 的模組引入
import styles from "@/css/local.module.css";
// import Calendar from "@/components/Calendar";
// import Calendar from "react-calendar";
// import _DeleteAccount from "@/components/ProfileSettings/DeleteAccount";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import customParseFormat from "dayjs/plugin/customParseFormat";
import localeData from "dayjs/plugin/localeData";
import weekday from "dayjs/plugin/weekday";
import weekOfYear from "dayjs/plugin/weekOfYear";
import weekYear from "dayjs/plugin/weekYear";

import Icon_Avatar from "@/assets/avatar/DefaultAvatar.svg?react";
dayjs.extend(customParseFormat);
dayjs.extend(advancedFormat);
dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(weekOfYear);

import { v4 as uuidv4 } from "uuid";

import { GlobalStateContext } from "@/App";

import UploadFiles from "@/components/ProfileSettings/UploadFiles";
// 組件
import {
  LoadingOutlined,
  PlusOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { Otptimer } from "otp-timer-ts";
// 載入圖片時先檢查大小

export default function _AccountDetails() {
  //gender

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
  }, []);

  const [messageApi, contextHolder] = message.useMessage();
  // 全局
  const { globalstate } = useContext(GlobalStateContext);
  const {
    isMetric,
    setIsMetric,
    retSetUserProfileState,
    setRetSetUserProfileState,
    userProfile,
    refreshToken,
    setUserProfile,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    newPassword,
    setNewPassword,
    updateUserProfile,
    setUpdateUserProfile,
    //
    scaleH,
    setScaleH,
    scaleV,
    setScaleV,
    isPortrait,
    setIsPortrait,
    currentScreen,
    setCurrentScreen,
    currentSub1Screen,
    setCurrentSub1Screen,
    mac,
    setMac,
    ws,
    setWs,
    setConfirmUserEmail,
    verifyUserEmail,
    setVerifyUserEmail,
    confirmUserEmail,
    connectState,
    setConnectState,
    socketio,
    googleSubBackup,
    instagramSubBackup,

    isLogin,
    setIsLogin,
    logout,
    setLogout,
    activeScreen,
    setActiveScreen,
    deleteUserID,
    setDeleteUserID,
    forgetUserPassword,
    confirmForgetUserPasswordCode,
    confirmDeleteUserAccount,
    setConfirmDeleteUserAccount,
    setIsClickOpCode,
  } = useContext(Content);
  // 重新渲染背景
  console.log("@@@isMe", isMetric);
  useEffect(() => {
    document.body.style.backgroundImage = "none";
    document.body.style.backgroundColor = BACKGROUND_COLOR;

    setVerify("");
    setIsModalVerifyOpen(false);
    setIsModalOpenWhenPressBack(false);
    setVerifyUserEmail("fail");
    setConfirmUserEmail("init");
    console.log(isModalVerifyOpen);
    setDeleteAccountOtpPage(false);
    setDeleteAccountPage(false);
    setEmailDeleteAccount("");
    setEmailDeleteAccountVerifyOpen(false);
    setSendDeleteAccountAfterFiveMinutes(false);
    setVerifyDeleteAccount("");
    setIsModalDeleteAccountOpen(false);
    setIsModalOpen(false);
    setErrStrArray([]);
    //把email verify 恢復預設
    setCodeMatch(false);
    setChangeAnotherEmailModel(false);
    //把otp modal 轉回預設

    setDeleteUserID("fail");
    let sauser_accessToken = localStorage.getItem("sauser_accessToken");
    const inputObject = {
      getUserProfile: { sauser_accessToken: sauser_accessToken },
    };

    if (ws) {
      try {
        setIsClickOpCode(true);
        ws.send(JSON.stringify(inputObject));
        console.log(inputObject);
      } catch (error) {
        console.error("Error sending data:", error);
      }
    } else {
      console.error("WebSocket is not initialized");
    }
  }, []);
  useEffect(() => {
    document.body.style.backgroundImage = "none";
    document.body.style.backgroundColor = BACKGROUND_COLOR;

    setVerify("");
    setIsModalVerifyOpen(false);
    setIsModalOpenWhenPressBack(false);
    setVerifyUserEmail("fail");
    setConfirmUserEmail("init");
    console.log(isModalVerifyOpen);
    setDeleteAccountOtpPage(false);
    setDeleteAccountPage(false);
    setEmailDeleteAccount("");
    setEmailDeleteAccountVerifyOpen(false);
    setSendDeleteAccountAfterFiveMinutes(false);
    setVerifyDeleteAccount("");
    setIsModalDeleteAccountOpen(false);
    setIsModalOpen(false);
    setErrStrArray([]);
    //把email verify 恢復預設
    setCodeMatch(false);
    setChangeAnotherEmailModel(false);
    //把otp modal 轉回預設

    setDeleteUserID("fail");
    let sauser_accessToken = localStorage.getItem("sauser_accessToken");
    const inputObject = {
      getUserProfile: { sauser_accessToken: sauser_accessToken },
    };

    if (ws) {
      try {
        setIsClickOpCode(true);
        ws.send(JSON.stringify(inputObject));
        console.log(inputObject);
      } catch (error) {
        console.error("Error sending data:", error);
      }
    } else {
      console.error("WebSocket is not initialized");
    }
  }, [ws]);
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
    if (connectState === "reconnected") {
      console.log("reconnected  (Login)");
      setConnectState("init");
      // 跳往login 畫面

      navigate("/login");

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

  //FIXME: get 獲取數據

  //   // 當頁面載入時
  //   const storedProfile = JSON.parse(localStorage.getItem("userProfile"));
  //FIXME: get 獲取數據
  const [genderValue, setGenderValue] = React.useState(userProfile.gender);
  const navigate = useNavigate();

  const [imageUrl, setImageUrl] = useState();

  const [errStrArray, setErrStrArray] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenWhenPressBack, setIsModalOpenWhenPressBack] =
    useState(false);

  // 初值
  console.log(userProfile);

  //   useEffect(() => {
  //     // Only perform conversion if all necessary values are present
  //     if (isMetric) {
  //       // Check if cm has a valid value
  //       if (cm && cm !== "0") {
  //         // Convert cm to feet and inches
  //         const totalInches = Number(cm) / 2.54;
  //         setFeet(Math.floor(totalInches / 12).toString());
  //         setInch(Math.floor(totalInches % 12).toString());
  //       }
  //     } else {
  //       // Check if both feet and inch have valid values
  //       if (feet && inch && feet !== "0") {
  //         // Convert feet and inches to cm
  //         setCm(Math.floor((Number(feet) * 12 + Number(inch)) * 2.54).toString());
  //       }
  //     }
  //     console.log(userProfile);
  //   }, [cm, feet, inch, isMetric]);

  //!!單位轉換 ：重量 公斤轉磅

  useEffect(() => {
    sessionStorage.heightValue = isMetric ? userProfile.cm : userProfile.inch;
    sessionStorage.weightValue = isMetric ? userProfile.kg : userProfile.lb;

    sessionStorage.heightIsMetric = userProfile.units;
    sessionStorage.weightIsMetric = userProfile.units;
  }, []);

  //   const [weightValue, setWeightValue] = useState(isMetric?userProfile.kg:userProfile.lb); // 當前數值
  const [heightValue, setHeightValue] = useState(
    isMetric ? userProfile.cm : userProfile.inch,
  ); // Current height
  const [weightValue, setWeightValue] = useState(
    isMetric ? userProfile.kg : userProfile.lb,
  ); // Current weight
  const [heightIsMetric, setHeightIsMetric] = useState(true); // Height metric state
  const [weightIsMetric, setWeightIsMetric] = useState(true); // Weight metric state
  console.log("ss##",  userProfile.lastName);

  // Check sessionStorage on initialization
  useEffect(() => {
    const storedHeight = sessionStorage.heightValue;
    const storedHeightMetric = sessionStorage.heightIsMetric === "true";
    const storedWeight = sessionStorage.weightValue;
    const storedWeightMetric = sessionStorage.weightIsMetric === "true";

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
    const storedHeightMetric = sessionStorage.heightIsMetric === "true";
    const storedWeight = sessionStorage.weightValue;
    const storedWeightMetric = sessionStorage.weightIsMetric === "true";

    // Handle height conversion
    if (storedHeight && storedHeightMetric === newHeightIsMetric) {
      setHeightValue(parseFloat(storedHeight));
    } else {
      const newHeight = convertHeight(
        heightValue,
        heightIsMetric,
        newHeightIsMetric,
      );
      setHeightValue(newHeight);
    }

    // Handle weight conversion
    if (storedWeight && storedWeightMetric === newWeightIsMetric) {
      setWeightValue(parseFloat(storedWeight));
    } else {
      const newWeight = convertWeight(
        weightValue,
        weightIsMetric,
        newWeightIsMetric,
      );
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

  //email
  //?
  //email format
  function isValidEmail(emailStr) {
    console.log("emailStr = ", emailStr);
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    console.log("emailRegex = ", emailRegex.test(emailStr));
    return emailRegex.test(emailStr);
  }

  const [email, setEmail] = useState(userProfile.email);
  const changeEmail = (e) => {
    // console.log('changeEmail = ', email);
    setEmail(e.target.value);
  };
  //enter email open
  const [sendNewEmailPage, setSendNewEmailPage] = useState(false);
  const [emailVerifyOpen, setEmailVerifyOpen] = useState(false);
  //? 確認email是否資料庫已經存在 (本來沒有)

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
  const sendNewEmailPageButton = () => {
    setSendNewEmailPage(true);
  };
  //? 確認email是否資料庫已經存在&傳驗證信（本來有）
  const pressNewSend = async () => {
    setErrStrArray([]); // 清空錯誤訊息陣列
    // 判斷格式
    let errorState = false;
    if (!isValidEmail(newEmail)) {
      setErrStrArray((prev) => [
        ...prev,
        globalstate === "en"
          ? " Please ensure Email format is right."
          : "請確認信箱格式是否正確",
      ]);
      errorState = true;
    }

    if (newEmail === email) {
      setErrStrArray((prev) => [
        ...prev,
        globalstate === "en"
          ? "   Cannot be the same as the original email address."
          : "新信箱不能與原信箱一樣",
      ]);
      errorState = true;
    }
    if (newEmail === "") {
      setErrStrArray((prev) => [
        ...prev,
        globalstate === "en" ? "   Cannot be empty." : "不得為空",
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
    //   let sauser_accessToken = localStorage.getItem("sauser_accessToken");
    const getObject = {
      verifyUserEmail: { email: newEmail },
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
        setSendNewEmailPage(true);
      } else {
        console.log("沒有錯誤errorState ");
      }
    } else if (verifyUserEmail === "fail") {
      setEmailVerifyOpen(false);
    }
  }, [verifyUserEmail]);

  //verify
  const [verify, setVerify] = useState("");
  const verificationOnChange = (e) => {
    setVerify(e.target.value);
  };

  const [isModalVerifyOpen, setIsModalVerifyOpen] = useState(false);

  const backToSendNewEmailPage = () => {
    setEmailVerifyOpen(false);
    setSendNewEmailPage(true);
    setVerifyUserEmail("init");
  };
  const handleVerifyOk = () => {
    setIsModalVerifyOpen(false);
    setIsModalOpenWhenPressBack(false);
    setVerifyUserEmail("fail");
    setConfirmUserEmail("init");
  };
  //!verify === otpVerify需改成與後端驗證
  const [codeMatch, setCodeMatch] = useState(false);
  const pressVerify = () => {
    // 從後端獲取預期的 OTP
    let sauser_accessToken = localStorage.getItem("sauser_accessToken");
    const getObject = {
      confirmUserEmail: {
        sauser_accessToken: sauser_accessToken,
        email: newEmail,
        emailVerificationCode: verify,
      },
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
  };
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
      console.log("有錯誤errorState ");

      // 使用 Promise 來確保 emailVerifyOpen 狀態更新後再設置 codeMatch

      setCodeMatch(true); // 設置 codeMatch 為 true
    } else if (confirmUserEmail === "fail") {
      // OTP 驗證失敗
      setErrStrArray([]);
      setErrStrArray((prev) => [
        ...prev,
        globalstate === "en"
          ? "OTP verification code verification fail."
          : "OTP驗證碼錯誤",
      ]);
      setIsModalOpen(true);
      setConfirmUserEmail("init");
      //   setEmailVerifyOpen(false);
    }
  }, [confirmUserEmail]);
  // OTP 驗證成功

  // 使用 setTimeout 確保 emailVerifyOpen 為 false 後再設置 codeMatch
  //change email
  const [changeAnotherEmailModel, setChangeAnotherEmailModel] = useState(false);
  const changeAnotherEmail = () => {
    setIsModalVerifyOpen(false);
    setChangeAnotherEmailModel(true);
  };

  //new email
  const [newEmail, setNewEmail] = useState("");
  const changeNewEmail = (e) => {
    setNewEmail(e.target.value);
  };

  //!
  const [firstName, setFirstName] = useState(userProfile.firstName);
  const changeFirstName = (e) => {
    setFirstName(e.target.value);
  };
  const [lastName, setLastName] = useState(userProfile.lastName);
  const changeLastName = (e) => {
    setLastName(e.target.value);
  };

  //image
  const [previewImage, setPreviewImage] = useState(null);
  //   console.log(previewImage);
  const dateFormat = "MM/DD/YYYY";

  const [date, setDate] = useState(dayjs(userProfile.birthday, dateFormat));
  const [open, setOpen] = useState(false);

  const customFormat = (value) =>
    `                 ${value.format(dateFormat)}`;

  const handleDateSelect = (date) => {
    // 確保 date 不為 null
    if (date) {
      setDate(date);
      setOpen(false);
      //?birthday輸入的時候需改format
      console.log("選擇的日期:", date.format("MM/DD/YYYY")); // 格式化為 YYYY-MM-DD
    }
  };

  const pressSaveChanges = () => {
    console.log("pressSaveChanges.................................");
    setErrStrArray([]); // 清空錯誤訊息陣列
    // 判斷格式
    let errorState = false;

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

    //!發送資料到後端
    console.log(isMetric);

    // Initialize state
    const sauser_accessToken = localStorage.getItem("sauser_accessToken");
    // Create inputObject to collect user data
    const filteredProfile = Object.fromEntries(
      Object.entries({
        sauser_accessToken: sauser_accessToken,

        firstName: firstName !== userProfile.firstName ? firstName : undefined,
        lastName: lastName !== userProfile.lastName ? lastName : undefined,
        birthday:
          date.format("MM/DD/YYYY") !== userProfile.birthday
            ? date.format("MM/DD/YYYY")
            : undefined,
        gender: genderValue !== userProfile.gender ? genderValue : undefined,
        units: isMetric !== userProfile.units ? isMetric : undefined,
        //當 isMetric 是 false 時：直接返回 null，表示不使用公制單位，跳過所有處理。
        //當 isMetric 是 true 時：
        //如果 userProfile.cm 不存在（例如 null），返回 parseInt(cm)。
        //如果 userProfile.cm 存在：
        //如果 parseInt(cm) 與 userProfile.cm 不同，返回 parseInt(cm)（新的值）。
        //如果兩者相同，返回 undefined（表示值未改變）。
        //?英制則相反
        cm: isMetric
          ? userProfile.cm
            ? heightValue !== userProfile.cm
              ? heightValue
              : undefined
            : heightValue
          : null,
        //   feet: !isMetric
        //   ? userProfile.feet
        //     ? feet !== userProfile.feet
        //       ? feet
        //       : undefined
        //     : feet
        //   : null,
        inch: !isMetric
          ? userProfile.inch
            ? heightValue !== userProfile.inch
              ? heightValue
              : undefined
            : heightValue
          : null,
        kg: isMetric
          ? userProfile.kg
            ? weightValue !== userProfile.kg
              ? weightValue
              : undefined
            : weightValue
          : null,
        lb: !isMetric
          ? userProfile.lb
            ? weightValue !== userProfile.lb
              ? weightValue
              : undefined
            : weightValue
          : null,

        email:
          newEmail !== userProfile.email && newEmail !== ""
            ? newEmail
            : undefined,
      }).filter(([_, value]) => value !== undefined),
    );

    // 沒有填的不用送

    // 如果你仍需要這一步，雖然現在可能不需要了

    // Handle avatar file list if provided
    // console.log("fileList.length = ", fileList.length);
    if (previewImage && previewImage.length > 0) {
      filteredProfile.avatar = JSON.stringify(previewImage); // Store avatar file list if it exists
      console.log();
    }
    if (verify && verify.length > 0) {
      filteredProfile.emailVerificationCode = verify; // Store avatar file list if it exists
      console.log();
    }
    // Add Google subscription backup if available
    if (googleSubBackup) {
      filteredProfile.googleSub = googleSubBackup;
    }
    const updateObject =
      Object.keys(filteredProfile).length > 0
        ? { updateUserProfile: filteredProfile }
        : {};
    // Uncomment this line if you want to add Instagram subscription backup
    // if (instagramSubBackup) inputObject.instagramSub = instagramSubBackup;

    console.log("updateObject = ", updateObject);

    // Retrieve access token from local storage

    // console.log('sauser_accessToken = ', sauser_accessToken)
    if (ws) {
      try {
        setIsClickOpCode(true);
        ws.send(JSON.stringify(updateObject));
        console.log("success");
      } catch (error) {
        console.error("Error sending data:", error);
      }
    } else {
      console.error("WebSocket is not initialized");
    }

    //傳給logweight
    const dataJson = JSON.stringify({
      addNewWeight: {
        sauser_accessToken: sauser_accessToken,
        weight: isMetric
          ? weightValue !== userProfile.kg
            ? weightValue
            : undefined
          : weightValue !== userProfile.lb
            ? weightValue
            : undefined,
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
    //跟menu說要換大頭照和名字
    // setRetSetUserProfileState(true);
  };

  //photo

  const [deleteAccountOtpPage, setDeleteAccountOtpPage] = useState(false);
  const [deleteAccountPage, setDeleteAccountPage] = useState(false);

  const changePhotoClick = () => {
    console.log("changePhoto clicked");

    setCurrentScreen("profileSettingsScreen");
    setCurrentSub1Screen("changePhotoScreen");
    let p = {
      currentScreen: "profileSettingsScreen",
      currentSub1Screen: "changePhotoScreen",
    };
    sessionStorage.setItem("sauser_currentScreen", JSON.stringify(p));

    if (currentSub1Screen !== "changePhotoScreen") {
      // 存路由
      const stateData = {
        activeScreen: "menuScreen",
        currentScreen: "profileSettingsScreen",
        currentSub1Screen: "changePhotoScreen",
      };
      const title = ""; // 页面标题（可选）
      const encodedData = encodeURIComponent(JSON.stringify(stateData));
      const newUrl = `/?data=${encodedData}`; // 新的 URL（可选） 這個會改變名稱
      window.history.pushState(stateData, title, newUrl);
    }
  };
  //open delete page
  const deleteAccountPageClick = () => {
    console.log("deleteAccount clicked");

    setDeleteAccountOtpPage(true);
  };

  //delete account & logout

  //modal
  const handleOk = () => {
    setErrStrArray([]);
    setIsModalOpen(false);
    setConfirmUserEmail("init");
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
  const [selectedDay, setSelectedDay] = useState(null);
  useEffect(() => {
    return () => {
      // 清除事件監聽器
      document.removeEventListener("click", () => {});
    };
  }, []);

  // _AccountDetails Return 返回點
  //!DeleteAccount email Otp verify start
  const handlePinch = (event) => {};

  const [emailDeleteAccount, setEmailDeleteAccount] = useState("");
  const emailDeleteAccountOnChange = (e) => {
    setEmailDeleteAccount(e.target.value);
  };
  const [emailDeleteAccountVerifyOpen, setEmailDeleteAccountVerifyOpen] =
    useState(false);
  const [
    sendDeleteAccountAfterFiveMinutes,
    setSendDeleteAccountAfterFiveMinutes,
  ] = useState(false);
  useEffect(() => {
    let timer;

    if (emailDeleteAccountVerifyOpen) {
      // 設定 5 分鐘後的計時器 (5 * 60 * 1000 毫秒 = 300000 毫秒)
      timer = setTimeout(() => {
        setSendDeleteAccountAfterFiveMinutes(true);
      }, 30000);
    } else {
      // 當 emailDeleteAccountVerifyOpen 變為 false 時，重置狀態
      setSendDeleteAccountAfterFiveMinutes(false);
    }

    // cleanup function - 清除計時器避免記憶體洩漏
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [emailDeleteAccountVerifyOpen]);
  const pressSendDeleteAccount = async () => {
    let errorState = false;
    setErrStrArray([]);
    if (!isValidEmail(emailDeleteAccount)) {
      setErrStrArray((prev) => [
        ...prev,
        globalstate === "en"
          ? "  Please ensure Email format is right."
          : "請確認信箱格式是否正確",
      ]);
      errorState = true;
    }
    if (emailDeleteAccount === "") {
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
    const getObject = {
      deleteUserAccount: {
        sauser_accessToken: sauser_accessToken,
        email: emailDeleteAccount,
      },
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
    // send to 後端email (與後端確認是否有這個信箱)
  };
  //(本來有email)send email都是用forgetUserPassword
  useEffect(() => {
    if (deleteUserID === "success") {
      setEmailDeleteAccountVerifyOpen(true);
    } else if (deleteUserID === "tokenHasExpired") {
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
    } else if (
      refreshToken === "success" &&
      deleteUserID === "tokenHasExpired"
    ) {
      let sauser_accessToken = localStorage.getItem("sauser_accessToken");
      const getObject = {
        deleteUserAccount: {
          sauser_accessToken: sauser_accessToken,
          email: emailDeleteAccount,
        },
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
      // send to 後端email (與後端確認是否有這個信箱)
    } else if (deleteUserID === "nonExistentUser") {
      let errorState = false;
      setErrStrArray([]);
      setErrStrArray((prev) => [
        ...prev,
        globalstate === "en" ? "  This mailbox is not found" : "查無此信箱",
      ]);
      errorState = true;

      if (errorState) {
        setIsModalOpen(true);
        console.log("有錯誤errorState ");
        return;
      } else {
        console.log("沒有錯誤errorState ");
      }
    } else if (deleteUserID === "fail") {
      setEmailDeleteAccountVerifyOpen(false);
    }
  }, [deleteUserID, refreshToken]);
  //重新傳
  const backToSendDeleteNewEmailPage = () => {
    setEmailDeleteAccountVerifyOpen(false);
    setDeleteUserID("init");
  };
  //verify
  const [verifyDeleteAccount, setVerifyDeleteAccount] = useState("");
  const verificationDeleteAccountOnChange = (e) => {
    setVerifyDeleteAccount(e.target.value);
  };

  const [isModalDeleteAccountOpen, setIsModalDeleteAccountOpen] =
    useState(false);

  const handleDeleteAccountOk = () => {
    setIsModalDeleteAccountOpen(false);
  };
  const pressDeleteAccountVerify = () => {
    let sauser_accessToken = localStorage.getItem("sauser_accessToken");
    const getObject = {
      confirmDeleteUserAccount: {
        sauser_accessToken: sauser_accessToken,
        email: emailDeleteAccount,
        emailVerificationCode: verifyDeleteAccount,
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
  const [codeDeleteAccountMatch, setCodeDeleteAccountMatch] = useState(false);
  // OTP 驗證成功
  // const otpVerify = await fetchOtpFromBackend(); // 替換為實際的 API 調用
  useEffect(() => {
    let timeoutId; // 用於儲存 setTimeout 的 ID
    if (confirmDeleteUserAccount === "success") {
      setErrStrArray([]);
      setErrStrArray((prev) => [
        ...prev,
        globalstate === "en" ? "Delete successfully." : "刪除成功",
      ]);
      setIsModalOpen(true);
      setOpen(false);
      setNewEmail("");
      setDeleteUserID("fail");
      setVerify("");
      // 刪除Token 記錄嗎?
      localStorage.removeItem("pageState");
      localStorage.removeItem("userProfile");
      localStorage.removeItem("sauser_refreshToken");
      localStorage.removeItem("sauser_accessToken");
      setDeleteUserID("init");
      // 回到原來未登入的狀態
      setIsLogin("init");
      setActiveScreen("loginScreen");
      setConfirmDeleteUserAccount("init");
      // 依賴改變了就會觸發login裡面的useEffect
      // 要延遲一段時間不然狀態 state 不會改變
      timeoutId = setTimeout(() => {
        navigate("/", { replace: true });
        // 進行更新, 這個是有順序的
        setLogout(uuidv4());
      }, 10);
    } else if (
      refreshToken === "success" &&
      confirmDeleteUserAccount === "tokenHasExpired"
    ) {
      let sauser_accessToken = localStorage.getItem("sauser_accessToken");
      const getObject = {
        confirmDeleteUserAccount: {
          sauser_accessToken: sauser_accessToken,
          email: emailDeleteAccount,
          emailVerificationCode: verifyDeleteAccount,
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
    } else if (confirmDeleteUserAccount === "tokenHasExpired") {
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
    } else if (confirmDeleteUserAccount === "fail") {
      // OTP 驗證失敗
      setConfirmDeleteUserAccount("init");
      setIsModalDeleteAccountOpen(true);
    }
    return () => {
      clearTimeout(timeoutId); // 清除定時器
    };
  }, [confirmDeleteUserAccount, refreshToken]);
  //!DeleteAccount email Otp verify end

  useEffect(() => {
    document.body.style.backgroundImage = "none";
    document.body.style.backgroundColor = BACKGROUND_COLOR;
    if (updateUserProfile === "init") {
      return;
    }

    // 處理各種狀態
    if (updateUserProfile === "success") {
      console.log("success");
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

      console.log("Data sent successfully");

      setOpen(false);
      setCurrentScreen("dashboardScreen");

      let p = { currentScreen: "dashboardScreen" };
      sessionStorage.setItem("sauser_currentScreen", JSON.stringify(p));

      if (currentScreen !== "dashboardScreen") {
        // 存路由
        const stateData = {
          activeScreen: "menuScreen",
          currentScreen: "dashboardScreen",
        };
        const title = ""; // 页面标题（可选）
        const encodedData = encodeURIComponent(JSON.stringify(stateData));
        const newUrl = `/?data=${encodedData}`; // 新的 URL（可选） 這個會改變名稱
        window.history.pushState(stateData, title, newUrl);
      }
      setUpdateUserProfile("init");
      setCodeMatch(false);
    }

    //refresh
    if (updateUserProfile === "tokenHasExpired") {
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
    //重新傳
    if (refreshToken === "success" && updateUserProfile === "tokenHasExpired") {
      //!發送資料到後端
      // Initialize state
      const sauser_accessToken = localStorage.getItem("sauser_accessToken");
      // Create inputObject to collect user data
      const filteredProfile = Object.fromEntries(
        Object.entries({
          sauser_accessToken: sauser_accessToken,

          firstName:
            firstName !== userProfile.firstName ? firstName : undefined,
          lastName: lastName !== userProfile.lastName ? lastName : undefined,
          birthday:
            date.format("MM/DD/YYYY") !== userProfile.birthday
              ? date.format("MM/DD/YYYY")
              : undefined,
          gender: genderValue !== userProfile.gender ? genderValue : undefined,
          //   !!units更正ds972錯誤
          units:
            isMetric !== userProfile.units ? isMetric.toString() : undefined,

          //當 isMetric 是 false 時：直接返回 null，表示不使用公制單位，跳過所有處理。
          //當 isMetric 是 true 時：
          //如果 userProfile.cm 不存在（例如 null），返回 parseInt(cm)。
          //如果 userProfile.cm 存在：
          //如果 parseInt(cm) 與 userProfile.cm 不同，返回 parseInt(cm)（新的值）。
          //如果兩者相同，返回 undefined（表示值未改變）。
          //?英制則相反
          cm: isMetric
            ? userProfile.cm
              ? heightValue !== userProfile.cm
                ? heightValue
                : undefined
              : heightValue
            : null,
          //   feet: !isMetric
          //   ? userProfile.feet
          //     ? feet !== userProfile.feet
          //       ? feet
          //       : undefined
          //     : feet
          //   : null,
          inch: !isMetric
            ? userProfile.inch
              ? heightValue !== userProfile.inch
                ? heightValue
                : undefined
              : heightValue
            : null,
          kg: isMetric
            ? userProfile.kg
              ? weightValue !== userProfile.kg
                ? weightValue
                : undefined
              : weightValue
            : null,
          lb: !isMetric
            ? userProfile.lb
              ? weightValue !== userProfile.lb
                ? weightValue
                : undefined
              : weightValue
            : null,

          email:
            newEmail !== userProfile.email && newEmail !== ""
              ? newEmail
              : undefined,
        }).filter(([_, value]) => value !== undefined),
      );

      // 沒有填的不用送

      // 如果你仍需要這一步，雖然現在可能不需要了

      // Handle avatar file list if provided
      // console.log("fileList.length = ", fileList.length);
      if (previewImage && previewImage.length > 0) {
        filteredProfile.avatar = JSON.stringify(previewImage); // Store avatar file list if it exists
        console.log();
      }
      if (verify && verify.length > 0) {
        filteredProfile.emailVerificationCode = verify; // Store avatar file list if it exists
        console.log();
      }
      // Add Google subscription backup if available
      if (googleSubBackup) {
        filteredProfile.googleSub = googleSubBackup;
      }
      const updateObject =
        Object.keys(filteredProfile).length > 0
          ? { updateUserProfile: filteredProfile }
          : {};
      // Uncomment this line if you want to add Instagram subscription backup
      // if (instagramSubBackup) inputObject.instagramSub = instagramSubBackup;

      console.log("updateObject = ", updateObject);

      // Retrieve access token from local storage

      // console.log('sauser_accessToken = ', sauser_accessToken)
      if (ws) {
        try {
          setIsClickOpCode(true);
          ws.send(JSON.stringify(updateObject));

          console.log("success");
        } catch (error) {
          console.error("Error sending data:", error);
        }
      } else {
        console.error("WebSocket is not initialized");
      }
      //傳給logweight
      const dataJson = JSON.stringify({
        addNewWeight: {
          sauser_accessToken: sauser_accessToken,
          weight: isMetric
            ? weightValue !== userProfile.kg
              ? weightValue
              : undefined
            : weightValue !== userProfile.lb
              ? weightValue
              : undefined,
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
      //跟menu說要換大頭照和名字
      setRetSetUserProfileState(true);
    }
    // 在處理完狀態後，設置一個定時器來重置狀態
    const timer = setTimeout(() => {
      setUpdateUserProfile((prevState) => ({ ...prevState, status: "init" }));
    }, 3000); // 這裡的延遲時間應與導航到登入頁面的時間一致

    // 清理函數
    return () => clearTimeout(timer);
  }, [updateUserProfile, setUpdateUserProfile, refreshToken]);
  //每次update後羹冬getuser
  useEffect(() => {
    if (retSetUserProfileState === true) {
      let sauser_accessToken = localStorage.getItem("sauser_accessToken");
      const inputObject = {
        getUserProfile: { sauser_accessToken: sauser_accessToken },
      };

      if (ws) {
        try {
          setIsClickOpCode(true);
          ws.send(JSON.stringify(inputObject));
          console.log("success");
        } catch (error) {
          console.error("Error sending data:", error);
        }
      } else {
        console.error("WebSocket is not initialized");
      }
    }
  }, [retSetUserProfileState]);
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

          console.log("success");
        } catch (error) {
          console.error("Error sending data:", error);
        }
      } else {
        console.error("WebSocket is not initialized");
      }
    }
  }, [userProfile, refreshToken]);
  return (
    <div className="relative">
      {currentSub1Screen === "changePhotoScreen" && (
        <UploadFiles
          setPreviewImage={setPreviewImage}
          previewImage={previewImage}
        />
      )}

      <Modal
        title={
          <div style={{ color: ORANGE_COLOR, fontSize: "14rem" }} className=" ">
            Warning
          </div>
        }
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        // 使用footer定義按鍵
        footer={[
          <Button key="submit" type="primary" onClick={handleOk} className=" ">
            {t.ok}
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

      <div
        // ref={elementRef}
        style={{
          paddingTop: "70rem", // 這個要固定值不可以加scaleV否則內容改變外框卻不變
          // height: "calc(100dvh - 5rem)", // 這個height可能要有
          width: "100dvw",

          //   height: "100dvh",
          // 操作符(+,-,*,/) 要有空格不然計算會錯誤
          //   overflow: "scroll",
        }}
        className="h-[667rem]"
      >
        {/* <div>
    <div className=" text-[20rem]">
      <input
        type="number"
        value={heightValue}
        onChange={handleHeightInput}
        placeholder="Enter height"
        className="w-[100rem] text-[20rem]"
      />
    Height: {heightValue} {heightIsMetric ? 'cm' : 'in'}
    </div>
    <div className=" text-[20rem]">
      <input
        type="number"
        value={weightValue}
        onChange={handleWeightInput}
        placeholder="Enter weight"
        className="w-[100rem] text-[20rem]"
      />
     Weight: {weightValue} {weightIsMetric ? 'kg' : 'lbs'}
    </div>
    <button onClick={handleToggle} className="w-[100rem] text-[20rem]">
      Switch
    </button>
  </div> */}
        <div
          style={{
            //   position: "absolute",
            color: DARKGRAY_COLOR,

            fontSize: "16rem",
            textAlign: "center",
            // zIndex: 0,
            backgroundColor: BACKGROUND_COLOR,
            fontSize: "14rem",
          }}
          className="flex flex-col items-center justify-center "
        >
          {/* <div> imageUrl = {imageUrl} </div> */}

          <Row
            justify={"center"}
            style={{ color: MAIN_COLOR, marginTop: "6.1rem" }}
          >
            <Col className="h-[27rem] text-[20rem] font-bold leading-[18rem] ">
              {" "}
              {globalstate === "en" ? (
                <span>Account Details</span>
              ) : (
                <span className="font-['Open_Sans']">我的資料</span>
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
          <Row
            justify={"center"}
            style={{ marginTop: "12rem" }}
            className="relative flex-col"
          >
            <Col>
              {" "}
              <div className="h-[23.7rem] text-[calc(16rem)] font-semibold">
                {globalstate === "en" ? (
                  <div> {"EMAIL"}</div>
                ) : (
                  <div className="font-['Open_Sans'] ">信箱</div>
                )}
              </div>
              <div>
                {" "}
                <Input
                  value={codeMatch ? newEmail : email}
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
              </div>
              <div style={{ marginTop: "5rem" }}>
                <button
                  variant="borderless"
                  style={{
                    textAlign: "center",
                    lineHeight: "16rem",
                    width: "calc(100rem )",
                    height: "calc(32rem )",
                    border:
                      codeMatch || userProfile.email !== ""
                        ? "2rem solid #FF7F30"
                        : `2rem solid ${MAIN_COLOR}`,
                    fontSize: "calc(14rem )",
                    color:
                      codeMatch || userProfile.email !== ""
                        ? "#FF7F30"
                        : MAIN_COLOR,
                  }}
                  className={`font-bold ${styles.signUpInputBigFrame}`}
                  onClick={sendNewEmailPageButton}
                >
                  {codeMatch || userProfile.email !== "" ? "變更" : "驗證"}
                </button>
              </div>
            </Col>
            {codeMatch || userProfile.email !== "" ? (
              <Col className="absolute left-[-30rem] top-[32rem]">
                <Icon_check style={{ color: "#80C342" }} />
              </Col>
            ) : (
              ""
            )}
          </Row>
          {sendNewEmailPage && (
            <div className="slide-in-from-bottom-no-width   flex h-dvh w-full flex-col items-center ">
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
                        <span> Email Verify</span>
                      ) : (
                        <span className="font-['Open_Sans']">驗證信箱</span>
                      )}
                    </div>
                    <div className="mb-[20rem] mt-[20rem] text-[16rem]"></div>
                    <div className="text-[16rem]">
                      {globalstate === "en" ? (
                        <span>Please Enter New Email</span>
                      ) : (
                        <span className="font-['Open_Sans']">請輸入新信箱</span>
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
                          value={newEmail}
                          onChange={changeNewEmail}
                          className="b h-dvh w-full bg-transparent text-center
                      "
                        />
                      </div>
                    </section>
                    <section className="mb-[25.5rem] mt-[22rem] flex justify-center">
                      <div
                        style={{
                          background: `linear-gradient(to top, #80c342, #bae642)`,
                          lineHeight: "1rem",
                        }}
                        className="flex h-[49rem] w-[207rem] items-center justify-center border-[2rem] border-white text-[20rem] font-bold text-white"
                        onClick={pressNewSend}
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
            <div className="slide-in-from-bottom-no-width   flex h-dvh w-full flex-col items-center ">
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
                        <span className="font-['Open_Sans']">驗證OTP</span>
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
                          className="b h-dvh w-full bg-transparent text-center
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
                        className="flex h-[49rem] w-[207rem] items-center justify-center border-[2rem] border-white text-[20rem] font-bold text-white"
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
          <style jsx="true">
            {`
              .noneCenter {
                justify-content: start !important;
                align-items: flex-start !important;
              }
            `}
          </style>
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
              .custom-picker .ant-picker-input > input {
                font-size: 14rem; /* 输入框文字大小 */
                color: "#333f48";
                font-weight: 500;
              }
              /* 通过类名覆盖图标样式 */
              .custom-picker .ant-picker-suffix {
                font-size: 14rem; /* 改变图标大小 */
              }
            `}</style>
            {/* Ant Design DatePicker with hidden input */}
            <div className="datepicker-till-now">
              <DatePicker
                inputFontSizeLG
                defaultValue={date}
                format={customFormat}
                needConfirm
                open={open}
                onChange={handleDateSelect}
                onClick={() => setOpen(true)}
                className="custom-picker  "
                popupPlacement="bottomLeft"
                getPopupContainer={(trigger) => trigger.parentElement}
                popupStyle={{
                  position: "absolute",
                  // 確保不會超出視窗

                  overflow: "auto",
                }}
                style={{
                  width: "calc(263rem)",
                  height: "calc(42rem)",
                  textAlign: "center",
                  width: "calc(263rem)",
                  height: "calc(42rem)",
                  border: `2rem solid ${MAIN_COLOR}`,
                  borderRadius: 0,
                }}
              />
            </div>
            <style jsx="true">{`
              .zIdex {
                z-index: 1000 !important ;
                /* 隱藏圖標 */
              }

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
                <div className="flex  w-[263rem]  justify-center">
                  <Select.Root
                    value={genderValue}
                    onValueChange={setGenderValue}
                  >
                    <Select.Trigger
                      className="relative flex  w-full items-center justify-center rounded-md border border-[2rem] border-mainColor  bg-white px-4 py-2 text-[16rem] text-[#000000] hover:bg-gray-50  focus:outline-none  focus:ring-[#84BD00]"
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
                        className=" flex  justify-center"
                      />
                      <div className="">
                        <Select.Icon className=" ">
                          <CaretDownOutlined className=" mb-[10rem] mt-[10rem] h-[20rem] w-[0rem] text-transparent" />
                        </Select.Icon>
                      </div>
                    </Select.Trigger>

                    <Select.Portal>
                      <Select.Content
                        className="overflow-hidden rounded-md border border-gray-200 bg-white shadow-lg"
                        position="popper"
                        sideOffset={5}
                      >
                        <Select.ScrollUpButton className="flex h-[60rem] cursor-default items-center justify-center bg-white text-gray-500"></Select.ScrollUpButton>

                        <Select.Viewport className="w-[263rem] p-1">
                          <Select.Group>
                            <SelectItem value="male">
                              {globalstate === "en" ? (
                                <span className="pb-[2rem] pt-[2rem] text-[14rem]">
                                  {" "}
                                  Male
                                </span>
                              ) : (
                                <span className="pb-[2rem] pt-[2rem] font-['Open_Sans'] text-[14rem]">
                                  先生
                                </span>
                              )}
                            </SelectItem>
                            <SelectItem value="female">
                              {globalstate === "en" ? (
                                <span className="pb-[2rem] pt-[2rem] text-[14rem]">
                                  {" "}
                                  Female
                                </span>
                              ) : (
                                <span className="pb-[2rem] pt-[2rem] font-['Open_Sans'] text-[14rem]">
                                  女士
                                </span>
                              )}
                            </SelectItem>
                            <SelectItem value="genderqueer">
                              {globalstate === "en" ? (
                                <span className="pb-[2rem] pt-[2rem] text-[14rem]">
                                  Undisclosed
                                </span>
                              ) : (
                                <span className="pb-[2rem] pt-[2rem] font-['Open_Sans'] text-[14rem]">
                                  不透露
                                </span>
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
                className={isMetric ? styles.signUpUnits : "none"}
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
                className={isMetric ? "none" : styles.signUpUnits}
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
                    <span> {isMetric ? "cm" : "in"}</span>
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
                  placeholder={"60"}
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
                    <span> {isMetric ? "kg" : "lbs"}</span>
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
          {/* 到這裡跟setting一樣 */}

          {/* 分割線 */}
          <div
            style={{
              marginBottom: "11.3rem",

              width: "327rem",
              borderBottom: "1rem solid  #97989A ",
              height: "31.03rem",
              textAlign: "center",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          ></div>

          <Row justify={"center"} style={{}}>
            <Col
              className="text-[20rem]  font-bold  text-mainColor"
              style={{ lineHeight: "18rem", height: "27rem" }}
            >
              {" "}
              {globalstate === "en" ? (
                <span> {"Profile Photo"}</span>
              ) : (
                <span className="font-['Open_Sans']">頭像</span>
              )}
            </Col>
          </Row>

          <Row justify={"center"} align={"middle"}>
            <Col
              style={{
                width: "150rem",
                height: "150rem",
                border: `2rem solid ${MAIN_COLOR}`,
              }}
              className="flex items-center justify-center "
            >
              <div
                style={{
                  width: "119rem",
                  height: "119rem",
                  borderRadius: "50%",
                  overflow: "hidden",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                className="flex"
              >
                {previewImage ? (
                  <div className="h-[166rem] w-[263rem]">
                    <img
                      src={previewImage}
                      alt="Preview"
                      className="w-full object-cover"
                    />
                  </div>
                ) : userProfile.avatarUrl !== "" ? (
                  <img
                    src={userProfile.avatarUrl}
                    alt="Preview"
                    className="w-full object-cover"
                  />
                ) : (
                  <Icon_Avatar
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                )}
              </div>
            </Col>
          </Row>
          <Row justify={"center"}>
            <div
              className="text-[12rem] font-semibold "
              style={{
                lineHeight: "33.18rem",
                color: "8B8B8E",
                height: "21.45rem",
                textDecoration: "none",
              }}
              onClick={changePhotoClick}
            >
              {globalstate === "en" ? (
                <span> Change Photo</span>
              ) : (
                <span className="font-['Open_Sans']">更換頭像</span>
              )}
            </div>
          </Row>

          {/* 分割線 */}
          <div
            style={{
              marginBottom: "15.3rem",

              width: "327rem",
              borderBottom: "1rem solid  #97989A ",
              height: "15.5rem",
              textAlign: "center",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          ></div>

          <Row justify={"center"} style={{ marginTop: "28.5rem" }}>
            <Col
              className="text-[20rem] font-bold"
              style={{
                // 具有漸層色背景
                // backgroundColor: '#0f0',
                background: `linear-gradient(to top left, #80c342, #bae642)`,
                width: "188.96rem",
                height: "38.49rem",
                border: `2rem solid #fff`,
                color: "#fff",
                lineHeight: "38.18rem",
                fontSize: "20rem",
                letterSpacing: "1.2rem",
              }}
              onClick={pressSaveChanges}
            >
              {globalstate === "en" ? (
                <span> {"SAVE CHANGES"}</span>
              ) : (
                <span className="font-['Open_Sans']">儲存變更</span>
              )}
            </Col>
          </Row>

          <Row
            justify={"center"}
            style={{ marginTop: "26.5rem", marginBottom: "12.7rem" }}
          >
            <Col
              style={{
                marginBottom: "32.8rem",
                lineHeight: "12rem",
                height: "16rem",
              }}
              className="text-[12rem] font-semibold"
              onClick={deleteAccountPageClick}
            >
              {globalstate === "en" ? (
                <span> {"DELETE ACCOUNT"}</span>
              ) : (
                <span className="font-['Open_Sans']">刪除帳號</span>
              )}
            </Col>
          </Row>
        </div>
      </div>
      {deleteAccountOtpPage && (
        <div
          //   onTouchMove={handlePinch}
          className=" slide-in-from-bottom flex h-dvh w-screen  "
          //   style={{  position:' fixed',
          //     zIndex: 100}}
        >
          <Modal
            title={tOTP.title}
            open={isModalDeleteAccountOpen}
            onOk={handleDeleteAccountOk}
            onCancel={handleDeleteAccountOk} // 修改 onCancel 事件為 handleOk
            // 修改 OK 按鈕文字
            okText={tOTP.ok}
            cancelText="  " // 隱藏 Cancel 按鈕
            cancelButtonProps={{
              style: {
                borderColor: "transparent", // 修改 Cancel 按鈕的邊框顏色
              },
            }}
          ></Modal>
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
                      <span> Verify Email</span>
                    ) : (
                      <span className="font-['Open_Sans']">驗證信箱</span>
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
                      value={emailDeleteAccount}
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
                      onChange={emailDeleteAccountOnChange}
                      disabled={codeDeleteAccountMatch}
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
                        codeDeleteAccountMatch === true
                          ? "linear-gradient(to bottom, #80c342, #bae642)"
                          : sendDeleteAccountAfterFiveMinutes
                            ? "linear-gradient(to bottom,  #FF7F30,#FFB745  )"
                            : emailDeleteAccountVerifyOpen
                              ? "linear-gradient(to bottom, #A9AAAB, #97989A)"
                              : "linear-gradient(to bottom,  #FF7F30,#FFB745  )",

                      border: "transparent",
                    }}
                    disabled={codeDeleteAccountMatch}
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
                    onClick={pressSendDeleteAccount}
                  >
                    {/* //! 當send後 改成‘還沒收到再傳一次’ */}
                    <div className="text-[20rem] font-bold leading-[33rem]">
                      {globalstate === "en" ? (
                        <span>
                          {" "}
                          {sendDeleteAccountAfterFiveMinutes
                            ? "RESEND"
                            : emailDeleteAccountVerifyOpen
                              ? "SENT"
                              : "SEND"}
                        </span>
                      ) : (
                        <span className="font-['Open_Sans']">
                          {sendDeleteAccountAfterFiveMinutes
                            ? "重新傳送"
                            : emailDeleteAccountVerifyOpen
                              ? "SENT"
                              : "傳送"}
                        </span>
                      )}
                    </div>
                  </Col>
                </Row>

                {emailDeleteAccountVerifyOpen && (
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
                              value={verifyDeleteAccount}
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
                              onChange={verificationDeleteAccountOnChange}
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
                            onResend={backToSendDeleteNewEmailPage}
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
                            onClick={pressDeleteAccountVerify}
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
        </div>
      )}
    </div>
  );
}

// SelectItem 子組件
const SelectItem = React.forwardRef(
  ({ children, className, ...props }, forwardedRef) => {
    return (
      <Select.Item
        className="relative flex cursor-default select-none   items-center justify-center rounded-md px-6 py-2 text-[16rem] text-[#000000] hover:bg-[#d3d3d34C] focus:bg-[#d3d3d34C] focus:outline-none data-[highlighted]:bg-[#d3d3d34C] "
        {...props}
        ref={forwardedRef}
      >
        <Select.ItemText>{children}</Select.ItemText>
        <Select.ItemIndicator className="absolute left-1 inline-flex items-center"></Select.ItemIndicator>
      </Select.Item>
    );
  },
);

SelectItem.displayName = "SelectItem";

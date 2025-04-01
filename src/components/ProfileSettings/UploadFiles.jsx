import React, { useContext, useEffect, useState, useRef } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Upload, Progress, Image, Modal } from "antd";
import Icon_UploadDefault from "@/assets/icons/UploadDefault.svg?react";
import Icon_PhotoDefault from "@/assets/icons/PhotoDefault.svg?react";
import { GlobalStateContext } from "@/App";
import { Content } from "@/App";
import {
    BACKGROUND_COLOR,
    DARKBLACK_COLOR,
    DARKGRAY_COLOR,
    MAIN_COLOR,
  } from "@/constants";
export default function UploadFiles({
 
  previewImage,
  setPreviewImage,
}) {
  const {
    //
    activeScreen,
    setActiveScreen,

    // Connect
    currentScreen,
    setCurrentScreen,
    currentSub1Screen,
    setCurrentSub1Screen,
    connectState,
    setConnectState,
  } = useContext(Content);
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
    document.body.style.backgroundImage = "none";
    document.body.style.backgroundColor = BACKGROUND_COLOR;


    document.body.style.userSelect = "none";
  }, []);
  const { globalstate } = useContext(GlobalStateContext);
  const [progress, setProgress] = useState(0);
  const [showProgress, setShowProgress] = useState(false);
  const [fileSize, setFileSize] = useState(null);

  const [fileName, setFileName] = useState(null);
  const [fileUploaded, setFileUploaded] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [isFileValid, setIsFileValid] = useState(true); // Track file validity

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const uploadCancelClick = () => {

    setPreviewImage(null);
    setCurrentScreen("profileSettingsScreen");
    setCurrentSub1Screen("");
    let p = { currentScreen: "profileSettingsScreen" , currentSub1Screen:""};
    sessionStorage.setItem("sauser_currentScreen", JSON.stringify(p));

    if (currentScreen !== "profileSettingsScreen") {
      // 存路由
      const stateData = {
        activeScreen: "menuScreen",
        currentScreen: "profileSettingsScreen",
        currentSub1Screen:""
      };
      const title = ""; // 页面标题（可选）
      const encodedData = encodeURIComponent(JSON.stringify(stateData));
      const newUrl = `/?data=${encodedData}`; // 新的 URL（可选） 這個會改變名稱
      window.history.pushState(stateData, title, newUrl);
    }
  };

  const uploadDoneClick = () => {
    if (!isFileValid) {
      setModalVisible(true); // Show modal if the file is invalid
      return;
    }
    setCurrentScreen("profileSettingsScreen");
    setCurrentSub1Screen("");
    let p = { currentScreen: "profileSettingsScreen" , currentSub1Screen:""};
    sessionStorage.setItem("sauser_currentScreen", JSON.stringify(p));

    if (currentScreen !== "profileSettingsScreen") {
      // 存路由
      const stateData = {
        activeScreen: "menuScreen",
        currentScreen: "profileSettingsScreen",
        currentSub1Screen:""
      };
      const title = ""; // 页面标题（可选）
      const encodedData = encodeURIComponent(JSON.stringify(stateData));
      const newUrl = `/?data=${encodedData}`; // 新的 URL（可选） 這個會改變名稱
      window.history.pushState(stateData, title, newUrl);
    }
  };

  const handleModalOk = () => {
    setModalVisible(false);
    
  };

  const props = {
    action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
    beforeUpload: (file) => {
      const isJpgOrPng =
        file.type === "image/jpeg" || file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJpgOrPng || !isLt2M) {
        setIsFileValid(false); // Set validity to false if conditions are not met
        setModalVisible(true); // Show modal for invalid files
        return Upload.LIST_IGNORE;
      }
      setIsFileValid(true); // Set validity to true if conditions are met
      return true;
    },
    onChange({ file }) {
      if (file.status !== "uploading") {
        if (file.status === "done" || file.status === "error") {
          setShowProgress(false);
        }
      }
      if (file.originFileObj) {
        setFileSize(formatFileSize(file.originFileObj.size));
        setFileName(file.name);
        setFileUploaded(true);
        const reader = new FileReader();
        reader.onload = (e) => {
          setPreviewImage(e.target.result);
        };
        reader.readAsDataURL(file.originFileObj);
      }
    },
    onProgress({ percent }) {
      setProgress(Math.round(percent));
      setShowProgress(true);
    },
    showUploadList: false,
  };

  const uploadButton = (
    <Button icon={<Icon_UploadDefault />} className="h-[166rem] w-[263rem]">
      &nbsp;
    </Button>
  );
  console.log(previewImage);
  const translations = {
    en: {
      title: "Upload Error",
      message: "Are you sure you want to go back?",
      subMessage: "The file must be a JPG/PNG and less than 2MB.",
      ok: "OK",
      cancel: "Cancel",
    },
    zh: {
      title: "上傳失敗",
      message: "您确定要返回嗎？",
      subMessage: "檔案必須為 JPG/PNG 格式，且大小不得超過 2MB。",
      ok: "確定",
      cancel: "取消",
    },
  };
  const t = translations[globalstate];

  return (
    <div className="slide-in-from-bottom flex h-dvh justify-center">
    <div className="text-[20rem] text-red-500">
      <div className="flex flex-col justify-center pt-[70rem]">
        <div
          className="flex h-[575rem] max-h-[calc((100dvh-140rem))] w-[351rem]  flex-col items-center overflow-auto  border-mainColor bg-[#efefef] text-darkColor "
          style={{ borderWidth: "3rem" }}
        >
          <div className="mb-[21.7rem] mt-[18.8rem] h-[20rem] text-[20rem] font-semibold">
            {globalstate === "en" ? (
              <span> UPLOAD PHOTO</span>
            ) : (
              <span className="font-['Open_Sans']">上傳照片</span>
            )}
          </div>
          <div>
      <div style={{ marginBottom: "34.2rem" }}>
        <Upload {...props}>
          {previewImage ? (
            <div className="h-[166rem] w-[263rem]">
              <Image
                src={previewImage}
                alt="Preview"
                className="w-full object-cover"
              />
            </div>
          ) : (
            uploadButton
          )}
        </Upload>
      </div>
      <div className="mb-[21.7rem]">
        {fileUploaded && (
          <div className="pt-[10rem] text-center">
            <Icon_PhotoDefault className="mr-[8rem] inline" />
            <div className="inline text-[12rem] font-bold italic">
              {fileName}
            </div>
          </div>
        )}
        <div className="flex justify-center">
          {showProgress && (
            <div className="mt-[16.6rem] w-[198rem] text-center">
              <Progress
                percent={progress}
                showInfo={false}
                size={{ width: "198rem", height: "6rem" }}
                strokeColor={"#84bd00"}
              />
              <div className="flex w-[198rem] justify-between">
                <div className="text-[10rem] font-medium italic leading-[30rem]">
                  {globalstate === "en" ? (
                    <span> Uploading...</span>
                  ) : (
                    <span className="font-['Open_Sans']">上傳中...</span>
                  )}
                  {progress}%
                </div>
                {fileSize && (
                  <div className="text-[10rem] font-medium italic leading-[30rem]">
                    {globalstate === "en" ? (
                      <span>File Size: </span>
                    ) : (
                      <span className="font-['Open_Sans']">檔案大小： </span>
                    )}
                    {fileSize}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      <section className="mb-[25.5rem] mt-[22rem] flex justify-center">
        <div
          style={{
            background: `linear-gradient(to top, #80c342, #bae642)`,
            lineHeight: "1rem",
          }}
          className="mr-[23rem] flex h-[49rem] w-[127rem] items-center justify-center border-[2rem] border-white bg-yellow-500 text-[20rem] font-bold text-white"
          onClick={uploadDoneClick}
        >
          {globalstate === "en" ? (
            <span> DONE</span>
          ) : (
            <span className="font-['Open_Sans']">完成</span>
          )}
        </div>
        <div
          style={{
            background: `linear-gradient(to top, #80c342, #bae642)`,
            lineHeight: "1rem",
          }}
          className="flex h-[49rem] w-[127rem] items-center justify-center border-[2rem] border-white text-[20rem] font-bold text-white"
          onClick={uploadCancelClick}
        >
          {globalstate === "en" ? (
            <span> CANCEL</span>
          ) : (
            <span className="font-['Open_Sans']">取消</span>
          )}
        </div>
      </section>
      <Modal
        title={t.title}
        open={modalVisible}
        onOk={handleModalOk}
        onCancel={handleModalOk}
        okText={t.ok}
        cancelText={t.cancel}
      >
        <p>{t.subMessage}</p>
      </Modal>
    </div>
        </div>
      </div>
    </div>
  </div>
 
  );
}

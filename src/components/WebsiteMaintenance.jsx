import React, { useContext, useEffect, useState } from "react";
import { GlobalStateContext } from "@/App";
import { Content } from "@/App";
import { useNavigate } from "react-router-dom";
import jstz from "jstz";
import { Checkbox } from "antd";
export default function WebsiteMaintenance({ goBackLogin }) {
  const [language, setLanguage] = useState("en");
  const { globalstate } = useContext(GlobalStateContext);
  const { setGlobalState } = useContext(GlobalStateContext);
  const navigate = useNavigate();
  const {
    ws,
    maintanceTime,

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
    formattedEndtime,
    formattedStarttime,
    // Connect
    isLogin,
    setIsLogin,
    isSupportLocalStorage,
    setIsSupportLocalStorage,
    socketio,
    setSocketio,
    connectState,
    setConnectState,
   

    //mac
    mac,
    setMac,
    macErr,
    setMacErr,
    //


    //
    rememberMe,
    setRememberMe,
    logout,
    setLogout,
    formatDate,
  } = useContext(Content);

  useEffect(() => {
    // Reset body styles
    document.body.style.backgroundImage = "none";
    document.body.style.backgroundColor = "white";
    document.body.style.userSelect = "none";

    // Detect browser language
    const browserLang = navigator.language || navigator.userLanguage;
    const initialLang = browserLang.startsWith("zh") ? "zh" : "en";
    setGlobalState(initialLang);
  }, []);

  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
    localStorage.setItem("maintenanceNotifier","dontShowAgain");
  };

  // console.log('User Timezone:', timezone.name());
  // console.log('Timezone Offset:', timezone.offset());

  return (
    <div className=" slide-in-from-bottom-no-width  h-dvh items-center ">
      <div className="text-[20rem] ">
        <div className="flex  h-dvh items-center   ">
          <div
            className="relative flex h-[262rem] max-h-[calc((100dvh-140rem))]  w-dvw  flex-col  overflow-auto  border-mainColor bg-[#efefef] text-darkColor "
            style={{ borderWidth: "3rem" }}
          >
            <div
              className="    flex h-[150rem] items-center justify-center pl-[20rem] pr-[20rem] text-[20rem] font-bold italic   leading-[24rem]"
              style={{ letterSpacing: "1rem" }}
            >
              {globalstate === "en" ? (
                <div>
                  Dear Valued Member, we sincerely apologize!
                  <br />
                  PowrPlus Website is under maintenance from{" "}
                  {formattedStarttime} to {formattedEndtime}
                </div>
              ) : (
                <div className="font-['Open_Sans']">
                  PowrPlus網頁於{formattedStarttime} ~ {formattedEndtime}
                  將進行維護，造成不便，敬請見諒！
                </div>
              )}
            </div>
            <div className="ml-[30rem]">
              <Checkbox onChange={onChange}>
                {" "}
                {globalstate === "en" ? (
                  <span> Do not show this again.</span>
                ) : (
                  <span className="font-['Open_Sans']">不再顯示</span>
                )}
              </Checkbox>
            </div>
            <section className="mb-[25.5rem] mt-[22rem] flex justify-center">
              <div
                style={{
                  background: `linear-gradient(to top, #80c342, #bae642)`,
                  lineHeight: "1rem",
                }}
                className="flex h-[49rem] w-[157rem] items-center justify-center border-[2rem] border-white text-[20rem] font-bold text-white"
                onClick={goBackLogin}
              >
                {globalstate === "en" ? (
                  <span> Ok</span>
                ) : (
                  <span className="font-['Open_Sans']">好的</span>
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
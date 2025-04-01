import React from "react";
import { useContext, useEffect, useState } from "react";
import { GlobalStateContext } from "@/App";
import styles from "@/css/local.module.css";
import { Content } from "@/App";
import {
  BACKGROUND_COLOR,
  DARKBLACK_COLOR,
  DARKGRAY_COLOR,
  MAIN_COLOR,
} from "@/constants";
export default function DeleteAccountPage({
  pressLogout,
  deleteAccountCancelClick,
}) {
  const { globalstate } = useContext(GlobalStateContext);
  const {
  
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
  } = useContext(Content);
  return (
    <div className=" flex h-dvh items-center justify-center slide-in-from-bottom">
      <div className="text-[20rem] ">
        <div className="flex flex-col justify-center pt-[70rem] ">
          <div
            className="flex h-[262rem] max-h-[calc((100dvh-140rem))] w-[351rem]  flex-col items-center overflow-auto  border-mainColor bg-[#efefef] text-darkColor "
            style={{ borderWidth: "3rem" }}
          >
            <div className="mt-[38.4rem] h-[100rem] w-[306rem] pl-[20rem] pr-[20rem] text-[20rem] font-bold  italic leading-[24rem]">
              {globalstate === "en" ? (
                <span>
                  {" "}
                  Please confirm you want to delete your account. THIS ACTION
                  CANNOT BE UNDONE!
                </span>
              ) : (
                <span className="font-['Open_Sans']">
                  您確定要刪除帳號嗎？這個動作將無法撤銷！
                </span>
              )}
            </div>
            <section className="mb-[25.5rem] mt-[22rem] flex justify-center">
              <div
                style={{
                  background: `#707070`,
                  lineHeight: "1rem",
                }}
                className="mr-[23rem] flex h-[49rem] w-[127rem] items-center justify-center border-[2rem] border-white bg-yellow-500 text-[20rem] font-bold text-white"
                onClick={pressLogout}
              >
                {globalstate === "en" ? (
                  <span> DELETE</span>
                ) : (
                  <span className="font-['Open_Sans']">刪除</span>
                )}
              </div>
              <div
                style={{
                  background: `linear-gradient(to top, #80c342, #bae642)`,
                  lineHeight: "1rem",
                }}
                className="flex h-[49rem] w-[127rem] items-center justify-center border-[2rem] border-white text-[20rem] font-bold text-white"
                onClick={deleteAccountCancelClick}
              >
                {globalstate === "en" ? (
                  <span> CANCEL</span>
                ) : (
                  <span className="font-['Open_Sans']">取消</span>
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

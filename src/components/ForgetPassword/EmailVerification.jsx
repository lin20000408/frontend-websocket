import React, { useState } from 'react';
import { Modal } from 'antd';
import { GlobalStateContext } from "@/App";
export default function EmailVerification({pressToLogin}) {
    const { globalstate } = useContext(GlobalStateContext);
  return (
    <>
      <div className="slide-in-from-bottom flex h-dvh items-center justify-center">
        <div className="text-[20rem] text-red-500">
          <div className="flex flex-col justify-center pt-[70rem] ">
            <div
              className="flex h-[262rem] max-h-[calc((100dvh-140rem))] w-[351rem]  flex-col items-center overflow-auto  border-mainColor bg-white text-darkColor "
              style={{ borderWidth: "3rem" }}
            >
              <div className="mt-[38.4rem] font-bold text-[20rem]" style={{letterSpacing:'1rem'}}>Email Verification</div>
              <div className="mt-[20rem] h-[105rem] w-[306rem] pl-[20rem] pr-[20rem] text-[20rem]  italic leading-[24rem]">
                
                {globalstate === "en" ? <span> The verification code has been sent to your registered Email.</span> : <span className="font-['Open_Sans']">驗證碼已傳送至您的信箱</span>}
              </div>
              <section className="mb-[25.5rem] mt-[22rem] flex justify-center">
                <div
                  style={{
                    background: `linear-gradient(to top, #80c342, #bae642)`,
                    lineHeight: "1rem",
                  }}
                  className="flex h-[49rem] w-[127rem] items-center justify-center border-[2rem] border-white text-[20rem] font-bold text-white"
                  onClick={pressToLogin}
                >
                  
                  {globalstate === "en" ? <span> OK</span> : <span className="font-['Open_Sans']">確定</span>}
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

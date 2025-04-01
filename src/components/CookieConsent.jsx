import React, { useState, useEffect, useContext } from "react";
import { GlobalStateContext } from "@/App";

import { Button } from "antd";
import { CookieConsentZh } from "@/components/i18n";
const CookieConsent = () => {
  const { globalstate } = useContext(GlobalStateContext);

  const [showConsent, setShowConsent] = useState(false);
  useEffect(() => {
    const consentGiven = localStorage.getItem("cookieConsent");
    if (!consentGiven) {
      setShowConsent(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "true");
    setShowConsent(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookieConsent", "true");
    setShowConsent(false);
    // 這裡可以添加額外的邏輯，例如禁用某些功能或跳轉到一個無cookie版本的網站
  };

  if (!showConsent) return null;

  return (
    <div
      className="fixed left-0 right-0 top-0   bg-white pl-[37.5rem] pr-[37.5rem] pt-[10rem] text-[10rem]"
      style={{ zIndex: "1050" }}
    >
      <div className="flex w-full flex-col justify-between">
        <div className="flex items-center">
          {globalstate === "en" ? (
            <>
              {" "}
              <p className="font-normal text-gray-700 dark:text-gray-400 mt-[5rem]">
                This website stores cookies on your computer. These cookies are
                used to collect information about how you interact with our
                website and allow us to remember you. We use this information in
                order to improve and customize your browsing experience and for
                analytics and metrics about our visitors both on this website
                and other media. To find out more about the cookies we use, see
                our Privacy Policy.
                <br />
                <br />
                If you decline, your information won’t be tracked when you visit
                this website. A single cookie will be used in your browser to
                remember your preference not to be tracked.
                <br />
                <br />
                SPORTSART HAS AN EXTENSIVE NETWORK OF DEALERS AND DISTRIBUTORS.
                WE CAUTION OUR WEBSITE VISITORS TO AVOID FRAUDULENT SITES. IF
                YOU EVER HAVE QUESTIONS ABOUT A RESELLER'S RELATIONSHIP WITH
                SPORTSART, PLEASE SUBMIT AN INQUIRY THROUGH OUR CONTACT PAGE.
              </p>
            </>
          ) : (
            <span className="font-['Open_Sans']">
              <CookieConsentZh />
            </span>
          )}
        </div>
        <div className="mb-[20rem] mt-[36rem] flex items-center justify-center text-[20rem]">
          <Button
            color="white"
            onClick={handleAccept}
            className=" flex h-[40rem] w-[78rem] items-center"
            style={{ backgroundColor: "#84BD00", borderRadius: 0 }}
          >
            <div className="text-[10rem]">
              {globalstate === "en" ? (
                <span className="text-[14rem]"> Accept</span>
              ) : (
                <span className="font-['Open_Sans'] text-[14rem]">接受</span>
              )}
            </div>
          </Button>
          <Button
            onClick={handleDecline}
            className="mr-2 flex h-[40rem] w-[78rem] items-center text-[#84BD00]  "
            style={{ border: "1rem #84BD00 solid" , borderRadius: 0 }}
          >
            <div className="text-[10rem]">
              {globalstate === "en" ? (
                <span className="text-[14rem]"> Decline</span>
              ) : (
                <span className="font-['Open_Sans'] text-[14rem]" >拒絕</span>
              )}
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;

import React from "react";
import { Content } from "@/App";
import { useEffect, useState, useContext, useRef } from "react";
import {
  BACKGROUND_COLOR,
  DARKBLACK_COLOR,
  DARKGRAY_COLOR,
  MAIN_COLOR,
  ORANGE_COLOR,
} from "@/constants";
import FilterActivity from "@/components/Results/Chart/FilterActivity";
import BarYear from "@/components/Results/Chart/Year/BarYear";
export default function CardioWattsGeneratedYear() {
  const {
    //
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

  useEffect(() => {
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
      setTimeout(() => {
        setActiveScreen("loginScreen");
      }, 10);
      return () => {};
    }

    if (connectState === "error") {
      console.log("Error (Login)");
      setConnectState("init");
      // 跳往error 畫面
      setTimeout(() => {
        // navigate("/wserror");
      });
      return () => {};
    }
  }, [connectState]);
  const data = [
    {
      type: "JAN",
      sales: 12,
    },
    { type: "FEB", sales: 12 },
    { type: "MAR", sales: 12 },
    { type: "APR", sales: 12 },
    { type: "MAY", sales: 12 },
    { type: "JUN", sales: 12 },
    { type: "JUL", sales: 12 },
    { type: "AUG", sales: 12 },
    { type: "SEP", sales: 12 },
    { type: "OCT", sales: 12 },
    { type: "NOV", sales: 12 },
    { type: "DEC", sales: 12 },
  ];
  const [chartProps, setChartProps] = useState({
    yTitle: "Hours",
    min: 0,
    max: 240,
    tickInterval: 10,
    color: "l(270) 0:rgba(0, 95, 113, 1) 1:rgba(56, 207, 235, 1)",
    xTitle:'2024',
  });
  const [filterActivity, setFilterActivity] = useState(false);

  const PressFilterActivity = () => {
    setFilterActivity(true);
  };
  //!從filterFromChild傳過來的filter篩選，等要去資料庫要資料時使用此函數
  const filterFromChild = (list) => {
    console.log("Received in parent:", list);
  };
  return (
    <>
    <div className="ml-[4%] mr-[4%] mt-[23rem] flex h-[53rem] justify-between">
            <div>
              <div className="h-[20rem] text-[16rem] font-bold text-darkColor ">
              Watts Generated
              </div>
              <div className="h-[20rem] text-[16rem] font-bold text-darkColor">
              Year
              </div>
            </div>
            <div
              className="h-[15rem] text-[11rem] text-[#53565A]"
              style={{ letterSpacing: "1rem" }}
              onClick={PressFilterActivity}
            >
              Filter by Activity
            </div>
          </div>
          <BarYear
            yTitle={chartProps.yTitle}
            min={chartProps.min} // 使用 useState 中的值
            max={chartProps.max} // 使用 useState 中的值
            tickInterval={chartProps.tickInterval} // 使用 useState 中的值
            color={chartProps.color}
            fill={chartProps.fill}
            data={data}
            xTitle={chartProps.xTitle} // 使用 useState 中的值
          />
 {filterActivity && (
          <div className="slide-in-from-bottom flex items-center justify-center">
            <FilterActivity
              filterActivity={filterActivity}
              setFilterActivity={setFilterActivity}
              filterFromChild={filterFromChild}
            />
          </div>
        )}
    </>
  );
}

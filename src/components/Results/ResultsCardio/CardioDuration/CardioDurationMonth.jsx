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
import BarMonth from "@/components/Results/Chart/Month/BarMonth";
import FilterActivity from "@/components/Results/Chart/FilterActivity";
export default function CardioDurationMonth() {
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
    { type: "1", sales: 1 },
    { type: "2", sales: 12 },
    { type: "3", sales: 12 },
    { type: "4", sales: 12 },
    { type: "5", sales: 1 },
    { type: "6", sales: 12 },
    { type: "7", sales: 12 },
    { type: "8", sales: 12 },
    { type: "9", sales: 12 },
    { type: "10", sales: 12 },
    { type: "11", sales: 12 },
    { type: "12", sales: 12 },
    { type: "13", sales: 12 },
    { type: "14", sales: 12 },
    { type: "15", sales: 12 },
    { type: "16", sales: 12 },
    { type: "17", sales: 12 },
    { type: "18", sales: 1 },
    { type: "19", sales: 12 },
    { type: "20", sales: 12 },
    { type: "21", sales: 12 },
    { type: "22", sales: 12 },
    { type: "23", sales: 12 },
    { type: "24", sales: 12 },
    { type: "25", sales: 12 },
    { type: "26", sales: 12 },
    { type: "27", sales: 12 },
    { type: "28", sales: 12 },
    { type: "29", sales: 12 },
    { type: "30", sales: 12 },
    { type: "31", sales: 12 },
  ];
  const [chartProps, setChartProps] = useState({
    yTitle: "Hours",
    min: 0,
    max: 24,
    tickInterval: 1,
   color: "l(270) 0:rgba(128, 195, 66, 1) 1:rgba(186, 230, 66, 1)",
    xTitle:'June 2024',
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
      <div className="bg-[#F5F5F5]">
        <div className="ml-[4%] mr-[4%] mt-[23rem] flex h-[53rem] justify-between">
          <div>
            <div className="h-[20rem] text-[16rem] font-bold text-darkColor ">
              Duration
            </div>
            <div className="h-[20rem] text-[16rem] font-bold text-darkColor">
            Month
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
        <div>
        <BarMonth
          yTitle={chartProps.yTitle}
          min={chartProps.min} // 使用 useState 中的值
          max={chartProps.max} // 使用 useState 中的值
          tickInterval={chartProps.tickInterval} // 使用 useState 中的值
          color={chartProps.color}
          fill={chartProps.fill}
          data={data}
          xTitle={chartProps.xTitle} // 使用 useState 中的值
        /></div>
        {filterActivity && (
          <div className="slide-in-from-bottom flex items-center justify-center">
            <FilterActivity
              filterActivity={filterActivity}
              setFilterActivity={setFilterActivity}
              filterFromChild={filterFromChild}
            />
          </div>
        )}
      </div>
    </>
  );
}

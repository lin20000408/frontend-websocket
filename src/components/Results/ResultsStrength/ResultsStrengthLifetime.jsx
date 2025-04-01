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
import GroupLifetime from "@/components/Results/Chart/Lifetime/GroupLifetime";
import StrengthFilterActivity from "@/components/Results/Chart/StrengthFilterActivity";
export default function ResultsStrengthLifetime() {
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
    { city: "2013", value: 12, type: "Facility Workout" },
    { city: "2014", value: 12, type: "Facility Workout" },
    { city: "2015", value: 12, type: "Facility Workout" },
    { city: "2016", value: 1, type: "Facility Workout" },
    { city: "2017", value: 12, type: "Facility Workout" },
    { city: "2018", value: 12, type: "Facility Workout" },
    { city: "2019", value: 1, type: "Facility Workout" },
    { city: "2020", value: 12, type: "Facility Workout" },
    { city: "2021", value: 12, type: "Facility Workout" },
    { city: "2022", value: 12, type: "Facility Workout" },
    { city: "2023", value: 12, type: "Facility Workout" },
    { city: "2024", value: 12, type: "Facility Workout" },
    { city: "2013", value: 12, type: "Workout Log" },
    { city: "2014", value: 12, type: "Workout Log" },
    { city: "2015", value: 12, type: "Workout Log" },
    { city: "2016", value: 1, type: "Workout Log" },
    { city: "2017", value: 12, type: "Workout Log" },
    { city: "2018", value: 12, type: "Workout Log" },
    { city: "2019", value: 1, type: "Workout Log" },
    { city: "2020", value: 12, type: "Workout Log" },
    { city: "2021", value: 12, type: "Workout Log" },
    { city: "2022", value: 12, type: "Workout Log" },
    { city: "2023", value: 12, type: "Workout Log" },
    { city: "2024", value: 12, type: "Workout Log" },
  ];
  const [chartProps, setChartProps] = useState({
    yTitle: "Hours",
    min: 0,
    max: 300,
    tickInterval: 10,

    xTitle: "May 1, 2023 - May 1, 2024",
    type2Color: "l(270)  0:rgba(8, 55, 160, 1) 1:rgba(15, 151, 240, 1)",
    type1Color: "l(270) 0:rgba(248, 97, 3, 1)  1:rgba(255, 147, 0, 1)",
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
    <div className="bg-[#F5F5F5]">
      <div className="ml-[4%] mr-[4%] mt-[23rem] flex h-[53rem] justify-between">
        <div>
          <div className="h-[20rem] text-[16rem] font-bold text-darkColor">
          Lifetime
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
      <GroupLifetime
        yTitle={chartProps.yTitle}
        min={chartProps.min} // 使用 useState 中的值
        max={chartProps.max} // 使用 useState 中的值
        tickInterval={chartProps.tickInterval} // 使用 useState 中的值
        color={chartProps.color}
        fill={chartProps.fill}
        tickCount={chartProps.tickCount}
        type2Color={chartProps.type2Color}
        type1Color={chartProps.type1Color}
        data={data}
        xTitle={chartProps.xTitle} // 使用 useState 中的值
      />
      {filterActivity && (
        <div className="slide-in-from-bottom flex items-center justify-center">
          <StrengthFilterActivity
            filterActivity={filterActivity}
            setFilterActivity={setFilterActivity}
            filterFromChild={filterFromChild}
          />
        </div>
      )}
    </div>
  );
}

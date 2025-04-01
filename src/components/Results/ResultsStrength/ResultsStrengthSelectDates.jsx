import React from "react";
import { Content } from "@/App";
import { useEffect, useState, useContext, useRef } from "react";
import styles from "@/css/local.module.css";
import {
  BACKGROUND_COLOR,
  DARKBLACK_COLOR,
  DARKGRAY_COLOR,
  MAIN_COLOR,
  ORANGE_COLOR,
} from "@/constants";
import { Calendar, Input, Modal } from "antd";
import GroupYear from "@/components/Results/Chart/Year/GroupYear";
import StrengthFilterActivity from "@/components/Results/Chart/StrengthFilterActivity";
export default function ResultsStrengthSelectDates() {
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
      city: "JAN",
      value: 12,
      type: "Facility Workout",
    },
    {
      city: "FEB",
      value: 0,
      type: "Facility Workout",
    },
    {
      city: "MAR",
      value: 12,
      type: "Facility Workout",
    },
    {
      city: "APR",
      value: 12,
      type: "Facility Workout",
    },
    {
      city: "MAY",
      value: 12,
      type: "Facility Workout",
    },
    {
      city: "JUN",
      value: 12,
      type: "Facility Workout",
    },
    {
      city: "JUL",
      value: 12,
      type: "Facility Workout",
    },
    {
      city: "AUG",
      value: 12,
      type: "Facility Workout",
    },
    {
      city: "SEP",
      value: 12,
      type: "Facility Workout",
    },
    {
      city: "OCT",
      value: 12,
      type: "Facility Workout",
    },
    {
      city: "NOV",
      value: 12,
      type: "Facility Workout",
    },
    {
      city: "DEC",
      value: 12,
      type: "Facility Workout",
    },
    {
      city: "JAN",
      value: 12,
      type: "Workout Log",
    },
    { city: "FEB", value: 12, type: "Workout Log" },
    { city: "MAR", value: 0, type: "Workout Log" },
    { city: "APR", value: 12, type: "Workout Log" },
    { city: "MAY", value: 0, type: "Workout Log" },
    { city: "JUN", value: 12, type: "Workout Log" },
    { city: "JUL", value: 12, type: "Workout Log" },
    { city: "AUG", value: 0, type: "Workout Log" },
    { city: "SEP", value: 12, type: "Workout Log" },
    { city: "OCT", value: 12, type: "Workout Log" },
    { city: "NOV", value: 12, type: "Workout Log" },
    { city: "DEC", value: 12, type: "Workout Log" },
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
  //Start
  const [dateStart, setDateStart] = useState(null);
  const [openStart, setOpenStart] = useState(false);
  const [selectDateStart, setSelectDateStart] = useState("08/07/1971");

  const handleDateSelectStart = (value) => {
    setDateStart(value);
    setOpenStart(false);
  };
  const changeSelectDateStart = (dateStart, dateStartString) => {
    console.log("changeSelectDate = ", dateStart, dateStartString);
    console.log("changeSelectDateString = ", dateStartString); // 08/07/1971
    setSelectDateStart(dateStartString);
  };
  //end
  const [dateEnd, setDateEnd] = useState(null);
  const [openEnd, setOpenEnd] = useState(false);
  const [selectDateEnd, setSelectDateEnd] = useState("08/07/1971");

  const handleDateSelectEnd = (value) => {
    setDateEnd(value);
    setOpenEnd(false);
  };
  const changeSelectDateEnd = (dateStart, dateStartString) => {
    console.log("changeSelectDate = ", dateStart, dateStartString);
    console.log("changeSelectDateString = ", dateStartString); // 08/07/1971
    setSelectDateEnd(dateStartString);
  };
  return (
    <>
    <div className="">
      <div className="" >
        {/* 選擇日期 */}
        <div className="flex justify-center">
          <div className=" mt-[8rem] flex w-[171rem] justify-between">
            <div>
              <div style={{ position: "relative" }}>
                <Input
                  value={dateStart ? dateStart.format("MM/DD/YYYY") : ""}
                  placeholder="Start&nbsp;Date"
                  readOnly
                  className={`${styles.signUpInputBigFrame} singUp `}
                  onClick={() => {
                    setOpenStart(!openStart);
                    changeSelectDateStart();
                  }}
                  style={{
                    width: "79rem",
                    height: "20rem",
                    color: "#84BD00 ",
                    fontSize: "11rem",
                    fontStyle: "italic",
                  }}
                />
                {openStart && (
                  <div style={{ position: "absolute", zIndex: 1 }}>
                    <Calendar
                      fullscreen={false}
                      onSelect={handleDateSelectStart}
                      style={{ width: "200rem" }}
                    />
                  </div>
                )}
              </div>
            </div>
            <div className=" text-[12rem]" style={{ color: MAIN_COLOR }}>
              -
            </div>
            <div>
              <div style={{ position: "relative" }}>
                <Input
                  value={dateEnd ? dateEnd.format("MM/DD/YYYY") : ""}
                  placeholder="End&nbsp;Date"
                  readOnly
                  className={`${styles.signUpInputBigFrame} singUp`}
                  onClick={() => {
                    setOpenEnd(!openEnd);
                    changeSelectDateEnd();
                  }}
                  style={{
                    width: "79rem",
                    height: "20rem",
                    color: "#84BD00 ",
                    fontSize: "11rem",
                    fontStyle: "italic",
                  }}
                />
                {openEnd && (
                  <div
                    style={{
                      position: "absolute",
                      zIndex: 1,
                      border: "1px solid green",
                      color: "#84BD00",
                    }}
                  >
                    <Calendar
                      style={{ width: "200rem" }}
                      fullscreen={false}
                      onSelect={handleDateSelectEnd}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* 選擇日期 */}
        <div className="ml-[4%] mr-[4%] mt-[23rem] flex h-[53rem] justify-between">
          <div>
           
            <div className="h-[20rem] text-[16rem] font-bold text-darkColor">
              Selected&nbsp;Dates
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
        <GroupYear
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
      </div>
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
  </>
  );
}

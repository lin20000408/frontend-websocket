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
import { Calendar, Input, Modal } from "antd";
import styles from "@/css/local.module.css";
import FilterActivity from "@/components/Results/Chart/FilterActivity";
import AreaYear from "@/components/Results/Chart/Year/AreaYear";

export default function CardioAverageHeartRateSelectDates() {
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
  const data = [
    { type: "", sales: 0 },
    {
      type: "JAN",
      sales: 12,
    },

    { type: "FEB", sales: 12 },
    { type: "MAR", sales: 0 },
    { type: "APR", sales: 12 },
    { type: "MAY", sales: 0 },
    { type: "JUN", sales: 12 },
    { type: "JUL", sales: 12 },
    { type: "AUG", sales: 0 },
    { type: "SEP", sales: 12 },
    { type: "OCT", sales: 12 },
    { type: "NOV", sales: 12 },
    { type: "DEC", sales: 12 },
    { type: " ", sales: 0 },
  ];
  const [chartProps, setChartProps] = useState({
    yTitle: "BPM",
    min: 0,
    max: 300,
    tickInterval: 20,

    fill: "l(270) 0:rgba(106, 0, 196, 1) 1:rgba(212, 69, 255, 1)",
    color: "rgba(106, 0, 196, 1) ",
    xTitle: "May 1, 2023 - May 1, 2024",
    tickCount: "13",
    end: 6,
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
      <div className="">
        <div className="">
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
              <div className="h-[20rem] text-[16rem] font-bold text-darkColor ">
                Average Heart Rate
              </div>
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
          <AreaYear
            yTitle={chartProps.yTitle}
            min={chartProps.min} // 使用 useState 中的值
            max={chartProps.max} // 使用 useState 中的值
            tickInterval={chartProps.tickInterval} // 使用 useState 中的值
            color={chartProps.color}
            fill={chartProps.fill}
            tickCount={chartProps.tickCount}
            data={data}
            xTitle={chartProps.xTitle} // 使用 useState 中的值
            end={chartProps.end}
          />
        </div>
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

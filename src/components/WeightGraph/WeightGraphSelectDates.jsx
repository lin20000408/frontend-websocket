import { useContext, useEffect, useState, useRef } from "react";
import { Area } from "@ant-design/plots";
import { Col, Row ,Input,Calendar} from "antd";
import { Content } from "@/App";
// css 的模組引入
import styles from "@/css/local.module.css";
import { BACKGROUND_COLOR, DARKBLACK_COLOR } from "@/constants";
import { NAVIBAR_SIZE } from "../../constants";
import AreaDashMonth from "@/components/Results/Chart/Month/AreaDashMonth";

export default function WeightGraphSelectDates() {
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
  const [chartProps, setChartProps] = useState({
    yTitle: "Hours",
    min: 0,
    max: 240,
    tickInterval: 10,
    fill: "l(270) 0:rgba(66, 195, 140, 1) 1:rgba(186, 255, 236, 1)",
    color: "rgba(66, 195, 140, 1)  ",
    xTitle: "June 2024",
    tickCount: 32,
    end: 11,
  });
  const data = [
    {
      year: "JAN",
      value: 12,
    },
    { year: "FEB", value: 12 },
    { year: "MAR", value: 12 },
    { year: "APR", value: 12 },
    { year: "MAY", value: 12 },
    { year: "JUN", value: 12 },
    { year: "JUL", value: 12 },
    { year: "AUG", value: 12 },
    { year: "SEP", value: 12 },
    { year: "OCT", value: 12 },
    { year: "NOV", value: 12 },
    { year: "DEC", value: 12 },
  ];
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
    <div className="bg-[#F5F5F5]">  {/* 選擇日期 */}
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
        <div className=" text-[12rem]" style={{ color: '#84BD00' }}>
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
      <Row justify={"space-between"} style={{ marginTop: "24rem" }}>
        <Col style={{ marginLeft: "10rem" }}> Selected Dates</Col>
        <Col style={{ marginRight: "10rem" }}>Body Weight</Col>
      </Row>
      <AreaDashMonth
        yTitle={chartProps.yTitle}
        min={chartProps.min} // 使用 useState 中的值
        max={chartProps.max} // 使用 useState 中的值
        tickInterval={chartProps.tickInterval} // 使用 useState 中的值
        color={chartProps.color}
        fill={chartProps.fill}
        tickCount={chartProps.tickCount}
        data={data}
        xTitle={chartProps.xTitle}
        end={chartProps.end}
      />
    </div>
  );
}

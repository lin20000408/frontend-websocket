import { useContext, useEffect, useState, useRef } from "react";
import { Area } from "@ant-design/plots";
import { Col, Row } from "antd";
import { Content } from "@/App";
// css 的模組引入
import styles from "@/css/local.module.css";
import { BACKGROUND_COLOR, DARKBLACK_COLOR } from "@/constants";
import { NAVIBAR_SIZE } from "../../constants";
import AreaDashMonth from "@/components/Results/Chart/Month/AreaDashMonth";

export default function WeightGraphMonth() {
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
    { year: "1", value: 1 },
    { year: "2", value: 12 },
    { year: "3", value: 12 },
    { year: "4", value: 12 },
    { year: "5", value: 1 },
    { year: "6", value: 12 },
    { year: "7", value: 12 },
    { year: "8", value: 12 },
    { year: "9", value: 12 },
    { year: "10", value: 12 },
    { year: "11", value: 12 },
    { year: "12", value: 12 },
    { year: "13", value: 12 },
    { year: "14", value: 12 },
    { year: "15", value: 12 },
    { year: "16", value: 12 },
    { year: "17", value: 12 },
    { year: "18", value: 1 },
    { year: "19", value: 12 },
    { year: "20", value: 12 },
    { year: "21", value: 12 },
    { year: "22", value: 12 },
    { year: "23", value: 12 },
    { year: "24", value: 12 },
    { year: "25", value: 12 },
    { year: "26", value: 12 },
    { year: "27", value: 12 },
    { year: "28", value: 12 },
    { year: "29", value: 12 },
    { year: "30", value: 12 },
    { year: "31", value: 200 },
  ];
  const [chartProps, setChartProps] = useState({
    yTitle: "Hours",
    min: 0,
    max: 240,
    tickInterval: 10,
    fill: "l(270) 0:rgba(66, 195, 140, 1) 1:rgba(186, 255, 236, 1)",
    color: "rgba(66, 195, 140, 1)  ",
    xTitle: "June 2024",
    tickCount: 32,
    end:30
  });
  return (
    <div className="bg-[#F5F5F5]">
      <Row justify={"space-between"} style={{ marginTop: "24rem" }}>
        <Col style={{ marginLeft: "10rem" }}>Month</Col>
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

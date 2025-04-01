import { useContext, useEffect, useState, useRef } from "react";

import { Col, Row } from "antd";

import { Content } from "@/App";
// css 的模組引入
import styles from "@/css/local.module.css";

import {
  BACKGROUND_COLOR,
  DARKBLACK_COLOR,
  DARKGRAY_COLOR,
  MAIN_COLOR,
} from "@/constants";
import LogCardioWorkout from "@/components/WorkoutLog/LogCardioWorkout";
import LogStrengthWorkout from "@/components/WorkoutLog/LogStrengthWorkout";
const WorkoutLog = () => {
  // 重新渲染背景
  useEffect(() => {
    document.body.style.backgroundImage = "none";
    document.body.style.backgroundColor = BACKGROUND_COLOR;
   

    document.body.style.userSelect = "none";
  }, []);

  const [logCardioState, setLogCardioState] = useState(true);
  const [logStrengthState, setLogStrengthState] = useState(false);

  const { scaleV } = useContext(Content);
  const elementRef = useRef(null);

  const [distanceToBottom, setDistanceToBottom] = useState(0);
  useEffect(() => {
    // 函数用于计算元素到视口底部的距离
    const calculateDistanceToBottom = () => {
      if (elementRef.current) {
        const elementRect = elementRef.current.getBoundingClientRect();
        const distance = window.innerHeight - elementRect.bottom;
        setDistanceToBottom(distance);
      }
    };
    // 初始化计算一次距离
    calculateDistanceToBottom();
  }, []);

  return (
    // overflow:visible 为了解决外部容器滚动条不随着子容器滚动而滚动的问题
    <div
      style={{
        overflow: "scroll",
    height: `calc(100dvh)`,
        zIndex: 0,
        backgroundColor: BACKGROUND_COLOR,
        fontSize: "14rem",
      }}
      className="w-screen pt-[70rem]"
    >
      <div
        style={{
          color: DARKGRAY_COLOR,

          fontSize: "16rem",
          textAlign: "center",
        }}
      >
        <Row justify={"center"}>
          <Col
            style={{ color: logCardioState ? MAIN_COLOR : DARKBLACK_COLOR }}
            className="text-[16rem]"
            onClick={() => {
              setLogCardioState(true);
              setLogStrengthState(false);
            }}
          >
            Log Cardio Workout
          </Col>

          <Col className={`${styles.workoutLogOrangeColor}  text-[16rem]`}>
            {" "}
            {"//"}
          </Col>
          <Col
            className="text-[16rem]"
            style={{ color: logStrengthState ? MAIN_COLOR : DARKBLACK_COLOR }}
            onClick={() => {
              setLogCardioState(false);
              setLogStrengthState(true);
            }}
          >
            Log Strenth Workout
          </Col>
        </Row>
        {logCardioState && <LogCardioWorkout />}
        {logStrengthState && <LogStrengthWorkout />}
      </div>
    </div>
  );
};
export default WorkoutLog;

// 有氧系統的即時值

// 組件

// 重力系統的即時值

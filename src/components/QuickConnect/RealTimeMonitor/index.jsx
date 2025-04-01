import React, { useEffect, useState, useContext, useRef } from "react";
import RealtimeStrength from '@/components/QuickConnect/RealTimeMonitor/RealtimeStrength'
import RealtimeCardio from '@/components/QuickConnect/RealTimeMonitor/RealtimeCardio'

import { Row, Col } from "antd";
import {
  BACKGROUND_COLOR,
  DARKBLACK_COLOR,
  DARKGRAY_COLOR,
  MAIN_COLOR,
  NAVIBAR_SIZE,
} from "@/constants";

import { useNavigate } from "react-router-dom";
import { Content } from "@/App";
// css 的模組引入
import styles from "@/css/local.module.css";

const RealTimeMonitor = (props) => {
  // 重新渲染背景
  useEffect(() => {
    document.body.style.backgroundImage = "none";
    document.body.style.backgroundColor = BACKGROUND_COLOR;

    document.body.style.userSelect = "none";
  }, []);

  // var isoDate = '2024-02-20T12:27:40.444Z';

  const [logCardioState, setLogCardioState] = useState(true);
  const [logStrengthState, setLogStrengthState] = useState(false);
  const { scaleV } = useContext(Content);

  return (
    <div>
      {logCardioState && <RealtimeCardio />}
      {logStrengthState && <RealtimeStrength/>}
    </div>
  );
};
export default RealTimeMonitor;
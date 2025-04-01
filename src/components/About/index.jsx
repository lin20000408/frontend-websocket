import { useState, useEffect, useRef, useContext } from "react";
import {
  MAIN_COLOR,
  MAX_VERTICAL_WIDTH,
  MAX_VERTICAL_HEIGHT,
  BACKGROUND_COLOR,
  DARKBLACK_COLOR,
} from "@/constants";
import { Row, Col, Image } from "antd";

import { useNavigate } from "react-router-dom";
import { Content } from "@/App";
// css 的模組引入
import styles from "@/css/local.module.css";
import { NAVIBAR_SIZE } from "../../constants";
import { GlobalStateContext } from "@/App";
import {AboutZh} from '@/components/i18n'
const About = () => {
    const { globalstate } = useContext(GlobalStateContext);
  const { scaleH, setScaleH, scaleV, setScaleV, isPortrait, setIsPortrait } =
    useContext(Content);

  const navigate = useNavigate();

  useEffect(() => {
    // 更換背景圖片及顏色
    document.body.style.backgroundImage = "none";
    document.body.style.backgroundColor = BACKGROUND_COLOR;
    
  }, []);

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

  // 做到中間對齊的步驟
  // 先取得元件的尺寸再計算maginTop的值, 記得要減Head的尺寸
  return (
    <div className="relative flex h-dvh   w-dvw items-center justify-center  bg-[#EFEFEF] text-darkColor pt-[57rem]  opacity-[.8]">
      {/* 它是父 */}
      
        {/* 它是子 */}
        <div
        style={{
          height: "90%", // 這個height可能要有
          width: "calc(330rem)",

          border: `3rem solid ${MAIN_COLOR}`,
        }}
        className=" overflow-auto bg-white p-[calc(13rem)] text-[calc(14rem)]"
      >
          
          <span>{globalstate === "en" ? <p className="">
          
          <div className="font-bold ">About PowrPlus Technologies</div>

          <br></br>
          <div className="text-[calc(14rem)]">
            PowrPlus™ is an intelligent, fitness management software system.
            The easy and intuitive user interface & program logic provides you
            an enjoyable & fun exercise journey while effectively achieving
            your health goal.{" "}
          </div>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <div className="text-[calc(14rem)]">Features: </div>
          <br />

          <div className="text-[calc(14rem)]">
            PowrPlus™ You may manually log your strength workout data for
            tracking.{" "}
          </div>
          {/* <div className="text-[calc(14rem)]"></div> */}
        </p> :<AboutZh/>}</span>
        </div>
      
    </div>
  );
};

export default About;

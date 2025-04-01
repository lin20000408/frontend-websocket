import { useState, useEffect, useRef, useContext } from "react";
import {
  MAIN_COLOR,
  MAX_VERTICAL_WIDTH,
  MAX_VERTICAL_HEIGHT,
  BACKGROUND_COLOR,
} from "@/constants";
import { Row, Col, Image } from "antd";

import { useNavigate } from "react-router-dom";
import { Content } from "@/App";
// css 的模組引入
import styles from "@/css/local.module.css";
import { NAVIBAR_SIZE } from "../../constants";
import { GlobalStateContext } from "@/App";
import {FAQZh} from '@/components/i18n'
const Faq = () => {
  const { scaleH, setScaleH, scaleV, setScaleV, isPortrait, setIsPortrait } =
    useContext(Content);
    const { globalstate } = useContext(GlobalStateContext);
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
  // 主程式 return 返回點
  return (
    <div className="relative flex h-dvh   w-dvw items-center justify-center  bg-[#EFEFEF] text-darkColor pt-[57rem]  opacity-[.8]">
      {/* 子 */}
      <div
        style={{
          height: "90%", // 這個height可能要有
          width: "calc(330rem)",

          border: `3rem solid ${MAIN_COLOR}`,
        }}
        className=" overflow-auto bg-white p-[calc(13rem)] text-[calc(14rem)]"
      >
        {/* 子 */}
        {globalstate === "en" ? <span> <div className="text-[14rem] font-bold  flex  ">
            Frequently Asked Questions
          </div>
          <br></br>
  
          <div className="text-[14rem] mb-[10rem]">Q: How do I use the QR code on the machine?
          </div>
          <div className=" text-[14rem] ">
            A: Open your phone's QR code scanning app, scan the QR code on the
            machine with a green background, and then click the link displayed
            on the screen to access the website.
          </div>
          <br />
          <br />
          <div className=" text-[14rem] mb-[10rem]">
            Q: What should I do if I don't have a registration record?
          </div>
          <div className=" text-[14rem]">
            A: If you don't have a registration record, the system will require
            you to register first before you can use it.
          </div>
          <br />
          <br />
          <div className=" text-[14rem] mb-[10rem]">
            Q: What happens if I have already registered?
          </div>
          <div className=" text-[14rem]">
            A: If you already have a registered account, the system will take
            you directly to the record screen after you scan the QR code.
          </div></span> : <FAQZh/>}
         
          <div className="mb-44 mt-0 "></div>
        
      </div>
    </div>
  );
};

export default Faq;

import { useContext, useEffect, useRef, useState } from "react";

import { BACKGROUND_COLOR, MAIN_COLOR } from "@/constants";

import { Content } from "@/App";
import { DARKBLACK_COLOR } from "../../constants";
``;
// css 的模組引入
import "@/css/global.css";
import About from '@/components/About'
const AboutPage = () => {
  // 引入全局
  const { scaleH, scaleV, isPortrait } = useContext(Content);

  // 更換背景圖片及顏色
  useEffect(() => {
    document.body.style.backgroundImage = "none";
    document.body.style.backgroundColor = BACKGROUND_COLOR;
  
  }, []);

  const [gap, setGap] = useState(70); // 很重要, 初值會影響計算
  const elementRef = useRef(null);
  const realElementRef = useRef(null);
  const [distanceToBottom, setDistanceToBottom] = useState(0);
  useEffect(() => {
    // 函数用于计算元素到视口底部的距离
    const calculateDistanceToBottom = () => {
      if (elementRef.current) {
        const elementRect = elementRef.current.getBoundingClientRect();
        const distance = window.innerHeight - elementRect.bottom;
        setDistanceToBottom(distance);
        // console.log('distance = ', distance);
        // console.log('scaleV = ', scaleV);
      }
    };

    const calculateElementSize = () => {
      if (realElementRef.current) {
        const elementRect = realElementRef.current.getBoundingClientRect();
        if (window.innerHeight > elementRect.height + 70) {
          console.log("大於window.innerHeight > elementRect.height");
          let _gap = (window.innerHeight - elementRect.height) / 2;
          _gap = _gap + 30; // 30  = TOP 頭到橫線的距離為 60rem的一半, 不是70, 其中10是空白多出來的距離
          setGap(_gap);
        } else {
          console.log(" 小於window.innerHeight < elementRect.height");
          setGap(70);
        }
      }
    };

    // 初始化计算一次距离
    calculateDistanceToBottom();
    calculateElementSize();
  }, []);

  return (
    <div ><About/></div>
    
  );
};
export default About;

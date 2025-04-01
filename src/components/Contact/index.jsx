import { useState, useEffect, useRef, useContext } from "react";
import {
  MAIN_COLOR,
  MAX_VERTICAL_WIDTH,
  MAX_VERTICAL_HEIGHT,
  BACKGROUND_COLOR,
} from "@/constants";
import { Row, Col, Image, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { Content } from "@/App";
// css 的模組引入
import styles from "@/css/local.module.css";
import { NAVIBAR_SIZE } from "../../constants";
import {ContactZh} from '@/components/i18n'
import { GlobalStateContext } from "@/App";
const Contact = () => {
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

  const backLogin = () => {
    navigate("/Login");
  };

  // 做到中間對齊的步驟
  // 先取得元件的尺寸再計算maginTop的值, 記得要減Head的尺寸
  return (
    // 父
    <div className=" flex h-dvh   w-dvw items-center justify-center  bg-[#EFEFEF] pt-[57rem] text-darkColor  opacity-[.8]">
      {/* 子 */}
     <div
        style={{
          height: "90%", // 這個height可能要有
          width: "calc(330rem)",

          border: `3rem solid ${MAIN_COLOR}`,
        }}
        className=" overflow-auto bg-white flex p-[calc(13rem)] text-[calc(14rem)] flex-col items-center  justify-center"
      >
      {globalstate === "en" ?    <span className="flex flex-col items-center justify-center">
        <div
          className="mt-[17.1rem] text-[calc(20rem)] font-black font-bold text-mainColor"
          style={{ letterSpacing: "1.5rem" }}
        >
          CONTACT US
        </div>
        <div className="mt-[11.3rem]  text-[calc(15rem)] font-bold ">
          AMERICAS
        </div>
        <div>8217 44th AVE W Suite A</div>
        <div> Mukilteo, WA 98275</div>
        <div>
          T: 800-709-1400 <span className="text-mainColor">//</span> F:
          425-488-8155
        </div>
        <div>E: info@gosportsart.com</div>
        <div className="mb-44 mt-0 text-mainColor">
          ...........................
        </div>
        <div className="font-bold">EUROPE, MIDDLE EAST AND AFRICA</div>
        <div> Strada Cantonale 42</div>
        <div>CH - 6534 San Vittore | Switzerland</div>
        <div>
          T: +41 91 8273908 <span className="text-mainColor">//</span> F: +41 91
          8273910
        </div>
        <div>E: info.emea@gosportsart.com</div>
        <div className="mb-44 mt-0 text-mainColor">
          ...........................
        </div>
        <div className="font-bold">TAIWAN</div>
        <div>#11, Gong Huan Road</div>
        <div>Tainan City, 70955 Taiwan</div>
        <div>
          T: +886 6-3840888 <span className="text-mainColor">//</span> F: +886
          6-3840998
        </div>
        <div className="pb-5 ">E: info@sportsart.com.tw</div>
        <div className="mb-44 mt-0 "></div>
        </span> : <ContactZh/>}
   
      </div>
      
    </div>
  );
};

export default Contact;

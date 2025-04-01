/**
 * Contact
 * 1. 具備RWD 功能
 * 2. 具有偵測內容的大小並比較和容器的大小設定overflow 旗號
 *    當overflow 時就不要做垂直對齊功能免得被放在框的外面看不到它
 *    當不是overflow 時就讓它垂直居中顯示
 * 3. 當螢幕尺寸變化時會自動渲染畫面
 */
import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { BACKGROUND_COLOR, MAIN_COLOR } from "@/constants";
import { Content } from "@/App";
import { DARKBLACK_COLOR } from "../../constants";

// CSS 引入
import "@/css/global.css";
import Contact from '@/components/Contact'
const ContactPage = () => {
  const { scaleH, scaleV, setScaleV, isPortrait } = useContext(Content);
  useEffect(() => {
    document.body.style.backgroundImage = "none";
    document.body.style.backgroundColor = BACKGROUND_COLOR;

  }, []);

  const [isOverflow, setIsOverflow] = useState(false);
  const textContainerRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      if (textContainerRef.current) {
        const containerHeight = textContainerRef.current.clientHeight;
        const contentHeight = textContainerRef.current.scrollHeight;
        setIsOverflow(contentHeight > containerHeight);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // 初始化

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [textContainerRef]);

  return (
   
   <Contact/>
  );
};

export default Contact;

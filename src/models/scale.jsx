import { useState, useEffect, useContext } from "react";
import { Content } from "@/App";

const Scale = () => {
  // console.log ("scale page")
  const { scaleH, setScaleH, scaleV, setScaleV, isPortrait, setIsPortrait } =
    useContext(Content);

  // const [scaleH, setScaleH] = useState(0);
  // const [scaleV, setScaleV] = useState(0);

  // // 偵測是橫式或直式流灠
  // const [isPortrait, setIsPortrait] = useState(
  //   window.matchMedia('(orientation: portrait)').matches,
  // );
  // 初值定義在全局APP 的狀態變數上定義
  // useEffect(()=>{
  //   setScaleH(0)
  //   setScaleV(0)
  //   setIsPortrait(window.matchMedia('(orientation: portrait)').matches)
  // },[])

  useEffect(() => {
    const handleOrientationChange = (event) => {
      setIsPortrait(event.matches);
    };

    const mediaQuery = window.matchMedia("(orientation: portrait)");

    // 添加监听器
    mediaQuery.addEventListener("change", handleOrientationChange);

    // 在组件卸载时清除监听器
    return () => {
      // 移除监听器
      mediaQuery.removeEventListener("change", handleOrientationChange);
    };
  }, []); // 空数组表示仅在组件挂载时运行一次

  // 使用Rem 佈局 ->  技巧去偵測width 去改變 html 的 fontSize 值
  // 如果它是直式的依據公式  text-[calc(20rem/37.5)] 若我能改成 text-[20rem] 不就很爽嗎
  // 橫式 20rem / 192 ....  麻煩直接用 text-[20rem] 不香嗎
  // 375px 感覺把1rem 切成 375段   ;  1920px 感覺把1rem 切成 1920段

  useEffect(() => {
    const setRem = () => {
      console.log("在 scale.js 中设置 REM");
      // 检测设备方向是竖直还是水平
      const mediaQuery = window.matchMedia("(orientation: portrait)");

      // 如果是竖直方向，将 1rem 设置为窗口宽度的 1/10 * 37.5 像素
      if (mediaQuery.matches) {
        console.log("設備是垂直方向的");

        // 它的尺寸若大於751px 則 / 750 更小的顯示感覺
        // const mediaQuery = window.matchMedia("(min-width:750px)");

        // if (mediaQuery.matches) {
          console.log ('(sacle) window.innerWidth = ',window.innerWidth)
          document.documentElement.style.fontSize = `${window.innerWidth / 375}px`;
        // }
        
        // else {
        //   document.documentElement.style.fontSize = `${window.innerWidth / 375}px`;
        // }


      } else {
        // 如果是水平方向，将 1rem 设置为窗口高度的 1/10 / 192 像素
        console.log("設備是水平方向的");
        console.log ('(sacle) window.innerWidth = ',window.innerWidth)

        // document.documentElement.style.fontSize = `${window.innerWidth/ 1920}px`;
        // 測試言
        document.documentElement.style.fontSize = `${window.innerWidth / 375}px`;
      }
    };

    // 页面加载时设置一次 REM
    setRem();

    // 监听窗口大小变化和设备方向变化
    window.addEventListener("resize", setRem);
    window.addEventListener("orientationchange", setRem);

    // 组件卸载时移除事件监听器
    return () => {
      window.removeEventListener("resize", setRem);
      window.removeEventListener("orientationchange", setRem);
    };
  }, []);

  useEffect(() => {
    if (isPortrait) {
      // 直式流灠
      // 360 , 667
      setScaleV(screen.width / 375);
      // setScaleV(375 /screen.width );
    } else {
      // 橫向流灠

      // 比較取得值iphone5 有bug  加判斷比較大小, 居然轉向沒有變化數值橫寬值
      if (screen.width > screen.height) setScaleH(screen.height / 1080);
      else setScaleH(screen.width / 1080); // 橫向流灠是拿小的值來除以1080
    }
  }, [isPortrait]);

  // return { scaleH, setScaleH, scaleV, setScaleV, isPortrait, setIsPortrait };
};
export default Scale;

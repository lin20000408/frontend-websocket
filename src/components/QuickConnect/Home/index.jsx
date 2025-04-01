import { useEffect, useState, useContext, useRef } from "react";
import { Row, Col, Space } from "antd";
import { BACKGROUND_COLOR, DARKGRAY_COLOR, MAIN_COLOR } from "@/constants";
//
import { useNavigate } from "react-router-dom";
import { Content } from "@/App";
// css 的模組引入
import styles from "@/css/local.module.css";
import { NAVIBAR_SIZE } from "../../../constants";

const Home = () => {
  const { mac, setMac, macErr, setMacErr, setCurrentSub1Screen } =
    useContext(Content);

  let navigate = useNavigate();

  const pressScanQrcode = () => {
    setCurrentSub1Screen("quickConnectScannerScreen");
  };
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

  // 主程式 return 返回點
  return (
    <div
    className=" "

      style={{
        paddingTop: "70rem", // 這個要固定值不可以加scaleV否則內容改變外框卻不變
        height: `calc(100dvh)`, // 這個height可能要有
   
        // 操作符(+,-,*,/) 要有空格不然計算會錯誤
        //  paddingTop: `calc(10vh / ${scaleV})`, // 使用paddingTop而不是marginTop
        width: "dvw",
        // 因為paddingTop及marginTop 不受scale的影響所以才減固定值
        // 調整下方最後面 10vh 就可讓下方空出多少距離 (10vh是手機的留空)
        // 上下各給 10vh 中間給 80vh
        //  height: `calc(100vh / ${scaleV} - ( 10vh / ${scaleV}) - (15vh /${scaleV}))`, // 减去顶部黄色区域的高度
        overflow: "scroll",
        display: "flex",
        justifyContent: "center",
        alignItems: "start",
      }}
    >
      <div>
        <Row justify={"center"}>
          {/* 要顯示漸層色  */}
          <Col
            style={{
              fontSize: "20rem",
              width: "236rem",
              height: "49rem",
              border: `2rem solid #fff`,
              textAlign: "center",
              lineHeight: "49rem",
              color: "#fff",
              background:
                "linear-gradient(90deg, #bae642 0%, #8ac942 64.9%, #80c342 100%)",
            }}
            onClick={pressScanQrcode}
          >
            SCAN QR CODE
          </Col>
        </Row>
        {/* 最外層 */}
        <div
          style={{
            marginTop: "33rem",
            marginLeft: "15rem",
            marginRight: "15rem",
            fontSize: "16rem",
            color: DARKGRAY_COLOR,
          }}
        >
          <div>
            To connect via QR Code , tap the SCAN QR CODE button and Scan the QR
            Code
          </div>

          <div style={{ marginTop: "15rem" }}>
            To finish the workout , tap the END button and exist the session
          </div>

          <div style={{ marginTop: "15rem" }}>
            {" "}
            If connect fails , please open the cover of the machine panel and
            click the red button to reconnect
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

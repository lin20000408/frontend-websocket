import { useEffect, useState, useRef, useContext } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { MAIN_COLOR } from "@/constants";
// import { getCameraList } from "./Utils";
import RealTimeMonitor from "@/components/QuickConnect/RealTimeMonitor";
import { useNavigate } from "react-router-dom";
import { Content } from "@/App";
// css 的模組引入
import styles from "@/css/local.module.css";

const qrConfig = { fps: 10, qrbox: { width: "300rem", height: "300rem" } };
const brConfig = { fps: 10, qrbox: { width: 300, height: 260 } };
let html5QrCode;

const App = (propsmain) => {
  console.log('propsmain=', propsmain);
  const [decodedValue, setDecodedValue] = useState("");
  const [scannerType, setScannerType] = useState("BAR");

  
  return (
    <>
     
      <Scanner type={scannerType} propsmain={propsmain} onResult={(res) => setDecodedValue(res)} />
      <br />
    
    </>
  );
}

export default App;

// function startCamera(){}

export const Scanner = (props) => {
  console.log('scanner-props =', props)
  const fileRef = useRef(null);
  const [cameraList, setCameraList] = useState([]);
  const [activeCamera, setActiveCamera] = useState();
const[decodedTextData,setDecodedTextData]=useState('')
  const {
    // screen
    activeScreen,
    setActiveScreen,
    currentScreen,
    setCurrentScreen,
    setCurrentSub1Screen,
    currentSub1Screen,
    // mac
    mac,
    setMac,

    ws,
    setWs,
    E024ScanQrcode,
    setE024ScanQrcode,
    E070ScanQrcode,
    setE070ScanQrcode,
    realTimeWorkout,
    setRealTimeWorkout,
  } = useContext(Content);


  useEffect(() => {
    html5QrCode = new Html5Qrcode("reader");
    getCameras();
    const oldRegion = document.getElementById("qr-shaded-region");
    oldRegion && oldRegion.remove();
  }, []);


  // 滿足camerList.length > 0 才會延遲時間 
  useEffect(() => {
    if (cameraList.length > 0) {
      setTimeout(() => {
        handleClickAdvanced();
        console.log('n秒');
      }, 1000);
    }
  }, [cameraList]);


  // 結果
  const handleClickAdvanced = () => {
    console.log('handleClickAdvanced State')
    const qrCodeSuccessCallback = (decodedText, decodedResult) => {
      console.info(decodedResult, decodedText);
      props.onResult(decodedText);
      // alert(`decoded:__ ${decodedText}`);
      handleStop();

      console.log('next next next next ........')
      console.log('decodedText [htm5Qrcode]1=', decodedText);

      // 最後要帶走的mac值


      // 取出後面的ma值
      // const url = "https://yctmake.com/mac/88da1a6b7da0";
      console.log(decodedText);
      setDecodedTextData(decodedText)
  
      /**
       * 判斷掃描的值是否正確再返回
       *   若錯誤則返回主頁重新掃描
       *   若成功則到即時畫面去 符合 https:// 開頭, 中間是任意值 , 後面一定是去冒號的mac值
       * 
       *  */

      // 底下是mac不帶冒號的正則判斷
    
    };

    html5QrCode
      .start(
        { facingMode: "environment" },
        props.type === "QR" ? qrConfig : brConfig,
        qrCodeSuccessCallback
      )
      .then(() => {
        // const oldRegion = document.getElementById("qr-shaded-region");
        // if (oldRegion) oldRegion.innerHTML = "";
      });
  };
  const getCameras = () => {
    console.log('getCamersas')
    Html5Qrcode.getCameras()
      .then((devices) => {
        /**
         * devices would be an array of objects of type:
         * { id: "id", label: "label" }
         */
        console.info(devices);
        if (devices && devices.length) {
          setCameraList(devices);
          setActiveCamera(devices[0]);
        }
      })
      .catch((err) => {
        console.error(err);
        setCameraList([]);
      });
  };

  const handleStop = () => {
    console.log('HandleStop State');
    try {
      html5QrCode
        .stop()
        .then((res) => {
          html5QrCode.clear();
          console.log('success [htmo5] = ', res)
        //   if (res === undefined) {
        //     console.log("user Press Stop")
        //     setTimeout(() => {
        //       setCurrentSub1Screen('quickConnectHomeScreen');
        //     }, 10)
        //   }

        })
        .catch((err) => {
          console.log('error message = ', err.message);
        });
    } catch (err) {
      console.log(err);
    }
  };
  console.log(decodedTextData);
  
      //!E024 e070 realtime
      useEffect(() => {
        const mac =
        decodedTextData && typeof decodedTextData === "string"
            ? decodedTextData.split("mac=")[1]?.split("&")[0]
            : null;
        const formattedMac = mac ? mac.match(/.{2}/g)?.join(":") : null;
        console.log(formattedMac); // 輸出: 88:DA:1A:6B:7E:08
    
        //send to api
        if (ws) {
          try {
            const inputObject = {
              E024_UserStart_PS: {
                macAddress: formattedMac,
              },
            };
            ws.send(JSON.stringify(inputObject));
            console.log(inputObject);
          } catch (error) {
            console.error("Error sending data:", error);
          }
        } else {
          console.error("WebSocket is not initialized");
        }
      }, [decodedTextData]);
      useEffect(() => {
        if (E024ScanQrcode === "success") {
          if (ws) {
            try {
              const inputObject = {
                E070_SevenInOne_PS: {},
              };
              ws.send(JSON.stringify(inputObject));
              console.log(inputObject);
            } catch (error) {
              console.error("Error sending data:", error);
            }
          } else {
            console.error("WebSocket is not initialized");
          }
        }
      }, [E024ScanQrcode]);
    
      useEffect(() => {
        if (E070ScanQrcode === "success") {
          //!測試 一次
          if (ws) {
            try {
              const inputObject = {
                realTimeWorkout: {},
              };
              ws.send(JSON.stringify(inputObject));
              console.log(inputObject);
            } catch (error) {
              console.error("Error sending data:", error);
            }
          } else {
            console.error("WebSocket is not initialized");
          }
          //!測試 正常是一秒傳一次，如果傳第二次前還沒傳來，取消上一次未完成的請求
          //       let abortController = null;
          // let lastRequestPending = false;
    
          // // 每秒執行一次的函數
          // const sendDataInterval = setInterval(() => {
          //     if (ws) {
          //         try {
          //             // 如果上一個請求還在pending狀態，取消它
          //             if (lastRequestPending && abortController) {
          //                 abortController.abort();
          //                 console.log("Cancelled previous pending request");
          //             }
    
          //             // 創建新的AbortController
          //             abortController = new AbortController();
          //             lastRequestPending = true;
    
          //             const inputObject = {
          //                 realTimeWorkout: {},
          //             };
    
          //             // 傳送資料
          //             ws.send(JSON.stringify(inputObject));
          //             console.log(inputObject);
    
          //             // 模擬請求完成（在真實應用中，這應該由WebSocket的回應事件處理）
          //             // 這裡假設傳送後立即完成，你可能需要根據實際情況調整
          //             setTimeout(() => {
          //                 lastRequestPending = false;
          //             }, 0);
    
          //         } catch (error) {
          //             if (error.name === 'AbortError') {
          //                 console.log("Request was aborted");
          //             } else {
          //                 console.error("Error sending data:", error);
          //             }
          //             lastRequestPending = false;
          //         }
          //     } else {
          //         console.error("WebSocket is not initialized");
          //     }
          // }, 1000); // 每1000毫秒(1秒)執行一次
        }
      }, [E070ScanQrcode]);
      console.log(realTimeWorkout);
    
      useEffect(() => {
        if (realTimeWorkout === "success") {
          setCurrentSub1Screen("quickConnectRealTimeMonitorScreen");
        }
      }, [realTimeWorkout]);
  return (
    <>
    <div className="h-[80rem]"></div>
    <div
  style={{
    position: "relative",
    width: "100vw",
    height: "100vh",
    top: 0,
    left: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: MAIN_COLOR,
  }}
>
  <div className="flex justify-center items-center w-full h-full">
    <div id="reader" className="w-[65vw] h-[65vh]"></div>
  </div>

  <div
    style={{
      position: "absolute",
      bottom: "10vh",
      left: "50%",
      transform: "translateX(-50%)",
      border: "2rem solid white",
      backgroundColor: MAIN_COLOR,
      color: "white",
      textAlign: "center",
      width: "200rem",
      height: "100rem",
      lineHeight: "10rem",
      fontSize: "24rem",
    }}
    onClick={handleStop}
  >
    <div className="flex justify-center items-center h-full">STOP</div>
  </div>
</div></>
  );
};
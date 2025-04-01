import React, { useRef, useState, useEffect, useContext } from "react";
import jsQR from "jsqr";
import { Content } from "@/App";
import RealTimeMonitor from "@/components/QuickConnect/RealTimeMonitor";
const QuickConnectScanner = ({ onScanSuccess }) => {
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
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const overlayCanvasRef = useRef(null);
  const [result, setResult] = useState("掃描結果將顯示在這裡");

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const overlayCanvas = overlayCanvasRef.current;
    const ctx = canvas.getContext("2d");
    const overlayCtx = overlayCanvas.getContext("2d");

    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: "environment" } })
      .then((stream) => {
        video.srcObject = stream;
        video.play();
        tick();
      })
      .catch((err) => {
        setResult("無法存取攝影機: " + err);
      });

    function drawLine(begin, end, color) {
      overlayCtx.beginPath();
      overlayCtx.moveTo(begin.x, begin.y);
      overlayCtx.lineTo(end.x, end.y);
      overlayCtx.lineWidth = 2; // 線條變細
      overlayCtx.strokeStyle = color;
      overlayCtx.stroke();
    }

    function tick() {
      if (video.readyState === video.HAVE_ENOUGH_DATA) {
        const scaleFactor = 0.5; // 縮小一半
        canvas.width = video.videoWidth * scaleFactor;
        canvas.height = video.videoHeight * scaleFactor;
        overlayCanvas.width = canvas.width;
        overlayCanvas.height = canvas.height;

        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height);

        overlayCtx.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height);

        if (code) {
          setResult("掃描結果: " + code.data);
          drawLine(
            code.location.topLeftCorner,
            code.location.topRightCorner,
            "#FF3B58",
          );
          drawLine(
            code.location.topRightCorner,
            code.location.bottomRightCorner,
            "#FF3B58",
          );
          drawLine(
            code.location.bottomRightCorner,
            code.location.bottomLeftCorner,
            "#FF3B58",
          );
          drawLine(
            code.location.bottomLeftCorner,
            code.location.topLeftCorner,
            "#FF3B58",
          );
        }
      }
      requestAnimationFrame(tick);
    }

    return () => {
      if (video.srcObject) {
        const stream = video.srcObject;
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);
  console.log(result);
  //https://myPowrplus.com/?type=WIFI&mac=88DA1A6B7E08.
  useEffect(() => {
    const mac =
      result && typeof result === "string"
        ? result.split("mac=")[1]?.split("&")[0]
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
  }, [result]);
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
      <div className="h-[-100rem] w-[10rem]"></div>
      return (
  
    <div 
      style={{ 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center", 
        minHeight: "100vh" 
      }}
    >
    <div className="h-[300rem] w-[250rem] bg-[#D0D0D0] flex " style={{ alignItems: "center", justifyContent: "center",  }}> <div style={{ position: "relative", width: "200rem", height: "150rem",border:'1px solid #84bd00'  }}>
        <video
        playsinline
          ref={videoRef}
          style={{ width: "100%", height: "100%" }}
        />
        <canvas ref={canvasRef} style={{ display: "none" }} />
        <canvas
          ref={overlayCanvasRef}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
        />
      </div></div>
     
    </div>
    {/* <div className="text-center text-[10rem]">{result}</div> */}
    {currentSub1Screen === "quickConnectRealTimeMonitorScreen" && (
      <RealTimeMonitor />
    )}

    </>
  );
};

export default QuickConnectScanner;
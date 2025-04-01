//
//connect
import { useContext, useEffect, useRef, useState, useCallback } from "react";
import { Content } from "@/App";

//import.meta.env.
// 定義錯誤代碼枚舉
const WebSocketErrorCode = {
  // 连接相关错误
  CONNECTION_FAILED: 1001, // 连接失败
  CONNECTION_TIMEOUT: 1002, // 连接超时
  RECONNECT_LIMIT_EXCEEDED: 1003, // 重连次数超限

  // 消息解析错误
  MESSAGE_PARSE_ERROR: 2001, // 消息解析失败
  INVALID_MESSAGE_FORMAT: 2002, // 消息格式无效

  // 服务器相关错误
  SERVER_MAINTENANCE: 3001, // 服务器维护中
  UNAUTHORIZED: 3002, // 未授权
  FORBIDDEN: 3003, // 禁止访问

  // 网络相关错误
  NETWORK_DISCONNECTED: 4001, // 网络断开
  NETWORK_SLOW: 4002, // 网络缓慢

  // 未知错误
  UNKNOWN_ERROR: 9999,
};
const Connect = () => {
  // 使用 useRef 防止在 React 严格模式下执行两次
  const initializedRef = useRef(false);

  const {
    setAddNewWeight,
    setUpdateWorkoutbuilder,
    setDeleteWorkoutbuilder,
    addNewWorkoutbuilder,
    setAddNewWorkoutbuilder,
    setGetWorkoutbuilders,
    getWorkoutbuilders,
    deleteWorkout,
    setDeleteWorkout,
    isLogin,
    setIsLogin,
    setConnectState,
    ws,
    setWs,
    setUserProfile,
    setUpdateUserProfile,

    userRegState,
    setUserRegState,
    setGoogleState,
    setRebindingState,
    setActiveScreen,
    setCurrentScreen,
    setCurrentSub1Screen,
    setCurrentSub2Screen,
    setCurrentSub3Screen,
    setCurrentSub4Screen,

    setConfirmUserEmail,
    setVerifyUserEmail,
    setDeleteUserID,
    setForgetUserPassword,
    setConfirmForgetUserPasswordCode,
    setConfirmDeleteUserAccount,
    setSessionWorkoutBuilderData,
    maintanceTime,
    setMaintanceTime,
    setRefreshToken,
    isClickOpCode,
    setIsClickOpCode,
    setConfirmUpdateUserPassword,
    refreshToken,
    socketio,
    setSocketio,
    isSupportLocalStorage,
    setIsSupportLocalStorage,
    setRealTimeWorkout,
    realTimeWorkout,
    formatDate,
    reconnectionAttemptExceededMaximumNumber,
    setReconnectionAttemptExceededMaximumNumber,
    setE070ScanQrcode,
    setE024ScanQrcode,
  } = useContext(Content);
  const handleWebSocketError = (errorCode, errorMessage) => {
    // Log the error details
    console.error(`WebSocket Error (Code ${errorCode}): ${errorMessage}`);

    // Depending on the error code, you might want to take different actions
    switch (errorCode) {
      case WebSocketErrorCode.CONNECTION_FAILED:
        // Handle connection failure
        setConnectState("disconnected");
        break;

      case WebSocketErrorCode.CONNECTION_TIMEOUT:
        // Handle connection timeout
        setConnectState("timeout");
        break;

      case WebSocketErrorCode.RECONNECT_LIMIT_EXCEEDED:
        // Stop reconnection attempts
        setConnectState("failed");
        break;

      case WebSocketErrorCode.UNAUTHORIZED:
        // Handle unauthorized access
        setIsLogin("fail");
        break;

      case WebSocketErrorCode.NETWORK_DISCONNECTED:
        // Handle network disconnection
        setConnectState("disconnected");
        break;
      case WebSocketErrorCode.NETWORK_SLOW:
        // Potential additional handling for slow network
        console.warn("Network is slow, connection may be unstable");
        break;

      case WebSocketErrorCode.SERVER_MAINTENANCE:
        // Notify user about server maintenance
        setConnectState("maintenance");
        break;

      default:
        // Handle unknown errors
        setConnectState("error");
        break;
    }

    // Optionally, you can add additional error tracking or logging here
    // For example, sending error reports to a monitoring service
  };
  // WebSocket configuration
  const RECONNECT_BASE_INTERVAL = 1000; // 1 second
  const MAX_RECONNECT_INTERVAL = 30000; // 30 seconds
  const HEARTBEAT_INTERVAL = 30000; // 30 seconds
  const MAX_RECONNECT_ATTEMPTS = 10; // Limit reconnection attempts

  // Refs for managing WebSocket and related states
  const socketRef = useRef(null);
  const reconnectIntervalRef = useRef(RECONNECT_BASE_INTERVAL);
  const reconnectAttemptsRef = useRef(0);
  const heartbeatIntervalRef = useRef(null);

  // Heartbeat mechanism
  const sendHeartbeat = useCallback(() => {
    const socket = socketRef.current;
    // 如果已經有活躍連接
    if (socket && socket.readyState === WebSocket.OPEN) {
      const heartbeatPayload = {
        userKeepAlive: {},
      };

      try {
        socket.send(JSON.stringify(heartbeatPayload));
        console.log("Heartbeat sent");
      } catch (error) {
        console.error("Failed to send heartbeat:", error);
        attemptReconnect();
      }
    } else {
      console.warn("Cannot send heartbeat: WebSocket not open");
      attemptReconnect();
    }
  }, []);
  // Reconnection logic
  const attemptReconnect = useCallback(() => {
    // Stop existing heartbeat
    if (heartbeatIntervalRef.current) {
      clearInterval(heartbeatIntervalRef.current);
      heartbeatIntervalRef.current = null;
    }
    // Clear any existing reconnection timeout

    // Close existing connection if it exists

    if (socketRef.current) {
      socketRef.current.onclose = null;
      socketRef.current.onerror = null;
      socketRef.current.close();
      socketRef.current = null;
    }

    // Check reconnection attempts
    if (reconnectAttemptsRef.current >= MAX_RECONNECT_ATTEMPTS) {
      console.error("Max reconnection attempts reached");
      setConnectState("disconnected");
      setReconnectionAttemptExceededMaximumNumber(true);
      return;
    }
    let reconnectTimeoutRef;
    // Exponential backoff for reconnection
    reconnectTimeoutRef = setTimeout(() => {
      createWebSocket();
      reconnectAttemptsRef.current++;
      reconnectIntervalRef.current = Math.min(
        reconnectIntervalRef.current * 2,
        MAX_RECONNECT_INTERVAL,
      );
    }, reconnectIntervalRef.current);
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef);
      reconnectTimeoutRef.current = null;
    }
  }, []);
  // Create WebSocket connection
  const WSLink =
    import.meta.env.VITE_BACKENDURL 
      
  
  const createWebSocket = useCallback(() => {
    const socket = new WebSocket(WSLink);
    socketRef.current = socket;
    // Connection opened

    socket.onopen = () => {
      console.log("WebSocket connection established");
      setWs(socket);
      setConnectState("connect");

      // Reset reconnection attempts
      reconnectAttemptsRef.current = 0;

      if (heartbeatIntervalRef.current) {
        clearInterval(heartbeatIntervalRef.current); // 確保清除舊的計時器
      }
      // Start heartbeat interval

      heartbeatIntervalRef.current = setInterval(
        sendHeartbeat,
        HEARTBEAT_INTERVAL,
      );
    };

    // 发送数据的函数
    socket.onmessage = function (event) {
      console.log("收到消息:", event.data);
      // messageReceivedRef.current = true; // 标记已接收到消息
      const wasRefreshing = sessionStorage.getItem("isRefreshing");
      const accessToken = localStorage.getItem("sauser_accessToken");
      const screen = sessionStorage.getItem("sauser_currentScreen");
      const data = JSON.parse(event.data);
      const opCode = Object.keys(data)[0];
      const dataObj = data[opCode]; // 取得內層資料
      console.log(dataObj);
      const dataMessage = dataObj.message;
      const dataStatus = dataObj.status;
      const dataData = dataObj.data;
      console.log(dataStatus);
      function formatISODate(dateString) {
        try {
          if (!dateString) return "";
          return dateString.replace("T", " ").substring(0, 16);
        } catch (error) {
          console.error("日期格式轉換錯誤", error);
          return "";
        }
      }
      switch (opCode) {
        //!auth
        //除了keepalive add setMaintanceTime setGetMaintenanceNotifier
        case "userKeepAlive": {
          const maintance = dataObj.maintenance;

          console.log(dataStatus);
          if (dataStatus === "success" && maintance) {
            localStorage.setItem(
              "maintenanceTime",
              JSON.stringify({
                startTime: dataObj.maintenance
                  ? dataObj.maintenance.startTime
                  : "",
                endTime: dataObj.maintenance ? dataObj.maintenance.endTime : "",
              }),
            );

            const maintanceLocal = localStorage.getItem("maintenanceTime");
            // Step 2: Parse the JSON string back into an object
            const maintenanceTime = JSON.parse(maintanceLocal);
            console.log(maintenanceTime);
            // Step 3: Access the startTime property
            const startTime = maintenanceTime ? maintenanceTime.startTime : "";
            const maintenanceStartTime = new Date(startTime);
            console.log(maintenanceStartTime);
            const currentTime = new Date();
            console.log(currentTime);
            // Calculate the date that is 7 days before the maintenance start time
            const sevenDaysBeforeStart = new Date(maintenanceStartTime);
            sevenDaysBeforeStart.setDate(maintenanceStartTime.getDate() - 7);
            // Check if current time is before the maintenance start time and after seven days before it
            if (
              currentTime >= sevenDaysBeforeStart &&
              currentTime < maintenanceStartTime
            ) {
              localStorage.setItem("maintenanceNotifier", "true");
              console.log(
                "Current time is within 7 days before the maintenance start time.",
              );
            } else {
              localStorage.setItem("maintenanceNotifier", "false");
              console.log(
                "Current time is not within 7 days before the maintenance start time.",
              );
            }
          } else if (dataStatus === "success") {
            console.log("123");
          }
          break;
        }
        case "userLogin":
          if (dataStatus === "success") {
            localStorage.setItem(
              "sauser_accessToken",
              dataObj.sauser_accessToken,
            );
            localStorage.setItem(
              "sauser_refreshToken",
              dataObj.sauser_refreshToken,
            );
            setIsLogin("success");
            console.log(isLogin);
          } else {
            console.log(dataObj.message);
            setIsLogin("fail");
          }

          console.log(dataObj["status"]);
          console.log(isLogin);

          break;
        //回覆 註冊
        case "userRegister":
          if (dataStatus === "success") {
            setUserRegState("success");
          } else {
            setUserRegState("fail");
          }
          console.log(dataObj["status"]);
          console.log(userRegState);

          break;

        //回覆 auth
        case "userAuth":
          if (
            wasRefreshing &&
            accessToken &&
            screen &&
            dataStatus === "success"
          ) {
            console.log("ok");

            setIsLogin("isRefreshSuccess");
            console.log(isLogin);
          } else if (dataStatus === "success") {
            console.log("登录成功");

            setIsLogin("success");
          } else if (
            dataStatus === "fail" &&
            dataObj.message === "tokenHasExpired"
          ) {
            setIsLogin("tokenHasExpired");
            console.log("tokenHasExpired");
            // 這裡的值可能需要確認
          } else {
            console.log("登录失败");
            setIsLogin("fail");
            console.log(dataObj.message);
          }

          break;
        case "refreshUserToken":
          if (dataStatus === "success") {
            console.log("retFreshUserToken成功");
            localStorage.setItem(
              "sauser_accessToken",
              dataObj.sauser_accessToken,
            );

            setRefreshToken("success");

            console.log("refresh success");
          } else {
            console.log("retFreshUserToken失败");
            setRefreshToken("fail");
          }

          break;

        //回覆Google
        case "googleUserLogin":
          if (dataStatus === "success") {
            localStorage.setItem(
              "sauser_accessToken",
              dataObj.sauser_accessToken,
            );

            setIsLogin("success");
          } else if (
            dataStatus === "fail" &&
            dataObj.message === "tokenHasExpired"
          ) {
            setGoogleState("tokenHasExpired");
            console.log("tokenHasExpired");
          } else if (
            dataStatus === "fail" &&
            dataMessage === "accountBindingConflict"
          ) {
            setGoogleState("accountBindingConflict");
          } else if (
            dataStatus === "fail" &&
            dataMessage === "needRegisterToBindAccount"
          ) {
            setGoogleState("needRegisterToBindAccount");
          } else {
            setIsLogin("fail");
          }

          break;

        case "googleUserLoginRebinding":
          if (dataStatus === "success") {
            localStorage.setItem(
              "sauser_accessToken",
              dataObj.sauser_accessToken,
            );

            setRebindingState("success");
          } else {
            console.log(dataObj.message);
            setRebindingState("fail");
          }

          break;
         //send email 信(本來沒有email)
         case "verifyUserEmail":
            if (dataStatus === "success") {
              setVerifyUserEmail("success");
              console.log("success");
            } else if (dataStatus === "fail" && dataMessage === "existentEmail") {
              setVerifyUserEmail("existentEmail");
            } else {
              console.log(dataObj.message);
              setVerifyUserEmail("fail");
            }
  
            break;
          //otp
          case "confirmUserEmail":
            if (dataStatus === "success") {
              setConfirmUserEmail("success");
            } else {
              console.log(dataObj.message);
              setConfirmUserEmail("fail");
            }
  
            break;
          //(本來有email)send email
          case "forgetUserPassword":
            if (dataStatus === "success") {
              setForgetUserPassword("success");
            } else if (
              dataStatus === "error" &&
              dataMessage === "nonExistentUserEmail"
            ) {
              setForgetUserPassword("nonExistentUserEmail");
            } else {
              setForgetUserPassword("fail");
            }
  
            break;
          //otp
          case "confirmForgetUserPasswordCode":
            if (dataStatus === "success") {
              setConfirmForgetUserPasswordCode("success");
              console.log("success");
            } else {
              setConfirmForgetUserPasswordCode("fail");
            }
  
            break;
          case "confirmUpdateUserPassword":
            if (dataStatus === "success") {
              setConfirmUpdateUserPassword("success");
            } else if (
              dataStatus === "fail" &&
              dataObj.message === "tokenHasExpired"
            ) {
              setConfirmUpdateUserPassword("tokenHasExpired");
            }
            break;
          case "deleteUserAccount":
            if (dataStatus === "success") {
              setDeleteUserID("success");
            } else if (
              dataStatus === "fail" &&
              dataObj.message === "tokenHasExpired"
            ) {
              setDeleteUserID("tokenHasExpired");
            } else if (
              dataStatus === "fail" &&
              dataObj.message === "nonExistentUser"
            ) {
              setDeleteUserID("nonExistentUser");
            } else {
              console.log(dataObj.message);
              setDeleteUserID("fail");
            }
  
            break;
          case "confirmDeleteUserAccount":
            if (dataStatus === "success") {
                setConfirmDeleteUserAccount("success");
              } else if (
                dataStatus === "fail" &&
                dataObj.message === "tokenHasExpired"
              ) {
                setConfirmDeleteUserAccount("tokenHasExpired");
              } else {
                setConfirmDeleteUserAccount("fail");
              }
    
              break;
          //!獲取 UserProfile Data
        case "getUserProfile":
          if (dataStatus === "success") {
            // Store the user profile data in localStorage
            localStorage.setItem("userProfile", JSON.stringify(dataObj.data));

            setUserProfile(dataObj.data);
            console.log(dataObj.data);
          } else if (
            dataStatus === "fail" &&
            dataObj.message === "tokenHasExpired"
          ) {
            setUserProfile("tokenHasExpired");
            console.log("tokenHasExpired");
          } else {
            console.log("fail");
          }

          console.log(isClickOpCode);

          break;
        //回覆 UpdateUserProfile
        case "updateUserProfile":
          if (dataStatus === "success") {
            setUpdateUserProfile("success");
            console.log("update success");

            console.log(isClickOpCode);
          } else if (
            dataStatus === "fail" &&
            dataObj.message === "tokenHasExpired"
          ) {
            setUpdateUserProfile("tokenHasExpired");
          } else if (dataStatus === "fail") {
            setUpdateUserProfile({
              status: "fail",
              message: dataObj.message || "更新失敗",
            });
          } else {
            setUpdateUserProfile({
              status: "error",
              message: dataObj.message || "更新錯誤",
            });
          }

          break;
      
        
        //vite-myPowrplus
  
        case "getWorkoutbuilders":
          setGetWorkoutbuilders("init");
          if (dataStatus === "success") {
            // Store the user profile data in localStorage
            const dataFilter = dataObj.data.map((item) => ({
              ...item.data,
              workoutbuilderId: item._id, // 將 workoutbuilderId 改成 item._id
            }));
            sessionStorage.setItem(
              "workoutBuilderData",
              JSON.stringify(dataFilter),
            );
            setGetWorkoutbuilders("success");
            setSessionWorkoutBuilderData(dataFilter);
            console.log(dataFilter);
          } else if (
            dataStatus === "fail" &&
            dataObj.message === "tokenHasExpired"
          ) {
            setGetWorkoutbuilders("tokenHasExpired");
            console.log("tokenHasExpired");
          } else {
            console.log("fail");
          }
          break;
        case "addNewWorkoutbuilder":
          setAddNewWorkoutbuilder("init");
          if (dataStatus === "success") {
            // Store the user profile data in localStorage

            setAddNewWorkoutbuilder("success");
            console.log("11");
          } else if (
            dataStatus === "fail" &&
            dataObj.message === "tokenHasExpired"
          ) {
            setAddNewWorkoutbuilder("tokenHasExpired");
            console.log("tokenHasExpired");
          } else {
            console.log("fail");
          }
          break;
        case "updateWorkoutbuilder":
          if (dataStatus === "success") {
            // Store the user profile data in localStorage
            console.log("init");
            setUpdateWorkoutbuilder("success");

            console.log("122");
          } else if (
            dataStatus === "fail" &&
            dataObj.message === "tokenHasExpired"
          ) {
            setUpdateWorkoutbuilder("tokenHasExpired");
            console.log("tokenHasExpired");
          } else {
            console.log("fail");
          }
          break;
        case "deleteWorkoutbuilder":
          if (dataStatus === "success") {
            // Store the user profile data in localStorage

            setDeleteWorkoutbuilder("success");

            console.log("122");
          } else if (
            dataStatus === "fail" &&
            dataObj.message === "tokenHasExpired"
          ) {
            setDeleteWorkoutbuilder("tokenHasExpired");
            console.log("tokenHasExpired");
          } else {
            console.log("fail");
          }
          break;
        case "E024_UserStart_SP":
          if (dataStatus === "success") {
            // Store the user profile data in localStorage

            setE024ScanQrcode("success");

            console.log("122");
          } else {
            setE024ScanQrcode("init");
          }
          break;
        case "E070_SevenInOne_SP":
          if (dataStatus === "success") {
            // Store the user profile data in localStorage

            setE070ScanQrcode("success");

            console.log("122");
          } else {
            setE070ScanQrcode("init");
          }
          break;
        case "realTimeWorkout":
          if (dataStatus === "success") {
            // Store the user profile data in localStorage
            const data = dataObj.data;
            setRealTimeWorkout('success');
            sessionStorage.setItem("realTimeWorkout", JSON.stringify(data));
            console.log("122");
          } else {
            console.log("fail");
            setRealTimeWorkout('init');
          }
          break;
        case "addNewWeight":
            if (dataStatus === "success") {
                // Store the user profile data in localStorage
              
               
                setAddNewWeight('success')
                console.log("122");
              } else {
                console.log("fail");
                setAddNewWeight('init');
              }
            break;
            case"queryWeightHistory":
            if (dataStatus === "success") {
                // Store the user profile data in localStorage
              
               localStorage.setItem( "queryWeightHistory",
                JSON.stringify(dataObj.data))
            
                console.log("@@@122",dataObj.data);
              } else {
                console.log("fail");
               
              }
            break;
          default:
          console.log("未处理的消息类型:", dataObj.opCode);
          break;
      }
      setIsClickOpCode(false);
    };
    // !Check if the page was refreshed on load
    window.addEventListener("beforeunload", () => {
      sessionStorage.setItem("isRefreshing", JSON.stringify("true"));

      console.log("yes");
    });
    // //!  Detecting page refresh
    // let isRefreshing = false;

    // window.addEventListener("beforeunload", () => {
    //   isRefreshing = true;
    //   sessionStorage.setItem("isRefreshing", "true");
    // });
    // 其他事件处理（如onclose, onerror等）

    socket.onclose = (event) => {
      console.log("WebSocket connection closed", {
        code: event.code,
        reason: event.reason,
      });

      // 如果是異常關閉（1006）
      // 添加服務器重啟的判斷
      let isWaitingForServerRestart;
      if (event.code === 1006 || event.code === 1005) {
        console.warn("Abnormal closure detected, attempting reconnection");

        isWaitingForServerRestart = setTimeout(() => {
          attemptReconnect();
        }, 10000); // 等待 10 秒後嘗試重新連接
      } else {
        attemptReconnect();
      }

      // Stop heartbeat
      if (heartbeatIntervalRef.current) {
        clearInterval(heartbeatIntervalRef.current);
        heartbeatIntervalRef.current = null;
      }

      setWs(null);
      setConnectState("disconnected");

      // Attempt reconnection
      //   attemptReconnect();
      return () => {
        if (isWaitingForServerRestart) {
          clearTimeout(isWaitingForServerRestart);
        }
      };
    };

    socket.onerror = function (error) {
      // const ref = useRef(false);
      console.error("WebSocket error:", error);

      if (sessionStorage.getItem("isRefreshing") === "true") {
        console.log("WebSocket error during refresh, ignoring.");
        return;
      }
      handleWebSocketError(
        WebSocketErrorCode.NETWORK_DISCONNECTED,
        `網絡錯誤: ${error}`,
      );
      console.log(WebSocketErrorCode.NETWORK_DISCONNECTED);

      //   ref.current = null;
      setWs(null);
      if (socket.readyState !== WebSocket.CLOSED) {
        socket.close();
      }
    };
  }, [setWs, setConnectState, setIsLogin, sendHeartbeat, attemptReconnect]);

  //ws程序
  useEffect(() => {
    // Create initial connection
    createWebSocket();

    // Cleanup function
    return () => {
      // Stop heartbeat
      if (heartbeatIntervalRef.current) {
        clearInterval(heartbeatIntervalRef.current);
        heartbeatIntervalRef.current = null;
      }

      // Close WebSocket
      const socket = socketRef.current;
      if (socket) {
        socket.onclose = null;
        socket.onerror = null;
        socket.close();
      }
    };
  }, [createWebSocket]);
  //嚴格模式
  // 假设某些情况下你想要移除这个事件监听器
  // 移除事件监听器的函数
  const removeEventListeners = () => {
    socketio.off("connect");
    socketio.off("connect_error");
    socketio.off("disconnect");
    socketio.off("message");
    socketio.off("retUserLogin");
    socketio.off("retGoogleUserLogin");
    socketio.off("retUserAuth");
    socketio.off("retUserProfile");
    socketio.off("retSetUserProfile");
    socketio.off("retUserGetWorkoutData");
    socketio.off("retUserReg");
    socketio.off("systemMaintainace");
  };

  function storageAvailable(type) {
    let storage;
    try {
      storage = window[type];
      const x = "__storage_test__";
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
    } catch (e) {
      return (
        e instanceof DOMException &&
        (e.name === "QuotaExceededError" ||
          e.name === "NS_ERROR_DOM_QUOTA_REACHED")
      );
    }
  }

  const isLocalStorage = () => {
    if (storageAvailable("localStorage")) {
      console.log("支援localStorage功能");
      setIsSupportLocalStorage(true);
    } else {
      console.log("不支援localStorage");
      setIsSupportLocalStorage(false);
      // 跳出提示框
      // setIsModalOpen(true);
      // 如果禁能下方的指令也無效
      // sessionStorage.setItem('tempfalse','tempfalse')
    }
  };

  const _ws_on = () => {
    console.log("Client Socketio. successful");

    // 连接成功
    socketio.on("connect", () => {
      console.log("Socketio ----- [connect]");
      setConnectState("connected");
    });

    // 系统错误
    socketio.on("connect_error", (err) => {
      console.log(`連線錯誤是因為: ${err.message}`);
      setConnectState("error");

      // 重连逻辑
      socketio.on("connect", function () {
        console.log("Login 組件--斷了後重連接......................");
        setConnectState("reconnected");
      });
    });

    // 断开连接
    socketio.on("disconnect", function () {
      console.log("Sorry, there seems to be an issue with the connection!");
      setConnectState("disconnect");
    });

    // 处理消息
    socketio.on("message", (data) => {
      console.log("data=", data);
    });
  };

  // useEffect 钩子
  useEffect(() => {
    console.log("socketio 最初進入useEffect(Model[connect]) = ", socketio);

    isLocalStorage();

    if (socketio === null && initializedRef.current === false) {
      initializedRef.current = true;
      console.log(
        "第一次建立websocket(MODEL[connect])..............",
        socketio,
      );

      // setSocketio(
      //     webSocket(SOCKET_URL, {
      //         path: "/wsapi/",
      //     }),
      // );
    } else if (socketio !== null) {
      initializedRef.current = false;
      console.log("success connect (MODEL)! 建立一條連線成功");

      _ws_on();

      // 如果需要移除监听器，可以调用 removeEventListeners 函数
      removeEventListeners();
    }
  }, [socketio]);

  // Retrieve the refresh status
  const wasRefreshing = sessionStorage.getItem("isRefreshing");
  const accessToken = localStorage.getItem("sauser_accessToken");
  const screen = sessionStorage.getItem("sauser_currentScreen");
  useEffect(() => {
    const isRefreshing = wasRefreshing === "true";
    if (isRefreshing && accessToken && screen) {
      try {
        const dataToSend = {
          userAuth: { sauser_accessToken: accessToken },
        };

        if (ws && ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify(dataToSend));
          console.log("Data sent successfully");
          localStorage.setItem("cookieConsent", "true");
        } else {
          console.error("none");
        }
      } catch (error) {
        console.error("Error in WebSocket send:", error);
      }
    }
  }, [wasRefreshing, accessToken, screen, ws]);

  useEffect(() => {
    // Convert string to boolean
    const isRefreshing = wasRefreshing === "true";
    console.log("wasRefreshing:", wasRefreshing);
    console.log("screen:", screen);
    console.log("isLogin:", isLogin);
    //頁面refresh後 重新回復到本業
    if (isRefreshing && isLogin === "isRefreshSuccess" && screen) {
      console.log("Page was refreshed");

      //consent
      localStorage.setItem("cookieConsent", "true");

      // Retrieve the previous screen states from sessionStorage
      const savedState = JSON.parse(
        sessionStorage.getItem("sauser_currentScreen"),
      );
      const savedActiveScreen = savedState?.activeScreen || "menuScreen"; // Default to menuScreen
      const savedCurrentScreen = savedState?.currentScreen || "";
      let reconnectTimeout;
      // Delay the reconnection attempt slightly to ensure resources are ready
      reconnectTimeout = setTimeout(() => {
        attemptReconnect();

        // Remove the background image
        document.body.style.backgroundImage = "none";
        console.log("沒有mac");

        const stateData = {
          activeScreen: savedActiveScreen,
          currentScreen: savedCurrentScreen,
        };
        const title = ""; // 页面标题（可选）
        const encodedData = encodeURIComponent(JSON.stringify(stateData));
        const newUrl = `/?data=${encodedData}`; // 新的 URL（可选） 這個會改變名稱
        window.history.pushState(stateData, title, newUrl);

        // Restore the screens
        setActiveScreen(savedActiveScreen);
        setCurrentScreen(savedCurrentScreen);
        sessionStorage.setItem("isRefreshing", JSON.stringify("false"));
      }, 1000);
      // Clean up the timeout when component unmounts or when dependencies change
      return () => {
        if (reconnectTimeout) {
          clearTimeout(reconnectTimeout);
        }
      };
      // Mark as no longer refreshing
    } else {
      console.log("Page loaded for the first time");
    }
  }, [isLogin, isLogin, wasRefreshing, screen]);
  useEffect(() => {
    // if (wasRefreshing&&isLogin === "init") {
    //     return () => {};
    //   }
    //當auth失效 傳給refreshUserToken refreshUserToken再傳回new access token 在做一次自動授權

    //當auto login refreshToken =換成新的access
    if (wasRefreshing && screen && isLogin === "tokenHasExpired") {
      const dataInValid = localStorage.getItem("sauser_refreshToken");
      const inputObject = {
        refreshUserToken: {
          sauser_refreshToken: dataInValid,
        },
      };

      if (ws) {
        setIsClickOpCode(true);
        ws.send(JSON.stringify(inputObject));
        console.log(inputObject);
      }
    }
    //重新傳auth (auto login)
    if (
      wasRefreshing &&
      screen &&
      refreshToken === "success" &&
      isLogin === "tokenHasExpired"
    ) {
      {
        console.log("success");
        let data = localStorage.getItem("sauser_accessToken");

        if (data !== undefined && data !== null && data1 === "true") {
          const dataJson = JSON.stringify({
            userAuth: { sauser_accessToken: data },
          });

          if (ws) {
            setIsClickOpCode(true);
            ws.send(dataJson);
            console.log("success");
          }
        }
      }

      // 更新remember me
      let me = localStorage.getItem("sauser_rememberme");
      if (me !== null && me !== undefined) {
        if (me === "true") {
          console.log("me2 = ", me);
          setRememberMe(true);
        } else {
          setRememberMe(false);
        }
      }
    }

    // return () => {};
  }, [refreshToken, isLogin, ws, screen, wasRefreshing]);
  //   console.log(isClickOpCode);
  //?子頁面刷新紀錄還會在 保存状态到 sessionStorage
  const saveStateToStorage = () => {
    const state = {
      currentScreen: window.history.state?.currentScreen,
      currentSub1Screen: window.history.state?.currentSub1Screen,
      currentSub2Screen: window.history.state?.currentSub2Screen,
      currentSub3Screen: window.history.state?.currentSub3Screen,
      currentSub4Screen: window.history.state?.currentSub4Screen,
    };
    sessionStorage.setItem("sauser_currentScreen", JSON.stringify(state));
  };

  // 从 sessionStorage 恢复状态
  const restoreStateFromStorage = () => {
    const savedState = JSON.parse(
      sessionStorage.getItem("sauser_currentScreen"),
    );

    // 检查是否有保存的状态
    if (savedState) {
      setCurrentScreen(savedState.currentScreen);
      setCurrentSub1Screen(savedState.currentSub1Screen);
      setCurrentSub2Screen(savedState.currentSub2Screen);
      setCurrentSub3Screen(savedState.currentSub3Screen);
      setCurrentSub4Screen(savedState.currentSub4Screen);
    }

    // 如果没有保存的状态，则不设置任何默认值
  };

  useEffect(() => {
    // 页面加载时恢复状态
    restoreStateFromStorage();
    console.log("yes");

    // 处理返回按钮事件
    function handleBackButton(event) {
      const savedState = window.history.state;
      if (!savedState) return;

      switch (savedState.currentScreen) {
        case "resultsScreen":
          setCurrentScreen(savedState.currentScreen);
          setCurrentSub1Screen(savedState.currentSub1Screen);
          setCurrentSub2Screen(savedState.currentSub2Screen);
          setCurrentSub3Screen(savedState.currentSub3Screen);
          setCurrentSub4Screen(savedState.currentSub4Screen);
          break;
        case "workoutLogScreen":
          setCurrentScreen(savedState.currentScreen);
          setCurrentSub1Screen(savedState.currentSub1Screen);
          setCurrentSub2Screen(savedState.currentSub2Screen);
          break;

        case "weightGraphTime":
          setCurrentScreen(savedState.currentScreen);
          setCurrentSub1Screen(savedState.currentSub1Screen);
          setCurrentSub2Screen(savedState.currentSub2Screen);
          break;
        case "workoutType":
          setCurrentScreen(savedState.currentScreen);
          setCurrentSub1Screen(savedState.currentSub1Screen);
          setCurrentSub2Screen(savedState.currentSub2Screen);
          break;
        case "rewardsScreen":
          setCurrentScreen(savedState.currentScreen);
          setCurrentSub1Screen(savedState.currentSub1Screen);
          setCurrentSub2Screen(savedState.currentSub2Screen);
          break;
        case "profileSettingsScreen":
          setCurrentScreen(savedState.currentScreen);
          setCurrentSub1Screen(savedState.currentSub1Screen);
          break;
        //暫時留著
        case "quickConnectScreen":
          setCurrentScreen(savedState.currentScreen);
          setCurrentSub1Screen(savedState.currentSub1Screen);
          break;
      }
      // 保存新状态到 localStorage
      saveStateToStorage();
    }
    // 监听状态变化并保存
    const handleBeforeUnload = () => {
      saveStateToStorage();
    };
    // 监听返回按钮事件
    window.addEventListener("popstate", handleBackButton);
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("popstate", handleBackButton);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);
  //   window.addEventListener("beforeunload", () => {
  //     restoreStateFromStorage();
  //   });
  return null;
};

export default Connect;


import React, { useRef, useEffect, useState, useContext } from 'react';
import { Row, Col, Modal } from 'antd';
import { MAIN_COLOR } from '@/constants'

import { useNavigate } from "react-router-dom";
import { Content } from "@/App";
// css 的模組引入
import styles from "@/css/local.module.css";

 const WSErr = () => {
  const navigate = useNavigate();
  const reference = useRef();
  const [c, setC] = useState('red');


  // 全局
  const { connectState, setConnectState, isLogin, setIsLogin } = useContext(Content)

  // 功能：取得目前的螢幕大小
  const [screenWidth, setScreenWidth] = useState(screen.width)
  const [screenHeight, setScreenHeight] = useState(screen.height)
  const [times, setTimes] = useState(screen.width / 1920)
  // let times = screen.width / 1920
  //建立一個監聽器去監聽螢幕大小發生變化
  window.addEventListener('resize', () => {
    setScreenWidth(screen.width)
    setScreenHeight(screen.Height)
    setTimes(screen.width / 1920)
  })

  // 觸發 socketio connectState 狀態  **********************
  useEffect(() => {
    console.log('connectState [WSErr]', connectState);
    // 初始值 不會執行 下面的 if 要放在最後面
    if (connectState === 'init') {
      console.log('init -- [WSErr]');
      return () => { };
    }

    if (connectState === 'connected') {
      console.log('connect ([WSErr])');
      console.log ('從WsErr -> login ............')
    
        navigate('/login');

      return () => { 

      };
    }

    if (connectState === 'disconnect') {
      console.log('disconnect ([WSErr])');
      return () => { };
    }

    if (connectState === 'reconnected') {
      console.log('reconnected  ([WSErr])');
      // setIsLogin(false);  // 重連線後讓它自動跳往Menu又何妨呢?
      setConnectState('init');   // 狀態改變又會再執行一次
      
      console.log ('從WsErr -> login ............')
    
        navigate('/login');
  
      // 跳往login 畫面
      return () => { };
    }
// 它本來就是這個畫面不要再切換了
    // if (connectState === 'error') {
    //   console.log('Error (Login)');
    //   setConnectState('init');
    //   // 跳往error 畫面

    //   return () => { };
    // }
  }, [connectState]);


  return (
    <div
      // className = {styles.center}
      style={{
        textAlign: 'center',
        lineHeight: '10rem',
        backgroundColor: 'white',
        width: '320rem',
        height: '240rem',
        margin: 'auto',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderWidth: '1rem',
        borderStyle: 'solid',
        borderColor: MAIN_COLOR
      }}
    >
      {console.log(times)}
      <div style={{ position: 'relative', top: `${45}rem`, fontSize: `${40}rem`, color: 'orange' }}>網路錯誤 !!!</div>

{/* 一條橫線 */}
      <hr style={{ position: 'relative', top: `${90}rem`, color: MAIN_COLOR, margin: '0 10rem 0 10rem' }} />

      <div style={{ position: 'relative', top: `${145}rem`, fontSize: `${20}rem`, color:'orange' }} > <h3> 無法連接 WebSocket  </h3></div>
    </div>
  );
}
export default WSErr 
// import React , {useEffect} from 'react'
import { useEffect, useState, useContext } from 'react';

import { useNavigate } from "react-router-dom";
import { Content } from "@/App";
// css 的模組引入
import styles from "@/css/local.module.css";

 const  Logout = () => {
  const navigate = useNavigate();

  const {
    isLogin, setIsLogin,
    socketio, setSocketio,
    setActiveScreen,
  } = useContext(Content);

  useEffect(() => {
    console.log('logout 跳回來');
    setIsLogin(false);
    localStorage.removeItem('saclub_accessToken');
    setTimeout(() => {
      // 把ioSocket連線斷了它嗎？ (真的可以砍)
      //  socketio.disconnect();
    setActiveScreen('Login');
      // navigate('/Login');
    }, 100);
  }, []);

  return <div></div>;
}

export default Logout;
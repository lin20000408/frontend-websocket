import { useEffect, useContext, useState, useRef } from "react";

import { Content } from "@/App";

const UserGetWorkoutData = () => {
  const { mac, socketio, isLogin, setMac, ws,setWs } = useContext(Content);

  // 測試的mac
  // setMac("88da1a6b7da0");

  // 即時getWorkout 固定1sec 時間傳送一次

  const lastRequestTime = useRef(0);





  return <></>;
};
export default UserGetWorkoutData;

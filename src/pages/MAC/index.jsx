import {useEffect, useContext} from 'react';
import { BrowserRouter as Router, useParams } from 'react-router-dom';
import { Row, Col, Button, Divider, Input, Modal } from 'antd';


import { useNavigate } from "react-router-dom";
import { Content } from "@/App";
// css 的模組引入
import styles from "@/css/local.module.css";
/**
 * 從手機Scan QR Code後，並導向Mac驗證頁面
 * 或直接輸入網址進入亦可，並導向Mac驗證頁面
 * 輸入網址格式範例 https://yctmake.com/mac/00:11:22:33:44:55
 */
 const Mac = () => {
    const { mac, setMac, macErr,setMacErr , setCurrentScreen, setCurrentSub1Screen} = useContext(Content);
    const navigate = useNavigate();

    let { id } = useParams(); // 使用useParams hook取得URL中的參數
    console.log('mac_id=', id)

    // 判斷是否是正確的mac值才存儲
const validateAndNavigateWithMac = (id) => {
    if (isValidMac(id)) {
        setMac(id);
        setMacErr(false)
     
            navigate('/login', { replace: true }); // 如果Mac值有效，導航到/login
     
    } else {
        // 如果Mac值無效，執行適當的處理
        console.error("Invalid MAC address");
        setMac('')
        setMacErr(true)
        
            navigate('/login', { replace: true }); // 如果Mac值有效，導航到/login
    
        // 可能是顯示錯誤訊息或執行其他操作
    }
}

// 檢查MAC位址是否有效的函式
const isValidMac = (id) => {
    // 使用正則表達式檢查MAC位址的格式
    // const macRegex = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/;  // 正則表達式有冒號的判斷
    const macWithoutColonRegex = /^([0-9A-Fa-f]{2}){5}([0-9A-Fa-f]{2})$/; // 正則表達式沒有冒號的判絖
    return macWithoutColonRegex.test(id);
}


    useEffect(() => {
        validateAndNavigateWithMac(id) // 呼叫ackMac函式，判斷是否是正確的mac值才存儲

    }, [])


    return (
        <div>
            Mac
        </div>
    )
}
export default  Mac 
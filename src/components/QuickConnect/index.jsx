import React, { useEffect, useState, useContext } from 'react';
import { Row, Col, Space } from 'antd';
import { BACKGROUND_COLOR, DARKGRAY_COLOR, MAIN_COLOR } from '@/constants';
import { v4 as uuidv4 } from 'uuid';

import Home from '@/components/QuickConnect/Home';
import RealTimeMonitor from '@/components/QuickConnect/RealTimeMonitor'
import QuickConnectScanner from '@/components/QuickConnect/Html5Qrcode';

import { useNavigate } from "react-router-dom";
import { Content } from "@/App";
// css 的模組引入
import styles from "@/css/local.module.css";

const QuickConnect = () => {
    const {
        currentScreen,setCurrentScreen, currentSub1Screen, setCurrentSub1Screen 
    } = useContext(Content);


    const [result, setResult] = useState();
    let navigate = useNavigate();

    // 重新渲染背景
    useEffect(() => {
        document.body.style.backgroundImage = 'none';
        document.body.style.backgroundColor = BACKGROUND_COLOR
       
        // console.log ('currentSub1Screen[quickconnect.js]',currentSub1Screen)
    }, []);

    return (
        //  overflow:visible 为了解决外部容器滚动条不随着子容器滚动而滚动的问题
        <div style={{ overflow: 'visible'}}>
            {currentSub1Screen === 'quickConnectHomeScreen' &&
                <Home key={'quickConnectHomeScreen'} />
                // <RealTimeMonitor key={'quickConnectRealTimeMonitorScreen'} />

            }
            {currentSub1Screen === 'quickConnectScannerScreen' &&
                <QuickConnectScanner key={'quickConnectScannerScree'} />
            }

            {currentSub1Screen === 'quickConnectRealTimeMonitorScreen' &&
                <RealTimeMonitor key={'quickConnectRealTimeMonitorScreen'} />
            }
        </div>
    )
}

export default QuickConnect;




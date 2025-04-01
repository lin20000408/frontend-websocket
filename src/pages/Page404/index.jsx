// Pages/About/index.js

import React, { useContext } from 'react'
import { useNavigate } from "react-router-dom";
import { Row, Col, DatePicker } from 'antd';

import { Content } from '../../App'


const _404 = (props) => {
        // 使用 useContext 钩子从上下文中获取提供的值
    const { userProfile, workoutData } = useContext(Content);
    // 从 userProfile 和 workoutData 中解构出相应的状态值和更新函数

    const { speed, setSpeed, cal, setCal } = workoutData;

    const navigate = useNavigate()

    const onClick = () => {
        navigate('/')
    }

    return (
        <div style={{fontSize:30, color:'red'}} onClick = {onClick}>
          404
        </div>
    )
}
export default _404;
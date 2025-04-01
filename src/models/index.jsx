// models/index.js
import  { createContext } from "react";
export const Content = createContext({name:"",sex:"",height:""})
// 可以定義很多個export 用對象比較好處理
// export const Content2 = createContext({name:"",sex:"",height:""})
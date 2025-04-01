import "react-app-polyfill/ie11"; // 兼容 IE11
import "core-js/stable"; // 引入 core-js 提供的稳定 API
import "react-app-polyfill/stable"; // 提供額外的 Polyfill 支援
import "regenerator-runtime/runtime"; // 支持 async/await
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";

import "./index.css";
//  引入全局
import "@/css/global.css";

if(import.meta.env.VITE_NODE_ENV === "normal"){
    window.console.log = () => {};
    window.console.warn = () => {};
    window.console.error = () => {};
}
  ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>,
  );


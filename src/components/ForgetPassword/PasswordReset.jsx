import { useContext, useEffect, useState } from "react";
import {
  Button,
  Col,
  DatePicker,
  Flex,
  Calendar,
  Input,
  Modal,
  Row,
  Select,
  Space,
  message,
} from "antd";
import { useNavigate } from 'react-router-dom';
import { Content } from "@/App";
import { GlobalStateContext } from "@/App";
import {InfoCircleOutlined} from "@ant-design/icons"
export default function PasswordReset({passwordSaveChange,password,setPassword,errStrArray,setErrStrArray,setIsModalOpen,setConfirmPassword,confirmPassword}) {
    const navigate = useNavigate();

    useEffect(()=>{
        setErrStrArray([]);
      },[])
 

  const changePassword = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
  };
  const messages = {
    en: " Password must contain numbers and letters, have both uppercase and lowercase characters, and be at least 8 characters long.",
    zh:'密碼必須包含數字和字母，並且必須同時包含大寫和小寫字母，且長度至少為 8 個字符。',
  };
  const [messageApi, contextHolder] = message.useMessage();
  const handlePasswordBlur = () => {
    if (!validatePassword(password)) {
        let errorState = false;
        setErrStrArray([])
            setErrStrArray((prev) => [
              ...prev,
              globalstate === "en"
                ?  " Password must contain numbers and letters, have both uppercase and lowercase characters, and be at least 8 characters long."
                

                :'密碼必須包含數字和字母，並且必須同時包含大寫和小寫字母，且長度至少為 8 個字符。',
            ]);
            errorState = true;
          
        
    
        if (errorState) {
          setIsModalOpen(true);
          console.log("有錯誤errorState ");
          return;
        } else {
          console.log("沒有錯誤errorState ");
        }

    
    }
  };
  const { globalstate } = useContext(GlobalStateContext);
  const changeNewConfirmPassword = (e) => {
    const inputValue = e.target.value;
    setConfirmPassword(inputValue);
  };
  const messagesConfirm = {
    en: " Please ensure that the 'Confirm Password' matches the 'Password'.",
    zh:'請確保「確認密碼」與「密碼」相符。',
  };
  const handleConfirmPasswordBlur = () => {
    if (confirmPassword!==password) {
        let errorState = false;
        setErrStrArray([])
            setErrStrArray((prev) => [
              ...prev,
              globalstate === "en"
                ?   " Please ensure that the 'Confirm Password' matches the 'Password'."
  
                :'請確保「確認密碼」與「密碼」相符。',
            ]);
            errorState = true;
       
    
        if (errorState) {
          setIsModalOpen(true);
          console.log("有錯誤errorState ");
          return;
        } else {
          console.log("沒有錯誤errorState ");
        }
   
    }
  };

  return (
    <>
     {contextHolder}
      <div className="slide-in-from-bottom flex h-dvh items-center justify-center">
        <div className="text-[20rem] text-red-500">
          <div className="flex flex-col justify-center pt-[70rem] ">
            <div
              className="flex h-[382rem] max-h-[calc((100dvh-140rem))] w-[351rem]  flex-col items-center overflow-auto  border-mainColor bg-[#efefef] text-darkColor "
              style={{ borderWidth: "3rem" }}
            >
              <div className="mt-[38.4rem] w-[306rem] pl-[20rem] pr-[20rem] text-center text-[20rem] font-bold leading-[24rem]">
              
                {globalstate === "en" ? <span>   Password Reset</span> : <span className="font-['Open_Sans']">重設密碼</span>}
              </div>
              <div className="mb-[20rem] mt-[20rem] text-[16rem]">
                
                
              </div>
              <div className="text-[16rem]">
              {globalstate === "en" ? <span> Enter New Password</span> : <span className="font-['Open_Sans']">請輸入新密碼</span>}
              </div>
              <section className=" flex justify-center text-[calc(14rem)]">
                <div className=" flex h-[calc(42rem)] w-[calc(263.92rem)] items-center justify-center border-2 border-mainColor  bg-white">
                  <input
                    placeholder="............"
                    required
                    type="password"
                    onBlur={handlePasswordBlur}
                    // value={account1}
                    // width={'100%'}
                    // height={'100%'}
                    value={password}
                    onChange={changePassword}
                    className="b h-full w-full bg-transparent text-center
                      "
                  />
                </div>
              </section>
              <div className="mt-[20rem] text-[16rem]">
                
                {globalstate === "en" ? <span> Re-enter New Password</span> : <span className="font-['Open_Sans']">請再次輸入新密碼</span>}
              </div>
              <section className=" flex justify-center text-[calc(14rem)]">
                <div className=" flex h-[calc(42rem)] w-[calc(263.92rem)] items-center justify-center border-2 border-mainColor  bg-white">
                  <input
                    placeholder="............"
                    required
                    type="password"
                    onBlur={handleConfirmPasswordBlur}
                    // value={account1}
                    // width={'100%'}
                    // height={'100%'}
                    value={confirmPassword}
                    onChange={changeNewConfirmPassword}
                    className="b h-full w-full bg-transparent text-center
                      "
                  />
                </div>
              </section>
              <section className="mb-[25.5rem] mt-[22rem] flex justify-center">
                <div
                  style={{
                    background: `linear-gradient(to top, #80c342, #bae642)`,
                    lineHeight: "1rem",
                  }}
                  className="flex h-[49rem] w-[207rem] items-center justify-center border-[2rem] border-white text-[20rem] font-bold text-white"
                    onClick={passwordSaveChange}
                >
                  
                  {globalstate === "en" ? <span> SAVE CHANGES</span> : <span className="font-['Open_Sans']">儲存變更</span>}
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

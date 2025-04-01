import React from "react";
import { Content } from "@/App";
import { useEffect, useState, useContext, useRef } from "react";
import {
  BACKGROUND_COLOR,
  DARKBLACK_COLOR,
  DARKGRAY_COLOR,
  MAIN_COLOR,
  ORANGE_COLOR,
} from "@/constants";
import { Checkbox, Divider } from "antd";
import Icon_Close from '@/assets/icons2/Close.svg?react'
const CheckboxGroup = Checkbox.Group;
const plainOptions = [
    "Leg Curl",
    "Assisted Chin Dip",
    "Leg Extension",
    "Abdominal Crunch",
    "Low Row",
    "Abduction",
    "Lying Leg Curl",
    "Adduction",
    "Mid Row",
    "Back Extension",
    "Pec Deck",
    "Biceps Curl",
    "Pectoral Fly/ Rear Deltoid",
    "Cable Cross Over",
    "Pull Over",
    "Cable Tower",
    "Glutes",
    "Rotary Torso",
    "Horizontal Leg Pess",
    "Triceps Extension",
    "Independent Chest Press",
    "Hip Flexion",
    "Independent Lat Pull Down",
    "Other",
    "Independent Shoulder Press",
    "Lat Pull Down",
    "Lateral Raise"
];
const defaultCheckedList = [
    "Leg Curl",
    "Assisted Chin Dip",
    "Leg Extension",
    "Abdominal Crunch",
    "Low Row",
    "Abduction",
    "Lying Leg Curl",
    "Adduction",
    "Mid Row",
    "Back Extension",
    "Pec Deck",
    "Biceps Curl",
    "Pectoral Fly/ Rear Deltoid",
    "Cable Cross Over",
    "Pull Over",
    "Cable Tower",
    "Glutes",
    "Rotary Torso",
    "Horizontal Leg Pess",
    "Triceps Extension",
    "Independent Chest Press",
    "Hip Flexion",
    "Independent Lat Pull Down",
    "Other",
    "Independent Shoulder Press",
    "Lat Pull Down",
    "Lateral Raise"
];
export default function StrengthFilterActivity({filterActivity,setFilterActivity,filterFromChild}) {
  const {
    //
    setActiveScreen,

    // Connect

    connectState,
    setConnectState,
    currentScreen,
    setCurrentScreen,
    currentSub1Screen,
    setCurrentSub1Screen,
    currentSub2Screen,
    setCurrentSub2Screen,
    currentSub3Screen,
    setCurrentSub3Screen,
    currentSub4Screen,
    setCurrentSub4Screen,
  } = useContext(Content);

  useEffect(() => {
    if (connectState === "connected") {
      console.log("connect (Login)");
      return () => {};
    }

    if (connectState === "disconnect") {
      console.log("disconnect (Login)");
      return () => {};
    }

    if (connectState === "reconnected") {
      console.log("reconnected  (Login)");
      setConnectState("init");
      // 跳往login 畫面
      setTimeout(() => {
        setActiveScreen("loginScreen");
      }, 10);
      return () => {};
    }

    if (connectState === "error") {
      console.log("Error (Login)");
      setConnectState("init");
      // 跳往error 畫面
      setTimeout(() => {
        // navigate("/wserror");
      });
      return () => {};
    }
  }, [connectState]);
  //checkbox multiple
  const [checkedList, setCheckedList] = useState(defaultCheckedList);
  const checkAll = plainOptions.length === checkedList.length;
  const indeterminate =
    checkedList.length > 0 && checkedList.length < plainOptions.length;
  const onChange = (list) => {
    setCheckedList(list);
    filterFromChild(list);
    console.log('Selected values:', list); // Log the selected values
  };
  
  const onCheckAllChange = (e) => {
    setCheckedList(e.target.checked ? plainOptions : []);
  };

  const PressClose=()=>{
    setFilterActivity(false)
  
  }

  return (
    <>
      <div className="">
        <div className="h-[601rem] w-[347rem] border-[3rem] border-[#84BD00] bg-[#ffffff] relative">
          <div>
          <div className="absolute " style={{top:'6rem',right:'17.8rem'}} onClick={PressClose}><Icon_Close /></div>
            <div className="flex justify-center text-[12rem] mt-[20rem] mb-[11rem] h-[19rem]" style={{letterSpacing:'2rem'}}>Filter by Activity:</div>
            <div className="flex flex-col">
              <Checkbox
                indeterminate={indeterminate}
                onChange={onCheckAllChange}
                checked={checkAll}
                className="mb-[15rem] ml-[10rem]"
              >
                All
              </Checkbox>
              <div className="flex ">
                <CheckboxGroup
                  options={plainOptions}
                  value={checkedList}
                  onChange={onChange}
                  className="checkbox-group ml-[10rem] "
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .checkbox-group {
            display: flex;
            flex-wrap: wrap;
            gap: 5rem; /* Adjust spacing between checkboxes */
          }

          .checkbox-group .ant-checkbox-wrapper {
            width: calc(50% - 8px); /* Two checkboxes per row with spacing */
          }
        `}
      </style>
    </>
  );
}

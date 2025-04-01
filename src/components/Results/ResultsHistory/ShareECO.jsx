import React from "react";
import { Content } from "@/App";
import { Column } from "@antv/g2plot";
import { Col, Row, Select, Table } from "antd";
import { Button, Form, Input, Radio, Space } from "antd";
const { Search } = Input;

import { useEffect, useState, useContext, useRef } from "react";
import {
  BACKGROUND_COLOR,
  DARKGRAY_COLOR,
  MAIN_COLOR,
  ORANGE_COLOR,
} from "@/constants";
import Icon_DurationIcon from "@/assets/icons2/WorkoutDuration.svg?react";
import Icon_Calories from "@/assets/icons2/WorkoutCalories.svg?react";
import Icon_DistanceIcon from "@/assets/icons2/WorkoutDistance.svg?react";
import Icon_WorkoutActivity from "@/assets/icons2/WorkoutActivity.svg?react";
import Icon_Send from "@/assets/icons2/Send.svg?react";
import Icon_ECOPowrPlusLogo from "@/assets/icons/ECOPowrPlusLogo.svg?react";
import Icon_ECOWatts from "@/assets/icons/ECOWatts.svg?react";
import Icon_ECOcomputer from "@/assets/icons/ECOcomputer.svg?react";
import Icon_ECOcoffee from "@/assets/icons/ECOcoffee.svg?react";
import Icon_ECOphones from "@/assets/icons/ECOphones.svg?react";

import html2canvas from 'html2canvas-pro';
// import emailjs from 'emailjs-com';
function convertTimeFormat(timeString, duration) {
  const [time, period] = timeString.split(" ");
  const [hours, minutes, seconds] = time.split(":").map(Number);

  let convertedHours = parseInt(hours);
  if (period === "pm" && convertedHours !== 12) {
    convertedHours += 12;
  } else if (period === "am" && convertedHours === 12) {
    convertedHours = 0;
  }

  const [durationHours, durationMinutes, durationSeconds] = duration
    .split(":")
    .map(Number);
  const totalSeconds =
    durationHours * 3600 + durationMinutes * 60 + durationSeconds;

  const newSeconds =
    (convertedHours * 3600 + minutes * 60 + seconds + totalSeconds) % 86400;
  const newHours = Math.floor(newSeconds / 3600);
  const newMinutes = Math.floor((newSeconds % 3600) / 60);

  let formattedHours = newHours % 12 || 12;
  const amPm = newHours >= 12 ? "pm" : "am";

  const convertedTime = `${formattedHours}:${newMinutes.toString().padStart(2, "0")} ${amPm}`;

  return { convertedTime, totalSeconds };
}

export default function ShareECO({
  watts,
  activity,
  duration,
  time,
  distance,
  calories,
  date,
}) {
  const timeString = time;
  const timeDuration = duration;
  const { convertedTime, totalSeconds } = convertTimeFormat(
    timeString,
    timeDuration,
  );
  //send
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState("horizontal");

  const onFormLayoutChange = ({ layout }) => {
    setFormLayout(layout);
  };

  const formItemLayout =
    formLayout === "horizontal"
      ? {
          labelCol: { span: 4 },
          wrapperCol: { span: 20 },
        }
      : null;
//screen send to email
const captureRef = useRef(null);

  const captureAndSend = () => {
    const elementToCapture = document.getElementById('capture-area');
    
    if (!elementToCapture) {
      console.error('Element with id "capture-area" not found');
      return;
    }

    html2canvas(elementToCapture, {
      useCORS: true,
      scale: 2,
      logging: true,
      allowTaint: true
    }).then((canvas) => {
      const image = canvas.toDataURL('image/png');
      
      const templateParams = {
        to_email: 'recipient@example.com',
        from_name: 'Sender Name',
        message: 'Here is the screenshot',
        image: image,
      };
//!等串接EMAIL API 不然EMAILJS只能限制50KB大小 而且用後端才不會有資安問題
    //   emailjs.send(
    //     'service_8f9xzme',
    //     'template_yvo4x0h',
    //     templateParams,
    //     'wvvpif3Y8eP5kStts'
    //   )
    //   .then((response) => {
    //     console.log('Email sent!', response.status, response.text);
    //   }, (error) => {
    //     console.log('Failed to send email:', error);
    //   });
    });
  };

  return (
    <>
      <div className="w-[30rem]"></div>
      <div className="h-[667rem] overflow-y-auto">
      <div   id="capture-area">
        <div className="flex flex-col items-center justify-center">
          <div
            className=" mt-[18rem] text-[20rem] font-bold text-[#333F48] "
            style={{ letterSpacing: "4rem" }}
          >
            YOUR SPORTSART
          </div>
          <div className="mb-[9rem] mt-[8rem]">
            <Icon_ECOPowrPlusLogo />{" "}
          </div>
          <div
            className="mb-[12.5rem] text-[20rem] font-bold text-[#333F48]"
            style={{ letterSpacing: "4rem" }}
          >
            WORKOUT RESULTS
          </div>
        </div>
        {/* FIXME:Total watts generated */}
        <div
          className="mb-[8rem] ml-[30rem] flex h-[94rem]    w-[316rem] justify-between pr-[15rem] text-[16rem]"
          style={{
            color: "black",
            background:
              "linear-gradient(to top left, rgba(128, 195, 66, 1) 0%, rgba(186, 230, 66, 1) 100%)",
          }}
        >
          <div className="ml-[15rem] mt-[10rem]">
            <div
              className="h-[16rem] text-[12rem] text-[#333F48]"
              style={{ letterSpacing: "4rem" }}
            >
              Total watts generated
            </div>
            <div
              className="ml-[15rem] h-[40rem] text-[30rem] font-semibold text-[#333F48]"
              style={{ letterSpacing: "0.5rem" }}
            >
              {watts}
              {""}
              <span className="text-[20rem]"> WH</span>
            </div>
          </div>
          <div className="ml-[3.6rem] mt-[14rem]">
            <Icon_ECOWatts />
          </div>
        </div>
        {/* FIXME:You generated energy to */}
        <div
          className="mb-[8rem] ml-[30rem] flex h-[248rem] w-[316rem]    flex-col  pr-[15rem] text-[16rem]"
          style={{
            color: "black",
            background:
              "linear-gradient(to top left, rgba(128, 195, 66, 1) 0%, rgba(186, 230, 66, 1) 100%)",
          }}
        >
          <div className="ml-[15rem] mt-[12rem] ">
            <div
              className="h-[15rem] text-[12rem] font-semibold italic text-[#333F48] "
              style={{ letterSpacing: "2rem" }}
            >
              YOU GENERATED ENERGY TO
            </div>
          </div>
          {/* COMPUTER */}
          <div className="ml-[3.6rem] mt-[9rem]  flex  justify-between ">
            <div
              className="ml-[15rem] mr-[15rem] h-[42rem]  text-[18rem] font-semibold text-[#333F48]"
              style={{ letterSpacing: "0.5rem", lineHeight: "20rem" }}
            >
              POWER A COMPUTER FOR {watts / 62.5} HOURS
            </div>
            <div>
              <Icon_ECOcomputer />
            </div>
          </div>
          <div
            className="mb-[8rem] ml-[23.4rem] mt-[8rem] text-[12rem] font-semibold italic "
            style={{ letterSpacing: "2rem" }}
          >
            OR
          </div>
          {/* COFFEE */}
          <div className="ml-[3.6rem]   flex  justify-between ">
            <div
              className="ml-[15rem] mr-[15rem] h-[42rem] text-[18rem] font-semibold text-[#333F48]"
              style={{ letterSpacing: "0.5rem", lineHeight: "20rem" }}
            >
              Brew {watts / 125} <br />
              Cup of Coffee
            </div>
            <div>
              <Icon_ECOcoffee />
            </div>
          </div>
          <div
            className="mb-[8rem] ml-[23.4rem] mt-[8rem] text-[12rem] font-semibold italic"
            style={{ letterSpacing: "2rem" }}
          >
            OR
          </div>
          {/* PHONES */}
          <div className="ml-[3.6rem]  flex  justify-between ">
            <div
              className="ml-[15rem] mr-[15rem] h-[42rem] text-[18rem]  font-semibold text-[#333F48]"
              style={{ letterSpacing: "0.5rem", lineHeight: "20rem" }}
            >
              Charge {watts / 5}
              <br /> Smartphones
            </div>
            <div>
              <Icon_ECOphones />
            </div>
          </div>
        </div>

        {/* FIXME:WORKOUT TYPE */}
        <div
          className="mb-[8rem] ml-[30rem] flex h-[94rem]    w-[316rem] justify-between pr-[15rem] text-[16rem]"
          style={{
            color: "black",
            background:
              "linear-gradient(to top left, rgba(128, 195, 66, 1) 0%, rgba(186, 230, 66, 1) 100%)",
          }}
        >
          <div className="ml-[15rem] mt-[10rem]">
            <div
              className="h-[16rem] text-[12rem] text-[#333F48]"
              style={{ letterSpacing: "4rem" }}
            >
              WORKOUT TYPE
            </div>
            <div
              className="ml-[15rem] mt-[7rem] h-[30rem] text-[20rem] font-semibold text-[#333F48]"
              style={{ letterSpacing: "0.5rem", lineHeight: "22rem" }}
            >
              ECO-POWR™ Recumbent Cycle
              {/* {activity} */}
            </div>
          </div>
          <div className="ml-[3.6rem] mt-[14rem]">
            <Icon_WorkoutActivity />
          </div>
        </div>
        {/* FIXME:WORKOUT TIME */}
        <div
          className="mb-[8rem] ml-[30rem] flex h-[94rem]    w-[316rem] justify-between pr-[15rem] text-[16rem]"
          style={{
            color: "black",
            background:
              "linear-gradient(to top left, rgba(128, 195, 66, 1) 0%, rgba(186, 230, 66, 1) 100%)",
          }}
        >
          <div className="ml-[15rem] mt-[12rem]">
            <div
              className="h-[16rem] text-[12rem] text-[#333F48]"
              style={{ letterSpacing: "4rem" }}
            >
              WORKOUT TIME
            </div>
            <div
              className="ml-[15rem] h-[40rem] text-[30rem] font-semibold text-[#333F48]"
              style={{ letterSpacing: "0.5rem" }}
            >
              {" "}
              {duration}
            </div>
          </div>
          <div
            className="ml-[3.6rem] mt-[14rem] w-[54rem]"
            style={{ marginLeft: "5%" }}
          >
            <Icon_DurationIcon style={{ width: "54rem" }} />
          </div>
        </div>
        {/* FIXME:WORKOUT DISTANCE */}
        <div
          className="flex-column mb-[8rem] ml-[30rem] flex h-[94rem]   w-[316rem] justify-between pr-[15rem] text-[16rem]"
          style={{
            color: "black",
            background:
              "linear-gradient(to top left, rgba(128, 195, 66, 1) 0%, rgba(186, 230, 66, 1) 100%)",
          }}
        >
          <div className="ml-[15rem] mt-[12rem]">
            <div
              className="h-[12rem] text-[10rem] text-[#333F48]"
              style={{ letterSpacing: "2rem" }}
            >
              WORKOUT DISTANCE
            </div>
            <div
              className="ml-[15rem] h-[40rem] text-[30rem] font-semibold text-[#333F48]"
              style={{ letterSpacing: "0.5rem" }}
            >
              {" "}
              {distance}&nbsp;<span className="text-[20rem]">MILES</span>
            </div>
          </div>
          <div className="ml-[3.6rem] mt-[14rem]" style={{ marginLeft: "5%" }}>
            <Icon_DistanceIcon />
          </div>
        </div>
        {/* FIXME:WORKOUT CALORIES */}
        <div
          className="flex-column mb-[8rem] ml-[30rem] flex h-[94rem]   w-[316rem] justify-between  pr-[15rem] text-[16rem]"
          style={{
            color: "black",
            background:
              "linear-gradient(to top left, rgba(128, 195, 66, 1) 0%, rgba(186, 230, 66, 1) 100%)",
          }}
        >
          <div className="ml-[15rem] mt-[12rem]">
            <div
              className="h-[16rem] text-[12rem] text-[#333F48]"
              style={{ letterSpacing: "4rem" }}
            >
              WORKOUT CALORIES
            </div>
            <div
              className="ml-[15rem] h-[40rem] text-[30rem] font-semibold text-[#333F48]"
              style={{ letterSpacing: "0.5rem" }}
            >
              {" "}
              {calories}
            </div>
          </div>
          <div className="ml-[3.6rem] mt-[14rem]" style={{ marginLeft: "5%" }}>
            <Icon_Calories />
          </div>
        </div>
        <div className="flex  justify-center">
          <div className="flex w-[315rem]  justify-between">
            {/* FIXME:WORKOUT DATE */}
            <div
              className="flex-column mb-[8rem]  flex h-[58rem]   w-[153rem] justify-between  text-[16rem] "
              style={{
                color: "black",
                background:
                  "linear-gradient(to top left, rgba(128, 195, 66, 1) 0%, rgba(186, 230, 66, 1) 100%)",
              }}
            >
              <div className="ml-[15rem] mt-[5rem]">
                <div
                  className="h-[12rem] text-[10rem] text-[#333F48]"
                  style={{ letterSpacing: "2rem" }}
                >
                  WORKOUT DATE
                </div>
                <div
                  className="ml-[15rem] h-[30rem] text-[25rem] font-semibold text-[#333F48] "
                  style={{ letterSpacing: "0.5rem" }}
                >
                  {" "}
                  {date}
                </div>
              </div>
            </div>
            {/* FIXME:WORKOUT END TIME */}
            <div
              className="flex-column mb-[8rem] ml-[15rem] flex h-[58rem]   w-[153rem] justify-between  text-[16rem] "
              style={{
                color: "black",
                background:
                  "linear-gradient(to top left, rgba(128, 195, 66, 1) 0%, rgba(186, 230, 66, 1) 100%)",
              }}
            >
              <div className="ml-[15rem] mt-[5rem]">
                <div
                  className="h-[12rem] text-[10rem] text-[#333F48]"
                  style={{ letterSpacing: "2rem" }}
                >
                  WORKOUT END TIME
                </div>
                <div
                  className="ml-[10rem] h-[30rem] text-[25rem] font-semibold  text-[#333F48]"
                  style={{ letterSpacing: "0.5rem" }}
                >
                  {" "}
                  {convertedTime}
                </div>
              </div>
            </div>
          </div>
        </div>
</div>
        <div
          className="h-[84rem]  w-[100%] fixed bottom-0"
          style={{ backgroundColor: "rgba(60, 60, 60, 0.8)" }}
        >
          <div className=" flex h-[63rem] flex-col items-center justify-center">
            <div className="mb-[4rem] flex h-[22rem] justify-center text-[18rem] font-bold italic text-[#84BD00]">
              Share your results
            </div>
            <Form
              {...formItemLayout}
              layout={formLayout}
              form={form}
              initialValues={{ layout: formLayout }}
              onValuesChange={onFormLayoutChange}
              style={{ maxWidth: formLayout === "inline" ? "none" : 600 }}
              className=" w-[315rem] "
            >
              <Search
                placeholder="Enter Email Address"
                style={{ border: "2rem solid #84BD00" }}
                enterButton={
                  <Button
                    type="primary"
                    icon={<Icon_Send />}
                    style={{
                      fontStyle: "italic",
                      fontSize: "12rem",
                      letterSpacing: "0.5rem",
                    }}
                    onClick={captureAndSend}
                  >
                    SEND
                  </Button>
                }
                onSearch={(value) => console.log(value)}
              />
            </Form>
          </div>
        </div>
      </div>

      <div className="h-[30rem]"> </div>
    </>
  );
}

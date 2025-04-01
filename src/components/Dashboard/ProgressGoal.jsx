import React, { useState } from "react";
import "@/css/global.css";
import { Row, Col, Progress } from "antd";
export default function ProgressGoal({
  title = "title",
  percent = 0,
  unit = "unit",
  icon: Icon,
  handleEditGoalClick = " handleEditGoalClick",
}) {
  const conicColors = { "0%": "#80c342", "100%": "#bae642" };
  return (
    <div className="justify-center flex">
      <Row className="relative    h-[calc(124.5rem)] w-[calc(350rem)]   bg-white">
        <Col className="w-dvw ">
          <div className="mb-[calc(6.1rem)] mr-[calc(10.3rem)] mt-[calc(8.4rem)] flex justify-between pl-[calc(11.5rem)]">
            <div
              className="flex items-center text-[calc(15rem)] font-bold "
              style={{ lineHeight: "20rem", height: "18rem" }}
            >
              {title}
            </div>
            <div
              onClick={handleEditGoalClick}
              className="flex items-center pr-[calc(13rem)] text-[calc(13rem)]"
              style={{ color: "#8B8B8E" }}
            >
              Edit Goal
            </div>
          </div>
          <div className="mb-[calc(5.5rem)] h-[calc(90rem)]  w-[calc(322.85rem)] ">
            <div className="mb-[calc(1.09rem)] ml-[calc(11.5rem)] mr-[calc(10.3rem)] mt-[calc(1.09rem)] flex h-[calc(23.65rem)] ">
              {/* stokeColor: 是漸層色  */}

              {/* 進度表 */}
              <Progress
                showInfo={false}
                strokeLinecap="square"
                strokeColor={conicColors}
                percent={percent * 100}
                size={["calc(322.85rem )", "calc(23.63rem )"]}
                className="items-center] flex "
              />
            </div>
            <div className="ml-[calc(11.5rem)] mr-[calc(10.3rem)] h-[calc(44.07rem)] text-[calc(35rem)] font-bold  text-mainColor">
              {percent * 100}/100
            </div>
            <div
              className="ml-[calc(11.5rem)] mr-[calc(10.3rem)] h-[calc(17rem)] text-[calc(13rem)]"
              style={{ color: "#53565A", lineHeight: "20rem", height: "17rem" }}
            >
              {unit}
            </div>
          </div>

          <span className=" absolute bottom-[calc(10rem)] right-[calc(10rem)]">
            <Icon className="h-[calc(33rem)] w-[calc(33rem)] " />
          </span>
        </Col>
      </Row>
    </div>
  );
}

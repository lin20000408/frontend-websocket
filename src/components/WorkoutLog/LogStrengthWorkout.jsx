import React, { useContext, useEffect, useState, useRef } from "react";

import { Col, Row, Input, Calendar, TimePicker } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { Content } from "@/App";
// css 的模組引入
import styles from "@/css/local.module.css";

import {
  BACKGROUND_COLOR,
  DARKBLACK_COLOR,
  DARKGRAY_COLOR,
  MAIN_COLOR,
} from "@/constants";

export default function LogStrengthWorkout() {
  const [blocks, setBlocks] = useState([0]); // 初始化一个block
  const [activity, setActivity] = useState("");
  const changeActivity = (e) => {
    setActivity(e.target.value);
  };
  const [weight, setWeight] = useState("");
  const changeWeight = (e) => {
    setWeight(e.target.value);
  };

  const [date, setDate] = useState(null);
  const [open, setOpen] = useState(false);
  const [birthday, setBirthday] = useState("08/07/1971");
  const changeBirthDate = (date, dateString) => {
    console.log("changeBirthDate = ", date, dateString);
    console.log("changeBirthDateString = ", dateString); // 08/07/1971
    setBirthday(dateString);
  };
  const handleDateSelect = (value) => {
    setDate(value);
    setOpen(false);
  };
  const [repetitions, setRepetitions] = useState("");
  const changeRepetitions = (e) => {
    setRepetitions(e.target.value);
  };
  dayjs.extend(customParseFormat);

  const [time, setTime] = useState(null);
  const changeTime = (e) => {
    setTime(e.target.value);
  };
  const [sets, setSets] = useState("");
  const changeSets = (e) => {
    setSets(e.target.value);
  };

  const addClick = () => {
    console.log("addClick");
    setBlocks((prevBlocks) => [...prevBlocks, prevBlocks.length]);
  };

  const clearInputs = () => {
    setActivity("");
    setWeight("");
    setDate(null);
    setRepetitions("");
    setSets("");
    setTime(null);
  };
  const renderStrengthBlock = (key) => (
    <React.Fragment key={key}>
      {key > 0 && (
        <div className="flex justify-center">
          <div
            style={{
              borderTop: `1rem solid #1072B2`,
              margin: "22rem 0",

              width: "92%",
            }}
          />
        </div>
      )}
      <div id={`StrengthBlock-${key}`} key={key}>
        <Row
          justify={"space-evenly"}
          align={"center"}
          style={{ marginTop: "22rem" }}
        >
          <Col>
            <div>ACTIVITY</div>
            <Input
              variant="borderless"
              maxLength={36}
              style={{
                textAlign: "center",
                width: "calc(162rem)",
                height: "calc(42rem)",
                border: `2rem solid ${MAIN_COLOR}`,
                fontSize: "calc(14rem)",
              }}
              className={`font-semibold ${styles.signUpInputBigFrame}`}
              placeholder="Chest Press"
              onChange={changeActivity}
              value={activity}
            />
          </Col>
          <Col>
            <div>WEIGHT</div>
            <Input
              variant="borderless"
              maxLength={36}
              style={{
                textAlign: "center",
                width: "calc(162rem)",
                height: "calc(42rem)",
                border: `2rem solid ${MAIN_COLOR}`,
                fontSize: "calc(14rem)",
              }}
              className={`font-semibold ${styles.signUpInputBigFrame}`}
              placeholder="25lbs"
              onChange={changeWeight}
              value={weight}
            />
          </Col>
        </Row>
        <Row
          justify={"space-evenly"}
          align={"center"}
          style={{ marginTop: "19.2rem" }}
        >
          <Col>
            <div>WORKOUT DATE</div>
            <div style={{ fontSize: "12rem" }}>{"MM/DD/YY"}</div>
            <Row justify={"center"}>
              <div style={{ position: "relative" }}>
                <Input
                  value={date ? date.format("MM/DD/YYYY") : ""}
                  placeholder="08/07/1971"
                  readOnly
                  style={{
                    textAlign: "center",
                    width: "calc(162rem)",
                    height: "calc(42rem)",
                    border: `2rem solid ${MAIN_COLOR}`,
                  }}
                  className={`font-semibold ${styles.signUpInputBigFrame}`}
                  onClick={() => {
                    setOpen(!open);
                    changeBirthDate();
                  }}
                />
                {open && (
                  <div style={{ position: "absolute", zIndex: 1 }}>
                    <Calendar
                      fullscreen={false}
                      onSelect={handleDateSelect}
                      style={{ width: "200rem" }}
                    />
                  </div>
                )}
              </div>
            </Row>
          </Col>
          <Col>
            <div className="mt-[17rem]">{"REPETITIONS "}</div>
            <Input
              variant="borderless"
              maxLength={36}
              style={{
                textAlign: "center",
                width: "calc(162rem)",
                height: "calc(42rem)",
                border: `2rem solid ${MAIN_COLOR}`,
              }}
              className={`font-semibold ${styles.signUpInputBigFrame}`}
              placeholder="10"
              onChange={changeRepetitions}
              value={repetitions}
            />
          </Col>
        </Row>

        <Row justify={"space-evenly"} style={{ marginTop: "19.2rem" }}>
          <Col>
            <div>WORKOUT</div>
            <div>END TIME</div>
            <div className="flex items-center justify-center">
              <TimePicker
                placeholder="4:30:30 PM"
                use12Hours
                size="large"
                style={{
                  textAlign: "center",
                  width: "calc(162rem)",
                  height: "calc(42rem)",
                  border: `2rem solid ${MAIN_COLOR}`,
                }}
                format="h:mm:ss A"
                onChange={changeTime}
                value={time}
              />
            </div>
          </Col>
          <Col>
            <div style={{ visibility: "hidden" }}>xxx</div>
            <div>SETS</div>
            <Input
              variant="borderless"
              maxLength={36}
              style={{
                textAlign: "center",
                width: "calc(162rem)",
                height: "calc(42rem)",
                border: `2rem solid ${MAIN_COLOR}`,
                fontSize: "calc(14rem)",
              }}
              className={`font-semibold ${styles.signUpInputBigFrame}`}
              placeholder="3"
              onChange={changeSets}
              value={sets}
            />
          </Col>
        </Row>
        <Row
          justify={"space-evenly"}
          align={"center"}
          style={{ marginTop: "19.2rem" }}
        >
          <Col
            style={{
              width: "162rem",
              height: "15rem",
              textAlign: "end",
              fontSize: "12rem",
              lineHeight: "15rem",
            }}
          >
            {" "}
          </Col>
          <Col
            style={{
              width: "162rem",
              height: "15rem",
              textAlign: "end",
              fontSize: "12rem",
              lineHeight: "15rem",
            }}
            onClick={clearInputs}
          >
            Clear
          </Col>
        </Row>
      </div>{" "}
    </React.Fragment>
  );
  //!save post存資料到資料庫，不需要get印資料庫的資料出來
  const saveWorkoutClick = () => {};
  return (
    <div>
      <div style={{ fontSize: "16rem", textAlign: "center" }}>
        {blocks.map(renderStrengthBlock)}
        <Row
          justify={"center"}
          style={{ marginTop: "22rem" }}
          onClick={saveWorkoutClick}
        >
          <Col className={styles.workoutLogButton}>SAVE WORKOUT</Col>
        </Row>
        <Row
          justify={"center"}
          style={{ marginTop: "22rem" }}
          onClick={addClick}
        >
          <Col className={styles.workoutLogSmallButton}>{"+ ADD MORE"}</Col>
        </Row>
      </div>
    </div>
  );
}

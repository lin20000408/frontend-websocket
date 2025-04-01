import React, { useEffect, useState, useContext, useRef } from "react";
import { Row, Col } from "antd";
import {
  BACKGROUND_COLOR,
  DARKBLACK_COLOR,
  DARKGRAY_COLOR,
  MAIN_COLOR,
  NAVIBAR_SIZE,
} from "@/constants";

import { useNavigate } from "react-router-dom";
import { Content } from "@/App";
// css 的模組引入
import styles from "@/css/local.module.css";


export default function RealtimeStrength() {
    return (
      <div>
        <div style={{ fontSize: 16, textAlign: "center" }}>
          <Row
            justify={"space-evenly"}
            align={"center"}
            style={{ marginTop: 22 }}
          >
            <Col>
              <div> ACTIVITY</div>
              <div className={styles.workoutLogFrameStyle}>Chest Press</div>
            </Col>
            <Col>
              <div> WEIGHT</div>
              <div className={styles.workoutLogFrameStyle}>25lbs</div>
            </Col>
          </Row>
  
          <Row
            justify={"space-evenly"}
            align={"center"}
            style={{ marginTop: 19.2 }}
          >
            <Col>
              <div> WORKOUT DATE</div>
              <div style={{ fontSize: 12 }}>{"MM/DD/YY"}</div>
              <div className={styles.workoutLogFrameStyle}>{"06/08/23"}</div>
            </Col>
            <Col>
              <div style={{ visibility: "hidden" }}>xxx</div>
              <div style={{}}>{"REPETITIONS "}</div>
              <div className={styles.workoutLogFrameStyle}>10</div>
            </Col>
          </Row>
  
          <Row justify={"space-evenly"} style={{ marginTop: 19.2 }}>
            <Col>
              <div>WORKOUT</div>
              <div> END TIME </div>
              <div className={styles.workoutLogFrameStyle}>{"4:15 pm"}</div>
            </Col>
            <Col>
              {/* visibility佔位但不顯示  */}
              <div style={{ visibility: "hidden" }}>xxx</div>
              <div>SETS </div>
              <div className={styles.workoutLogFrameStyle}>3</div>
            </Col>
          </Row>
          <Row
            justify={"space-evenly"}
            align={"center"}
            style={{ marginTop: 19.2 }}
          >
            <Col
              style={{
                width: 162,
                height: 15,
                textAlign: "end",
                fontSize: 12,
                lineHeight: "15px",
              }}
            >
              {" "}
            </Col>
            <Col
              style={{
                width: 162,
                height: 15,
                textAlign: "end",
                fontSize: 12,
                lineHeight: "15px",
              }}
            >
              Clear
            </Col>
          </Row>
  
          <Row justify={"center"} style={{ marginTop: 22 }}>
            <Col className={styles.workoutLogButton}>SAVE WORKOUT</Col>
          </Row>
          <Row justify={"center"} style={{ marginTop: 22 }}>
            <Col className={styles.workoutLogSmallButton}>{"+ADD MORE"}</Col>
          </Row>
        </div>
      </div>
    );
  }

import React from "react";
import { Row, Col, Button, Input, Modal } from "antd";
export default function StepTwoBackButton({backToStep1ClickCancel,backToStep1ClickConfirm}) {
  return (
    <div className="flex items-center justify-center bg-white h-dvh">
      <div
        className="h-[197rem] w-[328rem] bg-[#EFEFEF]"
        style={{ border: "3rem solid #84BD00" }}
      >
        <div className="text-[20rem] mt-[29rem] font-bold italic text-[#333f48] h-[69.5rem] text-center ">
          <div className="leading-[20rem]">Are you sure you</div>
          <div className="leading-[20rem]">want to go back? </div>
          <div className="leading-[20rem]">You will lose unsaved work.</div>
        </div>
        <Row wrap={false} style={{ marginTop: "10rem" }} className="flex justify-center ">
          <Col
            // onClick={pressSaveWorkout}
            style={{
              lineHeight: "49rem",
              width: "127rem",
              height: "49rem",
              // backgroundColor: '#84bd00',
              border:'white solid 2rem',
              background: `linear-gradient(to right, #80c342, #bae642)`,
              fontSize: "20rem",
              marginRight: "14rem",
              marginLeft: "14rem",
              color: "#fff",
            }}
            className="font-bold"
            onClick={backToStep1ClickConfirm}
          >
            CONFIRM
          </Col>

          <Col
            // onClick={pressBack}
            style={{
              fontSize: "20rem",
              lineHeight: "49rem",
              width: "127rem ",
              height: "49rem",
              color: "#fff",
              border:'white solid 2rem',
              // 具有漸層色
              background: `linear-gradient(to right, #80c342, #bae642)`,
            }}
            onClick={backToStep1ClickCancel}
            className="font-bold"
          >
            CANCEL
          </Col>
        </Row>
      </div>
    </div>
  );
}

import React from "react";
import { Row, Col, Dropdown, Space } from "antd";

export default function RewardCard({ photo1, rewardGood,accumulatedWatts,QuantityTop,QuantityBottom }) {
  return (
    <>
      <div
        className="mt-[4rem] flex flex-col"
        style={{
          width: "344rem",
          backgroundColor: "white",
          height: "232rem",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        {/* 子1  */}
        <Row>
          <Col
            className="mb-[7rem] ml-[10rem] mt-[7.4rem] h-[18rem] font-bold"
            style={{
              fontSize: "15rem",

              color: "#333f48",
            }}
          >
            Reward
          </Col>
        </Row>

        {/*子2 */}
        <Row className="mb-[13rem]  flex items-center">
          <Col
            style={{
              width: "89rem",
              height: "66rem",
              marginLeft: "10.9rem",

              border: "2rem solid #84BD00",
            }}
            className="flex items-center justify-center"
          >
            <img src={photo1} className="w-full " alt="" />
          </Col>

          <Col
            style={{
              fontSize: "13rem",
              marginLeft: "11.2rem",
              color: "#53565a",
            }}
          >
            {rewardGood}
          </Col>
        </Row>

        {/* 畫水平點線 */}
        <div className="flex  flex-col items-center">
          <div className="  w-[92%]   ">
            <div className="border-t-[4rem] border-dotted border-mainColor"></div>
          </div>
        </div>

        {/*
概念: 分3塊區域獨立的(左中右)
*/}
        <div className="flex flex-row ">
          {/* 左 */}
          <div className="ml-[10rem] flex w-[48%]  flex-col">
            <div className=" mt-[10rem]  h-[17rem] text-[15rem] font-bold">
              Watts Needed{" "}
            </div>
            <div className=" h-[17rem]  text-[15rem] font-bold">to Redeem </div>
            <div className="mb-[3rem] mt-[3rem] h-[43rem] text-[35rem] font-bold text-mainColor">
             {accumulatedWatts}
            </div>
            <div className=" text-[15rem]">WH</div>
          </div>
          {/* 中 */}
          <div className="flex   items-center">
            <div className="flex flex-col ">
              <div className="border-l-[4rem] border-dotted border-mainColor     ">
                <div className="h-[100rem] w-[1rem]"></div>
              </div>
            </div>
          </div>
          {/* 右 */}
          <div className="ml-[19rem] mt-[10rem] flex w-[48%] flex-col">
            <div className="h-[17rem]  text-[15rem] font-bold  "> Quantity</div>
            <div className="h-[17rem]  text-[15rem] font-bold">
              {" "}
              Redeemable{" "}
            </div>
            <div className="mb-[3rem] mt-[3rem] h-[43rem] text-[35rem] font-bold text-mainColor">
              {QuantityTop}
            </div>
            <div className=" text-[15rem] ">      {QuantityBottom} </div>
          </div>
        </div>
      </div>
    </>
  );
}

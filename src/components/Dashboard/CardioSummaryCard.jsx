import React from "react";
import "@/css/global.css";
import { Row, Col, Progress } from "antd";
export default function CardioSummaryCard({
    title='title',
    time=10,
    content='content',
    icon:Icon,
    height=0,
    fontSize='16rem'
}) {
  return (
    <>
     
      <Col className=" relative  h-[calc(107.49rem)] w-[calc(167.69rem)]  bg-white mb-[10rem]" >
        <div className="mt-[calc(7.4rem)] pl-[calc(10rem)]  font-bold" style={{fontSize:fontSize}}>
          {title}
        </div>

        <div className="mb-[calc(-15rem)] pl-[calc(8rem)] text-[calc(35rem)]  font-bold text-mainColor">
          {time}
          {/* {console.log ('WeekData ===================',weekData)} */}
        </div>
        <div className=" flex items-center justify-between pl-[calc(10.1rem)] pr-[calc(10.1rem)]">
          <div className="text-[calc(13rem)]"> {content} </div>
          <div className=" flex h-[calc({height}rem)]   items-center justify-center" >
           
            <Icon className="w-full " />
          </div>
        </div>
      </Col>
      
    </>
  );
}

import React from "react";
import { useState, useContext, useRef, useEffect } from "react";
import { Content } from "@/App";
import EditPowrPage from "@/components/CreateWorkout/CreateWorkoutStepTwo/EditPowrPage";
export default function WorkoutBuilderSectionEditBox(props) {
  const {
    deleteWorkoutIdToDBClick,
    treadmillStepTwoClick,
    totalValue,
    name,
    workoutType,
    workoutPowrOrNot,
    workoutPhaseinfo,
  } = props;

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
    workoutbuilderStepTwoId,
    setWorkoutbuilderStepTwoId,
  } = useContext(Content);




  return (
    <>
      <div className="mb-[8.9rem]   flex h-[110rem] w-[158rem] flex-col bg-[#fff] pl-[10rem]">
        <div className="mt-[7.4rem] text-[15rem] font-bold">{name}</div>
        <div className="h-[52rem] text-[25rem] font-bold text-[#84bd00]">
          {totalValue}
        </div>
        <div className="flex justify-between">
          <div
            className="mb-[3rem] h-[15rem] text-[12rem]  "
            onClick={treadmillStepTwoClick}
          >
            Edit
          </div>
          <div
            className="mb-[3rem] mr-[10rem] h-[15rem] text-[12rem]"
            onClick={deleteWorkoutIdToDBClick}
          >
            Delete
          </div>
        </div>
      </div>

      
    </>
  );
}

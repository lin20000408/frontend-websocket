import React from "react";
import { useState, useContext, useRef, useEffect } from "react";
import { Content } from "@/App";
import EditPowrPage from "@/components/CreateWorkout/CreateWorkoutStepTwo/EditPowrPage";
export default function WorkoutBuilderSectionDisplayBox(props) {
  const {


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

  console.log(workoutbuilderStepTwoId);
  

  return (
    <>
      <div className="mb-[8.9rem]   flex h-[110rem] w-[158rem] flex-col bg-[#fff] pl-[10rem]">
    
        <div className="mt-[7.4rem] text-[15rem] font-bold">{name}</div>
        <div className="h-[52rem] text-[25rem] font-bold text-[#84bd00]">
          {totalValue}
        </div>
 
      </div>

      {currentSub2Screen === "createWorkoutStepTwo" && (
        <div className="slide-in-from-bottom">
          <EditPowrPage />
        </div>
      )}
    </>
  );
}

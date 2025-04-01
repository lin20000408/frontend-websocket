import React from "react";
import { Content } from "@/App";
import { Column } from "@antv/g2plot";
import { Col, Row, Select, Table, Input, Form } from "antd";
import * as xlsx from "xlsx";
import styles from "@/css/local.module.css";
import { useEffect, useState, useContext, useRef } from "react";
import {
  BACKGROUND_COLOR,
  DARKBLACK_COLOR,
  DARKGRAY_COLOR,
  MAIN_COLOR,
  ORANGE_COLOR,
} from "@/constants";
import GroupYear from "@/components/Results/Chart/Year/GroupYear";
import StrengthFilterActivity from "@/components/Results/Chart/StrengthFilterActivity";
import Icon_Export from "@/assets/icons2/Export.svg?react";
import Share from "@/components/Results/ResultsHistory/Share";
import ShareECO from "@/components/Results/ResultsHistory/ShareECO";

export default function ResultsHistory() {
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
  //chart
  const data = [
    {
      city: "JAN",
      value: 12,
      type: "Cardio",
    },
    {
      city: "FEB",
      value: 0,
      type: "Cardio",
    },
    {
      city: "MAR",
      value: 12,
      type: "Cardio",
    },
    {
      city: "APR",
      value: 12,
      type: "Cardio",
    },
    {
      city: "MAY",
      value: 12,
      type: "Cardio",
    },
    {
      city: "JUN",
      value: 12,
      type: "Cardio",
    },
    {
      city: "JUL",
      value: 12,
      type: "Cardio",
    },
    {
      city: "AUG",
      value: 12,
      type: "Cardio",
    },
    {
      city: "SEP",
      value: 12,
      type: "Cardio",
    },
    {
      city: "OCT",
      value: 12,
      type: "Cardio",
    },
    {
      city: "NOV",
      value: 12,
      type: "Cardio",
    },
    {
      city: "DEC",
      value: 12,
      type: "Cardio",
    },
    {
      city: "JAN",
      value: 12,
      type: "Strength",
    },
    { city: "FEB", value: 12, type: "Strength" },
    { city: "MAR", value: 0, type: "Strength" },
    { city: "APR", value: 12, type: "Strength" },
    { city: "MAY", value: 0, type: "Strength" },
    { city: "JUN", value: 12, type: "Strength" },
    { city: "JUL", value: 12, type: "Strength" },
    { city: "AUG", value: 0, type: "Strength" },
    { city: "SEP", value: 12, type: "Strength" },
    { city: "OCT", value: 12, type: "Strength" },
    { city: "NOV", value: 12, type: "Strength" },
    { city: "DEC", value: 12, type: "Strength" },
  ];
  //HISTORY CHART
  const chartRef = useRef(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 450);
  const [isMedium, setIsMedium] = useState(
    window.innerWidth >= 450 && window.innerWidth < 768,
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 450);
      setIsMedium(window.innerWidth >= 450 && window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (chartRef.current) {
      const config = {
        data,
        xField: "city",
        yField: "value",
        columnWidthRatio: 0.5,
        color: ({ type }) => {
          if (type === "Strength")
            return "l(270) 0:rgba(16, 114, 178, 1) 1:rgba(113, 199, 255, 1)";
          if (type === "Cardio")
            return "l(270) 0:rgba(128, 195, 66, 1) 1:rgba(186, 230, 66, 1)";
          return "#000000"; // 默認顏色
        },
        seriesField: "type",
        isGroup: "true",
        appendPadding: isMobile
          ? [7, 8, 10, 3]
          : isMedium
            ? [12, 15, 15, 4.5]
            : [16, 20, 20, 6],
        xAxis: {
          title: {
            text: "",
            offset: isMobile ? 40 : isMedium ? 50 : 70,
            style: {
              fontSize: isMobile ? 12 : isMedium ? 20 : 30,
              fontWeight: "bold",
              fill: "#53565A",
            },
          },
          label: {
            autoHide: true,
            autoRotate: false,
            style: {
              fontSize: isMobile ? 12 : isMedium ? 18 : 25,
              fontWeight: "bold",
              fill: "#53565A",
            },
          },
        },
        yAxis: {
          title: {
            text: "HOURS",
            offset: isMobile ? 30 : isMedium ? 35 : 45,
            style: {
              fontSize: isMobile ? 10 : isMedium ? 16 : 25,
              fill: "#97989A",
            },
          },
          min: 0,
          max: 300,
          tickInterval: 10,
          label: {
            style: (tickValue) => ({
              fontSize: isMobile ? 8 : isMedium ? 14 : 20,
              fill: tickValue % 2 === 1 ? "transparent" : "#97989A",
            }),
          },
          grid: {
            line: {
              style: (x, y) => {
                const index = Math.round(y);
                return {
                  stroke: "#707070",
                  lineWidth: index % 2 === 0 ? 0.5 : 0.5,
                  lineDash: index % 2 === 0 ? null : [2, 3],
                };
              },
            },
          },
        },
        slider: {
          start: 0.1,
          end: 0.5,
        },
        animation: false,
        meta: {
          type: { alias: "类别" },
          sales: { alias: "销售额" },
        },
        theme: {
          styleSheet: {
            backgroundColor: "#F5F5F5",
          },
        },
        columnBackground: {
          style: {
            fill: "transparent",
          },
        },
        legend: {
          position: "bottom",

          itemName: {
            style: {
              fill: "#53565A", // 設置圖例文字顏色
              fontSize: isMobile ? 12 : isMedium ? 18 : 25, // 設置字體大小
              fontWeight: "bold", // 設置字體粗細
            },
          },
        },
      };

      const chart = new Column(chartRef.current, config);
      chart.render();

      return () => {
        chart.destroy();
      };
    }
  }, [data, isMobile, isMedium]);
  //change year
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Change Year");

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const handleOptionClick = (option, text) => {
    setSelectedOption(option);

    setIsOpen(false); // 點擊選項後關閉下拉選單
  };
  const options = [
    { value: "2013" },
    { value: "2014" },
    { value: "2015" },
    { value: "2016" },
    { value: "2017" },
    { value: "2018" },
    { value: "2019" },
    { value: "2020" },
    { value: "2021" },
    { value: "2022" },
    { value: "2023" },
    { value: "2024" },
  ];

  //share page
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const handlePopState = () => {
      setOpen(true); // Set open to true when navigating back
    };

    window.addEventListener("popstate", handlePopState);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  const createShareClick = (index) => () => {
   
    const stateData = {
      currentScreen: "resultsScreen",
      currentSub1Screen: "history",
      currentSub2Screen:`share${index}`,
    };

    setCurrentScreen(stateData.currentScreen);
    setCurrentSub1Screen(stateData.currentSub1Screen);
    setCurrentSub2Screen(stateData.currentSub2Screen);

    sessionStorage.setItem("sauser_currentScreen", JSON.stringify(stateData));

    if (currentSub2Screen !== stateData.currentSub2Screen) {
      console.log(`存路由${currentSub2Screen}`);
      const title = "";
      const encodedData = encodeURIComponent(JSON.stringify(stateData));
      const newUrl = `/?data=${encodedData}`;
      window.history.pushState(stateData, title, newUrl);
    }
  };
  const fetchData = [
    {
      key: 1,
      date: "12-2-2",
      time: "4:30:50 pm",
      activity: "Fitness Center",
      duration: "1:30:10",
      distance: 5,
      avgSpeed: 1,
      calories: 450,
      heartRate: 155,
      watts: 165,
      humanWatts: 165,
    },
    {
      key: 2,
      date: "12-2-2",
      time: "4:30:10 pm",
      activity: "Fitness Center",
      duration: "0:45:10",
      distance: 5,
      avgSpeed: 1,
      calories: 450,
      heartRate: 155,
      watts: 165,
      humanWatts: 165,
    },
    {
      key: 3,
      date: "12-2-2",
      time: "4:30:10 pm",
      activity: "Fitness Center",
      duration: "0:45:10",
      distance: 5,
      avgSpeed: 1,
      calories: 450,
      heartRate: 155,
      watts: 165,
      humanWatts: 165,
    },
    {
      key: 4,
      date: "12-2-2",
      time: "4:30:10 pm",
      activity: "Fitness Center",
      duration: "0:45:10",
      distance: 5,
      avgSpeed: 1,
      calories: 450,
      heartRate: 155,
      watts: 165,
      humanWatts: 165,
    },
    {
      key: 5,
      date: "12-2-2",
      time: "4:30:20 pm",
      activity: "ECO-POWR™ Recumbent Cycle",
      duration: "0:45:10",
      distance: 5,
      avgSpeed: 1,
      calories: 450,
      heartRate: 155,
      watts: 165,
      humanWatts: 165,
    },
    {
      key: 6,
      date: "12-2-2",
      time: "4:30:10 pm",
      activity: "Fitness Center",
      duration: "0:45:10",
      distance: 5,
      avgSpeed: 1,
      calories: 450,
      heartRate: 155,
      watts: 165,
      humanWatts: 165,
    },
    {
      key: 7,
      date: "12-2-2",
      time: "4:30:10 pm",
      activity: "ECO-POWR™ Indoor Cycle",
      duration: "0:45:10",
      distance: 5,
      avgSpeed: 1,
      calories: 450,
      heartRate: 155,
      watts: 165,
      humanWatts: 165,
    },
  ];
  const shareClick = Array.from({ length: fetchData.length }, (_, i) =>
    createShareClick(i + 1),
  );

  // 使用方式：shareClicks[0]() 對應 shareClick1，shareClicks[1]() 對應 shareClick2，以此類推
  //table
 
  const TableData = fetchData.map((data, index) => ({
    key: data.key,
    date: data.date,
    time: data.time,
    activity: data.activity,
    duration: data.duration,
    distance: data.distance,
    avgSpeed: data.avgSpeed,
    calories: data.calories,
    heartRate: data.heartRate,
    watts: data.watts,
    humanWatts: data.humanWatts,
    share: <span onClick={shareClick[index]}>Share</span>,
    edit: "Edit",
  }));
  // row edit(table turn into input )
  const [editingKey, setEditingKey] = useState(null); //编辑按钮单击
  const handleEdit = (key) => {
    setEditingKey(key);
  };
  const getEditableCell = (dataIndex) => ({
    editable: true,
    render: (text, record) => {
      const isEditing = record.key === editingKey;
      return isEditing ? (
        <Input
          value={text}
          onChange={(e) => handleChange(e, record.key, dataIndex)}
        />
      ) : (
        text
      );
    },
  });
  const [tableData, setTableData] = useState(TableData);

  const handleChange = (e, key, dataIndex) => {
    const newData = [...tableData];
    const index = newData.findIndex((item) => key === item.key);
    if (index > -1) {
      const item = newData[index];
      newData.splice(index, 1, { ...item, [dataIndex]: e.target.value });
      setTableData(newData);
    }
  };
  const handleSave = (key) => {
    // Here you would typically send the updated data to your backend
    console.log("Saving changes for row with key:", key);
    setEditingKey(null);
  };
  //!將更改的數據post update到後端
  //   const handleSave = async (key) => {
  //     try {
  //       const rowToUpdate = tableData.find(item => item.key === key);

  //       // Send POST request to your backend API
  //       const response = await fetch('/api/updateWorkout', {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify(rowToUpdate),
  //       });

  //       if (!response.ok) {
  //         throw new Error('Failed to update workout');
  //       }

  //       console.log("Changes saved successfully for row with key:", key);
  //       setEditingKey(null);
  //     } catch (error) {
  //       console.error("Error saving changes:", error);
  //       // Handle error (e.g., show error message to user)
  //     }
  //   };
  const originalColumns = [
    {
      title: "DATE",
      width: "35rem",
      dataIndex: "date",
      key: "1",
      align: "center",
      ...getEditableCell("date"),
    },
    {
      title: "TIME",
      width: "35rem",
      dataIndex: "time",
      key: "2",
      align: "center",

      ...getEditableCell("time"),
    },
    {
      title: "ACTIVITY",
      width: "35rem",
      dataIndex: "activity",
      key: "3",
      align: "center",

      ...getEditableCell("activity"),
    },
    {
      title: "DURATION",
      width: "35rem",
      dataIndex: "duration",
      key: "4",
      align: "center",

      ...getEditableCell("duration"),
    },
    {
      title: "DISTANCE",
      width: "35rem",
      dataIndex: "distance",
      key: "5",
      align: "center",
      render: (text, record) => {
        const isEditing = record.key === editingKey;
        return isEditing ? (
          <Input
            value={text}
            onChange={(e) => handleChange(e, record.key, "distance")}
            addonAfter="mi"
          />
        ) : (
          `${text} mi`
        );
      },
    },

    //在COLUMN裡設定預設單位
    {
      title: "AVG SPEED",
      width: "35rem",
      dataIndex: "avgSpeed",
      key: "6",
      align: "center",
      render: (text, record) => {
        const isEditing = record.key === editingKey;
        return isEditing ? (
          <Input
            value={text}
            onChange={(e) => handleChange(e, record.key, "distance")}
            addonAfter="mph"
          />
        ) : (
          `${text} mph`
        );
      },
    },

    {
      title: "CALORIES",
      width: "35rem",
      dataIndex: "calories",
      key: "7",
      align: "center",
      render: (text, record) => {
        const isEditing = record.key === editingKey;
        return isEditing ? (
          <Input
            value={text}
            onChange={(e) => handleChange(e, record.key, "distance")}
            addonAfter="kcal"
          />
        ) : (
          `${text} kcal`
        );
      },
    },
    {
      title: "HEART RATE",
      width: "35rem",
      dataIndex: "heartRate",
      key: "8",
      align: "center",
      render: (text, record) => {
        const isEditing = record.key === editingKey;
        return isEditing ? (
          <Input
            value={text}
            onChange={(e) => handleChange(e, record.key, "distance")}
            addonAfter="bpm"
          />
        ) : (
          `${text} bpm`
        );
      },
    },
    {
      title: "WATTS",
      width: "35rem",
      dataIndex: "watts",
      key: "9",
      align: "center",
      render: (text, record) => {
        const isEditing = record.key === editingKey;
        return isEditing ? (
          <Input
            value={text}
            onChange={(e) => handleChange(e, record.key, "distance")}
            addonAfter="wh"
          />
        ) : (
          `${text} wh`
        );
      },
    },

    {
      title: "HUMAN WATTS",
      width: "35rem",
      dataIndex: "humanWatts",
      key: "10",
      align: "center",
      render: (text, record) => {
        const isEditing = record.key === editingKey;
        return isEditing ? (
          <Input
            value={text}
            onChange={(e) => handleChange(e, record.key, "distance")}
            addonAfter="w"
          />
        ) : (
          `${text} w`
        );
      },
    },
    {
      title: "SHARE",
      width: "35rem",
      dataIndex: "share",
      key: "11",
      align: "center",
      fixed: "right",
    },

    {
      title: "EDIT",
      width: "35rem",
      dataIndex: "edit",
      key: "12",
      align: "center",
      fixed: "right",
      render: (_, record) => {
        const isEditing = record.key === editingKey;
        return isEditing ? (
          <span>
            <a
              onClick={() => handleSave(record.key)}
              style={{ marginRight: 8 }}
            >
              Save
            </a>
            <a onClick={() => setEditingKey(null)}>Cancel</a>
          </span>
        ) : (
          <a onClick={() => handleEdit(record.key)}>Edit</a>
        );
      },
    },
  ];
  //currentSub2Screen 顯示不同share
  const renderShareComponent = (index) => {
    const shareIndex = index + 1;
    const data = TableData[index];

    return (
      currentSub2Screen === `share${shareIndex}` && (
        <div className="slide-in-from-bottom">
          {data.activity.includes("ECO") ? (
            <ShareECO
              watts={data.watts}
              activity={data.activity}
              time={data.time}
              distance={data.distance}
              calories={data.calories}
              date={data.date}
              duration={data.duration}
            />
          ) : (
            <Share
              activity={data.activity}
              time={data.time}
              distance={data.distance}
              calories={data.calories}
              date={data.date}
              duration={data.duration}
            />
          )}
        </div>
      )
    );
  };
  //export TO EXCEL
  const ExportClick = () => {
    const worksheet = xlsx.utils.json_to_sheet(TableData);
    const workbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    xlsx.writeFile(workbook, "data.xlsx");
  };
  return (
    <div className="bg-[#F5F5F5]">
      <div className="ml-[4%] mr-[4%] mt-[23rem] flex h-[53rem] justify-between">
        <div>
          <div className="h-[20rem] text-[16rem] font-bold text-darkColor">
            <p>{selectedOption === "Change Year" ? "2024" : selectedOption}</p>
          </div>
        </div>
        <div className="relative inline-block text-left">
          <div>
            <button
              onClick={toggleDropdown}
              className="inline-flex w-[82rem] justify-center rounded-md bg-[#F5F5F5] px-4 py-2 text-[12rem] font-medium text-gray-700 shadow-sm hover:bg-white "
            >
              {selectedOption}
            </button>
          </div>
          {isOpen && (
            <div className="absolute right-0 z-10 mt-2 w-[82rem] rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
              <div
                className="py-1"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="options-menu"
              >
                {options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleOptionClick(option.value)}
                    className="block w-full py-1 pr-2 text-left text-right text-[12rem] text-gray-700 hover:bg-gray-100 "
                    role="menuitem"
                    tabIndex="0"
                  >
                    <span className="pr-2 font-medium ">
                      {option.value}&nbsp;&nbsp;
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <Col>
        <div
          ref={chartRef}
          style={{
            width: "92%",
            height: "435rem",
            margin: "0 4%",
          }}
          className="  ml-[calc(15rem)] "
        />
      </Col>
         {/* 一條斜線使用css實現 */}
         <div className={styles.diagonalLine} style={{ marginTop: "18rem" }}>
          {" "}
        </div>

      <div className="flex justify-center">
        <Table
          className="w-[92%]"
          columns={originalColumns}
          dataSource={tableData}
          scroll={{ x: "900rem" }}
          pagination={false}
        />
      </div>
      <div
        className="mb-[20rem] ml-[21rem] mt-[13.5rem] flex"
        onClick={ExportClick}
      >
        <div
          className=" mr-[8rem] h-[16rem] text-[12rem] font-semibold text-[#333F48]"
          style={{ letterSpacing: "2rem" }}
        >
          EXPORT{" "}
        </div>
        <div>
          <Icon_Export />
        </div>
      </div>
      <div className="h-[1rem]"></div>
      <div>
        {Array.from({ length: fetchData.length }, (_, index) =>
          renderShareComponent(index),
        )}
      </div>
    </div>
  );
}

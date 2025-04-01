import { useEffect, useState, useContext, useRef } from "react";
import { Col, Row } from "antd";
import { Content } from "@/App";
import Icon_DownArrowBlack from "@/assets/icons2/DownArrow-Black.svg?react";
import Icon_UpArrowBlack from "@/assets/icons2/UpArrow-Black.svg?react";
import { Column } from "@antv/g2plot";
import Icon_MoreArrow from "@/assets/icons/MoreArrow.svg";
import styles from "@/css/local.module.css";
import { Link } from "react-router-dom";
import { Table } from "antd";
import Share from "@/components/Results/ResultsHistory/Share";
import ShareECO from "@/components/Results/ResultsHistory/ShareECO";
export default function ResultsCompetition() {
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
  const chartRef = useRef(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 450);
  const [isMedium, setIsMedium] = useState(
    window.innerWidth >= 450 && window.innerWidth < 768,
  );
  //!向後端要資料 (速度最快前十名)
  //   const [fetchData, setFetchData] = useState([])

  //   const getFetchData = async () => {
  //     const apiURL =
  //       'https://my-json-server.typicode.com/eyesofkids/json-fake-data/products'

  //     const res = await fetch(apiURL)
  //     const data = await res.json()

  //     console.log(data)

  //     // 設定到狀態中 ==> 觸發re-render(進入update階段)
  //     setFetchData(data)
  //   }

  //   // 樣式2 didMount
  //   // 首次render之後(after)執行一次，之後不會再執行
  //   useEffect(() => {
  //     getFetchData()
  //   }, [])

  const data = [
    { type: "1", sales: 12 },
    { type: "2", sales: 8 },
    { type: "3", sales: 4 },
    { type: "4", sales: 14 },
    { type: "5", sales: 8 },
    { type: "6", sales: 8 },
    { type: "7", sales: 6 },
    { type: "8", sales: 6 },
    { type: "9", sales: 6 },
    { type: "10", sales: 6 },
  ];
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
        xField: "type",
        yField: "sales",
        columnWidthRatio: 0.5,
        color: "l(270) 0:rgba(255, 48, 48, 1)  1:rgba(255, 183, 69, 1)",
        appendPadding: isMobile
          ? [7, 8, 10, 3]
          : isMedium
            ? [12, 15, 15, 4.5]
            : [16, 20, 20, 6],
        xAxis: {
          title: {
            text: "RANKING",
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
            text: "TIMES",
            offset: isMobile ? 25 : isMedium ? 35 : 45,
            style: {
              fontSize: isMobile ? 10 : isMedium ? 16 : 25,
              fill: "#97989A",
            },
          },
          min: 1,
          max: 10,
          tickInterval: 1,
          label: {
            style: (tickValue) => ({
              fontSize: isMobile ? 8 : isMedium ? 14 : 20,
              fill: "#97989A",
            }),
          },
          grid: {
            line: {
              style: (x, y) => {
                const index = Math.round(y);
                return {
                  stroke: "#707070",
                  lineWidth: index % 2 === 0 ? 0.5 : 0.5,
                };
              },
            },
          },
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
      };

      const chart = new Column(chartRef.current, config);
      chart.render();

      return () => {
        chart.destroy();
      };
    }
  }, [data, isMobile, isMedium]);

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

  const share1Click = () => {
    setCurrentScreen("resultsScreen");
    setCurrentSub1Screen("competition");
    setCurrentSub2Screen("share1");
    let p = {
      currentScreen: "resultsScreen",
      currentSub1Screen: "competition",
      currentSub2Screen: "share1",
    };
    sessionStorage.setItem("sauser_currentScreen", JSON.stringify(p));

    if (currentSub2Screen !== "share1") {
      // 存路由
      console.log("存路由share1");
      const stateData = {
        currentScreen: "resultsScreen",
        currentSub1Screen: "competition",
        currentSub2Screen: "share1",
      };
      const title = ""; // 页面标题（可选）
      const encodedData = encodeURIComponent(JSON.stringify(stateData));
      const newUrl = `/?data=${encodedData}`; // 新的 URL（可选） 這個會改變名稱
      window.history.pushState(stateData, title, newUrl);
    }
  };
  const share2Click = () => {
    setCurrentScreen("resultsScreen");
    setCurrentSub1Screen("competition");
    setCurrentSub2Screen("share2");
    let p = {
      currentScreen: "resultsScreen",
      currentSub1Screen: "competition",
      currentSub2Screen: "share2",
    };
    sessionStorage.setItem("sauser_currentScreen", JSON.stringify(p));

    if (currentSub2Screen !== "share2") {
      // 存路由
      console.log("存路由share2");
      const stateData = {
        currentScreen: "resultsScreen",
        currentSub1Screen: "competition",
        currentSub2Screen: "share2",
      };
      const title = ""; // 页面标题（可选）
      const encodedData = encodeURIComponent(JSON.stringify(stateData));
      const newUrl = `/?data=${encodedData}`; // 新的 URL（可选） 這個會改變名稱
      window.history.pushState(stateData, title, newUrl);
    }
  };
  const share3Click = () => {
    setCurrentScreen("resultsScreen");
    setCurrentSub1Screen("competition");
    setCurrentSub2Screen("share3");
    let p = {
      currentScreen: "resultsScreen",
      currentSub1Screen: "competition",
      currentSub2Screen: "share3",
    };
    sessionStorage.setItem("sauser_currentScreen", JSON.stringify(p));

    if (currentSub2Screen !== "share3") {
      // 存路由
      console.log("存路由share3");
      const stateData = {
        currentScreen: "resultsScreen",
        currentSub1Screen: "competition",
        currentSub2Screen: "share3",
      };
      const title = ""; // 页面标题（可选）
      const encodedData = encodeURIComponent(JSON.stringify(stateData));
      const newUrl = `/?data=${encodedData}`; // 新的 URL（可选） 這個會改變名稱
      window.history.pushState(stateData, title, newUrl);
    }
  };
  const share4Click = () => {
    setCurrentScreen("resultsScreen");
    setCurrentSub1Screen("competition");
    setCurrentSub2Screen("share4");
    let p = {
      currentScreen: "resultsScreen",
      currentSub1Screen: "competition",
      currentSub2Screen: "share4",
    };
    sessionStorage.setItem("sauser_currentScreen", JSON.stringify(p));

    if (currentSub2Screen !== "share4") {
      // 存路由
      console.log("存路由share4");
      const stateData = {
        currentScreen: "resultsScreen",
        currentSub1Screen: "competition",
        currentSub2Screen: "share4",
      };
      const title = ""; // 页面标题（可选）
      const encodedData = encodeURIComponent(JSON.stringify(stateData));
      const newUrl = `/?data=${encodedData}`; // 新的 URL（可选） 這個會改變名稱
      window.history.pushState(stateData, title, newUrl);
    }
  };
  const share5Click = () => {
    setCurrentScreen("resultsScreen");
    setCurrentSub1Screen("competition");
    setCurrentSub2Screen("share5");
    let p = {
      currentScreen: "resultsScreen",
      currentSub1Screen: "competition",
      currentSub2Screen: "share5",
    };
    sessionStorage.setItem("sauser_currentScreen", JSON.stringify(p));

    if (currentSub2Screen !== "share5") {
      // 存路由
      console.log("存路由share5");
      const stateData = {
        currentScreen: "resultsScreen",
        currentSub1Screen: "competition",
        currentSub2Screen: "share5",
      };
      const title = ""; // 页面标题（可选）
      const encodedData = encodeURIComponent(JSON.stringify(stateData));
      const newUrl = `/?data=${encodedData}`; // 新的 URL（可选） 這個會改變名稱
      window.history.pushState(stateData, title, newUrl);
    }
  };
  const share6Click = () => {
    setCurrentScreen("resultsScreen");
    setCurrentSub1Screen("competition");
    setCurrentSub2Screen("share6");
    let p = {
      currentScreen: "resultsScreen",
      currentSub1Screen: "competition",
      currentSub2Screen: "share6",
    };
    sessionStorage.setItem("sauser_currentScreen", JSON.stringify(p));

    if (currentSub2Screen !== "share6") {
      // 存路由
      console.log("存路由share6");
      const stateData = {
        currentScreen: "resultsScreen",
        currentSub1Screen: "competition",
        currentSub2Screen: "share6",
      };
      const title = ""; // 页面标题（可选）
      const encodedData = encodeURIComponent(JSON.stringify(stateData));
      const newUrl = `/?data=${encodedData}`; // 新的 URL（可选） 這個會改變名稱
      window.history.pushState(stateData, title, newUrl);
    }
  };
  const share7Click = () => {
    setCurrentScreen("resultsScreen");
    setCurrentSub1Screen("competition");
    setCurrentSub2Screen("share7");
    let p = {
      currentScreen: "resultsScreen",
      currentSub1Screen: "competition",
      currentSub2Screen: "share7",
    };
    sessionStorage.setItem("sauser_currentScreen", JSON.stringify(p));

    if (currentSub2Screen !== "share7") {
      // 存路由
      console.log("存路由share7");
      const stateData = {
        currentScreen: "resultsScreen",
        currentSub1Screen: "competition",
        currentSub2Screen: "share7",
      };
      const title = ""; // 页面标题（可选）
      const encodedData = encodeURIComponent(JSON.stringify(stateData));
      const newUrl = `/?data=${encodedData}`; // 新的 URL（可选） 這個會改變名稱
      window.history.pushState(stateData, title, newUrl);
    }
  };
  const share8Click = () => {
    setCurrentScreen("resultsScreen");
    setCurrentSub1Screen("competition");
    setCurrentSub2Screen("share8");
    let p = {
      currentScreen: "resultsScreen",
      currentSub1Screen: "competition",
      currentSub2Screen: "share8",
    };
    sessionStorage.setItem("sauser_currentScreen", JSON.stringify(p));

    if (currentSub2Screen !== "share8") {
      // 存路由
      console.log("存路由share8");
      const stateData = {
        currentScreen: "resultsScreen",
        currentSub1Screen: "competition",
        currentSub2Screen: "share8",
      };
      const title = ""; // 页面标题（可选）
      const encodedData = encodeURIComponent(JSON.stringify(stateData));
      const newUrl = `/?data=${encodedData}`; // 新的 URL（可选） 這個會改變名稱
      window.history.pushState(stateData, title, newUrl);
    }
  };
  const share9Click = () => {
    setCurrentScreen("resultsScreen");
    setCurrentSub1Screen("competition");
    setCurrentSub2Screen("share9");
    let p = {
      currentScreen: "resultsScreen",
      currentSub1Screen: "competition",
      currentSub2Screen: "share9",
    };
    sessionStorage.setItem("sauser_currentScreen", JSON.stringify(p));

    if (currentSub2Screen !== "share9") {
      // 存路由
      console.log("存路由share9");
      const stateData = {
        currentScreen: "resultsScreen",
        currentSub1Screen: "competition",
        currentSub2Screen: "share9",
      };
      const title = ""; // 页面标题（可选）
      const encodedData = encodeURIComponent(JSON.stringify(stateData));
      const newUrl = `/?data=${encodedData}`; // 新的 URL（可选） 這個會改變名稱
      window.history.pushState(stateData, title, newUrl);
    }
  };
  const share10Click = () => {
    setCurrentScreen("resultsScreen");
    setCurrentSub1Screen("competition");
    setCurrentSub2Screen("share10");
    let p = {
      currentScreen: "resultsScreen",
      currentSub1Screen: "competition",
      currentSub2Screen: "share10",
    };
    sessionStorage.setItem("sauser_currentScreen", JSON.stringify(p));

    if (currentSub2Screen !== "share10") {
      // 存路由
      console.log("存路由share10");
      const stateData = {
        currentScreen: "resultsScreen",
        currentSub1Screen: "competition",
        currentSub2Screen: "share10",
      };
      const title = ""; // 页面标题（可选）
      const encodedData = encodeURIComponent(JSON.stringify(stateData));
      const newUrl = `/?data=${encodedData}`; // 新的 URL（可选） 這個會改變名稱
      window.history.pushState(stateData, title, newUrl);
    }
  };
  //!向後端要資料 (速度最快前十名) 第38行
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
      name: "123",
      club: "Fitness Center",
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
      name: "123",
      club: "Fitness Center",
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
      name: "123",
      club: "Fitness Center",
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
      name: "123",
      club: "Fitness Center",
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
      name: "123",
      club: "Fitness Center",
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
      name: "123",
      club: "Fitness Center",
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
      name: "123",
      club: "Fitness Center",
    },
    {
      key: 8,
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
      name: "123",
      club: "Fitness Center",
    },
    {
      key: 9,
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
      name: "123",
      club: "Fitness Center",
    },
    {
      key: 10,
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
      name: "123",
      club: "Fitness Center",
    },
  ];
  const columns = [
    {
      title: "DATE",
      dataIndex: "date",
      key: "1",
      width: "50rem",
      align: "center",
    },
    {
      title: "TIME",
      dataIndex: "time",
      key: "2",
      width: "70rem",
      align: "center",
    },
    {
      title: "CLUB",
      dataIndex: "club",
      key: "3",
      width: "70rem",
      align: "center",
    },
    {
      title: "NAME",
      dataIndex: "name",
      key: "4",
      width: "70rem",
      align: "center",
    },
    {
      title: "GOAL",
      dataIndex: "goal",
      key: "5",
      width: "70rem",
      align: "center",
    },
    {
      title: "RANK",
      dataIndex: "rank",
      key: "6",
      width: "70rem",
      align: "center",
    },

    {
      title: "Share",
      key: "share",
      width: "35rem",
      fixed: "right",
      dataIndex: "share",
      align: "center",
    },
  ];
  //!暫時share to line

  const TableData = [
    {
      key: "1",
      date: fetchData[0].date,
      time: fetchData[0].time,
      club: "Fitness Center",
      name: "User Name",
      goal: fetchData[0].distance,
      rank: "1",
      share: <span onClick={share1Click}>Share</span>,
    },
    {
      key: "2",
      date: "12-2-2",
      time: "4:30pm",
      club: "Fitness Center",
      name: "User Name",
      goal: "5mi",
      rank: "2",
      share: <span onClick={share2Click}>Share</span>,
    },
    {
      key: "3",
      date: "12-2-2",
      time: "4:30pm",
      club: "Fitness Center",
      name: "User Name",
      goal: "5mi",
      rank: "3",
      share: <span onClick={share3Click}>Share</span>,
    },
    {
      key: "4",
      date: "12-2-2",
      time: "4:30pm",
      club: "Fitness Center",
      name: "User Name",
      goal: "5mi",
      rank: "4",
      share: <span onClick={share4Click}>Share</span>,
    },
    {
      key: "5",
      date: "12-2-2",
      time: "4:30pm",
      club: "Fitness Center",
      name: "User Name",
      goal: "5mi",
      rank: "5",
      share: <span onClick={share5Click}>Share</span>,
    },
    {
      key: "6",
      date: "12-2-2",
      time: "4:30pm",
      club: "Fitness Center",
      name: "User Name",
      goal: "5mi",
      rank: "6",
      share: <span onClick={share6Click}>Share</span>,
    },
    {
      key: "7",
      date: "12-2-2",
      time: "4:30pm",
      club: "Fitness Center",
      name: "User Name",
      goal: "5mi",
      rank: "7",
      share: <span onClick={share7Click}>Share</span>,
    },

    {
      key: "8",
      date: "12-2-2",
      time: "4:30pm",
      club: "Fitness Center",
      name: "User Name",
      goal: "5mi",
      rank: "8",
      share: <span onClick={share8Click}>Share</span>,
    },
    {
      key: "9",
      date: "12-2-2",
      time: "4:30pm",
      club: "Fitness Center",
      name: "User Name",
      goal: "5mi",
      rank: "9",
      share: <span onClick={share9Click}>Share</span>,
    },
    {
      key: "10",
      date: "12-2-2",
      time: "4:30pm",
      club: "Fitness Center",
      name: "User Name",
      goal: "5mi",
      rank: "10",
      share: <span onClick={share10Click}>Share</span>,
    },
  ];

  return (
    <div>
      <Col>
        <div
          ref={chartRef}
          style={{
            width: "92%",
            height: "268.25rem",
            margin: "0 4%",
          }}
          className="  ml-[calc(15rem)] "
        />
      </Col>
         {/* 一條斜線使用css實現 */}
         <div className={styles.diagonalLine} style={{ marginTop: "18rem" }}>
          {" "}
        </div>
      <Table
        columns={columns}
        dataSource={TableData}
        scroll={{
          x: '700rem',
          y: '300rem',
        }}
        pagination={data.length > 10 ? {} : false}
      />
      <div>
        {" "}
        {currentSub2Screen === "share1" && (
          <div className="slide-in-from-bottom">
            {fetchData[0].activity.includes("ECO") ? (
              <ShareECO
                watts={fetchData[0].watts}
                activity={fetchData[0].activity}
                time={fetchData[0].time}
                distance={fetchData[0].distance}
                calories={fetchData[0].calories}
                date={fetchData[0].date}
                duration={fetchData[0].duration}
              />
            ) : (
              <Share
                activity={fetchData[0].activity}
                time={fetchData[0].time}
                distance={fetchData[0].distance}
                calories={fetchData[0].calories}
                date={fetchData[0].date}
                duration={fetchData[0].duration}
              />
            )}
          </div>
        )}
        {currentSub2Screen === "share2" && (
          <div className="slide-in-from-bottom">
            {fetchData[1].activity.includes("ECO") ? (
              <ShareECO
                watts={fetchData[1].watts}
                activity={fetchData[1].activity}
                time={fetchData[1].time}
                distance={fetchData[1].distance}
                calories={fetchData[1].calories}
                date={fetchData[1].date}
                duration={fetchData[1].duration}
              />
            ) : (
              <Share
                activity={fetchData[1].activity}
                time={fetchData[1].time}
                distance={fetchData[1].distance}
                calories={fetchData[1].calories}
                date={fetchData[1].date}
                duration={fetchData[1].duration}
              />
            )}
          </div>
        )}
        {currentSub2Screen === "share3" && (
          <div className="slide-in-from-bottom">
            {fetchData[2].activity.includes("ECO") ? (
              <ShareECO
                watts={fetchData[2].watts}
                activity={fetchData[2].activity}
                time={fetchData[2].time}
                distance={fetchData[2].distance}
                calories={fetchData[2].calories}
                date={fetchData[2].date}
                duration={fetchData[2].duration}
              />
            ) : (
              <Share
                activity={fetchData[2].activity}
                time={fetchData[2].time}
                distance={fetchData[2].distance}
                calories={fetchData[2].calories}
                date={fetchData[2].date}
                duration={fetchData[2].duration}
              />
            )}
          </div>
        )}
        {currentSub2Screen === "share4" && (
          <div className="slide-in-from-bottom">
            {fetchData[3].activity.includes("ECO") ? (
              <ShareECO
                watts={fetchData[3].watts}
                activity={fetchData[3].activity}
                time={fetchData[3].time}
                distance={fetchData[3].distance}
                calories={fetchData[3].calories}
                date={fetchData[3].date}
                duration={fetchData[3].duration}
              />
            ) : (
              <Share
                activity={fetchData[3].activity}
                time={fetchData[3].time}
                distance={fetchData[3].distance}
                calories={fetchData[3].calories}
                date={fetchData[3].date}
                duration={fetchData[3].duration}
              />
            )}
          </div>
        )}
        {currentSub2Screen === "share5" && (
          <div className="slide-in-from-bottom">
            {fetchData[4].activity.includes("ECO") ? (
              <ShareECO
                watts={fetchData[4].watts}
                activity={fetchData[4].activity}
                time={fetchData[4].time}
                distance={fetchData[4].distance}
                calories={fetchData[4].calories}
                date={fetchData[4].date}
                duration={fetchData[4].duration}
              />
            ) : (
              <Share
                activity={fetchData[4].activity}
                time={fetchData[4].time}
                distance={fetchData[4].distance}
                calories={fetchData[4].calories}
                date={fetchData[4].date}
                duration={fetchData[4].duration}
              />
            )}
          </div>
        )}
        {currentSub2Screen === "share6" && (
          <div className="slide-in-from-bottom">
            {fetchData[5].activity.includes("ECO") ? (
              <ShareECO
                watts={fetchData[5].watts}
                activity={fetchData[5].activity}
                time={fetchData[5].time}
                distance={fetchData[5].distance}
                calories={fetchData[5].calories}
                date={fetchData[5].date}
                duration={fetchData[5].duration}
              />
            ) : (
              <Share
                activity={fetchData[5].activity}
                time={fetchData[5].time}
                distance={fetchData[5].distance}
                calories={fetchData[5].calories}
                date={fetchData[5].date}
                duration={fetchData[5].duration}
              />
            )}
          </div>
        )}
        {currentSub2Screen === "share7" && (
          <div className="slide-in-from-bottom">
            {fetchData[6].activity.includes("ECO") ? (
              <ShareECO
                watts={fetchData[6].watts}
                activity={fetchData[6].activity}
                time={fetchData[6].time}
                distance={fetchData[6].distance}
                calories={fetchData[6].calories}
                date={fetchData[6].date}
                duration={fetchData[6].duration}
              />
            ) : (
              <Share
                activity={fetchData[6].activity}
                time={fetchData[6].time}
                distance={fetchData[6].distance}
                calories={fetchData[6].calories}
                date={fetchData[6].date}
                duration={fetchData[6].duration}
              />
            )}
          </div>
        )}
        {currentSub2Screen === "share8" && (
          <div className="slide-in-from-bottom">
            {fetchData[7].activity.includes("ECO") ? (
              <ShareECO
                watts={fetchData[7].watts}
                activity={fetchData[7].activity}
                time={fetchData[7].time}
                distance={fetchData[7].distance}
                calories={fetchData[7].calories}
                date={fetchData[7].date}
                duration={fetchData[7].duration}
              />
            ) : (
              <Share
                activity={fetchData[7].activity}
                time={fetchData[7].time}
                distance={fetchData[7].distance}
                calories={fetchData[7].calories}
                date={fetchData[7].date}
                duration={fetchData[7].duration}
              />
            )}
          </div>
        )}
        {currentSub2Screen === "share9" && (
          <div className="slide-in-from-bottom">
            {fetchData[8].activity.includes("ECO") ? (
              <ShareECO
                watts={fetchData[8].watts}
                activity={fetchData[8].activity}
                time={fetchData[8].time}
                distance={fetchData[8].distance}
                calories={fetchData[8].calories}
                date={fetchData[8].date}
                duration={fetchData[8].duration}
              />
            ) : (
              <Share
                activity={fetchData[8].activity}
                time={fetchData[8].time}
                distance={fetchData[8].distance}
                calories={fetchData[8].calories}
                date={fetchData[8].date}
                duration={fetchData[8].duration}
              />
            )}
          </div>
        )}
        {currentSub2Screen === "share10" && (
          <div className="slide-in-from-bottom">
            {fetchData[9].activity.includes("ECO") ? (
              <ShareECO
                watts={fetchData[9].watts}
                activity={fetchData[9].activity}
                time={fetchData[9].time}
                distance={fetchData[9].distance}
                calories={fetchData[9].calories}
                date={fetchData[9].date}
                duration={fetchData[9].duration}
              />
            ) : (
              <Share
                activity={fetchData[9].activity}
                time={fetchData[9].time}
                distance={fetchData[9].distance}
                calories={fetchData[9].calories}
                date={fetchData[9].date}
                duration={fetchData[9].duration}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

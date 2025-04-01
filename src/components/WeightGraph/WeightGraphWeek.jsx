import { useContext, useEffect, useState, useRef } from "react";
import { Area } from "@ant-design/plots";
import { Col, Row } from "antd";
import { Content } from "@/App";
// css 的模組引入
import styles from "@/css/local.module.css";
import { BACKGROUND_COLOR, DARKBLACK_COLOR } from "@/constants";
import { NAVIBAR_SIZE } from "../../constants";

import AreaDashWeek from "@/components/Results/Chart/Week/AreaDashWeek";
export default function WeightGraphWeek() {
  const {
    //
    setActiveScreen,
ws,
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
    userProfile
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
  //get data from db
 
  //data
  useEffect(()=>{
    const currentDate = new Date();
    const isoTime = new Date().toISOString();
    currentDate.setDate(currentDate.getDate() - 6); // 往回推 7 天
  const isoTimeMinus7Days = currentDate.toISOString();
    const dataInValid = localStorage.getItem("sauser_accessToken");
    const inputObject = {
      queryWeightHistory: {
        sauser_accessToken: dataInValid,
        startDate: isoTimeMinus7Days,
        endDate:isoTime,
      },
    };
  
    if (ws) {
  
      ws.send(JSON.stringify(inputObject));
  
      console.log(inputObject);
    }else{
      console.log("no");
    }
  },[])
  const weekdata = JSON.parse(localStorage.getItem("queryWeightHistory"))
  ? JSON.parse(localStorage.getItem("queryWeightHistory"))
  : [
      {
        weight: 50,
        units: "lb",
        _id: "67e5f36ac37ff7087dfd2bba",
        createdAt: "2025-03-28T00:55:06.395Z",
      },
      {
        weight: 40,
        units: "lb",
        _id: "67e5f83bf44fa2f4b4d8204f",
        createdAt: "2025-03-28T01:15:39.340Z",
      },
      {
        weight: 30,
        units: "lb",
        _id: "67e5f83bf44fa2f4b4d82050",
        createdAt: "2025-03-26T22:00:00.000Z", // 這筆應該不會符合
      },
    ];


  // 初始化結果對象，包含過去 7 天的鍵
// 產生過去 7 天的日期 (MM/DD 格式)
const now=new Date
const dates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(now.getDate() - i);
    return d.toLocaleDateString(undefined, { month: 'numeric', day: 'numeric' });
  });
  
  // 建立日期對應的物件
  const DataFromdb = dates.reduce((acc, date) => {
    acc[date] = []; // 預先建立空陣列
    return acc;
  }, {});
  
  // 將 weekdata 依日期分類
  weekdata.forEach(item => {
    const itemDate = new Date(item.createdAt).toLocaleDateString(undefined, { month: 'numeric', day: 'numeric' });
    if (DataFromdb[itemDate]) {
        DataFromdb[itemDate].push(item);
    }
  });
  
  console.log(DataFromdb);

  
// day

  const formattedDate = now.toLocaleDateString(undefined, { month: 'numeric', day: 'numeric' });
  now.setDate(now.getDate() - 1); // 減去一天
  const oneMinusFormatted = now.toLocaleDateString(undefined, { month: 'numeric', day: 'numeric' });
  now.setDate(now.getDate() - 1); // 減去一天
  const twoMinusFormatted = now.toLocaleDateString(undefined, { month: 'numeric', day: 'numeric' });
  now.setDate(now.getDate() - 1); // 減去一天
  const threeMinusFormatted = now.toLocaleDateString(undefined, { month: 'numeric', day: 'numeric' });
  now.setDate(now.getDate() - 1); // 減去一天
  const fourMinusFormatted = now.toLocaleDateString(undefined, { month: 'numeric', day: 'numeric' });
  now.setDate(now.getDate() - 1); // 減去一天
  const fiveMinusFormatted = now.toLocaleDateString(undefined, { month: 'numeric', day: 'numeric' });
  now.setDate(now.getDate() - 1); // 減去一天
  const sixMinusFormatted = now.toLocaleDateString(undefined, { month: 'numeric', day: 'numeric' });
 

//個別一天的資料
const calculateAverageWeight = (formattedDate) => {
    // 取得指定日期的資料
    const formattedDateData = DataFromdb[formattedDate];
  
    // 如果資料為空，回傳 0 以避免錯誤
    if (!formattedDateData) {
      console.log("資料不存在");
      return 0;
    }
  
    // 計算總和與數量
    const totalWeight = formattedDateData.reduce((acc, item) => acc + item.weight, 0);
    const averageWeight = formattedDateData.length > 0 ? totalWeight / formattedDateData.length : 0;
  
    console.log("平均值:", averageWeight);
    return averageWeight;
  };
  const data = [
    { year: sixMinusFormatted, value: calculateAverageWeight(sixMinusFormatted)?calculateAverageWeight(formattedDate):userProfile.kg?userProfile.kg:userProfile.lb?userProfile.lb:0 },
    { year:fiveMinusFormatted, value: calculateAverageWeight(fiveMinusFormatted)?calculateAverageWeight(fiveMinusFormatted):userProfile.kg?userProfile.kg:userProfile.lb?userProfile.lb:0 },
    { year: fourMinusFormatted, value: calculateAverageWeight(fourMinusFormatted) ?calculateAverageWeight(fourMinusFormatted):userProfile.kg?userProfile.kg:userProfile.lb?userProfile.lb:0},
    { year: threeMinusFormatted, value: calculateAverageWeight(threeMinusFormatted) ?calculateAverageWeight(threeMinusFormatted):userProfile.kg?userProfile.kg:userProfile.lb?userProfile.lb:0},
    { year: twoMinusFormatted, value: calculateAverageWeight(twoMinusFormatted)?calculateAverageWeight(twoMinusFormatted):userProfile.kg?userProfile.kg:userProfile.lb?userProfile.lb:0},
    { year: oneMinusFormatted, value: calculateAverageWeight(oneMinusFormatted)?calculateAverageWeight(oneMinusFormatted):userProfile.kg?userProfile.kg:userProfile.lb?userProfile.lb:0 },
    { year: formattedDate, value: calculateAverageWeight(formattedDate)?calculateAverageWeight(formattedDate):userProfile.kg?userProfile.kg:userProfile.lb?userProfile.lb:0 },
  ];

  
  const [chartProps, setChartProps] = useState({
    yTitle: "Hours",
    min: 0,
    max: 240,
    tickInterval: 10,
    fill: "l(270) 0:rgba(66, 195, 140, 1) 1:rgba(186, 255, 236, 1)",
    color: "rgba(66, 195, 140, 1)  ",
    xTitle: "Week of: June 4, 2023 - June 10, 2023",
    tickCount: "8",
    end: 6, //7-1
    
  });
  const dbWeightdata = [
    {
        "_id": "67c661c08962819d8a1f3811",
        "weight": 100,
        "units": "kg",
        "createdAt": "2025-03-12T02:13:20.010Z",
        "updatedAt": "2025-03-12T02:18:44.280Z"
    },
    {
        "_id": "67c661c18962819d8a1f3813",
        "weight": 10,
        "units": "kg",
        "createdAt": "2025-03-15T02:13:21.107Z",
        "updatedAt": "2025-03-15T02:13:21.107Z"
    },
    {
        "_id": "67c66212d372a81dd868f4a8",
        "weight": 10,
        "units": "kg",
        "createdAt": "2025-03-15T02:14:42.402Z",
        "updatedAt": "2025-03-15T02:14:42.402Z"
    },
    {
        "_id": "67c662365361c2e4a9ce6323",
        "weight": 10,
        "units": "kg",
        "createdAt": "2025-03-16T02:15:18.651Z",
        "updatedAt": "2025-03-16T02:15:18.651Z"
    }
];
//!拿出要顯示的data
// 格式化 createdAt 為本地時區的 YYYY-MM-DD
const formattedData = dbWeightdata.map(item => {
    const date = new Date(item.createdAt);
    const formattedDate = date.toLocaleDateString(undefined, {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    }).split('/').join('-');
    
    return {
        ...item,
        createdAt: formattedDate
    };
});const groupedData = formattedData.reduce((acc, item) => {
    const date = item.createdAt;
    if (!acc[date]) {
        acc[date] = [];
    }
    acc[date].push(item);
    return acc;
}, {});
// 取得今天日期
const formattedToday = new Date().toLocaleDateString(undefined, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
}).split('/').join('-');

// 取得六天前的日期
const sixDaysAgo = new Date();
sixDaysAgo.setDate(sixDaysAgo.getDate() - 6);
const formattedSixDaysAgo = sixDaysAgo.toLocaleDateString(undefined, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
}).split('/').join('-');

// 過濾符合今天和往前六天的資料
const filteredData = Object.keys(groupedData).filter(date => {
    return date >= formattedSixDaysAgo && date <= formattedToday;
}).reduce((acc, date) => {
    acc[date] = groupedData[date];
    return acc;
}, {});// 計算每一天的 weight 平均值(標準是kg 拿出來時判斷global profilesetting在換成公制英制顯示)
const averageWeightPerDay = Object.entries(filteredData).reduce((acc, [date, entries]) => {
    const totalWeight = entries.reduce((sum, entry) => sum + entry.weight, 0);
    const avgWeight = totalWeight / entries.length;
    acc[date] = avgWeight;
    return acc;
  }, {});
  
console.log(averageWeightPerDay);

const localProfile=JSON.parse(localStorage.getItem("userProfile"))

// console.log(localProfile.units 
//     ? `${averageWeightPerDay} kg` 
//     : `${(averageWeightPerDay * 2.20462).toFixed(0)} lbs`); //{ "2025-03-15": 10,"2025-03-16": 10};

const convertedWeightPerDay = Object.fromEntries(
    Object.entries(averageWeightPerDay).map(([date, weight]) => [
      date,
      localProfile.units === "kg"
        ? `${weight} kg`
        : `${(weight * 2.20462).toFixed(0)} lbs`
    ])
  );
 // localProfile.units = "kg"{   "2025-03-15": "10 kg", "2025-03-16": "10 kg"}//localProfile.units = "lbs"{ "2025-03-15": "22 lbs",  "2025-03-16": "22 lbs" }
  
 return (
    <div className="bg-[#F5F5F5]">
      <Row justify={"space-between"} style={{ marginTop: "24rem" }}>
        <Col style={{ marginLeft: "10rem" }}> Week</Col>
        <Col style={{ marginRight: "10rem" }}>Body Weight</Col>
      </Row>

      <AreaDashWeek
        yTitle={chartProps.yTitle}
        min={chartProps.min} // 使用 useState 中的值
        max={chartProps.max} // 使用 useState 中的值
        tickInterval={chartProps.tickInterval} // 使用 useState 中的值
        color={chartProps.color}
        fill={chartProps.fill}
        tickCount={chartProps.tickCount}
        data={data}
        xTitle={chartProps.xTitle}
        end={chartProps.end}

      />
    </div>
  );
}

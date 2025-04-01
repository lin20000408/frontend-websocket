import React, { useState } from "react";

import AreaComponents from "@/components/Results/Chart/Week/Area";
export default function AverageSpeed() {
  const data = [
    { year:"", value: 0 },
    { year: "Sun", value: 3 },
    { year: "Mon", value: 4 },
    { year: "Tue", value: 3.5 },
    { year: "Wed", value: 5 },
    { year: "Thu", value: 4.9 },
    { year: "Fri", value: 6 },
    { year: "Sat", value: 15 },
    { year:" ", value: 0 },
  ];
  const [chartProps, setChartProps] = useState({
    yTitle: "MPH",
    min: 0,
    max: 15,
    tickInterval: 1,
    color: "#FF7F30",
    fill: "l(270) 0:rgba(255,127,48,1) 1:rgba(255,183,69,0.8)",
    xTitle:'AUG 8, 2024',
    end:8
  });
  return (
    <>
      <AreaComponents
        yTitle={chartProps.yTitle}
        min={chartProps.min} // 使用 useState 中的值
        max={chartProps.max} // 使用 useState 中的值
        tickInterval={chartProps.tickInterval} // 使用 useState 中的值
        color={chartProps.color}
        fill={chartProps.fill}
        data={data}
        xTitle={chartProps.xTitle} // 使用 useState 中的值
        end={chartProps.end}
      />
    </>
  );
}

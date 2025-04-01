import React, { useState } from "react";
import Bar from "@/components/Results/Chart/Week";

export default function Duration() {
    const data = [
        { type: "Sun", sales: 12 },
        { type: "Mon", sales: 8 },
        { type: "Tue", sales: 4 },
        { type: "Wed", sales: 14 },
        { type: "Thu", sales: 8 },
        { type: "Fri", sales: 8 },
        { type: "Sat", sales: 6 },
      ];
    const [chartProps, setChartProps] = useState({
        yTitle: "Hours",
        min: 0,
        max: 24,
        tickInterval: 1,
        xTitle:'AUG 8, 2024',
        color: "l(270) 0:rgba(128, 195, 66, 1.0) 1:rgba(186, 230, 66, 1)",
      });
  return (
    <>
 <Bar
        yTitle={chartProps.yTitle}
        min={chartProps.min} // 使用 useState 中的值
        max={chartProps.max} // 使用 useState 中的值
        tickInterval={chartProps.tickInterval} // 使用 useState 中的值
        data={data}
        color={chartProps.color}
        xTitle={chartProps.xTitle} // 使用 useState 中的值
      />
    </>
  );
}

import { useEffect, useState, useContext, useRef } from "react";
import { Col, Row } from "antd";
import Icon_DownArrowBlack from "@/assets/icons2/DownArrow-Black.svg?react";
import Icon_UpArrowBlack from "@/assets/icons2/UpArrow-Black.svg?react";
import { Column } from "@antv/g2plot";
import Icon_MoreArrow from "@/assets/icons/MoreArrow.svg";

export default function GroupYear({
    yTitle,
    min,
    max,
    tickInterval,
    data,
  
    xTitle,
    type1Color,
    type2Color,
}) {
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
            if (type === "Workout Log") return type1Color;
            if (type === "Facility Workout") return type2Color;
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
            text: xTitle,
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
            text: yTitle,
            offset: isMobile ? 30 : isMedium ? 35 : 45,
            style: {
              fontSize: isMobile ? 10 : isMedium ? 16 : 25,
              fill: "#97989A",
            },
          },
          min: min,
          max: max,
          tickInterval: tickInterval,
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

  return (
    <div>
     
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
    

    </div>
  );
}

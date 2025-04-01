import { useEffect, useState, useContext, useRef } from "react";
import { Col, Row } from "antd";
import Icon_DownArrowBlack from "@/assets/icons2/DownArrow-Black.svg?react";
import Icon_UpArrowBlack from "@/assets/icons2/UpArrow-Black.svg?react";
import { Area } from "@antv/g2plot";

import Icon_MoreArrow from "@/assets/icons/MoreArrow.svg";

export default function AreaComponents({
  color,
  fill,
  yTitle,
  min,
  max,
  tickInterval,
  data,
  xTitle,
  end
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
        xField: "year",
        yField: "value",
        color: color,

        theme: {
          styleSheet: {
            backgroundColor: "#ffffff",
          },
        },
        appendPadding: isMobile
          ? [9, 8, 10, 3]
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
        grid: {
            line: {
              style: (x, y) => {
                const index = Math.round(y);
                return {
                  stroke: index === 0 || index === end ? "transparent" : "#97989A", // 第一条线透明
                };
              },
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
          range: [0, 1],
          tickCount: 8,
        },
        yAxis: {
          title: {
            text: yTitle,
            offset: isMobile ? 25 : isMedium ? 35 : 45,
            style: {
              fontSize: isMobile ? 10 : isMedium ? 16 : 25,
              fill: "#97989A",
            },
          },
          min: 0,
          max: max,
          tickInterval: tickInterval,
          label: {
            style: (tickValue) => ({
              fontSize: isMobile ? 8 : isMedium ? 14 : 20,
              fill: "#97989A",
            }),
          },
          startOnZero: true,
        },
        animation: false,
        areaStyle: () => {
          return {
            fill: fill,
            fillOpacity: 1,
          };
        },
      };

      const chart = new Area(chartRef.current, config);
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
            height: "253rem",
            margin: "0 4%",
          }}
          className="  ml-[calc(15rem)] "
        />
      </Col>
    </div>
  );
}

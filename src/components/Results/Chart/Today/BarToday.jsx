import { useEffect, useState, useContext, useRef } from "react";
import { Col, Row } from "antd";
import Icon_DownArrowBlack from "@/assets/icons2/DownArrow-Black.svg?react";
import Icon_UpArrowBlack from "@/assets/icons2/UpArrow-Black.svg?react";
import { Column } from "@antv/g2plot";
import Icon_MoreArrow from "@/assets/icons/MoreArrow.svg";

export default function BarToday({
  yTitle,
  min,
  max,
  tickInterval,
  data,
  color,
  xTitle
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
        xField: "type",
        yField: "sales",
        columnWidthRatio: 0.46,
        color: color,
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
        animation: false,
        yAxis: {
          title: {
            text: yTitle,
            offset: isMobile ? 25 : isMedium ? 35 : 45,
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

  return (
    <div>
     
      <Col>
        <div
          ref={chartRef}
          style={{
            width: "92%",
            height: "392rem",
            margin: "0 4%",
          }}
          className="  ml-[calc(15rem)] "
        />
      </Col>
    

    </div>
  );
}

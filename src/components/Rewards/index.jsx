import { useContext, useEffect, useRef, useState } from "react";
import { Row, Col, Dropdown, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { Content } from "@/App";
// css 的模組引入
import styles from "@/css/local.module.css";
import ECOWatts from "@/assets/icons/ECOWatts.svg?react";
// const DARKGRAY_COLOR = '#333F48';
import { DARKGRAY_COLOR, MAIN_COLOR } from "@/constants";

// import Icon_Arrow from '@/assets/icons/MoreArrow.svg'

import { NAVIBAR_SIZE } from "../../constants";
import RewardCard from "@/components/Rewards/RewardCard";
const Rewards = () => {
  const { scaleV } = useContext(Content);

  // 在您的组件中使用 ScrollToTop 组件

  const elementRef = useRef(null);
  const [distanceToBottom, setDistanceToBottom] = useState(0);
  useEffect(() => {
    // 函数用于计算元素到视口底部的距离
    const calculateDistanceToBottom = () => {
      if (elementRef.current) {
        const elementRect = elementRef.current.getBoundingClientRect();
        const distance = window.innerHeight - elementRect.bottom;
        setDistanceToBottom(distance);
      }
    };
    // 初始化计算一次距离
    calculateDistanceToBottom();
  }, []);
  const items = [
    {
      label: (
        <a
          style={{ fontSize: "15rem" }}
          rel="noopener noreferrer"
          onClick={() => handleMenuClick("0")}
        >
          Fitness Gym One
        </a>
      ),
      key: "0",
    },
    {
      label: (
        <a
          style={{ fontSize: "15rem" }}
          rel="noopener noreferrer "
          onClick={() => handleMenuClick("1")}
        >
          Fitness Gym Two
        </a>
      ),
      key: "1",
    },

    {
      label: (
        <a
          style={{ fontSize: "15rem" }}
          rel="noopener noreferrer"
          onClick={() => handleMenuClick("2")}
        >
          Fitness Gym Three
        </a>
      ),
      key: "2",
    },
  ];

  const [selectedGym, setSelectedGym] = useState("Fitness Gym One");
  const [pageOne, setPageOne] = useState(true);
  const [pageTwo, setPageTwo] = useState(false);
  const [pageThree, setPageThree] = useState(false);
  const handleMenuClick = (key) => {
    if (key === "0") {
      setPageOne(true);
      setPageThree(false);
      setPageTwo(false);
    } else if (key === "1") {
      setPageTwo(true);
      setPageOne(false);
      setPageThree(false);
      setSelectedGym("Fitness Gym Two");
    } else if (key === "2") {
      setPageThree(true);
      setPageOne(false);
      setPageTwo(false);
      setSelectedGym("Fitness Gym Three");
    }
  };
  const photo1 = "https://www.w3schools.com/css/img_lights.jpg";
  return (
    <div className=" w-dvw bg-backgroundColor pt-[60rem] ">
      <div>
        {/* 下面這一行Row是對齊用的 */}

        <Row className="flex w-screen  items-center bg-backgroundColor pl-[15rem] text-center text-[20rem]">
          <Col
            style={{
              fontSize: "15rem",
              color: DARKGRAY_COLOR,
              marginRight: "5rem",
            }}
            className=""
          >
            {" "}
            {"Select Facility :"}
          </Col>
          <Col style={{ fontSize: "15rem", color: DARKGRAY_COLOR }}> </Col>
          <Col>
            <Dropdown
              menu={{
                items,
                onClick: ({ key }) => handleMenuClick(key),
              }}
            >
              <a onClick={(e) => e.preventDefault()}>
                <Space style={{ fontSize: "15rem" ,fontWeight:'bold'}}>
                  {selectedGym}
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
          </Col>
        </Row>

        {pageOne && (
          <div>
            <Row>
              <Col
                style={{
                  textAlign: "center",
                  marginLeft: "15rem",
                  fontSize: "20rem",
                  marginTop: "8rem",
                }}
                className="h-[29rem] text-[#FF7F30]"
              >
                {" "}
                User Watts
              </Col>
            </Row>
            <div
              className="relative"
              style={{
                height: "99rem",
                backgroundColor: "white",
                textAlign: "center",
                marginLeft: "15rem",
                paddingLeft: "12rem",
              }}
            >
              <Row>
                <Col
                  className="mt-[8.4rem]  font-bold"
                  style={{
                    fontSize: "15rem",
                    textAlign: "left",
                    color: "#333f48",
                  }}
                >
                  Accumulated Watt Available
                </Col>
              </Row>

              <Row>
                <Col>
                  <div
                    style={{ fontSize: "35rem", color: MAIN_COLOR }}
                    className="h-[44rem] font-bold "
                  >
                    {" "}
                    3000
                  </div>
                  <div
                    style={{
                      fontSize: "13rem",
                      color: "#53565a",
                      textAlign: "left",
                    }}
                  >
                    WH
                  </div>
                </Col>
              </Row>
              <Row
                className=" absolute  "
                style={{ right: "2rem", bottom: "2rem" }}
              >
                <ECOWatts style={{ width: "42rem" }} />
              </Row>
            </div>

            {/* 畫斜線 */}
            {/* 一條斜線使用css實現 */}
            <div
              className={styles.diagonalLineBlack}
              style={{ marginTop: "18rem", color: "black" }}
            >
              {" "}
            </div>

            <Row>
              <Col
                style={{
                  textAlign: "center",
                  marginLeft: "15rem",
                  fontSize: "20rem",
                  marginTop: "18rem",
                }}
                className="h-[29rem] text-[#FF7F30]"
              >
                Rewards Available
              </Col>
            </Row>

            {/* 內容框reward1 */}
            <RewardCard
              photo1={photo1}
              rewardGood={"T-shirt"}
              accumulatedWatts={1000}
              QuantityBottom={"2 of 2"}
              QuantityTop={2}
            />
            <div className="mb-[19rem] mt-[19rem] flex justify-center">
              <div className="h-[1rem] w-[349.5rem] border-t-[1rem] border-[#FF7F30]"></div>
            </div>
            {/* 內容框reward2 */}
            <RewardCard
              photo1={photo1}
              rewardGood={"T-shirt"}
              accumulatedWatts={1000}
              QuantityBottom={"2 of 2"}
              QuantityTop={2}
            />
          </div>
        )}

        {pageTwo && (
          <div>
            <Row>
              <Col
                style={{
                  textAlign: "center",
                  marginLeft: "15rem",
                  fontSize: "20rem",
                  marginTop: "8rem",
                }}
                className="h-[29rem] text-[#FF7F30]"
              >
                {" "}
                User Watts
              </Col>
            </Row>
            <div
              className="relative"
              style={{
                height: "99rem",
                backgroundColor: "white",
                textAlign: "center",
                marginLeft: "15rem",
                paddingLeft: "12rem",
              }}
            >
              <Row>
                <Col
                  className="mt-[8.4rem]  font-bold"
                  style={{
                    fontSize: "15rem",
                    textAlign: "left",
                    color: "#333f48",
                  }}
                >
                  Accumulated Watt Available
                </Col>
              </Row>

              <Row>
                <Col>
                  <div
                    style={{ fontSize: "35rem", color: MAIN_COLOR }}
                    className="h-[44rem] font-bold "
                  >
                    {" "}
                    3000
                  </div>
                  <div
                    style={{
                      fontSize: "13rem",
                      color: "#53565a",
                      textAlign: "left",
                    }}
                  >
                    WH
                  </div>
                </Col>
              </Row>
              <Row
                className=" absolute  "
                style={{ right: "2rem", bottom: "2rem" }}
              >
                <ECOWatts style={{ width: "42rem" }} />
              </Row>
            </div>

            {/* 畫斜線 */}
            {/* 一條斜線使用css實現 */}
            <div
              className={styles.diagonalLineBlack}
              style={{ marginTop: "18rem", color: "black" }}
            >
              {" "}
            </div>

            <Row>
              <Col
                style={{
                  textAlign: "center",
                  marginLeft: "15rem",
                  fontSize: "20rem",
                  marginTop: "18rem",
                }}
                className="h-[29rem] text-[#FF7F30]"
              >
                Rewards Available
              </Col>
            </Row>

            {/* 內容框reward1 */}
            <RewardCard
              photo1={photo1}
              rewardGood={"Two-shirt"}
              accumulatedWatts={1000}
              QuantityBottom={"2 of 2"}
              QuantityTop={2}
            />
            <div className="mb-[19rem] mt-[19rem] flex justify-center">
              <div className="h-[1rem] w-[349.5rem] border-t-[1rem] border-[#FF7F30]"></div>
            </div>
            {/* 內容框reward2 */}
            <RewardCard
              photo1={photo1}
              rewardGood={"T-shirt"}
              accumulatedWatts={1000}
              QuantityBottom={"2 of 2"}
              QuantityTop={2}
            />
          </div>
        )}
        {pageThree && (
          <div>
            <Row>
              <Col
                style={{
                  textAlign: "center",
                  marginLeft: "15rem",
                  fontSize: "20rem",
                  marginTop: "8rem",
                }}
                className="h-[29rem] text-[#FF7F30]"
              >
                {" "}
                User Watts
              </Col>
            </Row>
            <div
              className="relative"
              style={{
                height: "99rem",
                backgroundColor: "white",
                textAlign: "center",
                marginLeft: "15rem",
                paddingLeft: "12rem",
              }}
            >
              <Row>
                <Col
                  className="mt-[8.4rem]  font-bold"
                  style={{
                    fontSize: "15rem",
                    textAlign: "left",
                    color: "#333f48",
                  }}
                >
                  Accumulated Watt Available
                </Col>
              </Row>

              <Row>
                <Col>
                  <div
                    style={{ fontSize: "35rem", color: MAIN_COLOR }}
                    className="h-[44rem] font-bold "
                  >
                    {" "}
                    3000
                  </div>
                  <div
                    style={{
                      fontSize: "13rem",
                      color: "#53565a",
                      textAlign: "left",
                    }}
                  >
                    WH
                  </div>
                </Col>
              </Row>
              <Row
                className=" absolute  "
                style={{ right: "2rem", bottom: "2rem" }}
              >
                <ECOWatts style={{ width: "42rem" }} />
              </Row>
            </div>

            {/* 畫斜線 */}
            {/* 一條斜線使用css實現 */}
            <div
              className={styles.diagonalLineBlack}
              style={{ marginTop: "18rem", color: "black" }}
            >
              {" "}
            </div>

            <Row>
              <Col
                style={{
                  textAlign: "center",
                  marginLeft: "15rem",
                  fontSize: "20rem",
                  marginTop: "18rem",
                }}
                className="h-[29rem] text-[#FF7F30]"
              >
                Rewards Available
              </Col>
            </Row>

            {/* 內容框reward1 */}
            <RewardCard
              photo1={photo1}
              rewardGood={"Three-shirt"}
              accumulatedWatts={1000}
              QuantityBottom={"2 of 2"}
              QuantityTop={2}
            />
            <div className="mb-[19rem] mt-[19rem] flex justify-center">
              <div className="h-[1rem] w-[349.5rem] border-t-[1rem] border-[#FF7F30]"></div>
            </div>
            {/* 內容框reward2 */}
            <RewardCard
              photo1={photo1}
              rewardGood={"T-shirt"}
              accumulatedWatts={1000}
              QuantityBottom={"2 of 2"}
              QuantityTop={2}
            />
          </div>
        )}
      </div>
    </div>
  );
};
export default Rewards;

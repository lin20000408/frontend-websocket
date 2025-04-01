// import { render, screen } from "@testing-library/react";
// import { expect, test, vi } from "vitest";
// import RealtimeCardio from "@/components/QuickConnect/RealTimeMonitor/RealtimeCardio";
// import { Content } from "@/App";

// // 模擬必要的模組
// vi.mock("react-router-dom", () => ({
//   useNavigate: () => vi.fn(),
// }));

// vi.mock("@/App", () => ({
//   Content: {
//     Consumer: ({ children }) =>
//       children({
//         setCurrentSub1Screen: vi.fn(),
//         activeScreen: "testScreen",
//         setActiveScreen: vi.fn(),
//         setCurrentScreen: vi.fn(),
//         currentSub1Screen: "testSubScreen",
//         scaleV: 1,
//       }),
//   },
// }));

// vi.mock("@/css/local.module.css", () => ({
//   default: {
//     signUpInputBigFrame: "sign-up-input-big-frame",
//   },
// }));

// // 模擬 sessionStorage
// const mockSessionStorage = {
//   getItem: vi.fn(),
//   setItem: vi.fn(),
// };
// Object.defineProperty(window, "sessionStorage", {
//   value: mockSessionStorage,
// });

// // 測試組件
// describe("RealtimeCardio Component", () => {
//   beforeEach(() => {
//     // 重置 mock
//     vi.resetAllMocks();
//     mockSessionStorage.getItem.mockReturnValue(null); // 默認無 sessionStorage 數據
//   });

//   test("renders default workout data correctly", () => {
//     render(<RealtimeCardio />);

//     // 檢查標題和設備類型
//     expect(screen.getByText("TRAINING PROGRESS")).toBeInTheDocument();
//     expect(screen.getByText("Machine Type:GreenBike")).toBeInTheDocument();

//     // 檢查預設數據渲染
//     expect(screen.getByDisplayValue("5547 km")).toBeInTheDocument(); // distance
//     expect(screen.getByDisplayValue("46.8 kph")).toBeInTheDocument(); // speed
//     expect(screen.getByDisplayValue("71:06 mm:ss")).toBeInTheDocument(); // time
//     expect(screen.getByDisplayValue("3606 kCal")).toBeInTheDocument(); // calories
//     expect(screen.getByDisplayValue("0 bpm")).toBeInTheDocument(); // heartRate
//     expect(screen.getByDisplayValue("112 watt")).toBeInTheDocument(); // mechanicalEnergy
//     expect(screen.getByDisplayValue("10481 WH")).toBeInTheDocument(); // greenEnergy

//     // 檢查 END 按鈕
//     expect(screen.getByText("END")).toBeInTheDocument();
//   });

//   test("renders custom workout data from sessionStorage", () => {
//     const customWorkoutData = {
//       time: "10:30",
//       calories: "500",
//       humanWatt: "150",
//       distance: "1000",
//       speed: "200",
//       heartRate: "120",
//       energy: "2000",
//       distanceScale: "1-x1Km/h",
//       speedScale: "1-x1Km/h",
//       unitType: "0-Metric",
//       devType: "15-Treadmill",
//     };
//     mockSessionStorage.getItem.mockReturnValue(
//       JSON.stringify(customWorkoutData),
//     );

//     render(<RealtimeCardio />);

//     expect(screen.getByText("Machine Type:Treadmill")).toBeInTheDocument();
//     expect(screen.getByDisplayValue("1000 km")).toBeInTheDocument();
//     expect(screen.getByDisplayValue("200 kph")).toBeInTheDocument();
//     expect(screen.getByDisplayValue("10:30 mm:ss")).toBeInTheDocument();
//     expect(screen.getByDisplayValue("500 kCal")).toBeInTheDocument();
//     expect(screen.getByDisplayValue("120 bpm")).toBeInTheDocument();
//     expect(screen.getByDisplayValue("150 watt")).toBeInTheDocument();
//     expect(screen.getByDisplayValue("2000 WH")).toBeInTheDocument();
//   });

//   test("handles END button click", () => {
//     const mockSetCurrentSub1Screen = vi.fn();
//     vi.spyOn(React, "useContext").mockReturnValue({
//       setCurrentSub1Screen: mockSetCurrentSub1Screen,
//       activeScreen: "testScreen",
//       setActiveScreen: vi.fn(),
//       setCurrentScreen: vi.fn(),
//       currentSub1Screen: "testSubScreen",
//       scaleV: 1,
//     });

//     render(<RealtimeCardio />);
//     const endButton = screen.getByText("END");
//     endButton.click();

//     expect(mockSetCurrentSub1Screen).toHaveBeenCalledWith(
//       "quickConnectHomeScreen",
//     );
//   });

//   test("applies correct CSS classes", () => {
//     render(<RealtimeCardio />);

//     const distanceInput = screen.getByDisplayValue("5547 km");
//     expect(distanceInput).toHaveClass("sign-up-input-big-frame");
//   });
// });

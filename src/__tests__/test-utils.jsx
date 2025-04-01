// // test-utils.jsx
// import React from "react";
// import { render } from "@testing-library/react";
// import { ConfigProvider } from "antd";
// import { MemoryRouter } from "react-router-dom";
// import { vi } from "vitest";
// import { TouchContext } from "./path-to-your-context"; // 替換為實際路徑
// import { GlobalStateContext } from "./path-to-your-context"; // 替換為實際路徑
// import { Content } from "@root/hooks/ContentProvider"; // 替換為實際路徑
// import { IntlManager } from "./path-to-your-intl-manager"; // 替換為實際路徑

// // 定義 TouchContext 的默認值
// const defaultTouchContextValue = {
//   touchStart: "",
//   touchEnd: "",
//   screenHeight: "",
//   setTouchStart: "",
//   setTouchEnd: "",
// };

// // 定義 GlobalStateContext 的默認值
// const defaultGlobalState = {
//   globalstate: {},
//   setGlobalState: vi.fn(),
// };

// // 定義 Content.Provider 的默認值
// const defaultContentValue = {
//   isBack: false,
//   setIsBack: vi.fn(),
//   logout: {},
//   setLogout: vi.fn(),
//   setIsClickOpCode: vi.fn(),
//   isClickOpCode: {},
//   //??
//   //  mac.js
//   mac: {},
//   setMac: vi.fn(),
//   macErr: {},
//   setMacErr: vi.fn(),

//   saClubToken: {},
//   setSaClubToken: vi.fn(),

//   scaleH: {},
//   setScaleH: vi.fn(),
//   scaleV: {},
//   setScaleV: vi.fn(),
//   isPortrait: {},
//   setIsPortrait: vi.fn(),

//   setReconnectionAttemptExceededMaximumNumber: vi.fn(),
//   reconnectionAttemptExceededMaximumNumber: {},
//   socketio: {},
//   setSocketio: vi.fn(),
//   ws: {},
//   setWs: vi.fn(),
//   connectState: {},
//   setConnectState: vi.fn(),

//   activeScreen: {},
//   setActiveScreen: vi.fn(),
//   currentScreen: {},
//   setCurrentScreen: vi.fn(),
//   currentSub1Screen: {},
//   setCurrentSub1Screen: vi.fn(),
//   currentSub2Screen: {},
//   setCurrentSub2Screen: vi.fn(),
//   currentSub3Screen: {},
//   setCurrentSub3Screen: vi.fn(),
//   currentSub4Screen: {},
//   setCurrentSub4Screen: vi.fn(),

//   userRegState: {},
//   setUserRegState: vi.fn(),
//   confirmDeleteUserAccount: {},
//   setConfirmDeleteUserAccount: vi.fn(),
//   userProfile: {},
//   setUserProfile: vi.fn(),
//   setUpdateUserProfile: vi.fn(),
//   updateUserProfile: {},
//   deleteUserID: {},
//   setDeleteUserID: vi.fn(),
//   rebindingState: {},
//   setRebindingState: vi.fn(),
//   confirmForgetUserPasswordCode: {},
//   setConfirmForgetUserPasswordCode: vi.fn(),
//   forgetUserPassword: {},
//   setForgetUserPassword: vi.fn(),
//   email: {},
//   setEmail: vi.fn(),
//   password: {},
//   setPassword: vi.fn(),
//   confirmPassword: {},
//   setConfirmPassword: vi.fn(),
//   newPassword: {},
//   setNewPassword: vi.fn(),
//   setConfirmUpdateUserPassword: vi.fn(),
//   confirmUpdateUserPassword: {},

//   googleSub: {},
//   setGoogleSub: vi.fn(),
//   googleSubBackup: {},
//   setGoogleSubBackup: vi.fn(),

//   instagramSub: {},
//   setInstagramSub: vi.fn(),
//   googleState: {},
//   setGoogleState: vi.fn(),
//   instagramState: {},
//   setInstagramState: vi.fn(),

//   ecoPowr: {},
//   setEcoPowr: vi.fn(),
//   ecoNatural: {},
//   setEcoNatural: vi.fn(),

//   distance: {},
//   setDistance: vi.fn(),
//   setSessionWorkoutBuilderData: vi.fn(),
//   sessionWorkoutBuilderData: {},

//   setSquares: vi.fn(),
//   squares: {},

//   setSquareType: vi.fn(),
//   squareType: {},
//   backToAddOrEditStepTwo: {},
//   setBackToAddOrEditStepTwo: vi.fn(),

//   stepOneToTwoWorkoutType: {},
//   setStepOneToTwoWorkoutType: vi.fn(),
//   setSquareId: vi.fn(),
//   squareId: {},
//   workoutbuilderStepTwoId: {},
//   setWorkoutbuilderStepTwoId: vi.fn(),
//   setGetWorkoutbuilders: vi.fn(),
//   getWorkoutbuilders: {},
//   setAddNewWorkoutbuilder: vi.fn(),
//   addNewWorkoutbuilder: {},
//   updateWorkoutbuilder: {},
//   setUpdateWorkoutbuilder: vi.fn(),
//   setSelected: vi.fn(),
//   selected: {}, // seeMoreClick type, category
//   setDeleteWorkoutbuilder: vi.fn(),
//   deleteWorkoutbuilder: {},

//   weekData: {},
//   setWeekData: vi.fn(),

//   E024ScanQrcode: {},
//   setE024ScanQrcode: vi.fn(),
//   setE070ScanQrcode: vi.fn(),
//   E070ScanQrcode: {},
//   setRealTimeWorkout: vi.fn(),
//   realTimeWorkout: {},

//   formatDate: {},
//   formattedEndtime: {},
//   formattedStarttime: {},
//   maintanceTime: {},
//   setMaintanceTime: vi.fn(),

//   cardioFilterOptions: {},

//   rememberMe: {},
//   setRememberMe: vi.fn(),
//   setRefreshToken: vi.fn(),
//   refreshToken: {},
//   isLogin: {},
//   setIsLogin: vi.fn(),
//   isSupportLocalStorage: {},
//   setIsSupportLocalStorage: vi.fn(),
//   setDeleteWorkout: vi.fn(),
//   deleteWorkout: {},

//   retSetUserProfileState: {},
//   setRetSetUserProfileState: vi.fn(),
//   confirmUserEmail: {},
//   setConfirmUserEmail: vi.fn(),
//   verifyUserEmail: {},
//   setVerifyUserEmail: vi.fn(),
// };

// export const TestProviders = ({
//   children,
//   initialRoute = "/",
//   locale = "en",
// }) => {
//   return (
//     <TouchContext.Provider value={defaultTouchContextValue}>
//       <div className="h-dvh overflow-auto">
//         <GlobalStateContext.Provider value={defaultGlobalState}>
//           <ConfigProvider
//             theme={{
//               token: {
//                 fontFamily: "proxima-nova",
//                 colorPrimary: "#84BD00",
//               },
//               components: {
//                 Table: {
//                   headerColor: "rgba(132, 189, 0, 1)",
//                   fontSize: "12rem",
//                   fontWeightStrong: 600,
//                   padding: "13rem",
//                 },
//                 Form: { labelColor: "#84BD00" },
//                 Dropdown: { fontSize: "16rem", paddingBlock: 0 },
//                 Select: {
//                   activeOutlineColor: "transparent",
//                   optionFontSize: "16rem",
//                 },
//                 Popover: { titleMinWidth: "120rem" },
//               },
//             }}
//           >
//             <Content.Provider theme={{ token: {} }} value={defaultContentValue}>
//               <IntlManager locale={locale}>
//                 <MemoryRouter initialEntries={[initialRoute]}>
//                   {children}
//                 </MemoryRouter>
//               </IntlManager>
//             </Content.Provider>
//           </ConfigProvider>
//         </GlobalStateContext.Provider>
//       </div>
//     </TouchContext.Provider>
//   );
// };

// export const customRender = (ui, options = {}) =>
//   render(ui, {
//     wrapper: ({ children }) => <TestProviders>{children}</TestProviders>,
//     ...options,
//   });

// export * from "@testing-library/react";
// export { customRender as render };

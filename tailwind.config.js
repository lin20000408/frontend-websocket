/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        mainColor: "#84bd00",
        darkColor: "#333F48",
        orangeColor: "#ff7f30",
        backgroundColor: "#f5f5f5",
        lightgrayColor: "#efefef",
        lightGrayColor: "#97989A",
      },
      fontFamily: {
        'Proxima': ["Proxima_Nova", "sans-serif"],
        fontSize: {
          base: "1rem",
        },
        fontWeight: {
          normal: "400",
        },
        lineHeight: {
          body: "1.5",
        },
      },
     
    },
    plugins: [],
    corePlugins: {
      fill: false,
    },
  },
};

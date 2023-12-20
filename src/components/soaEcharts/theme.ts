const T = {
  color: [
    "#2ec7c9",
    "#b6a2de",
    "#5ab1ef",
    "#ffb980",
    "#d87a80",
    "#8d98b3",
    "#e5cf0d",
    "#97b552",
    "#95706d",
    "#dc69aa",
    "#07a2a4",
    "#9a7fd1",
    "#588dd5",
    "#f5994e",
    "#c05050",
    "#59678c",
    "#c9ab00",
    "#7eb00a",
    "#6f5553",
    "#c14089",
  ],
  grid: {
    left: "3%",
    right: "3%",
    bottom: "10",
    top: "40",
    containLabel: true,
  },
  legend: {
    textStyle: {
      color: "#999",
    },
    inactiveColor: "rgba(128,128,128,0.4)",
  },
  categoryAxis: {
    axisLine: {
      show: true,
      lineStyle: {
        color: "rgba(128,128,128,0.2)",
        width: 1,
      },
    },
    axisTick: {
      show: false,
      lineStyle: {
        color: "#333",
      },
    },
    axisLabel: {
      color: "#999",
    },
    splitLine: {
      show: false,
      lineStyle: {
        color: ["#eee"],
      },
    },
    splitArea: {
      show: false,
      areaStyle: {
        color: ["rgba(255,255,255,0.01)", "rgba(0,0,0,0.01)"],
      },
    },
  },
  valueAxis: {
    axisLine: {
      show: false,
      lineStyle: {
        color: "#999",
      },
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: "rgba(128,128,128,0.2)",
      },
    },
  },
};

export default T;

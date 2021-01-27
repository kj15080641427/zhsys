import * as echarts from "echarts";

export const chart1 = () => {
  const option = {
    tooltip: {
      trigger: "item",
    },

    series: [
      {
        hoverOffset: 1,
        type: "pie",
        radius: ["70%", "80%"],
        avoidLabelOverlap: false,
        label: {
          show: true,
          position: "center",
          formatter: "借出", //图中心显示文本
          fontSize: 20,
        },

        labelLine: {
          show: false,
        },
        data: [
          {
            value: 70,
            name: "借出",
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "rgb(139,12,217)" },
                { offset: 0.5, color: "rgb(100,88,205)" },
                { offset: 1, color: "rgb(94,99,205)" },
              ]),
              borderRadius: 10,
            },
          },
          {
            value: 30,
            name: "",
            itemStyle: {
              borderRadius: -10,
              color: "#A9AAAA",
            },
          },
        ],
      },
    ],
  };
  let myChartcount = echarts.init(document.getElementById("chart1"));
  myChartcount.setOption(option);
};
export const chart2 = () => {
  const option = {
    tooltip: {
      trigger: "item",
    },

    series: [
      {
        hoverOffset: 1,
        type: "pie",
        radius: ["70%", "80%"],
        avoidLabelOverlap: false,
        label: {
          show: true,
          position: "center",
          formatter: "借出", //图中心显示文本
          fontSize: 20,
        },

        labelLine: {
          show: false,
        },
        data: [
          {
            value: 70,
            name: "借出",
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "rgb(48,130,237)" },
                { offset: 0.5, color: "rgb(92,196,250)" },
                { offset: 1, color: "rgb(156,221,251)" },
              ]),
              // color: "linear-gradient(to right, red , yellow)",
            },
          },
          {
            value: 30,
            name: "",
            itemStyle: {
              color: "#A9AAAA",
            },
          },
        ],
      },
    ],
  };
  let myChartcount = echarts.init(document.getElementById("chart2"));
  myChartcount.setOption(option);
};
export const chart3 = () => {
  const option = {
    series: [
      {
        name: "面积模式",
        type: "pie",
        radius: [30, 80],
        center: ["50%", "50%"],
        roseType: "area",
        itemStyle: {
          borderRadius: 8,
        },
        data: [
          { value: 10, name: "rose 1" },
          { value: 38, name: "rose 2" },
          { value: 32, name: "rose 3" },
          { value: 30, name: "rose 4" },
          { value: 28, name: "rose 5" },
          { value: 26, name: "rose 6" },
          { value: 22, name: "rose 7" },
          { value: 18, name: "rose 8" },
        ],
      },
    ],
  };
  let myChartcount = echarts.init(document.getElementById("chart3"));
  myChartcount.setOption(option);
};
export const chart4 = () => {
  const option = {
    tooltip: {
      trigger: "item",
    },
    legend: {
      top: "bottom",
    },
    series: [
      {
        name: "访问来源",
        type: "pie",
        radius: ["40%", "70%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          show: false,
          position: "center",
        },
        emphasis: {
          label: {
            show: true,
            fontSize: "40",
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: 1048, name: "设备采购1" },
          { value: 735, name: "设备采购2" },
          { value: 580, name: "设备采购3" },
          { value: 484, name: "设备采购4" },
        ],
      },
    ],
  };
  let myChartcount = echarts.init(document.getElementById("chart4"));
  myChartcount.setOption(option);
};

export const chart5 = () => {
  const option = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        crossStyle: {
          color: "#999",
        },
      },
    },
    legend: {
      data: ["第一个月", "第二个月", "第三个月"],
    },
    xAxis: [
      {
        type: "category",
        data: [
          "归还损坏",
          "归还损坏",
          "归还损坏3",
          "归还损坏",
          "归还损坏",
          "归还损坏",
          "归还损坏",
          "归还损坏",
          "归还损坏",
          "归还损坏",
          "归还损坏",
          "归还损坏",
        ],
        axisPointer: {
          type: "shadow",
        },
      },
    ],
    yAxis: [
      {
        type: "value",
        name: "次数",
      },
    ],
    series: [
      {
        name: "第一个月",
        type: "bar",
        data: [
          2.0,
          4.9,
          7.0,
          23.2,
          25.6,
          76.7,
          135.6,
          162.2,
          32.6,
          20.0,
          6.4,
          3.3,
        ],
      },
      {
        name: "第二个月",
        type: "bar",
        data: [
          2.6,
          5.9,
          9.0,
          26.4,
          28.7,
          70.7,
          175.6,
          182.2,
          48.7,
          18.8,
          6.0,
          2.3,
        ],
      },
      {
        name: "第三个月",
        type: "bar",
        data: [
          2.6,
          5.9,
          9.0,
          26.4,
          28.7,
          70.7,
          175.6,
          182.2,
          48.7,
          18.8,
          6.0,
          2.3,
        ],
      },
    ],
  };
  let myChartcount = echarts.init(document.getElementById("chart5"));
  myChartcount.setOption(option);
};

import * as echarts from "echarts";

export const chart1 = () => {
  const option = {
    tooltip: {
      trigger: "item",
    },
    series: [
      {
        name: "设备状态",
        type: "pie",
        radius: ["40%", "70%"],
        label: {
          show: false,
          position: "center",
        },
        data: [
          {
            value: 1048,
            name: "借出",
            itemStyle: {
              color: "rgba(251,232,140)",
            },
          },
          {
            value: 735,
            name: "闲置",
            itemStyle: {
              color: "rgba(168,215,169)",
            },
          },
          {
            value: 580,
            name: "保养",
            itemStyle: {
              color: "rgba(241,155,154)",
            },
          },
          {
            value: 484,
            name: "维修",
            itemStyle: {
              color: "rgba(207,143,219)",
            },
          },
          {
            value: 300,
            name: "报废",
            itemStyle: {
              color: "rgba(255,179,89)",
            },
          },
        ],
      },
    ],
  };
  let myChartcount = echarts.init(document.getElementById("chart1"));
  myChartcount.setOption(option);
};

export const chart3 = () => {
  let a = [];
  for (let i = 1; i <= 31; i++) {
    a.push(i);
  }
  let x = [...a];
  const option = {
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: x,
    },
    tooltip: {
      trigger: 'axis'
  },
    yAxis: {
      type: "value",
    },
    grid: {
      right: "20",
      left: "30",
    },
    series: [
      {
        data: a.sort((a, b) => (Math.random() > 0.5 ? -1 : 1)),
        type: "line",
        symbolSize: 10,
        lineStyle: {
          color: "rgba(177,216,245,1)",
          width: 1,
        },
        areaStyle: {
          color: "rgba(177,216,245,1)",
        },
        itemStyle: {
          borderWidth: 1,
        },
      },
    ],
  };
  let myChartcount = echarts.init(document.getElementById("chart3"));
  myChartcount.setOption(option);
};

import React, { useEffect } from "react";
import { Card } from "antd";
import * as echarts from "echarts";
import "./index.scss";

export default () => {
  useEffect(() => {
    let myChartcount = echarts.init(document.getElementById("chart1"));
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
            formatter: "30%", //图中心显示文本
            fontSize: 20,
          },

          labelLine: {
            show: false,
          },
          data: [
            {
              value: 30,
              name: "已办结算",
              itemStyle: {
                color: "#00B4FF",
                // color: "linear-gradient(to right, red , yellow)",
              },
            },
            {
              value: 70,
              name: "未办结算",
              itemStyle: {
                color: "#A9AAAA",
              },
            },
          ],
        },
      ],
    };
    myChartcount.setOption(option);
  }, []);

  return (
    <div className="chart-body-layout">
      <div className="chart-layout">
        <Card id="card1">
          <div className="chart-title">
            <div id="chart-line"></div>
            <div>设备使用统计</div>
          </div>
          <div>
            <div>
              <div>总件量</div>
              <div>115620件</div>
              <div>比上个月增长10000件</div>
            </div>
          </div>
          <div id="chart1" style={{ width: "200px", height: "200px" }}></div>
        </Card>
        <Card id="card2"></Card>
      </div>
      <div className="chart-layout">
        <Card id="card3"></Card>
        <Card id="card4"></Card>
      </div>
    </div>
  );
};

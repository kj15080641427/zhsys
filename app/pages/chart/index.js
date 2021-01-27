import React, { useEffect } from "react";
import { Card, Progress } from "antd";
import { chart1, chart2, chart3, chart4, chart5 } from "./chart";
import "./index.scss";

export default () => {
  useEffect(() => {
    chart1();
    chart2();
    chart3();
    chart4();
    chart5();
  }, []);

  return (
    <div className="chart-body-layout">
      <div className="chart-layout">
        <Card id="card1">
          <div className="chart-title">
            <div id="chart-line"></div>
            <div>设备使用统计</div>
          </div>
          <div className="chart-flex">
            <div>
              <div className="chart-card1">
                <div id="text1">总件量</div>
                <div id="text2">115620件</div>
                <div id="text3">比上个月增长10000件</div>
                <Progress percent={30}></Progress>
              </div>
            </div>
            <div className="chart-line"></div>
            <div id="chart1" style={{ width: "200px", height: "200px" }}></div>
            <div id="chart2" style={{ width: "200px", height: "200px" }}></div>
          </div>
        </Card>
        <Card id="card2">
          <div className="chart-title">
            <div id="chart-line"></div>
            <div>设备维修统计</div>
          </div>
          <div className="chart-flex">
            <div className="chart-card1">
              <div id="text1">设备维修</div>
              <div id="text2">115620件</div>
              <div id="text3">比上个月增长10000件</div>
              <Progress percent={30}></Progress>
            </div>
            <div className="chart-line"></div>
            <div className="chart-card1">
              <div id="text1">设备保养</div>
              <div id="text2">115620件</div>
              <div id="text3">比上个月增长10000件</div>
              <Progress percent={30}></Progress>
            </div>
            <div id="chart3" style={{ width: "350px", height: "200px" }}></div>
          </div>
        </Card>
      </div>
      <div className="chart-layout">
        <Card id="card3">
          <div className="chart-title">
            <div id="chart-line"></div>
            <div>采购统计</div>
          </div>
          <div className="chart-flex">
            <div id="chart4" style={{ width: "260px", height: "300px" }}></div>
            <div style={{ width: "350px" }}>
              <div>设备采购</div>
              <Progress percent={99} format={() => "9999"}></Progress>
              <div>设备采购</div>
              <Progress percent={88} format={() => "888"}></Progress>
              <div>设备采购</div>
              <Progress percent={77} format={() => "777"}></Progress>
              <div>设备采购</div>
              <Progress percent={66} format={() => "666"}></Progress>
            </div>
          </div>
        </Card>
        <Card id="card4">
          <div className="chart-title">
            <div id="chart-line"></div>
            <div>维修分类统计</div>
          </div>
          <div id="chart5" style={{ width: "850px", height: "350px" }}></div>
        </Card>
      </div>
    </div>
  );
};

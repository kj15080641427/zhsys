import React, { useEffect } from "react";
import { Card, Progress, Table } from "antd";
import { chart1, chart3 } from "./chart";
import "./style.scss";

export default () => {
  const status = [
    {
      color: "rgba(251,232,140)",
      name: "借出",
      number: "50",
      perc: "20%",
    },
    {
      color: "rgba(168,215,169)",
      name: "闲置",
      number: "50",
      perc: "20%",
    },
    {
      color: "rgba(241,155,154)",
      name: "保养",
      number: "50",
      perc: "20%",
    },
    {
      color: "rgba(207,143,219)",
      name: "维修",
      number: "50",
      perc: "20%",
    },
    {
      color: "rgba(255,179,89)",
      name: "报废",
      number: "50",
      perc: "20%",
    },
  ];
  const device = [
    {
      name: "xx设备",
    },
    {
      name: "xx设备",
    },
    {
      name: "xx设备",
    },
    {
      name: "xx设备",
    },
    {
      name: "xx设备",
    },
  ];
  const flowColumns = [
    {
      title: "序号",
      dataIndex: "",
      render: (_, __, index) => index + 1,
    },
    {
      title: "单号",
      dataIndex: "code",
    },
    {
      title: "申请时间",
      dataIndex: "time",
    },
    {
      title: "申请人",
      dataIndex: "user",
    },
    {
      title: "操作",
      dataIndex: "",
      render: () => <a>查看</a>,
    },
  ];
  const flowSource = [
    {
      code: "S20200101",
      time: "2020-01-01",
      user: "哈哈",
    },
  ];
  const warning = [
    {
      name: "高",
      color: "red",
      number: "55",
    },
    {
      name: "中",
      color: "rgb(250,210,3)",
      number: "4",
    },
    {
      name: "低",
      color: "rgb(17,156,239)",
      number: "3",
    },
  ];
  useEffect(() => {
    chart1();
    chart3();
  }, []);
  return (
    <div className="home-layout">
      <div className="home-layout-flex">
        <Card id="card1" title="设备状态占比">
          <div className="home-flex">
            <div id="chart1" style={{ width: "250px", height: "250px" }}></div>
            <div>
              <div className="home-card1-status">
                <span>状态</span>
                <span>数量</span>
                <span>比例</span>
              </div>
              {status.map((item) => (
                <div className="home-card1-status" key={item.name}>
                  <div className="home-card1-status-flex">
                    <div
                      className="home-card1-status-ract"
                      style={{ background: item.color }}
                    ></div>
                    <div>{item.name}</div>
                  </div>
                  <div className="home-card1-status-text">{item.number}</div>
                  <div className="home-card1-status-text">{item.perc}</div>
                </div>
              ))}
            </div>
          </div>
        </Card>
        <Card id="card1" title="本月设备维修次数排名">
          {device.map((item, index) => (
            <div className="device-progress" key={index}>
              <div id="deviceName">{item.name}</div>
              <Progress percent={30} format={() => 55}></Progress>
            </div>
          ))}
        </Card>
        <Card id="card1" title="本月设备借还次数排名">
          {device.map((item, index) => (
            <div className="device-progress" key={index}>
              <div id="deviceName">{item.name}</div>
              <Progress percent={30} format={() => 55}></Progress>
            </div>
          ))}
        </Card>
      </div>
      <div className="home-layout-flex">
        <Card id="card2" title="待审批">
          <Table columns={flowColumns} dataSource={flowSource}></Table>
        </Card>
        <Card id="card3" title="本月设备维修情况">
          <div id="chart3" className="home-chart3"></div>
        </Card>
      </div>
      <div className="home-layout-flex">
        <Card id="card1" title="本月设备预警数量">
          <div className="home-warning-layout">
            {warning.map((item) => {
              return (
                <div key={item.name} style={{ color: item.color }}>
                  <div className="home-warning-box-flex">
                    <div className="home-warning-flex">
                      <div
                        className="home-warning-rect"
                        style={{ border: `1px solid ${item.color}` }}
                      ></div>
                      <div>{item.name}</div>
                    </div>
                    <div className="home-warning-number">50</div>
                  </div>
                  <Progress
                    strokeWidth="20px"
                    strokeColor={item.color}
                    percent={30}
                    format={() => ""}
                    className="home-warning-progress"
                  ></Progress>
                </div>
              );
            })}
          </div>
        </Card>
        <Card id="card1" title="归还到期">
        <Table columns={flowColumns} dataSource={flowSource}></Table>
        </Card>
        <Card id="card1" title="设备报废">
        <Table columns={flowColumns} dataSource={flowSource}></Table>
        </Card>
      </div>
    </div>
  );
};

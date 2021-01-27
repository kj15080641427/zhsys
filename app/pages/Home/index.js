import React from "react";
import { Card } from "antd";
import "./style.scss";

export default () => {
  return (
    <div className='home-layout'>
      <div className="home-layout-flex">
        <Card id="card1" title="设备状态占比"></Card>
        <Card id="card1" title="本月设备维修次数排名"></Card>
        <Card id="card1" title="本月设备借还次数排名"></Card>
      </div>
      <div className="home-layout-flex">
        <Card id="card2" title="待审批"></Card>
        <Card id="card3" title="本月设备维修情况"></Card>
      </div>
      <div className="home-layout-flex">
        <Card id="card1" title="本月设备预警数量"></Card>
        <Card id="card1" title="归还到期"></Card>
        <Card id="card1" title="设备报废"></Card>
      </div>
    </div>
  );
};

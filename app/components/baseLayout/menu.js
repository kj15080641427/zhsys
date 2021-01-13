import React, { useState } from "react";
import { Menu } from "antd";
import { withRouter } from "react-router-dom";
import "./style.scss";
import base from "../../resource/基础管理.png";
import purp from "../../resource/购置管理.png";
import device from "../../resource/设备处置.png";
import repair from "../../resource/设备维护.png";
import home from "../../resource/首页.png";
import chart from "../../resource/统计分析.png";
import system from "../../resource/系统设置.png";
import user from "../../resource/用户管理.png";
import all from "../../resource/综合管理.png";
import hcgl from "../../resource/耗材管理.png";
import { EditOutlined } from "@ant-design/icons";
const { SubMenu } = Menu;

const Menus = (props) => {
  const rootSubmenuKeys = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
  ];
  const [openKeys, setOpenKeys] = useState([]);
  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };
  const onMenuClick = ({ key }) => {
    let { history } = props;
    history.push(key);
  };
  return (
    <div className={"hm-menu"}>
      {/* <div className="hm-logo">智慧实验室</div> */}
      <div className="hm-content">
        <Menu
          className="menu-content"
          mode="inline"
          theme="dark"
          inlineCollapsed={true}
          onClick={onMenuClick}
          onOpenChange={onOpenChange}
          openKeys={openKeys}
        >
          <SubMenu
            key="1"
            // icon={<span><Test /></span>}
            icon={
              <span>
                <img src={home}></img>
              </span>
            }
            title="首页"
            inlineCollapsed={false}
          >
            <Menu.Item key="/">首页</Menu.Item>
          </SubMenu>
          <SubMenu
            key="2"
            icon={<img src={purp}></img>}
            // icon={<EditOutlined style={{ fontSize: "20px" }}></EditOutlined>}
            title="购置管理"
            inlineCollapsed={false}
          >
            <Menu.Item key="/Lanapply">购置申请</Menu.Item>
            <Menu.Item key="/LendapplyList">购置单管理</Menu.Item>
          </SubMenu>
          <SubMenu
            key="3"
            // icon={<img src={use}></img>}
            icon={<EditOutlined style={{ fontSize: "20px" }}></EditOutlined>}
            title="使用管理"
          >
            <Menu.Item key="/Uselendapply">借出申请</Menu.Item>
            <Menu.Item key="/SendBack">归还申请</Menu.Item>
          </SubMenu>
          <SubMenu key="4" icon={<img src={repair}></img>} title="设备维护">
            <Menu.Item key="/ReparirApply">维修申请</Menu.Item>
            <Menu.Item key="/Repair">设备维修</Menu.Item>
            <Menu.Item key="/Maintian">养护申请</Menu.Item>
            <Menu.Item key="/MaintianManage">养护管理</Menu.Item>
          </SubMenu>
          <SubMenu key="5" icon={<img src={device}></img>} title="设备处理">
            <Menu.Item key="/stationBasic">设备折旧</Menu.Item>
            <Menu.Item key="/siteWater">报废单</Menu.Item>
          </SubMenu>
          <SubMenu key="6" icon={<img src={all}></img>} title="综合管理">
            <Menu.Item key="/sitePump">设备报废预警</Menu.Item>
            <Menu.Item key="/siteDict">设备状态</Menu.Item>
            <Menu.Item key="/siteDike">出借状态</Menu.Item>
            <Menu.Item key="/Complexfund">年度经费</Menu.Item>
          </SubMenu>
          <SubMenu key="7" icon={<img src={hcgl}></img>} title="耗材管理">
            <Menu.Item key="/message">入库单</Menu.Item>
            <Menu.Item key="/taskList">出库单</Menu.Item>
            <Menu.Item key="/chartGroup">在库资产</Menu.Item>
          </SubMenu>
          <SubMenu
            key="8"
            icon={<img src={chart}></img>}
            title="统计分析"
          ></SubMenu>
          <SubMenu key="9" icon={<img src={base}></img>} title="基础管理">
            <Menu.Item key="/DeviceType">设备类型</Menu.Item>
            <Menu.Item key="/BaseDevice">设备基础数据</Menu.Item>
            <Menu.Item key="/Supplier">供应商管理</Menu.Item>
            <Menu.Item key="/BaseDict">数据字典</Menu.Item>
          </SubMenu>
          <SubMenu key="10" icon={<img src={user}></img>} title="用户管理">
            <Menu.Item key="/company">单位管理</Menu.Item>
            <Menu.Item key="/department">部门管理</Menu.Item>
            <Menu.Item key="/user">用户管理</Menu.Item>
            <Menu.Item key="/role">角色管理</Menu.Item>
            <Menu.Item key="/jurisdiction">权限管理</Menu.Item>
          </SubMenu>
          <SubMenu
            key="11"
            icon={<img src={system}></img>}
            title="系统设置"
          ></SubMenu>
        </Menu>
      </div>
    </div>
  );
};
export default withRouter(Menus);

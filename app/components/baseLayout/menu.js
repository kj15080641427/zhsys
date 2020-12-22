import React from "react";
import { Menu } from "antd";
import { withRouter } from "react-router-dom";
import {
  SettingOutlined,
  FundViewOutlined,
  ContainerOutlined,
  MailOutlined,
} from "@ant-design/icons";
import "./style.scss";
const { SubMenu } = Menu;

class Menus extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {};
    this.onMenuClick = this.onMenuClick.bind(this);
  }
  render() {
    return (
      <div className={"hm-menu"}>
        {/* <div className="hm-logo">智慧实验室</div> */}
        <div className="hm-content">
          <Menu
            mode="inline"
            theme="dark"
            inlineCollapsed={true}
            onClick={this.onMenuClick}
            // defaultSelectedKeys={['sub1', 'sub2', 'sub3', 'sub4','sub5']}
            // defaultOpenKeys={["1"]}
            // defaultSelectedKeys={["/"]}
          >
            <SubMenu
              key="1"
              icon={<FundViewOutlined />}
              title="首页"
              inlineCollapsed={false}
            >
              <Menu.Item key="/" icon={<ContainerOutlined />}>
                首页
              </Menu.Item>
            </SubMenu>
            <SubMenu
              key="2"
              icon={<FundViewOutlined />}
              title="购置管理"
              inlineCollapsed={false}
            >
              <Menu.Item key="/Lanapply">购置申请</Menu.Item>
              <Menu.Item key="/LendapplyList">购置单</Menu.Item>
            </SubMenu>
            <SubMenu key="3" icon={<MailOutlined />} title="使用管理">
              <Menu.Item key="/Uselendapply">借出申请</Menu.Item>
              <Menu.Item key="/SendBack">归还申请</Menu.Item>
            </SubMenu>
            <SubMenu key="4" icon={<SettingOutlined />} title="设备维护">
              <Menu.Item key="/System">维修申请</Menu.Item>
              <Menu.Item key="/System">设备维修</Menu.Item>
              <Menu.Item key="/System">保养申请单</Menu.Item>
            </SubMenu>
            <SubMenu key="5" icon={<MailOutlined />} title="设备处理">
              <Menu.Item key="/stationBasic">设备折旧</Menu.Item>
              <Menu.Item key="/siteWater">报废单</Menu.Item>
            </SubMenu>
            <SubMenu key="6" icon={<MailOutlined />} title="综合管理">
              <Menu.Item key="/sitePump">设备报废预警</Menu.Item>
              <Menu.Item key="/siteDict">设备状态</Menu.Item>
              <Menu.Item key="/siteDike">出借状态</Menu.Item>
              <Menu.Item key="/siteReservoir">年度经费</Menu.Item>
            </SubMenu>
            <SubMenu key="7" icon={<MailOutlined />} title="耗材管理">
              <Menu.Item key="/message">入库单</Menu.Item>
              <Menu.Item key="/taskList">出库单</Menu.Item>
              <Menu.Item key="/chartGroup">在库资产</Menu.Item>
            </SubMenu>
            <SubMenu key="8" icon={<MailOutlined />} title="统计分析"></SubMenu>
            <SubMenu key="9" icon={<MailOutlined />} title="基础管理">
              <Menu.Item key="/DeviceType">设备类型</Menu.Item>
              <Menu.Item key="/BaseDevice">设备基础数据</Menu.Item>
              <Menu.Item key="/Supplier">供应商管理</Menu.Item>
              <Menu.Item key="/BaseDict">数据字典</Menu.Item>
            </SubMenu>
            <SubMenu key="10" icon={<MailOutlined />} title="用户管理">
              <Menu.Item key="/company">单位管理</Menu.Item>
              <Menu.Item key="/department">部门管理</Menu.Item>
              <Menu.Item key="/user">用户管理</Menu.Item>
              <Menu.Item key="/role">角色管理</Menu.Item>
              <Menu.Item key="/jurisdiction">权限管理</Menu.Item>
            </SubMenu>
            <SubMenu
              key="11"
              icon={<MailOutlined />}
              title="系统设置"
            ></SubMenu>
          </Menu>
        </div>
      </div>
    );
  }
  onMenuClick({ key }) {
    let { history } = this.props;
    history.push("/home" + key);
  }
}
export default withRouter(Menus);

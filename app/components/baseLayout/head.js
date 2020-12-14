import React from "react";
import "./style.scss";
import { withRouter } from "react-router-dom";
import { Layout, Tooltip, Popover, Modal, Input, message } from "antd";
import timg from "../../resource/timg.png";
import {
  MessageOutlined,
  BellOutlined,
  PoweroffOutlined,
} from "@ant-design/icons";
import { createHashHistory } from "history";
import openImg from "../../resource/open.svg";
import { getStore } from "../../redux/store";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../../redux/actions/aCurrency";

const hashHistory = createHashHistory();

class HeadBase extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {
      collapsed: false,
      visible: false,
    };
  }
  componentDidMount() {
    let a = getStore();
    console.log(a, "AA");
  }
  render() {
    const { visible } = this.state;
    return (
      <div className="base-layout-header">
        <div className="top-header-inner">
          <Layout.Header className="site-layout-background">
            <div>
              <img src={timg}></img>
              <div>智慧实验室设备管理系统</div>
              <img
                src={openImg}
                onClick={this.props.iconClick}
                className="layout-open-menu"
              ></img>
            </div>
            <div className="site-layout-right">
              <BellOutlined />
              <MessageOutlined />
              <Tooltip title="退出登录">
                <PoweroffOutlined onClick={() => hashHistory.push("/")} />
              </Tooltip>
              <Popover
                content={
                  <a
                    onClick={() => {
                      this.setState({
                        visible: true,
                      });
                    }}
                  >
                    修改密码
                  </a>
                }
              >
                <div>管理员</div>
              </Popover>
            </div>
          </Layout.Header>
        </div>
        <Modal
          visible={visible}
          onCancel={() => this.setState({ visible: false })}
          onOk={() => {
            if (!this.state.showWarning) {
              this.setState({
                visible: false,
              });
            } else {
              message.error("两次密码不一致");
            }
          }}
        >
          <div className="reset-password">
            <div>新密码:</div>
            <Input
              value={this.state.newPassword}
              onChange={(e) =>
                this.setState({
                  newPassword: e.target.value,
                })
              }
            ></Input>
          </div>
          <div
            className="reset-password"
            value={this.state.configPassword}
            onChange={(e) => {
              this.setState({
                configPassword: e.target.value,
              });
              if (e.target.value !== this.state.newPassword) {
                this.setState({
                  showWarning: true,
                });
              } else {
                this.setState({
                  showWarning: false,
                });
              }
            }}
          >
            <div>确认密码:</div>
            <Input></Input>
          </div>
          {this.state.showWarning && (
            <div className="warning-text">两次密码不一致</div>
          )}
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = () => {
  return {
    // state:
  };
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch),
});

const Head = connect(mapStateToProps, mapDispatchToProps)(HeadBase);
export default withRouter(Head);

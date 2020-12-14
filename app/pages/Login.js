import React, { Component } from "react";
import { Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../redux/actions/aCurrency";
import "./style.scss";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectSystem: "智慧实验室",
      userName: "",
      password: "",
      remember: false, //记住账号
      automatic: true, //自动登录
    };
  }

  render() {
    const onFinish = () => {
      this.props.actions.loginIn({
        userName: this.state.userName,
        password: this.state.password,
      });
    };
    return (
      <div className="container">
        <div className="content">
          <div className="base-login-box">
            <div className="base-login-title">欢迎登录</div>
            <div className="base-login-input">
              <UserOutlined />
              <Input
                placeholder="请输入账号"
                bordered={false}
                value={this.state.userName}
                onChange={(e) =>
                  this.setState({
                    userName: e.target.value,
                  })
                }
              ></Input>
            </div>
            <div className="base-login-input-line"></div>
            <div style={{ height: "35px" }}></div>
            <div className="base-login-input">
              <LockOutlined />
              <Input
                placeholder="请输入密码"
                bordered={false}
                value={this.state.password}
                onChange={(e) =>
                  this.setState({
                    password: e.target.value,
                  })
                }
                type="password"
              ></Input>
            </div>
            <div className="base-login-input-line"></div>
            <div className="base-login-edit">
              <div>
                <Checkbox
                  checked={this.state.remember}
                  onChange={(e) => {
                    this.setState({
                      remember: e.target.checked,
                    });
                  }}
                >
                  记住账号
                </Checkbox>
                <Checkbox
                  checked={this.state.automatic}
                  onChange={(e) => {
                    this.setState({
                      automatic: e.target.checked,
                    });
                  }}
                >
                  自动登录
                </Checkbox>
              </div>
              <a>忘记密码?</a>
            </div>
            <Button
              className="base-login-button"
              type="primary"
              onClick={() => onFinish()}
            >
              登录
            </Button>
            <div className="base-login-singup">
              没有账号?<a>立即注册</a>
            </div>
            {/* <Form
              name="normal_login"
              className="login-form"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
            >
              <Form.Item
                name="username"
                rules={[
                  {
                    required: true,
                    message: "请输入用户名!",
                  },
                ]}
              >
                <Input
                  className="inputs"
                  placeholder="请输入用户名"
                  size="large"
                  prefix={<UserOutlined className="site-form-item-icon" />}
                />
              </Form.Item>
              <br />
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "请输入密码!",
                  },
                ]}
              >
                <Input
                  className="inputs"
                  placeholder="请输入密码"
                  size="large"
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                />
              </Form.Item>
              <br />
              <br />
              <br />
              <br />
              <Form.Item>
                <Button
                  size="large"
                  type="primary"
                  htmlType="submit"
                  className="sbmbotton"
                >
                  登录
                </Button>
              </Form.Item>
            </Form> */}
          </div>
        </div>
      </div>
    );
  }
}
function mapStateToProps() {
  return {
    // userinfo: state.home.userinfo,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);

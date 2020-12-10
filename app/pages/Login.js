import React, { Component } from "react";
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../redux/actions/aCurrency";
import "./style.scss";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectSystem: "东营市智慧水务系统",
    };
  }

  render() {
    const onFinish = (values) => {
      this.props.actions.loginIn({
        userName: values.username,
        password: values.password,
      });
      // loginIn({
      //   channel: "common",
      // username: values.username,
      // password: values.password,
      // }).then((result) => {
      //   if (result.code == 200) {
      //     this.props.actions.setToken(result.data.userToken);
      //     localStorage.setItem("token", result.data.userToken);
      //     localStorage.setItem("username", values.username);
      //     message.success("登录成功！");
      //     this.props.history.push("/home/");
      //   } else {
      //     message.error("账号或密码错误");
      //   }
      // });
    };
    return (
      <div className="container">
        {/* <img className="swlogo" src={swlogo}></img> */}
        {/* <img className="dyszhswxt" src={dyszhswxt}></img> */}
        <div className="content">
          <div className="title">登录</div>
          <br />
          <br />
          <Form
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
            {/* <Form.Item name="remember" valuePropName="checked">
              <div style={{ display: "flex" }}>
                <Select
                  defaultValue="东营市智慧水务系统"
                  onChange={(e) => {
                    this.setState({
                      selectSystem: e,
                    });
                  }}
                  style={{ flex: 1, marginRight: 16 }}
                >
                  <Select.Option value="东营市智慧水务系统">
                    东营市智慧水务系统
                  </Select.Option>
                  <Select.Option value="水质监测系统">
                    水质监测系统
                  </Select.Option>
                </Select>
                <Checkbox>
                  <span className="remenberpass">记住密码</span>
                </Checkbox>
              </div>
            </Form.Item> */}
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
          </Form>
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

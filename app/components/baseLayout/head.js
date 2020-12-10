import React from "react";
import "./style.scss";
import { withRouter } from "react-router-dom";
import { Layout } from "antd";


class Head extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {
      collapsed: false,
      visible: false,
    };
    this.btnClick = this.btnClick.bind(this);
  }
  handleLogout() {
    localStorage.removeItem("token");
    this.context.router.history.push("/login");
  }
  render() {
    return (
      <div className="base-layout-header">
        <div className="top-header-inner">
          <Layout.Header
            className="site-layout-background"
            style={{ padding: 0 }}
          >
            {/* {React.createElement(
              this.props.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
                onClick: this.btnClick,
              }
            )} */}
          </Layout.Header>
        </div>
      </div>
    );
  }
  setting = () => {
    this.setState({ visible: true });
  };
  onClose = () => {
    this.setState({ visible: false });
  };
  onChangeTags = (checked) => {
    this.props.setTags({ show: checked });
    this.onClose();
  };
  onChangeBreadCrumb = (checked) => {
    this.props.setBreadCrumb({ show: checked });
    this.onClose();
  };
  onChangeTheme = (checked) => {
    this.props.setTheme({ type: checked ? "dark" : "light" });
    this.onClose();
  };
  btnClick() {
    if (this.props.collapsClick) {
      this.props.collapsClick();
    }
  }
}
export default withRouter(Head);

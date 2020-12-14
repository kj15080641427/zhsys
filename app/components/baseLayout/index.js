/**
 * Index 2020-05-26
 */
import React from "react";
import "./style.scss";
import NewMenus from "./menu";
import Head from "./head";
import ContentRouter from "./contentRouter";
import { Layout } from "antd";
const { Sider, Content } = Layout;
class BaseLayout extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {
      collapsed: false,
    };
    this.onCollapsClick = this.onCollapsClick.bind(this);
    console.log("this.props.match", this.props.match, this.props.location);
  }
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
  render() {
    return (
      <>
        <Layout>
          <Head
            collapsClick={this.onCollapsClick}
            collapsed={this.state.collapsed}
            iconClick={()=>this.setState({
              collapsed: !this.state.collapsed,
            })}
          ></Head>
        </Layout>
        <Layout className="home">
          <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
            <div className="logo" />
            <NewMenus></NewMenus>
          </Sider>
          <Layout className="site-layout">
            <Content
              className="site-layout-background"
              style={{
                margin: "20px",
                padding: 20,
                minHeight: 280,
              }}
            >
              <ContentRouter path={"/home"}></ContentRouter>
            </Content>
          </Layout>
        </Layout>
      </>
    );
  }
  onCollapsClick() {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
}
export default BaseLayout;

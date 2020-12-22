import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "../../pages/Login";
import Home from "../../pages/Home";
import DataMonitoring from "../../pages/dataMonitoring";
import Company from "../../pages/user/company";
import Department from "../../pages/user/department";
import User from "../../pages/user/user";
import Role from "../../pages/user/role";
import Jurisdiction from "../../pages/user/jurisdiction";
import Nothing from "../../pages/404";
import DeviceType from "../../pages/device/deviceType";
import BaseDevice from "../../pages/device/baseDevice";
import Supplier from "../../pages/device/supplier";
import BaseDict from "../../pages/device/baseDict";
import Lendapply from "./../../pages/use/lend/index";
import SendBack from "../../pages/use/sendBack";
import Lanapply from "../../pages/purp/lanapply";
import LendapplyList from "../../pages/purp/lanapplyList/lanapplyList";
class ContentRouter extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {};
  }
  render() {
    let { path } = this.props;
    return (
      <Switch>
        {console.log(path)}
        <Route exact path={path} component={Home} />
        <Route path={"/#/"} component={Login} />
        <Route path={path + "/DataMonitoring"} component={DataMonitoring} />
        <Route path={path + "/Company"} component={Company} />
        <Route path={path + "/Department"} component={Department} />
        <Route path={path + "/User"} component={User} />
        <Route path={path + "/Role"} component={Role} />
        <Route path={path + "/Jurisdiction"} component={Jurisdiction} />
        <Route path={path + "/DeviceType"} component={DeviceType} />
        <Route path={path + "/BaseDevice"} component={BaseDevice} />
        <Route path={path + "/Supplier"} component={Supplier} />
        <Route path={path + "/BaseDict"} component={BaseDict} />
        <Route path={path + "/Uselendapply"} component={Lendapply} />
        <Route path={path + "/Lanapply"} component={Lanapply} />
        <Route path={path + "/LendapplyList"} component={LendapplyList} />
        <Route path={path + "/SendBack"} component={SendBack} />
        {/* <Route path={path + "/Jurisdiction"} component={Jurisdiction} /> */}
        {/* <Route path={path + "/DeviceType"} component={DeviceType} /> */}
        {/* <Route path={path + "/BaseDevice"} component={BaseDevice} /> */}
        {/* <Route path={path + "/Supplier"} component={Supplier} /> */}
        {/* <Route path={path + "/BaseDict"} component={BaseDict} /> */}
        <Route component={Nothing} />
      </Switch>
    );
  }
}
export default ContentRouter;

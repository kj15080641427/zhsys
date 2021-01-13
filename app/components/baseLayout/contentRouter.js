import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "../../pages/Login";
import Home from "../../pages/Home";
import Company from "../../pages/user/company";
import Department from "../../pages/user/department";
import User from "../../pages/user/user";
import Role from "../../pages/user/role";
import Jurisdiction from "../../pages/user/jurisdiction";
import Nothing from "../../pages/404";
import DeviceType from "../../pages/device/deviceType";
import BaseDevice from "../../pages/device/baseDevice/baseDevice";
import Supplier from "../../pages/device/supplier";
import BaseDict from "../../pages/device/baseDict";
import Lendapply from "./../../pages/use/lend/index";
import SendBack from "../../pages/use/sendBack";
import Lanapply from "../../pages/purp/lanApply/index";
import LendapplyList from "../../pages/purp/lanapplyList/lanapplyList";
import Complexfund from "../../pages/base/complexfund";
import ReparirApply from "../../pages/repair/repairapply/index";
import Repair from "../../pages/repair/repairManage/index";
import Maintian from "../../pages/repair/maintianApply";
import MaintianManage from "../../pages/repair/maintianManage";
class ContentRouter extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {};
  }
  render() {
    let { path } = this.props;
    return (
      <Switch>
        <Route exact path={path} component={Home} />
        <Route path={"/#/"} component={Login} />
        <Route path={"/Company"} component={Company} />
        <Route path={"/Department"} component={Department} />
        <Route path={"/User"} component={User} />
        <Route path={"/Role"} component={Role} />
        <Route path={"/Jurisdiction"} component={Jurisdiction} />
        <Route path={"/DeviceType"} component={DeviceType} />
        <Route path={"/BaseDevice"} component={BaseDevice} />
        <Route path={"/Supplier"} component={Supplier} />
        <Route path={"/BaseDict"} component={BaseDict} />
        <Route path={"/Uselendapply"} component={Lendapply} />
        <Route path={"/Lanapply"} component={Lanapply} />
        <Route path={"/LendapplyList"} component={LendapplyList} />
        <Route path={"/SendBack"} component={SendBack} />
        <Route path={"/ReparirApply"} component={ReparirApply} />
        <Route path={"/Repair"} component={Repair} />
        <Route path={"/Maintian"} component={Maintian} />
        <Route path={ "/MaintianManage"} component={MaintianManage} />
        <Route path={"/Complexfund"} component={Complexfund} />

        <Route component={Nothing} />
      </Switch>
    );
  }
}
export default ContentRouter;

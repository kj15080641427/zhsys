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
import LendapplyList from "../../pages/purp/lanapplyList/index";
import Complexfund from "../../pages/base/complexfund";
import ReparirApply from "../../pages/repair/repairapply/index";
import Repair from "../../pages/repair/repairManage/index";
import Maintian from "../../pages/repair/maintianApply";
import MaintianManage from "../../pages/repair/maintianManage";
import Test from "../../pages/test";
import DeviceScrap from "../../pages/scrap/index";
import Despositstock from "../../pages/warehouse/depositstock";
import DeviceStatus from "../../pages/complete/deviceStatus/index";
import DeviceLendState from "../../pages/complete/deviceLendState/index";
import In from "../../pages/warehouse/in/index";
import Out from "../../pages/warehouse/out/index";

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
        <Route path={"/MaintianManage"} component={MaintianManage} />
        <Route path={"/Complexfund"} component={Complexfund} />

        <Route path={"/DeviceScrap"} component={DeviceScrap} />
        <Route path={"/Despositstock"} component={Despositstock} />
        <Route path={"/DeviceStatus"} component={DeviceStatus} />
        <Route path={"/DeviceLendState"} component={DeviceLendState} />

        <Route path={"/In"} component={In} />
        <Route path={"/Out"} component={Out} />
        <Route path={"/Test"} component={Test} />
        <Route component={Nothing} />
      </Switch>
    );
  }
}
export default ContentRouter;

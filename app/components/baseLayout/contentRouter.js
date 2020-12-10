import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "../../pages/Login";
import Home from "../../pages/Home";
import DataMonitoring from "../../pages/dataMonitoring";
const NoMatch = () => <div>没有找到该路由</div>;

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
        <Route component={NoMatch} />
      </Switch>
    );
  }
}
export default ContentRouter;

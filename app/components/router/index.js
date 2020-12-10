import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import BaseLayout from "../baseLayout/index";
import AsyncLogin from "../../pages/Login";
const NoMatch = () => <div>没有找到该路由</div>;
export class Router extends React.Component {
  render() {
    {
      let $loading = document.getElementById("loading");
      if ($loading) {
        $loading.parentNode.removeChild($loading);
      }
    }
    return (
      <HashRouter>
        <Switch>
          <Route exact path={`/`} component={AsyncLogin} />
          <Route path={`/home/`} component={BaseLayout} />
          <Route component={NoMatch} />
        </Switch>
      </HashRouter>
    );
  }
}

import React, { Component } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import EditSocialMedia from "./pages/EditSocialMedia";
import MetaConnection from "./pages/MetaConnection";
import NotFound from "./pages/NotFound";
import {createWallet} from "./helpers/wallet";
// import {init3box} from "./helpers/3box";
import {initLove} from "./helpers/love";
import {getLocal} from "./helpers/localstorage";


class Router extends Component {
  componentDidMount() {
    window.browserHistory = this.context.router.history;
    this.Wallet();
  }
  Wallet = async () => {
    if (!getLocal('account').publicAddress) {
      const {address} = await createWallet();
      // init3box();
      initLove(address);
      // this.props.accountUpdateAddress(address);
    } else {
      const address = getLocal('account').publicAddress;
      // init3box();
      initLove(address);
      // this.props.accountUpdateAddress(address);
    }
  };
  render = () => {
    const { name } = this.props;
    return (
      <Switch>
        <Route
          exact
          path="/"
          render={routerProps => {
            if (name) {
              return <Redirect to="/dashboard" />;
            }
            return <Home {...routerProps} />;
          }}
        />
        <Route
          exact
          path="/dashboard"
          render={routerProps => {
            if (!name) {
              return <Redirect to="/" />;
            }
            return <Dashboard {...routerProps} />;
          }}
        />
        <Route
          exact
          path="/edit-social-media"
          render={routerProps => {
            if (!name) {
              return <Redirect to="/" />;
            }
            return <EditSocialMedia {...routerProps} />;
          }}
        />

        <Route
          exact
          path="/meta-connection"
          render={routerProps => {
            if (!name) {
              return <Redirect to="/" />;
            }
            if (!this.props.metaConnectionName) {
              return <Redirect to="/dashboard" />;
            }
            return <MetaConnection {...routerProps} />;
          }}
        />

        <Route component={NotFound} />
      </Switch>
    );
  };
}

Router.contextTypes = {
  router: PropTypes.object.isRequired
};

const reduxProps = ({ account, metaConnection }) => ({
  name: account.name,
  metaConnectionName: metaConnection.name
});

export default withRouter(
  connect(
    reduxProps,
    null
  )(Router)
);

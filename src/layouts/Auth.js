
import React from "react";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";
import { Route, Switch } from "react-router-dom";

import AuthNavbar from "components/Navbars/AuthNavbar.js";
import Footer from "components/Footer/Footer.js";

import routes from "routes.js";
import isAuthenticated from "../auth/index";
var axios = require("axios");
var ps;

class Pages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: isAuthenticated(sessionStorage.getItem('HMS-Admin')),
      loginResponse: {}
    };
    this.login = this.login.bind(this);
  }
  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(this.refs.fullPages);
    }
  }
  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
    }
  }
  getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.collapse) {
        return this.getRoutes(prop.views);
      }
      if (prop.layout === "/auth") {
        let Comp = prop.component;
        return (
          <Route
            path={prop.layout + prop.path}
            // component={prop.component}
            key={key}
            render = {
              (props) => (
                <Comp
                  {...props}
                  login = {this.login} 
                />
              )
            }
          />
        );
      } else {
        return null;
      }
    });
  };
  async login(email, password) {
    console.log("Logging - IN");
    var header = {
      email: email,
      password: password
    }
    var response = await axios.post("https://rms-web-api.herokuapp.com/admin/login", header, {withCredentials: true}) ;
    if (response.data.message === "Admin logged in successfully") {
      sessionStorage.setItem('HMS-Admin', response.data.token);
      // this.gettingResources();
    }
    this.setState({loginResponse: response.data});
    console.log(response) ;
  }
  render() {
    return (
      <>
        <AuthNavbar />
        <div className="wrapper wrapper-full-page" ref="fullPages">
          <div className="full-page section-image">
            <Switch>{this.getRoutes(routes)}</Switch>
            <Footer fluid />
          </div>
        </div>
      </>
    );
  }
}

export default Pages;

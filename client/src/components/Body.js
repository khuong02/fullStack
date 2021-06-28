import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import BoxContent from "./boxcontent/BoxContent";
import Home from "./home/Home";
import Form from "../auth/Form";
import User from "../user/User";
import Edit from "../auth/form/Edit";

const Body = () => {
  return (
    <Switch>
      <Route path="/" component={Home} exact />
      <Route path="/user/:name" component={Form} exact />
      <Route
        path="/user"
        component={() => {
          return localStorage.getItem("account") ? (
            <User />
          ) : (
            <Redirect to="/" />
          );
        }}
        exact
      />
      <Route
        path="/user/product/:id"
        component={() => {
          return localStorage.getItem("account") ? (
            <Edit />
          ) : (
            <Redirect to="/" />
          );
        }}
        exact
      />

      <BoxContent />
    </Switch>
  );
};

export default Body;

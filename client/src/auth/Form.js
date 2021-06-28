import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./form/Login";
import Register from "./form/Register";
import UserProduct from "./form/UserProduct";

const Form = () => {
  return (
    <Switch>
      <Route
        path="/user/product"
        component={() => {
          return localStorage.getItem("account") ? (
            <UserProduct />
          ) : (
            <Redirect to="/" />
          );
        }}
        exact
      />
      <Route
        path="/user/login"
        component={() => {
          return localStorage.getItem("account") ? (
            <Redirect to="/" />
          ) : (
            <Login />
          );
        }}
        exact
      />
      <Route
        path="/user/register"
        component={() => {
          return localStorage.getItem("account") ? (
            <Redirect to="/" />
          ) : (
            <Register />
          );
        }}
        exact
      />
      <Route path="*" exact={true}>
        <Redirect to="/" />
      </Route>
    </Switch>
  );
};

export default Form;

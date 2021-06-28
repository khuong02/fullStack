import React from "react";
import { useLocation } from "react-router";

import Component from "./components/Component";

const CommerceItem = () => {
  const { pathname } = useLocation();
  return <Component path={pathname} />;
};

export default CommerceItem;

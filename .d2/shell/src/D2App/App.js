import React from "react";
import classes from "./App.module.css";
import { Navigation } from "./navigation/Navigation.js";
import { DispenseCommodity } from "./dispenseCommodity/DispenseCommodity";
import { RequestCommodity } from "./requestCommodity/RequestCommodity";
import { useState } from "react";
function MyApp() {
  const [activePage, setActivePage] = useState("Browse");
  function activePageHandler(page) {
    setActivePage(page);
  }
  return /*#__PURE__*/React.createElement("div", {
    className: classes.container
  }, /*#__PURE__*/React.createElement("div", {
    className: classes.left
  }, /*#__PURE__*/React.createElement(Navigation, {
    activePage: activePage,
    activePageHandler: activePageHandler
  })), /*#__PURE__*/React.createElement("div", {
    className: classes.right
  }, activePage === "DispenseCommodity" && /*#__PURE__*/React.createElement(DispenseCommodity, null), activePage === "RequestCommodity" && /*#__PURE__*/React.createElement(RequestCommodity, null)));
}
export default MyApp;
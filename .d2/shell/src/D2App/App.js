import React from "react";
import classes from "./App.module.css";
import { Navigation } from "./navigation/Navigation.js";
import { DispenseCommodity } from "./dispenseCommodity/DispenseCommodity";
import { UpdateCommodity } from "./updateCommodity/UpdateCommodity";
import { StoreManagment } from "./storeManagment/StoreManagment";
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
  }, activePage === "DispenseCommodity" && /*#__PURE__*/React.createElement(DispenseCommodity, null), activePage === "UpdateCommodity" && /*#__PURE__*/React.createElement(UpdateCommodity, null), activePage === "StoreManagment" && /*#__PURE__*/React.createElement(StoreManagment, null)));
}
export default MyApp;
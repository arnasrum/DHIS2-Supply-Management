import React from "react";
import classes from "./App.module.css";
import { RequestCommodity } from "./requestCommodity/RequestCommodity";
import { Navigation } from "./navigation/Navigation.js";
import { CommodityTable } from "./commodityTable/CommodityTable.js";
import { DispenseCommodity } from "./dispenseCommodity/DispenseCommodity";
import { UpdateCommodity } from "./updateCommodity/UpdateCommodity";
import { StoreManagement } from "./storeManagement/StoreManagement";
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
  }, activePage === "CommodityTable" && /*#__PURE__*/React.createElement(CommodityTable, null), activePage === "DispenseCommodity" && /*#__PURE__*/React.createElement(DispenseCommodity, null), activePage === "RequestCommodity" && /*#__PURE__*/React.createElement(RequestCommodity, null), activePage === "UpdateCommodity" && /*#__PURE__*/React.createElement(UpdateCommodity, null), activePage === "StoreManagement" && /*#__PURE__*/React.createElement(StoreManagement, null)));
}
export default MyApp;
import React from "react";
import { Menu, MenuItem } from "@dhis2/ui";
export function Navigation(props) {
  return /*#__PURE__*/React.createElement(Menu, null, /*#__PURE__*/React.createElement(MenuItem, {
    label: "Commodity Table",
    active: props.activePage == "CommodityTable",
    onClick: () => props.activePageHandler("CommodityTable")
  }), /*#__PURE__*/React.createElement(MenuItem, {
    label: "Dispense",
    active: props.activePage == "DispenseCommodity",
    onClick: () => props.activePageHandler("DispenseCommodity")
  }), /*#__PURE__*/React.createElement(MenuItem, {
    label: "Request commodity",
    active: props.activePage == "RequestCommodity",
    onClick: () => props.activePageHandler("RequestCommodity")
  }), /*#__PURE__*/React.createElement(MenuItem, {
    label: "Update",
    active: props.activePage == "UpdateCommodity",
    onClick: () => props.activePageHandler("UpdateCommodity")
  }), /*#__PURE__*/React.createElement(MenuItem, {
    label: "Store Management",
    active: props.activePage == "StoreManagement",
    onClick: () => props.activePageHandler("StoreManagement")
  }));
}
import React from "react";
import { Menu, MenuItem } from "@dhis2/ui";
export function Navigation(props) {
  return /*#__PURE__*/React.createElement(Menu, null, /*#__PURE__*/React.createElement(MenuItem, {
    label: "Dispense",
    active: props.activePage == "DispenseCommodity",
    onClick: () => props.activePageHandler("DispenseCommodity")
  }), /*#__PURE__*/React.createElement(MenuItem, {
    label: "Update",
    active: props.activePage == "UpdateCommodity",
    onClick: () => props.activePageHandler("UpdateCommodity")
  }), /*#__PURE__*/React.createElement(MenuItem, {
    label: "Store Managment",
    active: props.activePage == "StoreManagment",
    onClick: () => props.activePageHandler("StoreManagment")
  }));
}
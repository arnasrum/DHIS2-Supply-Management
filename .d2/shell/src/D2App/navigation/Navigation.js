import React from "react";
import { Menu, MenuItem } from "@dhis2/ui";
export function Navigation(props) {
  return /*#__PURE__*/React.createElement(Menu, null, /*#__PURE__*/React.createElement(MenuItem, {
    label: "Dispense",
    active: props.activePage == "DispenseCommodity",
    onClick: () => props.activePageHandler("DispenseCommodity")
  }), /*#__PURE__*/React.createElement(MenuItem, {
    label: "Request commodity",
    active: props.activePage == "RequestCommodity",
    onClick: () => props.activePageHandler("RequestCommodity")
  }));
}
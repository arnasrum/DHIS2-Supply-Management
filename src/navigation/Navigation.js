import React from "react";
import { Menu, MenuItem } from "@dhis2/ui";

export function Navigation(props) {
  return (
    <Menu>
      <MenuItem
        label="Dispense"
        active={props.activePage == "DispenseCommodity"}
        onClick={() => props.activePageHandler("DispenseCommodity")}
      />
      <MenuItem
        label="Request commodity"
        active={props.activePage == "RequestCommodity"}
        onClick={() => props.activePageHandler("RequestCommodity")}
      />
    </Menu>
  );
}

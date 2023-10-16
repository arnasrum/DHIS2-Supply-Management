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
        label="Update"
        active={props.activePage == "UpdateCommodity"}
        onClick={() => props.activePageHandler("UpdateCommodity")}
      />
    </Menu>
  );
}
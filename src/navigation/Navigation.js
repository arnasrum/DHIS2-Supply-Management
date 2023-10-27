import React from "react";
import { Menu, MenuItem } from "@dhis2/ui";

export function Navigation(props) {
  return (
    <Menu>
      <MenuItem 
        label="Commodity Table"
        active={props.activePage == "CommodityTable"}
        onClick={() => props.activePageHandler("CommodityTable")}
      />
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
      <MenuItem
        label="Store Managment"
        active={props.activePage == "StoreManagment"}
        onClick={() => props.activePageHandler("StoreManagment")}
      />
    </Menu>
  );
}

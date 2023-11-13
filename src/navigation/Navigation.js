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
        label="Dispense Commodity"
        active={props.activePage == "DispenseCommodity"}
        onClick={() => props.activePageHandler("DispenseCommodity")}
      />
      <MenuItem
        label="Request Commodity"
        active={props.activePage == "RequestCommodity"}
        onClick={() => props.activePageHandler("RequestCommodity")}
      />
      <MenuItem
        label="Update Stock Count"
        active={props.activePage == "UpdateCommodity"}
        onClick={() => props.activePageHandler("UpdateCommodity")}
      />
      <MenuItem
        label="Replenish Commodity"
        active={props.activePage == "StoreManagement"}
        onClick={() => props.activePageHandler("StoreManagement")}
      />
    </Menu>
  );
}

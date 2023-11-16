import React from "react";
import { Menu, MenuItem } from "@dhis2/ui";

export function Navigation(props) {
    return (
        <Menu>
            <MenuItem
                label="Commodity Stock"
                active={props.activePage == "CommodityStock"}
                onClick={() => props.activePageHandler("CommodityStock")}
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
                label="Stock Recount"
                active={props.activePage == "StockRecount"}
                onClick={() => props.activePageHandler("StockRecount")}
            />
            <MenuItem
                label="Replenish Commodities"
                active={props.activePage == "ReplenishCommodities"}
                onClick={() => props.activePageHandler("ReplenishCommodities")}
            />
        </Menu>
    );
}

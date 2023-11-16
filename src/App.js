import React from "react";
import classes from "./App.module.css";

import { RequestCommodity } from "./requestCommodity/RequestCommodity";
import { Navigation } from "./navigation/Navigation.js";
import { CommodityStock } from "./commodityStock/CommodityStock.js";
import { DispenseCommodity } from "./dispenseCommodity/DispenseCommodity";
import { StockRecount } from "./stockRecount/StockRecount";
import { useState } from "react";
import { ReplenishCommodities } from "./replenishCommodities/ReplenishCommodities";

function MyApp() {
  const [activePage, setActivePage] = useState("Browse");
  function activePageHandler(page) {
    setActivePage(page);
  }

    return (
      <div className={classes.container}>
        <div className={classes.left}>
          <Navigation
            activePage={activePage}
            activePageHandler={activePageHandler}
          />
        </div>
        <div className={classes.right}>
          {activePage === "CommodityStock" && <CommodityStock />}
          {activePage === "DispenseCommodity" && <DispenseCommodity />}
          {activePage === "RequestCommodity" && <RequestCommodity />}
          {activePage === "StockRecount" && <StockRecount />}
          {activePage === "ReplenishCommodities" && <ReplenishCommodities />}
        </div>
      </div>
    );
  }

export default MyApp;

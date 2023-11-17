import React from "react";
import classes from "./App.module.css";

import { useState } from "react";

import { RequestCommodity } from "./pages/requestCommodity/RequestCommodity";
import { Navigation } from "./navigation/Navigation.js";
import { CommodityStock } from "./pages/commodityStock/CommodityStock";
import { DispenseCommodity } from "./pages/dispenseCommodity/DispenseCommodity";
import { StockRecount } from "./pages/stockRecount/StockRecount";
import { ReplenishCommodities } from "./pages/replenishCommodities/ReplenishCommodities";

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

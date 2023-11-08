import React from "react";
import classes from "./App.module.css";

import { RequestCommodity } from "./requestCommodity/RequestCommodity";
import { Navigation } from "./navigation/Navigation.js";
import { CommodityTable } from "./commodityTable/CommodityTable.js";
import { DispenseCommodity } from "./dispenseCommodity/DispenseCommodity";
import { UpdateCommodity } from "./updateCommodity/UpdateCommodity";
import { StoreManagement } from "./storeManagement/StoreManagement";
import { useState } from "react";
import { getCommoditiesData } from "./logicLayer/ApiCalls";

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
          {activePage === "CommodityTable" && <CommodityTable />}
          {activePage === "DispenseCommodity" && <DispenseCommodity />}
          {activePage === "RequestCommodity" && <RequestCommodity />}
          {activePage === "UpdateCommodity" && <UpdateCommodity />}
          {activePage === "StoreManagement" && <StoreManagement />}
        </div>
      </div>
    );
  }

export default MyApp;

import React from "react";
import classes from "./App.module.css";

import { RequestCommodity } from "./requestCommodity/RequestCommodity";
import { Navigation } from "./navigation/Navigation.js";
import { CommodityTable } from "./commodityTable/CommodityTable.js";
import { DispenseCommodity } from "./dispenseCommodity/DispenseCommodity";
import { UpdateCommodity } from "./updateCommodity/UpdateCommodity";
import { StoreManagement } from "./storeManagement/StoreManagement";
import { useState } from "react";
import { getCommoditiesData } from "./ApiCalls";

function MyApp() {
  const [activePage, setActivePage] = useState("Browse");
  function activePageHandler(page) {
    setActivePage(page);
  }
  // get commdities and their values
  // these are passed through props
  const [data, refetch] = getCommoditiesData()

  if (!(data instanceof Array)){
    return data
  }
  else {
    return (
      <div className={classes.container}>
        <div className={classes.left}>
          <Navigation
            activePage={activePage}
            activePageHandler={activePageHandler}
          />
        </div>
        <div className={classes.right}>
          {activePage === "CommodityTable" && <CommodityTable data={data} refetch={refetch}/>}
          {activePage === "DispenseCommodity" && <DispenseCommodity data={data} refetch={refetch}/>}
          {activePage === "RequestCommodity" && <RequestCommodity data={data} refetch={refetch}/>}
          {activePage === "UpdateCommodity" && <UpdateCommodity data={data} refetch={refetch}/>}
          {activePage === "StoreManagement" && <StoreManagement data={data} refetch={refetch}/>}
        </div>
      </div>
    );
  }
}

export default MyApp;

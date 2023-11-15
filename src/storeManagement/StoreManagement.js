import React, { useState, useEffect } from "react";

import { getCommoditiesData } from "../logicLayer/ApiCalls";
import classes from "../App.module.css";

import { AlertBar, AlertStack } from "@dhis2/ui";
import { InputTable } from "../components/InputTable";
import {
  changeCommodityCount,
  getSingleChangeMutator,
} from "../logicLayer/ApiMuatations";

export function StoreManagement() {
  // Get values and commodities form the API
  const comData = getCommoditiesData();
  // Used for data mutation
  const singleMutator = getSingleChangeMutator();
  // States for alert bars
  const [alerts, setAlerts] = useState([]);

  // Helper function to fetch current commodity value
  async function getCommodityValueFromAPI(commodityId) {
    const query = `http://localhost:9999/api/dataValues.json?de=${commodityId}&pe=202311&ou=xQIU41mR69s&co=rQLFnNXXIL0`;
    try {
      const response = await fetch(query);
      const result = await response.json();
      // Save value as int
      const value = parseInt(result[0]);
      return value;
    } catch (err) {
      console.error(err);
    }
  }

  // Function to handle form submit
  function onSubmit(formInput) {
    for (const key in formInput) {
      const oldValuePromise = getCommodityValueFromAPI(key);
      oldValuePromise
        .then((oldValue) => {
          const value = parseInt(formInput[key]);
          const newValue = oldValue + value;
          if (!isNaN(value)) {
            changeCommodityCount(singleMutator, newValue, key, "rQLFnNXXIL0");
            setAlerts((prevState, props) => [
              ...prevState,
              <AlertBar success key={crypto.randomUUID()}>
                {"Successfully updated stock count"}
              </AlertBar>,
            ]);
          } else {
            console.log("Not a number");
            setAlerts((prevState) => [
              ...prevState,
              <AlertBar critical key={crypto.randomUUID()}>
                {"Did not update stock count"}
              </AlertBar>,
            ]);
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setAlerts((prevState) => [
            ...prevState,
            <AlertBar critical key={crypto.randomUUID()}>
              {"Did not update stock count"}
            </AlertBar>,
          ]);
        });
    }
  }

  // If data is fetched, create a table row for each commodity
  if (!(comData[0] instanceof Array)) {
    return comData[0];
  } else {
    return (
      <div className={classes.storemanagement}>
        <h1>Replenish Commodities</h1>
        <p>
          Update stock count balance when receiving the monthly delivery, enter
          the amount you received.
        </p>
        <InputTable
          headerNames={["Display Name", "Current Amount", "Amount"]}
          propertyNames={["DataElementName", "EndBalance"]}
          onSubmit={onSubmit}
          data={comData[0]}
        ></InputTable>
        <AlertStack>{alerts.map((item) => item)}</AlertStack>
      </div>
    );
  }
}

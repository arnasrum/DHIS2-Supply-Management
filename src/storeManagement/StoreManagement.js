import React, { useState, useEffect } from "react";

import {
  fetchUser,
  getCommoditiesData,
  getCommodityValueFromAPI,
} from "../logicLayer/ApiCalls";
import classes from "../App.module.css";
import { log } from "../logicLayer/Log";

import { AlertBar, AlertStack } from "@dhis2/ui";
import { InputTable } from "../components/InputTable";
import {
  changeCommodityCount,
  getSingleChangeMutator,
} from "../logicLayer/ApiMuatations";
import { getCurPeriod } from "../logicLayer/Helpers";

export function StoreManagement() {
  // Get values and commodities form the API
  const [commodities, refetch] = getCommoditiesData();
  // Used for data mutation
  const [mutator, error] = getSingleChangeMutator();
  // States for alert bars
  const [alerts, setAlerts] = useState([]);
  const user = fetchUser();

  // Function to handle form submit
    function onSubmit(formInput) {
        const logQueue = [];
        Object.keys(formInput).map((id) => {
        const replenishedCommodityData = commodities.filter((item) => item.DataElement == id)[0];
        const mutatePromise = changeCommodityCount(
            mutator,
            parseInt(formInput[id]) + parseInt(replenishedCommodityData.EndBalance),
            replenishedCommodityData.DataElement,
            "rQLFnNXXIL0",
            getCurPeriod(),
            "xQIU41mR69s",
            refetch,
            error
        );
        Promise.resolve(mutatePromise)
            .then((error) => {
            if (error) {
                setAlerts((prev) => [...prev, error[0]]);
            } else {
                setAlerts((prev) => [
                ...prev,
                <AlertBar success>
                    {formInput[id].toString() +
                    " " +
                    replenishedCommodityData.DataElementName +
                    " added to stock "}
                </AlertBar>,
                ]);
            }
            })
            .then(() => {
                const date = new Date();
                const logItem = {
                    date: date.toISOString(),
                    amount: formInput[id],
                    commodityID: replenishedCommodityData.DataElement,
                    dispensedBy: user.meRequest.name,
                    commodityName: replenishedCommodityData.DataElementName,
                };
                logQueue.push(logItem);
            })
            .catch((error) => {
                setAlerts((prev) => [
                    ...prev,
                    <AlertBar critical>{error.toString()}</AlertBar>,
                ]);
            });
        });
        log(logQueue, "request").catch((error) => {
            setAlerts((prev) =>  [...prev, <AlertBar critical children={error.toString()} key={crypto.randomUUID()}/>]);
            err = true
        });
        if (!err) {
            setAlerts((prev) =>  [...prev, 
                <AlertBar 
                    success children={"successfully requested from: " + Object.keys(formInput).reduce((tot, cur) => {
                        return tot + ", " + orgs.filter((x) => { return x.id === cur })[0].name
                    }, "").slice(2)} 
                    key={crypto.randomUUID()}
                />
            ]);
        }
  }
  // If data is fetched, create a table row for each commodity
  if (!(commodities instanceof Array)) {
    return commodities;
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
                data={commodities}
            ></InputTable>
            <AlertStack>{alerts}</AlertStack>
      </div>
    );
  }
}

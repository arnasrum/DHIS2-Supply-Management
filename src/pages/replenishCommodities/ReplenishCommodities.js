import React, { useState } from "react";
import {
    fetchUser,
    getCommoditiesData,
} from "../../logicLayer/ApiCalls";
import classes from "../../App.module.css";
import { log } from "../../logicLayer/Log";

import { AlertBar, AlertStack } from "@dhis2/ui";
import { InputTable } from "../../components/InputTable";
import {
    changeCommodityCount,
    getSingleChangeMutator,
} from "../../logicLayer/ApiMutations";
import { getCurPeriod } from "../../logicLayer/Helpers";

export function ReplenishCommodities() {
    // Get values and commodities form the API
    const [commodities, refetch] = getCommoditiesData();
    // Used for data mutation
    const [mutator, error] = getSingleChangeMutator();
    // States for alert bars
    const [alerts, setAlerts] = useState([]);
    const user = fetchUser();

    // Function to handle form submit
    function onSubmit(formInput) {
        let err;
        const logQueue = [];
        Object.keys(formInput).map((id) => {
        const replenishedCommodityData = commodities.filter((item) => item.DataElement == id)[0];
        const errorMessagePromise = changeCommodityCount(
            mutator,
            parseInt(formInput[id]) + parseInt(replenishedCommodityData.EndBalance),
            replenishedCommodityData.DataElement,
            "rQLFnNXXIL0",
            getCurPeriod(),
            "xQIU41mR69s",
            refetch,
            error
        );
        Promise.resolve(errorMessagePromise)
            .then((error) => {
                if (error) {
                    setAlerts((prev) => [...prev, error[0]]);
                } else {
                    setAlerts((prev) => [
                    ...prev,
                    <AlertBar success key={crypto.randomUUID()}>
                        {formInput[id].toString() +
                        " " +
                        replenishedCommodityData.DataElementName +
                        " added to stock "}
                    </AlertBar>,
                    ]);
                }
                const date = new Date();
                const logItem = {
                    date: date.toISOString(),
                    amount: formInput[id],
                    commodityID: replenishedCommodityData.DataElement,
                    user: user.meRequest,
                    commodityName: replenishedCommodityData.DataElementName,
                };
                logQueue.push(logItem);
            })
            .catch((error) => {
                setAlerts((prev) => [
                    ...prev,
                    <AlertBar critical key={crypto.randomUUID()}>{"Logging for action has failed: " +error.toString()}</AlertBar>,
                ]);
            });
        });
        log(logQueue, "request").catch((error) => {
            setAlerts((prev) =>  [...prev, 
                <AlertBar critical children={"Failed to log action. " + error.toString()} key={crypto.randomUUID()}/>]
            );
        });
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
                headerNames={["Commodity", "Current Stock", "Replenish Amount"]}
                propertyNames={["DataElementName", "EndBalance"]}
                onSubmit={onSubmit}
                data={commodities}
            ></InputTable>
            <AlertStack>{alerts}</AlertStack>
      </div>
    );
  }
}

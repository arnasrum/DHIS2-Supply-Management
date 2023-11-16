import React, { useState } from "react";
import { AlertBar, AlertStack } from "@dhis2/ui";
import {
    changeCommodityCountMultiple,
    getMultipleChangeMutator,
} from "../logicLayer/ApiMuatations";
import { getCommoditiesData, fetchUser } from "../logicLayer/ApiCalls";
import { InputTable } from "../components/InputTable";
import { makeDatavalueMap } from "../logicLayer/Helpers";
import { log } from "../logicLayer/Log";

export function UpdateCommodity(props) {
    // states values
    const [alerts, setAlerts] = useState([]);
    const [mutator, error] = getMultipleChangeMutator();
    const [commodities, refetch] = getCommoditiesData();
    const [keyCount, setKeyCount] = useState(0);
    const user = fetchUser();

    // set alert for success
    function onSubmit(formInput) {
        // update counter for key
        setKeyCount(keyCount + 1);
        // if no value updated
        if (Object.entries(formInput).length < 1) {
            // set alert for missing info
            setAlerts((prev) => {
                return [
                    ...prev,
                    <AlertBar info key={keyCount} children={"no value was provided"} />,
                ];
            });
            return;
        }
        // mutate when value provided
        const errorMessagePromise = changeCommodityCountMultiple(
            mutator,
            Object.entries(formInput).map((pair) => {
                return makeDatavalueMap(pair[1], pair[0], undefined, "rQLFnNXXIL0");
            }),
            refetch,
            error
        );
        // check for error
        Promise.all([errorMessagePromise])
            .then((errorMessage) => {
                if (errorMessage[0]) {
                    setAlerts((prev) => [...prev, errorMessage[0]]);
                } else {
                    // set alert for success
                    setAlerts((prev) => {
                        return [
                            ...prev,
                            <AlertBar
                            success
                            key={keyCount}
                            children={
                                commodities.reduce((tot, curVal) => {
                                    if (Object.keys(formInput).includes(curVal.DataElement)) {
                                        return tot + ", " + curVal.DataElementName;
                                    }
                                    return tot;
                                }, "")
                                .slice(2) + " successfully recounted"
                            }
                            />,
                        ];
                    }); 
                    const updatedCommodityID =  Object.keys(formInput)[0];
                    const updatedCommodity = commodities.reduce( (sum, curVal) => {
                        if(updatedCommodityID == curVal.DataElement) return [...sum, curVal];
                            return sum; 
                        }, [])[0];
                    console.log(updatedCommodity);

                    const date = new Date();
                    const logItem = 
                        {
                            commodityID: updatedCommodity.DataElement,
                            commoditiesName: updatedCommodity.DataElementName,
                            date: date,
                            oldValue: updatedCommodity.EndBalance,
                            newValue: formInput[updatedCommodityID],
                            updatedBy: user.meRequest,
                        };
                    console.log("logging");
                    log(logItem, "update").catch((error) => {
                        setAlerts((prev) =>  [...prev, <AlertBar critical children={error.toString()} key={crypto.randomUUID()}/>]);
                    }); 
                }
            })
    }

    // return form
    if (!(commodities instanceof Array)) {
        return commodities;
    } else {
        return (
            <div>
                <h1>Stock Recount</h1>
                <p>
                    Update the stock count of commodities, for when commodity overview
                    deviates from actual stock.
                </p>
                <InputTable
                    headerNames={["Commodity", "Current Balance", "Recounted Balance"]}
                    propertyNames={["DataElementName", "EndBalance"]}
                    onSubmit={onSubmit}
                    data={commodities}
                />
                <AlertStack>{alerts}</AlertStack>
            </div>
        );
    }
}

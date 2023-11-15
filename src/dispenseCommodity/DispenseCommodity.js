import React, { useState, useEffect } from "react";
import { AlertBar, AlertStack, Divider} from "@dhis2/ui";

import { NameField } from "./NameField";
import { getCommoditiesData, fetchUser } from "../logicLayer/ApiCalls";
import { consumeCommodityCount, getCurPeriod } from "../logicLayer/Helpers";
import { getMultipleChangeMutator } from "../logicLayer/ApiMuatations";
import { InputTable } from "../components/InputTable";


export function DispenseCommodity(props) {

    const [mutator, error] = getMultipleChangeMutator();
    const user = fetchUser();
    const [commodities, refetch] = getCommoditiesData();
    const [alerts, setAlerts] = useState([]);
    const [name, setName] = useState("");

    if (Array.isArray(commodities)) {
        return (
        <>
            <h1>Dispense Commodity</h1>
            <NameField 
                label={"Dispense To: "} 
                name={"dispensedTo"} 
                placeholder={"Dispense To"}
                value={name}
                setValue={setName}
                setAlerts={setAlerts}
            />
            <Divider />
            <InputTable 
                data={commodities} 
                onSubmit={onSubmit}
                headerNames={["Commidity", "Current Stock", "Dispense Amount"]}
                propertyNames={["DataElementName", "EndBalance"]}
            />
            <AlertStack> {alerts.map(item => item)} </AlertStack> 
        </>
        );
    }
    if(commodities) {
        return(<>{commodities}</>);
    }

    function onSubmit(formInput) {
        try {
            if(name === "") {
                throw new Error("Please input a name");
            }

            console.log(formInput);
            Object.keys(formInput).map((id) => {

                const dispensedCommodityData = commodities.filter((item) => item.DataElement == id)[0];
                const errorMessage = consumeCommodityCount(
                    mutator, 
                    formInput[id],
                    dispensedCommodityData.EndBalance,
                    dispensedCommodityData.Consumption,
                    dispensedCommodityData.DataElement,
                    getCurPeriod(),
                    "xQIU41mR69s",
                    refetch,
                    error
                );
                Promise.resolve(errorMessage).then((values) => {
                    if (values) {
                        setAlerts((prev) => [...prev, values[0]])
                    } else {
                        setAlerts((prev) => [...prev,
                        <AlertBar success>
                            {formInput[id].toString() + " " +
                            dispensedCommodityData.DataElementName + " " +
                            "dispensed to " +
                            name}
                        </AlertBar>]);
                        log(formInput, id, dispensedCommodityData);
                    }
                }).catch(error => {
                    console.log("in here lol");
                });
            })
        } catch(error) {
            setAlerts((prev) =>  [...prev, <AlertBar critical>{error.toString()}</AlertBar>]);
            console.error(error);
        }
    }
    function log(formInput, id, dispensedCommodityData) {
        const date = new Date();
        const postQuery = "http://localhost:9999/api/dataStore/IN5320-27/dispense";
        fetch(postQuery)
            .then(response => response.json())
            .then(response => {
                fetch(postQuery, {
                    method: "PUT",
                    headers: {
                        "Content-type": "application/json",
                    },
                    body: JSON.stringify(
                        [
                            ...response, 
                            {
                                date: date.toISOString(),
                                amount: formInput[id],
                                commodityID: dispensedCommodityData.DataElement,
                                dispensedBy: user.meRequest.name,
                                dispensedTo: name,
                                commodityName: dispensedCommodityData.DataElementName,
                            }
                        ]),
                })
                .then((response) => response.json())
                .then(response => {throw new Error("logged")})
                .catch((error) => {
                    setAlerts((prev) =>  [...prev, <AlertBar critical>{error.toString()}</AlertBar>]);
                });
            });
    }
}
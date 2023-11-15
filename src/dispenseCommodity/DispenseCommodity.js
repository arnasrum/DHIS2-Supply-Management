import React, { useState, useEffect } from "react";
import { AlertBar, AlertStack, Divider} from "@dhis2/ui";

import { NameField } from "./NameField";
import { getCommoditiesData, fetchUser } from "../logicLayer/ApiCalls";
import { consumeCommodityCount, getCurPeriod } from "../logicLayer/Helpers";
import { getMultipleChangeMutator } from "../logicLayer/ApiMuatations";
import { InputTable } from "../components/InputTable";


export function DispenseCommodity(props) {

    const mutator = getMultipleChangeMutator();
    const user = fetchUser();
    const commodities = getCommoditiesData();
    const [alerts, setAlerts] = useState([]);
    const [name, setName] = useState("");

    if (Array.isArray(commodities[0])) {
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
                data={commodities[0]} 
                onSubmit={onSubmit}
                headerNames={["Commidity", "Current Stock", "Dispense Amount"]}
                propertyNames={["DataElementName", "EndBalance"]}
            />
            <AlertStack> {alerts.map(item => item)} </AlertStack> 
        </>
        );
    }
    if(commodities[0]) {
        return(<>{commodities[0]}</>);
    }

    function onSubmit(formInput) {
        try {
            if(name === "") {
                throw new Error("Please input a name");
            }

            console.log(formInput);
            Object.keys(formInput).map((id) => {

                const dispensedCommodityData = commodities[0].filter((item) => item.DataElement == id)[0];
                console.log(dispensedCommodityData);
                consumeCommodityCount(
                    mutator, 
                    formInput.dispensedAmount,
                    dispensedCommodityData.EndBalance,
                    dispensedCommodityData.Consumption,
                    dispensedCommodityData.DataElement,
                    getCurPeriod(),
                    "xQIU41mR69s"
                );

            setAlerts((prev) => {
                return [...prev,
                <AlertBar success>
                    {formInput[id].toString() + " " +
                    dispensedCommodityData.DataElementName + " " +
                    "dispensed to " +
                    name}
                </AlertBar>
                ]
            } 
                
                );
                const date = new Date();
                const postQuery =
                "http://localhost:9999/api/dataStore/IN5320-27/" + crypto.randomUUID();
                fetch(postQuery, {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json",
                    },
                    body: JSON.stringify({
                    date: date.toISOString(),
                    amount: formInput[id],
                    commodityID: dispensedCommodityData.DataElement,
                    dispensedBy: user.meRequest.name,
                    dispensedTo: name,
                    commodityName: dispensedCommodityData.DataElementName,
                    }),
                })
                .then((response) => response.json())
                .then((response) => {
                    console.log(response);
                });

            })
        } catch(error) {
        setAlerts((prev) =>  [...prev, <AlertBar critical>{error.toString()}</AlertBar>]);
        console.error(error);
        }
    }
}
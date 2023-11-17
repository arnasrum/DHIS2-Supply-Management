import React, { useState, useEffect } from "react";
import { CircularLoader, AlertBar, AlertStack } from "@dhis2/ui";

import { InputTable } from "../../components/InputTable";
import { getCurPeriod } from "../../logicLayer/Helpers";
import { log } from "../../logicLayer/Log";
import { fetchUser } from "../../logicLayer/ApiCalls";

export function ClinicRequestTable(props) {
    const commodity = props.commodity;
    const orgs = props.orgs;
    const [orgData, setOrgData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [alerts, setAlerts] = useState([]);
    const user = fetchUser();

    useEffect(() => {
        if (!commodity) {
            return;
        }
        setLoading(true);
        const fetchPromises = orgs.map(async (item) => {
            let query = "http://localhost:9999/api/dataValues.json?";
            query = query + "de=" + commodity;
            query = query + "&pe=" + getCurPeriod();
            query = query + "&ou=" + item.id;
            query = query + "&co=" + "rQLFnNXXIL0";
            return fetch(query)
                .then((response) => response.json())
                .then((response) => {
                    return {
                        "DataElementName": item.name,
                        "DataElement": item.id,
                        "value": response[0]
                    };
                })
        });

        // Wait for all fetch requests to complete
        Promise.all(fetchPromises)
            .then((data) => {
                setOrgData(data); 
                setLoading(false)
            })
            .catch((error) => {
                setAlerts((prev) =>  [...prev, <AlertBar critical children={error.toString()} key={crypto.randomUUID()}/>]);
                console.error("Error fetching data:", error);
            });
    }, [commodity]);

    function onSubmit(formInput) {
        const date = new Date();
        const logQueue = []
        Object.entries(formInput).forEach((keyValuePair) => {
            const commodityID = commodity.split("&")[0];
            const commodityName = commodity.split("&")[1];
            const org = orgData.filter((org) => keyValuePair[0]  == org.DataElement)[0];
            logQueue.push(
            {
                date: date.toISOString(),
                requestedBy: "xQIU41mR69s",
                requestedClinicID: keyValuePair[0],
                requestedCommodityID: commodityID,
                requestedCommodityName: commodityName,
                amount: keyValuePair[1],
                requestedClinicName: org.DataElementName,
                user: user.meRequest,
            });  
        })
        log(logQueue, "request")
            .then(() => {
                setAlerts((prev) =>  [...prev, 
                    <AlertBar 
                        success children={"Successfully requested from: " + Object.keys(formInput).reduce((total, currentItem) => {
                            return total + ", " + orgs.filter((x) => { return x.id === currentItem })[0].name}, "").slice(2)} 
                        key={crypto.randomUUID()}
                    />
                ]);
            }) 
            .catch((error) => {
                setAlerts((prev) =>  [...prev, <AlertBar critical 
                    children={"Request for " + commodity.split("&")[1] + " has failed: " + error.toString()} 
                    key={crypto.randomUUID()}/>]
                );
            });
    }

    if(loading) {
        return <CircularLoader/>
    }
    if(orgData.length > 0) {
        return (
        <>
            <InputTable 
                headerNames={["Clinic", "Current Stock", "Request Amount"]}
                propertyNames={["DataElementName", "value"]}
                onSubmit={onSubmit}
                data={orgData}
            />
            <AlertStack>{alerts}</AlertStack>
        </>);
    }
    return <></>
}

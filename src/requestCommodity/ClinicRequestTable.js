import React, { useState, useEffect } from "react";
import { CircularLoader, AlertBar, AlertStack } from "@dhis2/ui";

import { InputTable } from "../components/InputTable";
import { getCurPeriod } from "../logicLayer/Helpers";
import { log } from "../logicLayer/Log";

export function ClinicRequestTable(props) {
    const commodity = props.commodity;
    const orgs = props.orgs;
    const [orgData, setOrgData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [alerts, setAlerts] = useState([]);

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
                        "dataElementName": item.name,
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

    if(loading) {
        return <CircularLoader/>
    }
    if(orgData.length > 0) {
        return (
        <>
            <InputTable 
                headerNames={["Clinic", "Value", "Request Amount"]}
                propertyNames={["DataElement", "value"]}
                onSubmit={onSubmit}
                data={orgData}
            />
            <AlertStack>{alerts}</AlertStack>
        </>);
    }
    return <></>

    function onSubmit(formInput) {
        const date = new Date();
        let err = false
        const loggArr = []
        Object.entries(formInput).map((pair) => {
            loggArr.push(
            {
                date: date.toISOString(),
                requestedBy: "xQIU41mR69s",
                requestedOf: pair[0],
                dataElement: commodity,
                amount: pair[1],
            });  
        })
        log(loggArr, "request").catch((error) => {
            setAlerts((prev) =>  [...prev, <AlertBar critical children={error.toString()} key={crypto.randomUUID()}/>]);
            err = true
        })
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
}
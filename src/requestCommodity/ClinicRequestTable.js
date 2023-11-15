import React, { useState, useEffect } from "react";
import { CircularLoader, AlertBar, AlertStack } from "@dhis2/ui";

import { InputTable } from "../components/InputTable";
import { getCurPeriod } from "../logicLayer/Helpers";

function getCommodityValue(dataElements, commodityID) {
    const value = dataElements.filter((item) => {
        if(item.dataElement == commodityID) return true;
        return false;
    })
    return value[0].value;
}

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
            let query = "http://localhost:9999/api/dataValueSets.json?";
            query = query + "orgUnit=" + item.id;
            query = query + "&dataSet=" + "ULowA8V3ucd";
            query = query + "&period=" + getCurPeriod();

            return fetch(query)
                .then((response) => response.json())
                .then((response) => response.dataValues.filter((item) => {
                    if(item.categoryOptionCombo == "J2Qf1jtZuj8") return true;
                    return false;
                }))
                .then((response) => {
                    const obj = {};
                    obj.DataElement = item.id;
                    obj.DataElementName = item.name;
                    obj.DataElements = response;
                    return obj;
                })
        });

        // Wait for all fetch requests to complete
        Promise.all(fetchPromises)
            .then((data) => {
                return data;
            })
            .then((data) => {
                data.forEach((item) => {
                    item["value"] = getCommodityValue(item.DataElements, commodity.split("&")[0]);
                });
                setOrgData(data); 
                return data;
            })
            .then(() => setLoading(false))
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
        }, [commodity]);

    if(loading) {
        return <CircularLoader/>
    }
    if(orgData.length > 0) {
        console.log(orgData);
        return (
        <>
            <InputTable 
                headerNames={["Clinic", "Value", "Request Amount"]}
                propertyNames={["DataElementName", "value"]}
                onSubmit={onSubmit}
                data={orgData}
            />
            <AlertStack>{alerts.map((item) => item)}</AlertStack>
        </>);
    }
    return <h1>Select a Commodity</h1>

    function onSubmit(formInput) {
        const date = new Date();
        const postQuery = "http://localhost:9999/api/dataStore/IN5320-27-requests/";
        Object.keys(formInput).forEach((org) => {
            const clinicName = orgs.filter((item) => item.id == org)[0].name;
            console.log(clinicName);
            fetch(postQuery + crypto.randomUUID(), {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({
                    commodityID: commodity.split("&")[0],
                    commodityName: commodity.split("&")[1],
                    requestedClinic: org,
                    date: date.toISOString(),
                    requestedAmount: formInput[org],
                    requestBy: props.usersOrg,
                    requestedClinicName: clinicName,
                }),
            })
            .then((response) => response.json())
            .then((response) => console.log(response))
            .then(() => setAlerts((prevState, props) => 
                [...prevState, 
                    <AlertBar success key={crypto.randomUUID()}>
                        {"Requested " + clinicName + " " + formInput[org] + " " + commodity.split("&")[1]}
                    </AlertBar>
                ]))
           .catch((error) => {
                setAlerts((prevState) => 
                [...prevState, 
                <AlertBar critical key={crypto.randomUUID()}>
                    {error.message}
                </AlertBar>])
                console.error(error);
            });
        });
    }
}

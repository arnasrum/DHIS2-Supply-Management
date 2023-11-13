import React, { useState, useEffect } from "react";
import { ReactFinalForm, Button, AlertBar} from "@dhis2/ui";

import { AmountField } from "./AmountField";
import { CommodityField } from "./CommodityField";
import { NameField } from "./NameField";
import { getCommoditiesData, fetchUser } from "../logicLayer/ApiCalls";
import { consumeCommodityCount, getCurPeriod } from "../logicLayer/Helpers";
import { getMultipleChangeMutator } from "../logicLayer/ApiMuatations";
import { CommodityTable } from "./CommodityTable";



export function DispenseCommodity(props) {

    const mutator = getMultipleChangeMutator();
    const user = fetchUser();
    const [successAlert, setSuccessAlert] = useState(<></>);
    const commodities = getCommoditiesData();

    if (Array.isArray(commodities[0])) {
        return (
        <>
            <h1>Dispense Commodity</h1>
            <ReactFinalForm.Form onSubmit={onSubmit}>
            {({ handleSubmit, form }) => (
                <form onSubmit={handleSubmit}>
                    <CommodityField data={commodities[0]} />
                    <AmountField />
                    <NameField
                        name="dispensedTo"
                        label="Dispensed To: "
                        placeholder="Name of receiver"
                    />
                    <Button type="submit" primary>
                        Dispense
                    </Button>
                </form>
            )}
            </ReactFinalForm.Form>
            {successAlert}
            <CommodityTable commodities={commodities}/>
        </>
        );
    }
    if(commodities[0]) {
        return(<>{commodities[0]}</>);
    }

    function onSubmit(formInput) {
        
        try {
            const dispensedCommodity = commodities[0].filter((item) => {
                if(item.DataElement == formInput.commodity.split("&")[0]) {
                    return true;
                }
                return false;
            });
            console.log(dispensedCommodity);
            consumeCommodityCount(mutator, 
                                formInput.dispensedAmount,
                                dispensedCommodity[0].EndBalance,
                                dispensedCommodity[0].Consumption,
                                dispensedCommodity[0].DataElement,
                                getCurPeriod(),
                                "xQIU41mR69s")
            setSuccessAlert(
                <AlertBar success>
                    {formInput.dispensedAmount.toString() + " " +
                    formInput.commodity.split("&")[1].toString() + " " +
                    "dispensed to " +
                    formInput.dispensedTo}
                </AlertBar>);
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
                    amount: formInput.dispensedAmount,
                    commodityID: formInput.commodity.split("&")[0],
                    dispensedBy: user.meRequest.name,
                    dispensedTo: formInput.dispensedTo,
                    commodityName: formInput.commodity.split("&")[1],
                    }),
                })
                .then((response) => response.json())
                .then((response) => {
                    console.log(response);
                });
        } catch(error) {
            setSuccessAlert(<AlertBar critical>{error.toString()}</AlertBar>);
            console.error(error);
        }


        /*
        let query = "http://localhost:9999/api/dataValues.json?";
        query = query + "de=" + formInput.commodity.split("&")[0];
        const date = new Date();
        const datelist = date.toISOString().split("-");
        query = query + "&pe=" + datelist[0] + datelist[1];
        query = query + "&ou=xQIU41mR69s";
        query = query + "&co=J2Qf1jtZuj8";
        fetch(query)
            .then((response) => response.json())
            .then((data) => {
                const newStock = parseInt(data[0]) - formInput.dispensedAmount;
                if (newStock < 0) {
                    throw new Error("Dispensed amount is higher than current stock");
                }
                fetch(query + "&value=" + newStock.toString(), {
                    method: "POST",
                });
            })
            .then((response) => {
                setSuccessAlert(
                <AlertBar success>
                    {formInput.dispensedAmount.toString() + " " +
                    formInput.commodity.split("&")[1].toString() + " " +
                    "dispensed to " +
                    formInput.dispensedTo.toString()}
                </AlertBar>);
            })
            .then((response) => {
                const postQuery =
                "http://localhost:9999/api/dataStore/IN5320-27/" + crypto.randomUUID();
                fetch(postQuery, {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json",
                    },
                    body: JSON.stringify({
                    date: date.toISOString(),
                    amount: formInput.dispensedAmount,
                    commodityID: formInput.commodity.split("&")[0],
                    dispensedBy: "Replace this with logged in name",
                    dispensedTo: formInput.dispensedTo,
                    commodityName: formInput.commodity.split("&")[1],
                    }),
                })
                .then((response) => response.json())
                .then((response) => {
                    console.log(response);
                });
            })
            .catch((error) => {
                setSuccessAlert(<AlertBar critical>{error.toString()}</AlertBar>);
                console.error(error);
            });

        */
    }
}
import React from "react";
import { useDataQuery } from "@dhis2/app-runtime";
import { ReactFinalForm, 
        CircularLoader,
        Button, 
} from '@dhis2/ui';

import { AmountField } from "./AmountField";
import { CommodityField } from "./CommodityField";
import { NameField } from "./NameField";

const request = {
    meRequest: {
        resource: "/me.json",
        params: {
            fields: "id,name,organisationUnits"
        },
    },
    commodityFieldRequest: {
        resource: `/dataSets/ULowA8V3ucd`,
        params: {
            fields: "displayName,dataSetElements[dataElement[id,displayName,*]]"
        }
    },
}
export function DispenseCommodity(props) {
    
    const { loading, error, data } = useDataQuery(request)
    if (error) {
        return <span>ERROR: {error.message}</span>;
    }

    if (loading) {
        return <CircularLoader/>;
    }

    if (data) {
        const orgUnit = data.meRequest.organisationUnits[0].id;
        return(
        <>
            <h1>Dispense Commodity</h1>
            <ReactFinalForm.Form onSubmit={onSubmit}>
                {({handleSubmit}) => (
                    <form onSubmit={handleSubmit}>
                        <CommodityField orgUnit={orgUnit} data={data.commodityFieldRequest}/>
                        <AmountField/>
                        <NameField name="dispensedTo" label="Dispensed To: " placeholder="Name of receiver"/>
                        <Button type="submit" primary>Dispense</Button>
                    </form>
                )}
            </ReactFinalForm.Form>
        </>
        );
        
    }
    function onSubmit(formInput) {
        let query = "http://localhost:9999/api/dataValues.json?";
        query = query + "de=" + formInput.commodity.split("&")[0];
        const date = new Date();
        const datelist = date.toISOString().split("-");
        query = query + "&pe=" + datelist[0] + datelist[1];
        query = query + "&ou=xQIU41mR69s";
        // Hvilken org blir denne sendt fra??? Hadde tenkt at den som er logget inn sin
        //query = query + "&ou=" + data.meRequest.organisationUnits[0].id;
        query = query + "&co=J2Qf1jtZuj8";
        fetch(query)
            .then(response => response.json())
            .then(data => {
                const newStock = parseInt(data[0]) - formInput.dispensedAmount;
                if(newStock < 0) {
                    throw new Error("Dispensed amount is higher than current stock");
                }
                fetch(query + "&value=" + newStock.toString(), {
                    method: "POST"
                });
            })
            .then((response) => {
               const postQuery = "http://localhost:9999/api/dataStore/transaction/" + crypto.randomUUID();
               fetch(postQuery, {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify({
                        date: date.getFullYear().toString(), 
                        time: date.getHours().toString(),
                        amount: formInput.dispensedAmount,
                        commodityID: formInput.commodity.split("&")[0],
                        dispensedBy: data.meRequest.name,
                        dispensedTo: formInput.dispensedTo,
                        commodityName: formInput.commodity.split("&")[1]
                    })
               })
                .then(response => response.json())
                .then(response => console.log(response));
            })
            .catch(error => console.error(error));
        
    }
}

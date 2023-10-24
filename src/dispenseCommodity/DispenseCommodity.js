import React, {useState, useEffect} from "react";
import { AmountField } from "./AmountField";
import { CommodityField } from "./CommodityField";
import { OrgField } from "./OrgField";
import { NameField } from "./NameField";

import { useDataQuery } from "@dhis2/app-runtime";
import { ReactFinalForm, 
        CircularLoader,
        Button, 
    } from '@dhis2/ui';

const request = {
    meRequest: {
        resource: "/me.json",
        params: {
            fields: "id,name,organisationUnits"
        }    ,
    },
    commodityFieldRequest: {
        resource: `/dataSets/ULowA8V3ucd`,
        params: {
            fields: "displayName,dataSetElements[dataElement[id,displayName,*]]"
        }
    },
    orgRequest: {
        resource: "/organisationUnits",
        params: {
            paging: true,
        }
    },

    transactionRequest: {
        resource: "/dataStore/transaction/"
    },

    request2: {
        resource: "/dataValueSets.json",
        params: {
            dataSet: "ULowA8V3ucd",
            period: 202310,
            orgUnit: "ZpE2POxvl9P",
        }
    }
}
export function DispenseCommodity(props) {
    
    // Maybe necessary to have state for amount
    const { loading, error, data } = useDataQuery(request)
    if (error) {
        return <span>ERROR: {error.message}</span>;
    }

    if (loading) {
        return <CircularLoader/>;
    }

    if (data) {
        //console.log("API response:",data);
        const orgUnit = data.meRequest.organisationUnits[0].id;
        return(
        <>
            <h1>Dispense Commodity</h1>
            <ReactFinalForm.Form onSubmit={onSubmit}>
                {({handleSubmit}) => (
                    <form onSubmit={handleSubmit}>
                        <CommodityField orgUnit={orgUnit} data={data.commodityFieldRequest}/>
                        <AmountField/>
                        <NameField name="dispensedBy" label="Dispensed by: " placeholder="Name of dispenser"/>
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
        query = query + "&pe=" + "2023" + ("0" + (parseInt(date.getMonth()) + 1).toString()).slice(-2)
        query = query + "&ou=ZpE2POxvl9P";
        // Hvilken org blir denne sendt fra??? Hadde tenkt at den som er logget inn sin
        //query = query + "&ou=" + data.meRequest.organisationUnits[0].id;
        query = query + "&co=J2Qf1jtZuj8";
        fetch(query)
            .then(response => response.json())
            .then(data => {
                const newStock = parseInt(data[0]) - formInput.dispensedAmount;
                console.log("newStock", newStock);
                if(newStock < 0) {
                    throw new Error("Dispensed amount is higher than current stock");
                }
                fetch(query + "&value=" + newStock.toString(), {
                    method: "POST"
                });
            })
            .catch(error => console.error(error))
            .finally(() => {
                /*
                fetch(query)
                    .then(response => response.json())
                    .then( (data) => {
                        setTimeout(data, 1000);
                        console.log("new data", data)
                    })
                */
               const query2 = "http://localhost:9999/api/dataStore/transaction/" + crypto.randomUUID();
               fetch(query2, {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify({
                        date: date.getFullYear().toString(), 
                        time: date.getHours().toString(),
                        amount: formInput.dispensedAmount,
                        commodityID: formInput.commodity.split("&")[0],
                        dispensedBy: formInput.dispensedBy,
                        dispensedTo: formInput.dispensedTo,
                        commodityName: formInput.commodity.split("&")[1]
                    })
               })
                .then(response => response.json())
                .then(response => console.log(response));
            });
        
    }
}
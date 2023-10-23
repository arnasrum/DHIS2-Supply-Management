import React, {useState, useEffect} from "react";
import { AmountField } from "./AmountField";
import { CommodityField } from "./CommodityField";
import { DropdownField } from "./DropdownField";

import { useDataQuery } from "@dhis2/app-runtime";
import { ReactFinalForm, 
        CircularLoader,
        InputFieldFF, 
        Button, 
        hasValue, 
        SingleSelectFieldFF, 
        composeValidators, 
        number
        } from '@dhis2/ui';

const request = {
    request0: {
        resource: "/me.json",
        params: {
            fields: "id,name,organisationUnits"
        }    
    }
}
export function DispenseCommodity(props) {
    
    // Maybe necessary to have state for amount
    const [amount, setAmount] = useState(0);
    const [dataSet, setDataSet] = useState("");
    const [commodities, setCommodities] = useState();

    const { loading, error, data } = useDataQuery(request)
    if (error) {
        return <span>ERROR: {error.message}</span>;
    }

    if (loading) {
        return <CircularLoader/>;
    }

    if (data) {
        console.log("API response:",data.request0);
        //const dataSets = getDataset(data.request0.organisationUnits[0]);
        //console.log("dataSets: " + dataSets);
        //To-do: return a component using the data response 

        const orgUnit = data.request0.organisationUnits[0].id;


        //<DatasetField orgUnitID={orgUnit} dataSet={dataSet} setDataSet={setDataSet}/>
        return(
        <>
            <h1>Dispense Commodity</h1>
            <ReactFinalForm.Form onSubmit={onSubmit}>
                {({handleSubmit}) => (
                    <form onSubmit={handleSubmit}>
                        <CommodityField orgUnit={orgUnit}/>
                        <AmountField amount={amount} setAmount={setAmount}/>
                        <Button type="submit" primary>Dispense</Button>
                    </form>
                )}
            </ReactFinalForm.Form>
        </>
        );
        
    }
    function onSubmit(formInput) {
        // Post request with dispensed commodity
        console.log(formInput);
        //fetch("http://localhost:9999")
    }
}
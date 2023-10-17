import React, {useState, useEffect} from "react";
import { DatasetField } from "./DatasetField";
import { AmountField } from "./AmountField";
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
    
    const [datasets, setDatasets] = useState([]);
    // Maybe necessary to have state for amount
    const [amount, setAmount] = useState(0);
    const [orgUnits, setOrgUnits] = useState([]);

    const sendRequest = () => {
        const { loading, error, data } = useDataQuery(request)
        if (error) {
            return <span>ERROR: {error.message}</span>
        }
    
        if (loading) {
            return <CircularLoader/> 
        }
    
        if (data) {
           console.log("API response:",data.request0)
           //To-do: return a component using the data response 
           return(
            <>
                <h1>Dispense Commodity</h1>
                <ReactFinalForm.Form onSubmit={onSubmit}>
                    {({handleSubmit}) => (
                        <form onSubmit={handleSubmit}>
                            <DatasetField datasets={datasets} setDatasets={setDatasets}/>
                            <DropdownField selectedItem={orgUnits} setSelectedItem={setOrgUnits} query={"organisationUnits"} name={"orgUnit"} label={"orgUnit"}/>
                            <AmountField amount={amount} setAmount={setAmount}/>
                            <Button type="submit" primary>Dispense</Button>
                        </form>
                    )}
                </ReactFinalForm.Form>
            </>
           );
           
        }
    }


    function onSubmit(formInput) {
        // Post request with dispensed commodity
        console.log(formInput);
    }
    return (
        <div>
            {sendRequest()}
        </div>
    );
}
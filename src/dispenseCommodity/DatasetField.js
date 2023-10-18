import React, { useState, useEffect} from "react";
import { useDataQuery } from "@dhis2/app-runtime";
import { ReactFinalForm, 
        InputFieldFF, 
        hasValue, 
        SingleSelectFieldFF, 
        composeValidators, 
        number,
        CircularLoader
        } from '@dhis2/ui';



export function DatasetField(props) {
    const getDataset = (orgUnitID) => {
        const requestDataSet = {
            request0: {
                resource: `/organisationUnits/${orgUnitID}.json?fields=name,id,dataSets[name, id]`
            }
        }
        const { loading, error, data } = useDataQuery(requestDataSet);

        if(error) {
            return <span>ERROR: {error.message}</span>;
        }
        if(loading) {
            return <CircularLoader/>;
        }
        if(data) {
            console.log("datasetField request: ", data.request0)
            return(
                <ReactFinalForm.Field
                    component={SingleSelectFieldFF} 
                    name="dataSet"
                    label="Dataset:"
                    options={data.request0.dataSets.map((item) => {
                        return {"label": item.name, "value": item.id}
                    })}
                >
                </ReactFinalForm.Field>
            );
        }
    }
    const orgUnitID = props.orgUnitID;
    return(
        <>
            {getDataset(orgUnitID)}
        </>
    );
}
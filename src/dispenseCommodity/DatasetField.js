import React, { useState, useEffect} from "react";
import { useDataQuery } from "@dhis2/app-runtime";
import { ReactFinalForm, 
        InputFieldFF, 
        hasValue, 
        SingleSelectFieldFF, 
        SingleSelectField, 
        composeValidators, 
        number,
        CircularLoader
        } from '@dhis2/ui';
import { SingleSelectOption } from '@dhis2-ui/select'

export function DatasetField(props) {

    const orgUnitID = props.orgUnitID;
    const dataSet = props.dataSet;
    const setDataSet = props.setDataSet;

    const requestDataSet = {
        request0: {
            resource: `/organisationUnits/${orgUnitID}.json?fields=name,id,dataSets[name, id]`
        }
    }

    const handleChange = (event) => {
        console.log(event.selected);
        setDataSet(event.selected);
    }



    const { loading, error, data } = useDataQuery(requestDataSet);
    //const loading = true;
    //const error = undefined;
    //const data = undefined;

    if(error) {
        return <span>ERROR: {error.message}</span>;
    }
    if(loading) {
        return <SingleSelectField
        component={SingleSelectFieldFF} 
        loading={loading}
        prefix="Dataset"
        placeholder="Choose a dataset"
        name="dataSet"
        label="Dataset:"
        options={[]}
        >
        </SingleSelectField>
    }
    if(data) {
        return <SingleSelectField
                prefix="Dataset"
                placeholder="Choose a dataset"
                name="dataSet"
                label="Dataset:"
                onChange={handleChange}
                selected={dataSet}
        >
            {data.request0.dataSets.map((item) => {
                return <SingleSelectOption label={item.name} value={item.id} key={crypto.randomUUID()}/>
            })}
        </SingleSelectField>
    }
}
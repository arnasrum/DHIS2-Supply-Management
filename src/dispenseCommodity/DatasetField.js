import React, { useState, useEffect} from "react";
import { useDataQuery } from "@dhis2/app-runtime";
import { ReactFinalForm, 
        InputFieldFF, 
        hasValue, 
        SingleSelectFieldFF, 
        composeValidators, 
        number
        } from '@dhis2/ui';

export function DatasetField(props) {

    //const [datasets, setDatasets] = useState([])
    const datasets = props.datasets;
    const setDatasets = props.setDatasets;

    useEffect(() => {
        fetch("http://localhost:9999/api/dataSets")
            .then(response => response.json())
            .then((data) => {
                console.log(data);
                setDatasets(data.dataSets);
            })
            .catch(error => console.error(error));
    }, []);
 
    return(
        <>
            <ReactFinalForm.Field
                component={SingleSelectFieldFF} 
                name="dataSet"
                label="Dataset:"
                options={datasets.map((item) => {
                    return {"label": item.displayName, "value": item.id}
                })}
            >
            </ReactFinalForm.Field>
        </>
    );
}
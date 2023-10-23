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

const dataElementRequest = {
        request0: {
            resource: `/dataSets/ULowA8V3ucd`,
            params: {
                fields: "displayName,dataSetElements[dataElement[id,displayName,*]]"
            }
        },
        request1: {
            resource: "/dataValueSets.json",
            params: {
                dataSet: "ULowA8V3ucd",
                period: 202310,
                orgUnit: "ZpE2POxvl9P"
            }

        }
    }

export function CommodityField(props) {

    const [selected, setSelected] = useState();
   
    const {loading, error, data} = useDataQuery(dataElementRequest)
    if(error) {
        return <span>ERROR: {error.message}</span>
    }
    if(loading) {
        return <CircularLoader/>
    }
    if(data) {
        console.log("request0", data.request0.dataSetElements);
        console.log("request1", data.request1);
        return(
            <ReactFinalForm.Field
                component={SingleSelectFieldFF}
                name="commodity"
                label="Commodity:"
                placeholder="Select Commodity"
                options={data.request0.dataSetElements.map((item) => {
                    return {
                    "label":item.dataElement.displayName.split(" - ")[1],
                    "value": item.dataElement.id
                }})}
            />
        );
    }

}
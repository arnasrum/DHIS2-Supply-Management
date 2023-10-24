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

export function CommodityField(props) {

    const data = props.data;
    return(
        <ReactFinalForm.Field
            component={SingleSelectFieldFF}
            name="commodity"
            label="Commodity:"
            placeholder="Select Commodity"
            validate={composeValidators(hasValue)}
            options={data.dataSetElements.map((item) => {
                return {
                "label":item.dataElement.displayName.split(" - ")[1],
                "value": item.dataElement.id.toString() + "&" + item.dataElement.displayName.split(" - ")[1]
            }})}
        />
    );
}
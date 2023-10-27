import React from "react";
import { ReactFinalForm, 
        hasValue, 
        SingleSelectFieldFF, 
        composeValidators
} from '@dhis2/ui';

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
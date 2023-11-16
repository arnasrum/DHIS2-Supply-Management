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
            options={data.map((item) => {
                return {
                "label":item.DataElementName,
                "value": item.DataElement + "&" + item.DataElementName
            }})}
        />
    );
}
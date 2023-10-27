import React from "react";
import { ReactFinalForm, 
        InputFieldFF, 
        hasValue, 
        createMinNumber,
        composeValidators, 
        integer
} from '@dhis2/ui';


export function AmountField() {

    return(
        <>
            <ReactFinalForm.Field
                component={InputFieldFF} 
                name="requestAmount"
                label="Request Amount:"
                placeholder="Request Amount"
                validate={composeValidators(hasValue, integer, createMinNumber(1))}  
            >
            </ReactFinalForm.Field> 
        </>
    );
}
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
                name="dispensedAmount"
                label="Amount:"
                placeholder="Input amount to be dispensed"
                validate={composeValidators(hasValue, integer, createMinNumber(1))}  
            >
            </ReactFinalForm.Field> 
        </>
    );

}
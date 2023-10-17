import React from "react";
import { ReactFinalForm, 
        InputFieldFF, 
        hasValue, 
        SingleSelectFieldFF, 
        composeValidators, 
        number
        } from '@dhis2/ui';


export function AmountField() {

    return(
        <>
            <ReactFinalForm.Field
                component={InputFieldFF} 
                name="amount"
                label="Amount:"
                validate={composeValidators(hasValue, number)}
            >
            </ReactFinalForm.Field> 
        </>
    );

}
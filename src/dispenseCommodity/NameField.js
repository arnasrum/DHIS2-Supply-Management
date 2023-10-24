import React from "react";
import { ReactFinalForm, 
    hasValue, 
    SingleSelectFieldFF, 
    InputFieldFF,
    composeValidators, 
    string
    } from '@dhis2/ui';


export function NameField(props) {

    const label = props.label;
    const name = props.name;
    const placeholder = props.placeholder;

    return(
        <>
            <ReactFinalForm.Field
                component={InputFieldFF} 
                name={name}
                label={label}
                placeholder={placeholder}
                validate={composeValidators(hasValue, string)}  
            >
            </ReactFinalForm.Field> 
        </>
    );
}
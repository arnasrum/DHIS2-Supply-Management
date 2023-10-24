import React from "react";
import { ReactFinalForm, 
    hasValue, 
    SingleSelectFieldFF, 
    composeValidators, 
    string
    } from '@dhis2/ui';


export function OrgField(props) {

    return(
        <>
            <ReactFinalForm.Field
                component={SingleSelectFieldFF} 
                name={"dispensedTo"}
                label={"Dispence to: "}
                placeholder={"Organisation Unit"}
                options={props.data.organisationUnits.map((item) => {
                    return {"label": item.displayName, "value": item.id}
                })}
                validate={composeValidators(hasValue)}
            >
            </ReactFinalForm.Field>
        </>
    );
}
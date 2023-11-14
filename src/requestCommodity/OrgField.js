import React from "react";
import {ReactFinalForm, 
        SingleSelectFieldFF,
        hasValue, 
        createMinNumber,
        composeValidators, 
        string
} from '@dhis2/ui';


export function OrgField(props) {

    if(props.orgs) {
        return(
            <>
            <ReactFinalForm.Field
                component={SingleSelectFieldFF}
                name="org"
                label="Request Org: "
                placeholder="Org"
                options={props.orgs.map((item) => {
                    return {"label":item.name, "value": item.id.toString() + "-" + item.name}
                })}
            >
            </ReactFinalForm.Field>
            </>
        );
    }
    return(
        <>
            <h3>Please selelct a commodity</h3> 
        </>
    );
}
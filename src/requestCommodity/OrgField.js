import React from "react";
import {ReactFinalForm, 
        SingleSelectFieldFF,
        hasValue, 
        createMinNumber,
        composeValidators, 
        string
} from '@dhis2/ui';


export function OrgField(props) {

    console.log("orgs", props.orgs)
    if(props.orgs) {
        return(
            <>
            <ReactFinalForm.Field
                component={SingleSelectFieldFF}
                name="orgID"
                label="Request Org: "
                placeholder="Org"
                options={props.orgs.map((item) => {
                    return {"label":item.id, "value": item.id}
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
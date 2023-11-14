import React, { useState } from "react";
import { ReactFinalForm, Button, AlertBar, AlertStack} from "@dhis2/ui";
import { AmountField } from "./AmountField";
import { OrgField } from "./OrgField";

export function RequestTable(props) {
    const orgs = props.orgs;
    
    const [alerts, setAlerts] = useState([]);

    function onSubmit(formInput) {
        const date = new Date();
        const postQuery =
        "http://localhost:9999/api/dataStore/IN5320-27-requests/" +
            crypto.randomUUID();
        fetch(postQuery, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify({
            commodityID: props.commodity,
            requestedClinic: formInput.org.split("-")[1],
            date: date.toISOString(),
            amount: formInput.requestAmount,
            requestBy: props.usersOrg,
            requestedTo: formInput.org.split("-")[0],
        }),
    })
    .then((response) => response.json())
    .then((response) => console.log(response))
    .then(() => setAlerts([...alerts, 
                <AlertBar key={crypto.randomUUID()} success>
                {"Requested " + formInput.requestAmount.toString() + " " + props.commodity}
                </AlertBar>]))
    .catch((error) => {
        console.error(error)
        setAlerts([...alerts, 
                <AlertBar key={crypto.randomUUID()} critical>
                    {error.error}
                </AlertBar>])
    });
    }

    return (
        <>
        <h2>Request commodity from clinic</h2>
        <ReactFinalForm.Form onSubmit={onSubmit}>
        {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
                <OrgField orgs={orgs} />
                <AmountField />
                <br />
                <Button type="submit" primary>
                    Submit
                </Button>
            </form>
        )}
        </ReactFinalForm.Form>
        <AlertStack>
            {alerts.map((item) => {
                return item;
            })}
        </AlertStack>
        </>
    );
}

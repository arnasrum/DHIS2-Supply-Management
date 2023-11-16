import React from "react";
import { ReactFinalForm, 
    InputField,
    AlertBar
} from '@dhis2/ui';


export function NameField(props) {

    const label = props.label;
    const id = props.id;
    const placeholder = props.placeholder;
    const value = props.value;
    const setValue = props.setValue;
    const setAlerts = props.setAlerts;
    const regex = /^\b[a-zA-Z ]+$/;

    function handleChange(event) {
        if(event.value == "") {}
        else if(!regex.test(event.value)) {
            setAlerts((prev) => [...prev, 
                <AlertBar info key={crypto.randomUUID()}>
                    {"Please only use character in name field"}
                </AlertBar>]
            );
            return;
        }
        setValue(event.value);
    }
    return(
        <>
            <InputField
                name={id}
                label={label}
                placeholder={placeholder}
                value={value}
                onChange={handleChange}
            />
        </>
    );
}
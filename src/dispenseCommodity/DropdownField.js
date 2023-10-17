import React, { useState, useEffect} from "react";
import { ReactFinalForm, 
        InputFieldFF, 
        hasValue, 
        SingleSelectFieldFF, 
        composeValidators, 
        number
        } from '@dhis2/ui';

export function DropdownField(props) {

    // Maybe include validator 
    const [items, setItems] = useState([])
    const selectedItem = props.item;
    const setSelectedItem = props.setSelectedItem;
    const query = props.query;
    const name = props.name;
    const label = props.label;
    //console.log("http://localhost:9999/api/" + query);

    useEffect(() => {
        fetch("http://localhost:9999/api/" + query)
            .then(response => response.json())
            .then((data) => {
                console.log(data);
                setItems(data[query]);
            })
            .catch(error => console.error(error));
    }, []);
 
    return(
        <>
            <ReactFinalForm.Field
                component={SingleSelectFieldFF} 
                name={name}
                label={label + ":"}
                options={items.map((item) => {
                    return {"label": item.displayName, "value": item.id}
                })}
            >
            </ReactFinalForm.Field>
        </>
    );
}
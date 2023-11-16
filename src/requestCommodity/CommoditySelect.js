import React from "react";
import { SingleSelect, SingleSelectOption } from "@dhis2/ui";


export function CommoditySelect(props) {
    const commodity = props.commodity;
    const commodities = props.commodities;
    const setCommodity = props.setCommodity;

    const sendRequest = () => {
        if (Array.isArray(commodities)) {
            return (
                <label>
                Select commodity:
                <SingleSelect
                    onChange={(selected) => handleChange(selected)}
                    selected={commodity}
                    placeholder="Select required commodity"
                >
                {commodities.map((item) => {
                    return (
                    <SingleSelectOption
                        key={crypto.randomUUID()}
                        label={item.displayName}
                        value={item.id}
                        />
                    );
                })}
                </SingleSelect>
                </label>
            );
        }
        if (commodities) {
            return commodities[0];
        }
    };
    function handleChange(item) {
        setCommodity(item.selected);
    }
    return <>{sendRequest()}</>;
}

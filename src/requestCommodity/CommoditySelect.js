import React from "react";
import { useDataQuery } from "@dhis2/app-runtime";
import {
  CircularLoader,
  ReactFinalForm,
  SingleSelect,
  SingleSelectOption,
  SingleSelectFieldFF,
  InputFieldFF,
  composeValidators,
  hasValue,
  integer,
  createMinNumber,
  Button,
} from "@dhis2/ui";


export function CommoditySelect(props) {
    const commodity = props.commodity;
    const commodities = props.commodities;
    const setCommodity = props.setCommodity;

    const sendRequest = () => {
        if (Array.isArray(commodities[0])) {
            console.log(commodities);
            return (
                <label>
                Select commodity:
                <SingleSelect
                    onChange={(selected) => handleChange(selected)}
                    selected={commodity}
                    placeholder="Select required commodity"
                >
                {commodities[0].map((item) => {
                const name = item.DataElementName;
                    return (
                    <SingleSelectOption
                        key={crypto.randomUUID()}
                        label={name}
                        value={item.DataElement}
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

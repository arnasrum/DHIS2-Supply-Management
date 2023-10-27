import React from "react";
import { useDataQuery } from "@dhis2/app-runtime";
import { CircularLoader,
    ReactFinalForm,
    SingleSelect,
    SingleSelectOption,
    SingleSelectFieldFF,
    InputFieldFF,
    composeValidators,
    hasValue,
    integer,
    createMinNumber,
    Button 
} from '@dhis2/ui';

const request = {
    commodityFieldRequest: {
        resource: `/dataSets/ULowA8V3ucd`,
        params: {
            fields: "displayName,dataSetElements[dataElement[id,displayName,*]]"
        }
    },
}


export function CommoditySelect(props) {

    const commodity = props.commodity;
    const setCommodity = props.setCommodity;


    const sendRequest = () => {
        const { loading, error, data } = useDataQuery(request)
        if (error) {
            return <span>ERROR: {error.message}</span>
        }

        if (loading) {
            return <span>Loading...</span>
        }

        if (data) {
            return(
                <SingleSelect onChange={(selected) => handleChange(selected)} selected={commodity}>
                    {data.commodityFieldRequest.dataSetElements.map((item) => {
                        const name = item.dataElement.displayName.split(" - ")[1];
                        return <SingleSelectOption 
                            key={crypto.randomUUID()} 
                            label={name} 
                            value={item.dataElement.id}/>
                    })}
                </SingleSelect>
            );
        }
    }
    function handleChange(item) {
        console.log(item);
        setCommodity(item.selected);
    }

    return(
        <>
            {sendRequest()}
        </>
    );

}
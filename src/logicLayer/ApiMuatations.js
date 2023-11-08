import React from "react";
import { useDataMutation } from "@dhis2/app-runtime"; 
import { dataMutationQuery } from "./apiConstants";

const changeCommodityCountMutator = () => {
    /*
    use data mutation hook
    returns the mutator and its query confimation (data)

    the returned value is intended to be passed directly as mutator to the changeCommodityCount function

    returns:
        list:
            mutate: a callable function which mutates the post querry
            data: query confimation
    */
    const [mutate, { loading, error, data }] = useDataMutation(dataMutationQuery);
    return [mutate, data]
}

const changeCommodityCount = (mutator, 
    value, 
    dataElement, 
    refetch = null, 
    period = null, 
    orgUnit = "xQIU41mR69s", 
    categoryOptionCombo = "HllvX50cXC0") => {
    /*
    uses a mutator to do a post query
    
    args:
        mutator: the muatator data combo from the corresponding function
        value: the value to be changed
        dataElement: the id of the commodity to be changed
        refetch (default: null): a refetch function which gets called after the post
        period (default: null): a perdiod, current period will be used if not provided
        orgUnit (default: "xQIU41mR69s"): org unit posting
        categoryOptionCombo (default "HllvX50cXC0"): category option combo, the default id is for "default" catoegory option
    */
    // get current period if not provided
    if (!period) {
        const date = new Date().toISOString().split("-");
        period = date[0] + date[1]
    }
    // do muattion
    mutator[0]({
            dataElement: dataElement,
            period: period,
            orgUnit: orgUnit,
            value: value,
            categoryOptionCombo: categoryOptionCombo
    });
    // reftech after post if provided
    if (mutator[1] && !(refetch === null)) {
        console.log("hm")
        refetch()
    }
}

// TODO:
//
// mutate multiple
// datastore post
// allow for value fetch in hook

export { changeCommodityCountMutator, changeCommodityCount }
import React from "react";
import { useDataQuery, useDataMutation } from "@dhis2/app-runtime"; 
import { CircularLoader } from "@dhis2/ui";
import { requestCommodities, dataMutationQuery, requestCommodityValues } from "./apiConstants";

const getCommoditiesNames = () => {
    /*
    gets the names and id of commodities
    */
    const { loading, error, data } = useDataQuery(requestCommodities);
    // on error fetching commodities
    if (error) {return <span>ERROR: {error.message}</span>}
    // when loding fetching commodities
    if (loading) {return <CircularLoader />}
    // when data is pressent fetching commodities
    if (data) {
        // ekstract elems and remove prefix of name
        const elems = [];
        data.commodities.dataSetElements.map((elem) => {
            const names = elem.dataElement.displayName.split("- ")[1];
            elems.push({ "name": names, "id": elem.dataElement.id });
        });
        // sort alphabetically
        elems.sort(function(a, b){
            if (a.name > b.name) {return 1}
            if (a.name < b.name) {return -1}
            return 0
        })
        return elems
    }
}

const getCommoditiesValues = (period=null, orgUnit="xQIU41mR69s") => {
    /*
    gets the values and id of commodities
    */
    if (!period) {
        const date = new Date().toISOString().split("-");
        period = date[0] + date[1]
    }
    const { loading, error, data } = useDataQuery(requestCommodityValues, {variables : {period: period, orgUnit: orgUnit}});
    if (error) {return <span>ERROR: {error.message}</span>}
    // when loding fetching commodities
    if (loading) {return <CircularLoader />}
    // when data is pressent fetching commodities
    if (data) {
        const cals = {}
        let prev = null
        data.comVals.dataValues.forEach((elem) => {
            if (!cals.hasOwnProperty(elem.dataElement)) {
                cals[elem.dataElement] = elem.value
            }
        })
        return cals
    }
}

const getCommoditiesValuesNames = (period=null, orgUnit="xQIU41mR69s") => {
    /*
    gets the names, values and id of commodities
    */
    const coms = getCommodities()
    const vals = getCommoditiesValues()
    console.log("test")
    if (!(coms instanceof Array)){
        return coms
    }
    if (!(vals.constructor instanceof Object)){
        return vals
    }
    return coms.map((elem) => {
        console.log("s")
        return { "name": elem["name"], "id": elem["id"], "value": vals[elem["id"]]}
    })
}

const changeCommodityCountMutator = () => {
    /*
    use data mutation hook
    returns the mutator
    */
    const [mutate, { loadingM, errorM }] = useDataMutation(dataMutationQuery);
    return mutate
}

const changeCommodityCount = (mutator, value, dataElement, period = null, orgUnit = "xQIU41mR69s") => {
    /*
    uses a mutator to do a post query
    */
    if (!period) {
        const date = new Date().toISOString().split("-");
        period = date[0] + date[1]
    }
    mutator({
        value: value,
        dataElement: dataElement,
        period: period,
        orgUnit: orgUnit,
    });
}

export { changeCommodityCount, getCommoditiesNames, changeCommodityCountMutator, getCommoditiesValues, getCommoditiesValuesNames }
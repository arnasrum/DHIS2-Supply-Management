import React from "react";
import { useDataQuery, useDataMutation } from "@dhis2/app-runtime"; 
import { CircularLoader } from "@dhis2/ui";
import { requestCommodities, dataMutationQuery, requestCommodityValues, requestCategoryOptionCombos } from "./apiConstants";

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
        // ekstract elems and remove prefix of name and sort
        return data.commodities.dataSetElements.map((elem) => {
            const names = elem.dataElement.displayName.split("- ")[1];
            return { "displayName": names, "id": elem.dataElement.id }
        }).sort(function(a, b){
            if (a.displayName > b.displayName) {return 1}
            if (a.displayName < b.displayName) {return -1}
            return 0
        })
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
        return data.comVals.dataValues
    }
}

const getCategoryOptionCombos = () => {
    const { loading, error, data } = useDataQuery(requestCategoryOptionCombos);
    if (error) {return <span>ERROR: {error.message}</span>}
    // when loding fetching commodities
    if (loading) {return <CircularLoader />}
    // when data is pressent fetching commodities
    if (data) {
        console.log(data.comVals.categoryOptionCombos)
        return data.comVals.categoryOptionCombos
    }
}

const getCommoditiesData = (period=null, orgUnit="xQIU41mR69s") => {
    /*
    gets the names, id, values, catOptCom, catOptComName of commodities
    */
    const coms = getCommoditiesNames()
    const vals = getCommoditiesValues()
    const catOpt = getCategoryOptionCombos()
    console.log("test")
    if (!(coms instanceof Array)){
        return coms
    }
    if (!(catOpt instanceof Array)){
        return catOpt
    }
    if (!(vals instanceof Array)){
        return vals
    }
    return vals.map((elem) => {
        return { 
            "DataElementName": coms.filter((x) => {return x.id === elem.dataElement})[0].displayName, 
            "DataElement": elem.dataElement, 
            "value": elem.value, 
            "categoryOptionCombos": elem.categoryOptionCombo,
            "categoryOptionCombosName": catOpt.filter((x) => {return x.id === elem.categoryOptionCombo})[0].displayName
        }
    }).sort(function(a, b){
        if (a.DataElementName > b.DataElementName) {return 1}
        if (a.DataElementName < b.DataElementName) {return -1}
        return 0
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

export { changeCommodityCount, getCommoditiesNames, changeCommodityCountMutator, getCommoditiesValues, getCategoryOptionCombos, getCommoditiesData }
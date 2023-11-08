import React from "react";
import { useDataQuery } from "@dhis2/app-runtime"; 
import { CircularLoader } from "@dhis2/ui";
import { requestCommodities, 
    requestCommodityValues,  
    requestUser, 
    requestOrgUnits } from "./apiConstants";
import { getCurPeriod } from "./Helpers";

const getCommoditiesNames = () => {
    /**
     * fetches the names and id of commodities
     *
     * each element is a map with these values:
     *     displayName: the name of the commodity
     *     id: the id of the commodity

     * returns:
     *     data/loading/error: one of three options:
     *         loading: a circular loader
     *         error: an error message
     *         data: the result of the fetch represented as an array of maps
    */
    const { loading, error, data } = useDataQuery(requestCommodities);
    // set the result
    if (error) {return <span>ERROR: {error.message}</span>}
    if (loading) {return <CircularLoader />}
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

const getCommoditiesValues = (period=getCurPeriod(), orgUnit="xQIU41mR69s") => {
    /**
     * fetches the values of the commodities with it's coresponding id
     *
     * each element is a map with these values:
     *     attributeOptionCombo: the comodities attribute option
     *     categoryOptionCombo: the comodities category option
     *     comment: a comment left on last post
     *     created: when the dataelement was created
     *     dataElement: the id of the commodity
     *     followup: a boolean value representing if a followup is intended
     *     lastUpdated: last time the commodities value was uppdated
     *     orgUnit: the organisations id
     *     period: the period
     *     storedBy: who stored the commodity
     *     value: the value of the commodity
     *
     * args:
     *     period (default: null): the period in which to fetch the values
     *     orgUnit (default: "xQIU41mR69s"): the org unit in which to fetch he values for
     *
     * returns:
     *     list:
     *         data/loading/error: one of three options:
     *             loading: a circular loader
     *             error: an error message
     *             data: the result of the fetch represented as an array of maps
     *         refetch: a function to refetch
    */
    const { loading, error, data, refetch } = useDataQuery(requestCommodityValues, {variables : {period: period, orgUnit: orgUnit}});
    // set the result
    if (error) {return [<span>ERROR: {error.message}</span>, refetch]}
    if (loading) {return [<CircularLoader />, refetch]}
    if (data) {return [data.comVals.dataValues, refetch]}
}

const getCommoditiesData = (period=getCurPeriod(), orgUnit="xQIU41mR69s") => {
    /**
     * fetch the commodities with displayname for them and their category option combo
     *
     * each element is a map with these values:
     *     DataElementName: the name of the commodity
     *     DataElement: the id of the commodity
     *     value: the value of the commodity
     *     categoryOptionCombos: the category option combo id of the commodity
     *     categoryOptionCombosName: the category option combo display name of the commodity
     *
     * args:
     *     period (default: current period): the period in which to fetch the values
     *     orgUnit (default: "xQIU41mR69s"): the org unit in which to fetch he values for
     *
     * returns:
     *     list:
     *         data/loading/error: one of three options:
     *             loading: a circular loader
     *             error: an error message
     *             data: the result of the fetch represented as an array of maps
     *         refetch: a function to refetch
    */
    // get all values from functions fething them
    const coms = getCommoditiesNames()
    const [vals, refetch] = getCommoditiesValues(period, orgUnit)
    const catOpt = [{
        "id" : "J2Qf1jtZuj8",
        "displayName" : "Consumption"
    }, {
        "id" : "KPP63zJPkOu",
        "displayName" : "Quantity to be ordered"
    }, {
        "id" : "rQLFnNXXIL0",
        "displayName" : "End Balance"
    }]

    // make the value to be returned the data of one of them if anny are loading or there is an error
    if (!(coms instanceof Array)){ return [coms, refetch] }
    else if (!(vals instanceof Array)){ return [vals, refetch]}
    // if all data is pressent map them together to a useful format
    // then sort it twice, first on name then on category combo
    else {
        return [vals.filter((elem) => {
            return !(elem.categoryOptionCombo === "HllvX50cXC0")
        }).map((elem) => {
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
        }).sort(function(a, b){
            if (a.categoryOptionCombos > b.categoryOptionCombos) {return 1}
            if (a.categoryOptionCombos < b.categoryOptionCombos) {return -1}
            return 0
        }), refetch]
    }
}

const fetchOrgUnit = () => {
    /**
     * fetch other organisations in same subarea
     *
     * each element is a map with these values:
     *     id: the id of the organisation
     *     name: the mane of the organisation
     *
     * returns:
     *     loading/error/data: one of three options:
     *         loading: a circular loader
     *         error: an error message
     *         data: the result of the fetch represented as an array of maps
    */
    const { loading, error, data } = useDataQuery(requestOrgUnits );
    // set the result 
    if (error) { return <span>ERROR: {error.message}</span> }
    if (loading) { return <CircularLoader /> }
    if (data) { return data.orgRequest.children }
}

const fetchUser = () => {
    /**
     * fetch the users id and name
     *
     * one element is a map with these values:
     *   id: the id of the user
     *   name: the name of the user
     *
     * returns:
     *     data/loading/error: one of three options:
     *         loading: a circular loader
     *         error: an error message
     *         data: the result of the fetch represented as an array of maps
    */
    const { loading, error, data } = useDataQuery(requestUser);
    // set the result 
    if (error) { return <span>ERROR: {error.message}</span> }
    if (loading) { return <CircularLoader /> }
    if (data) { return data }
}

export { 
    getCommoditiesData, 
    fetchOrgUnit, 
    fetchUser,
    getCommoditiesValues,
    getCommoditiesNames 
}
import React from "react";
import { useDataQuery, useDataMutation } from "@dhis2/app-runtime"; 
import { CircularLoader } from "@dhis2/ui";
import { requestCommodities, dataMutationQuery, requestCommodityValues, requestCategoryOptionCombos, requestUser, requestOrgUnits } from "./apiConstants";

const getCommoditiesNames = () => {
    /*
    fetches the names and id of commodities

    each element is a map with these values:
        displayName: the name of the commodity
        id: the id of the commodity

    returns:
        list:
            ret: one of three options:
                loading: a circular loader
                error: an error message
                data: the result of the fetch represented as an array of maps
            refetch: a callable function that refetches the data
    */
    const { loading, error, data, refetch } = useDataQuery(requestCommodities);
    let ret
    // set the result
    if (error) {ret = <span>ERROR: {error.message}</span>}
    if (loading) {ret = <CircularLoader />}
    if (data) {
        // ekstract elems and remove prefix of name and sort
        ret =  data.commodities.dataSetElements.map((elem) => {
            const names = elem.dataElement.displayName.split("- ")[1];
            return { "displayName": names, "id": elem.dataElement.id }
        }).sort(function(a, b){
            if (a.displayName > b.displayName) {return 1}
            if (a.displayName < b.displayName) {return -1}
            return 0
        })
    }
    return [ret, refetch]
}

const getCommoditiesValues = (period=null, orgUnit="xQIU41mR69s") => {
    /*
    fetches the values of the commodities with it's coresponding id

    each element is a map with these values:
        attributeOptionCombo: the comodities attribute option
        categoryOptionCombo: the comodities category option
        comment: a comment left on last post
        created: when the dataelement was created
        dataElement: the id of the commodity
        followup: a boolean value representing if a followup is intended
        lastUpdated: last time the commodities value was uppdated
        orgUnit: the organisations id
        period: the period
        storedBy: who stored the commodity
        value: the value of the commodity

    args:
        period (default: null): the period in which to fetch the values
        orgUnit (default: "xQIU41mR69s"): the org unit in which to fetch he values for

    returns:
        list:
            ret: one of three options:
                loading: a circular loader
                error: an error message
                data: the result of the fetch represented as an array of maps
            refetch: a callable function that refetches the data
    */
    // get current period if none were provided
    if (!period) {
        const date = new Date().toISOString().split("-");
        period = date[0] + date[1]
    }
    const { loading, error, data, refetch } = useDataQuery(requestCommodityValues, {variables : {period: period, orgUnit: orgUnit}});
    let ret
    // set the result
    if (error) {ret = <span>ERROR: {error.message}</span>}
    if (loading) {ret = <CircularLoader />}
    if (data) {ret = data.comVals.dataValues}
    return [ret, refetch]
}

const getCategoryOptionCombos = () => {
    /*
    fetch all the different category options combos with their display name

    each element is a map with these values:
        id: the id of the category option combo
        displayName: the display name category option combo

    returns:
        list:
            ret: one of three options:
                loading: a circular loader
                error: an error message
                data: the result of the fetch represented as an array of maps
            refetch: a callable function that refetches the data
    */
    const { loading, error, data, refetch } = useDataQuery(requestCategoryOptionCombos);
    let ret
    // set the result 
    if (error) {ret = <span>ERROR: {error.message}</span>}
    if (loading) {ret = <CircularLoader />}
    if (data) {ret = data.comVals.categoryOptionCombos}
    return [ret, refetch]
}

const getCommoditiesData = (period=null, orgUnit="xQIU41mR69s") => {
    /*
    fetch the commodities with displayname for them and their category option combo

    each element is a map with these values:
        DataElementName: the name of the commodity
        DataElement: the id of the commodity
        value: the value of the commodity
        categoryOptionCombos: the category option combo id of the commodity
        categoryOptionCombosName:the category option combo display name of the commodity

    args:
        period (default: null): the period in which to fetch the values
        orgUnit (default: "xQIU41mR69s"): the org unit in which to fetch he values for

    returns:
        list:
            ret: one of three options:
                loading: a circular loader
                error: an error message
                data: the result of the fetch represented as an array of maps
            refetch: a callable function that refetches the data
    */
    // get all values from functions fething them
    const coms = getCommoditiesNames()
    const vals = getCommoditiesValues(period, orgUnit)
    const catOpt = getCategoryOptionCombos()
    // function to refetch all the values
    const refetch = () => {
        coms[1]()
        vals[1]()
        catOpt[1]()
    }
    // make the value to be returned the data of one of them if anny are loading or there is an error
    let ret
    if (!(coms[0] instanceof Array)){
        ret = coms[0]
    }
    else if (!(catOpt[0] instanceof Array)){
        ret = catOpt[0]
    }
    else if (!(vals[0] instanceof Array)){
        ret = vals[0]
    }
    // if all data is pressent map them together to a useful format
    // then sort it twice, first on name then on category combo
    else {
        ret = vals[0].map((elem) => {
            return { 
                "DataElementName": coms[0].filter((x) => {return x.id === elem.dataElement})[0].displayName, 
                "DataElement": elem.dataElement, 
                "value": elem.value, 
                "categoryOptionCombos": elem.categoryOptionCombo,
                "categoryOptionCombosName": catOpt[0].filter((x) => {return x.id === elem.categoryOptionCombo})[0].displayName
            }
        }).sort(function(a, b){
            if (a.DataElementName > b.DataElementName) {return 1}
            if (a.DataElementName < b.DataElementName) {return -1}
            return 0
        }).sort(function(a, b){
            if (a.categoryOptionCombos > b.categoryOptionCombos) {return 1}
            if (a.categoryOptionCombos < b.categoryOptionCombos) {return -1}
            return 0
        })
    }
    return [ret, refetch]
}


const fetchOrgUnit = () => {
    /*
    fetch other organisations id

    each element is a map with these values:
        id: the id of the organisation

    returns:
        list:
            ret: one of three options:
                loading: a circular loader
                error: an error message
                data: the result of the fetch represented as an array of maps
            refetch: a callable function that refetches the data
    */
    const { loading, error, data, refetch } = useDataQuery(requestOrgUnits);
    let ret
    // set the result 
    if (error) {ret = <span>ERROR: {error.message}</span>}
    if (loading) {ret = <CircularLoader />}
    if (data) {
        ret = data.orgRequest.children}
    return [ret, refetch]
}

const fetchUser = () => {
    /*
    fetch the users id and name

    one element is a map with these values:
        id: the id of the user
        name: the name of the user

    returns:
        list:
            ret: one of three options:
                loading: a circular loader
                error: an error message
                data: the result of the fetch represented as an array of maps
            refetch: a callable function that refetches the data
    */
    const { loading, error, data, refetch } = useDataQuery(requestUser);
    let ret
    // set the result 
    if (error) {ret = <span>ERROR: {error.message}</span>}
    if (loading) {ret = <CircularLoader />}
    if (data) {ret = data}
    return [ret, refetch]
}

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

const changeCommodityCount = (mutator, value, dataElement, refetch = null, period = null, orgUnit = "xQIU41mR69s", categoryOptionCombo = "HllvX50cXC0") => {
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
        value: value,
        dataElement: dataElement,
        period: period,
        orgUnit: orgUnit,
        categoryOptionCombo: categoryOptionCombo,
    });
    // reftech after post if provided
    if (mutator[1] && !(refetch === null)) {
        refetch()
    }
}

// export functions so they ar accesible elsewere 
export { changeCommodityCount, changeCommodityCountMutator, getCommoditiesData, fetchOrgUnit, fetchUser}
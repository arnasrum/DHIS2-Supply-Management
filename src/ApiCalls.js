import React from "react";
import { useDataQuery, useDataMutation } from "@dhis2/app-runtime";
import { CircularLoader } from "@dhis2/ui";
import { dataMutationQuery, requestComValues, requestCommodities } from "./apiConstants";

const getCommodities = () => {
    const { loading, error, data } = useDataQuery(requestCommodities);
    // on error fetching commodities
    if (error) {
        return <span>ERROR: {error.message}</span>;
    }
    // when loding fetching commodities
    if (loading) {
        return <CircularLoader />;
    }
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

export default getCommodities
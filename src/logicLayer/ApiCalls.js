import React from "react";
import { useDataQuery } from "@dhis2/app-runtime";
import { CircularLoader } from "@dhis2/ui";
import {
    requestCommodities,
    requestCommodityValues,
    requestUser,
    requestOrgUnits,
} from "./apiConstants";
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
    if (error) {
        return <span>ERROR: {error.message}</span>;
    }
    if (loading) {
        return <CircularLoader />;
    }
    if (data) {
        // ekstract elems and remove prefix of name and sort
        return data.commodities.dataSetElements
            .map((elem) => {
                const names = elem.dataElement.displayName.split("- ")[1];
                return { displayName: names, id: elem.dataElement.id };
            })
            .sort(function (a, b) {
                if (a.displayName > b.displayName) {
                    return 1;
                }
                if (a.displayName < b.displayName) {
                    return -1;
                }
                return 0;
            });
    }
};

const getCommoditiesValues = (
  period = getCurPeriod(),
  orgUnit = "xQIU41mR69s"
) => {
    /*
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
    const { loading, error, data, refetch } = useDataQuery(
        requestCommodityValues,
        { variables: { period: period, orgUnit: orgUnit } }
    );
    // set the result
    if (error) {
        return [<span>ERROR: {error.message}</span>, refetch];
    }
    if (loading) {
        return [<CircularLoader />, refetch];
    }
    if (data) {
        return [data.comcommodityValues.dataValues, refetch];
    }
};

const getCommoditiesData = (
  period = getCurPeriod(),
  orgUnit = "xQIU41mR69s"
) => {
  /**
   * fetch the commodities with displayname for them and their category option combo
   *
   * each element is a map with these values:
   *     DataElementName: the name of the commodity
   *     DataElement: the id of the commodity
   *     Consumption: the value of the consumption
   *     QuantityToBeOrdered: the value of the quantity to be ordered
   *     EndBalance: the value of the end balance
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
  const commodities = getCommoditiesNames();
  const [commodityValues, refetch] = getCommoditiesValues(period, orgUnit);

  // make the value to be returned the data of one of them if anny are loading or there is an error
  if (!(commodities instanceof Array)) {
    return [commodities, refetch];
  } else if (!(commodityValues instanceof Array)) {
    return [commodityValues, refetch];
  }
  // if all data is pressent map them together to a useful format
  // then sort it twice, first on name then on category combo
  else {
    return [
        commodities
            .map((elem) => {
            return {
                DataElementName: elem.displayName,
                DataElement: elem.id,
                Consumption: commodityValues.filter((x) => {
                return (
                    x.categoryOptionCombo === "J2Qf1jtZuj8" &&
                    x.dataElement === elem.id
                );
                })[0].value,
                QuantityToBeOrdered: commodityValues.filter((x) => {
                return (
                    x.categoryOptionCombo === "KPP63zJPkOu" &&
                    x.dataElement === elem.id
                );
                })[0].value,
                EndBalance: commodityValues.filter((x) => {
                return (
                    x.categoryOptionCombo === "rQLFnNXXIL0" &&
                    x.dataElement === elem.id
                );
                })[0].value,
            };
            })
            .sort(function (a, b) {
            if (a.DataElementName > b.DataElementName) {
                return 1;
            }
            if (a.DataElementName < b.DataElementName) {
                return -1;
            }
            return 0;
            }),
        refetch,
        ];
    }
};

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
    const { loading, error, data } = useDataQuery(requestOrgUnits);
    // set the result
    if (error) {
        return <span>ERROR: {error.message}</span>;
    }
    if (loading) {
        return <CircularLoader />;
    }
    if (data) {
        return data.orgRequest.children;
    }
};

const fetchUser = () => {
    /*
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
    if (error) {
        return <span>ERROR: {error.message}</span>;
    }
    if (loading) {
        return <CircularLoader />;
    }
    if (data) {
        return data;
    }
};

    // Helper function to fetch current commodity value
    async function getCommodityValueFromAPI(commodityId) {
        const period = getCurPeriod();
        const query = `http://localhost:9999/api/dataValues.json?de=${commodityId}&pe=${period}&ou=xQIU41mR69s&co=rQLFnNXXIL0`;
        try {
            const response = await fetch(query);
            const result = await response.json();
            // Save value as int
            const value = parseInt(result[0]);
            return value;
        } catch (err) {
            console.error(err);
        }
    }

    export {
        getCommoditiesData,
        fetchOrgUnit,
        fetchUser,
        getCommoditiesValues,
        getCommoditiesNames,
        getCommodityValueFromAPI,
};

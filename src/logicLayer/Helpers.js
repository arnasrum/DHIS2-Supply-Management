import { changeCommodityCountMultiple } from "./ApiMuatations";

const consumeCommodityCount = (
    mutator, 
    addValue, 
    prevValue,
    prevConsumtion,
    dataElement, 
    period = getCurPeriod(), 
    orgUnit = "xQIU41mR69s",
    refetch = null,
    error = null
    ) => {
    /**
     * for when a commodity gets dispensed
     * 
     * add the removed amount to consumed and subract from end balance
     * 
     * args:
     *     mutator: the muatator data combo from the corresponding function
     *     addValue: the value to be consumed
     *     prevValue: the total end balance prior to consumption
     *     prevConsumption: the total previusely consumed
     *     dataElement: the id of the commodity to be consumed
     *     period (default: curentPeriod): a period
     *     orgUnit (default: "xQIU41mR69s"): org unit id'
     *     refetch (default: null): a function used to reftch, no refetching is done if not provided
     *     error (default: null): an error from the mutation which only is pressent on error when posting, error is not handeled if not provided
     * 
     * returns:
     *     promis: it is null if all is well, else is it a jsx alert giving an error
     */
    return changeCommodityCountMultiple(mutator, [
        makeDatavalueMap(parseInt(prevConsumtion) + parseInt(addValue), dataElement, period, "J2Qf1jtZuj8", orgUnit),
        makeDatavalueMap(parseInt(prevValue) - parseInt(addValue), dataElement, period, "rQLFnNXXIL0", orgUnit)
    ],
    refetch, error)
}

const getCurPeriod = () => {
    /**
     * gets the current period
     * 
     * returns:
     *     preiod: the period we are curently in, formed: yyyymm
     */
    const date = new Date().toISOString().split("-");
    return date[0] + date[1]
}

const makeDatavalueMap = (value, dataElement, period=getCurPeriod(), categoryOptionCombo, orgUnit="xQIU41mR69s") => {
    /**
     * maps a set of values to a map usable for posting datavlaues of commodities
     * 
     * args:
     *     value: the value to be changed
     *     dataElement: the id of the commodity to be consumed
     *     period (default: curentPeriod): a period
     *     categoryOptionCombo: category option combo
     *     orgUnit (default: "xQIU41mR69s"): org unit id
     * returns:
     *     map:
     *         dataElement: dataElement
     *         period: period
     *         orgUnit: orgUnit
     *         value: value
     *         categoryOptionCombo: categoryOptionCombo
     */
    return {
        dataElement: dataElement,
        period: period,
        orgUnit: orgUnit,
        value: value,
        categoryOptionCombo: categoryOptionCombo
      }
}

export {
    consumeCommodityCount,
    getCurPeriod,
    makeDatavalueMap
}
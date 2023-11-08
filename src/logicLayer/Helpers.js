import React from "react";
import { changeCommodityCount, changeCommodityCountMultiple } from "./ApiMuatations";

const consumeCommodityCount = (mutator, 
    addValue, 
    prevValue,
    prevConsumtion,
    dataElement, 
    refetch = null, 
    period = null, 
    orgUnit = "xQIU41mR69s") => {
        if (!period) {
            period = getCurPeriod()
        }
        changeCommodityCount(mutator, prevConsumtion + addValue, dataElement, () => {
            changeCommodityCount(mutator, prevValue - addValue, dataElement, refetch, period, orgUnit, "rQLFnNXXIL0")
        }, period, orgUnit, "J2Qf1jtZuj8")
}

const getCurPeriod = () => {
    const date = new Date().toISOString().split("-");
    return date[0] + date[1]
}

const makeDatavalueMap = (value, dataElement, period, orgUnit, categoryOptionCombo) => {
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
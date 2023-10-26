import React, { useState } from "react";
import { useDataQuery } from "@dhis2/app-runtime";
import { CircularLoader, Menu, MenuItem, SingleSelectField, SingleSelectOption } from "@dhis2/ui";
import { Table, TableBody, TableCell, TableCellHead, TableHead, TableRow, TableRowHead } from "@dhis2/ui";
const requestCommodities = {
  request0: {
    resource: "/dataSets/ULowA8V3ucd",
    params: {
      fields: "displayName,dataSetElements[dataElement[id,displayName]]"
    }
  }
};
const requestValues = {
  request0: {
    resource: "/dataValueSets",
    params: {
      orgUnit: "xQIU41mR69s",
      period: "202310",
      dataSet: "ULowA8V3ucd"
    }
  }
};
export function CommodityTable(props) {
  const {
    loading: loadingVal,
    error: errorVal,
    data: dataVal
  } = useDataQuery(requestValues);
  const {
    loading: loadingCom,
    error: errorCom,
    data: dataCom
  } = useDataQuery(requestCommodities);
  const values = new Map();
  if (dataVal) dataVal.request0.dataValues.forEach(el => {
    // Fetch the first element as it is the newest in the list
    if (!values.has(el.dataElement)) values.set(el.dataElement, parseInt(el.value));
  });
  if (loadingCom || loadingVal) {
    return /*#__PURE__*/React.createElement(CircularLoader, null);
  }
  function CommodityRows() {
    if (dataCom) {
      return dataCom.request0.dataSetElements.map(el => {
        const tokens = el.dataElement.displayName.split(" ").slice(2);
        return /*#__PURE__*/React.createElement(TableRow, null, /*#__PURE__*/React.createElement(TableCell, null, tokens.join(" ")), /*#__PURE__*/React.createElement(TableCell, null, values.get(el.dataElement.id)));
      });
    }
  }
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("h1", null, "Commodity Table"), /*#__PURE__*/React.createElement(SingleSelectField, {
    label: "Choose category"
  }, /*#__PURE__*/React.createElement(SingleSelectOption, {
    label: "Live-Saving commodities",
    value: "1"
  })), /*#__PURE__*/React.createElement(Table, null, /*#__PURE__*/React.createElement(TableHead, null, /*#__PURE__*/React.createElement(TableRowHead, null, /*#__PURE__*/React.createElement(TableCellHead, null, "Commodity"), /*#__PURE__*/React.createElement(TableCellHead, null, "Stock balance"))), /*#__PURE__*/React.createElement(TableBody, null, /*#__PURE__*/React.createElement(CommodityRows, null))));
}
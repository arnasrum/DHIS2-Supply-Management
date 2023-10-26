import React, { useState, useEffect } from "react";
import { useDataQuery } from "@dhis2/app-runtime";
import { ReactFinalForm, InputFieldFF, Button, CircularLoader, composeValidators, hasValue, number } from "@dhis2/ui";
import { Table, TableBody, TableCell, TableCellHead, TableHead, TableRow, TableRowHead } from "@dhis2/ui";
const request = {
  commodities: {
    resource: "/dataSets/ULowA8V3ucd",
    params: {
      fields: "displayName,dataSetElements[dataElement[id,displayName]]"
    }
  }
};
export function StoreManagment() {
  // Execute the data query
  const {
    loading,
    error,
    data
  } = useDataQuery(request);
  console.log("data", data);
  function onSubmit() {
    console.log("query");
  }
  if (error) {
    console.error("Error fetching data from the new API:", error.message);
  }
  if (loading) {
    return /*#__PURE__*/React.createElement(CircularLoader, null);
  }
  if (data) {
    const rows = data.commodities.dataSetElements.map(dataset => ({
      id: dataset.dataElement.id,
      displayName: dataset.dataElement.displayName.replace("Commodities - ", "")
    })).sort((a, b) => a.displayName.localeCompare(b.displayName)).map(dataset => /*#__PURE__*/React.createElement(TableRow, {
      key: dataset.id
    }, /*#__PURE__*/React.createElement(TableCell, null, dataset.id), /*#__PURE__*/React.createElement(TableCell, null, dataset.displayName), /*#__PURE__*/React.createElement(TableCell, null, /*#__PURE__*/React.createElement(ReactFinalForm.Form, {
      onSubmit: onSubmit
    }, _ref => {
      let {
        handleSubmit
      } = _ref;
      return /*#__PURE__*/React.createElement("form", {
        onSubmit: handleSubmit,
        autoComplete: "off"
      }, /*#__PURE__*/React.createElement(ReactFinalForm.Field, {
        name: "value",
        component: InputFieldFF,
        validate: composeValidators(hasValue, number)
      }));
    }))));
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("h1", null, "Request Commodity"), /*#__PURE__*/React.createElement(Table, null, /*#__PURE__*/React.createElement(TableHead, null, /*#__PURE__*/React.createElement(TableRowHead, null, /*#__PURE__*/React.createElement(TableCellHead, null, "ID"), /*#__PURE__*/React.createElement(TableCellHead, null, "Display Name"), /*#__PURE__*/React.createElement(TableCellHead, null, "Amount"))), /*#__PURE__*/React.createElement(TableBody, null, rows)));
  }
}
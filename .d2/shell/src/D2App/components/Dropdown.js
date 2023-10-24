import React, { useState } from "react";
import { useDataQuery } from "@dhis2/app-runtime";
import { ReactFinalForm, InputFieldFF, Button, SingleSelectFieldFF, hasValue, number, composeValidators } from "@dhis2/ui";
export function DropDown(props) {
  const {
    onChange
  } = props;
  const data = props.data;
  // console.log("data", data);
  const datasetOptions = data.dataSetElements.map(item => ({
    // Modify displayname to remove "Commodities - "
    label: item.dataElement.displayName.replace("Commodities - ", ""),
    value: item.dataElement.id
  }));

  //Sort the options alphabetically
  datasetOptions.sort((a, b) => a.label.localeCompare(b.label));
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(ReactFinalForm.Field, {
    component: SingleSelectFieldFF,
    name: "dataElement",
    label: "Select category",
    options: datasetOptions
  }));
}
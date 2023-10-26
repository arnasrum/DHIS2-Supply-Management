import React from "react";
import { useDataQuery } from '@dhis2/app-runtime';
import { CircularLoader, ReactFinalForm, SingleSelectFieldFF, InputFieldFF, composeValidators, hasValue, integer, createMinNumber, Button } from '@dhis2/ui';
import { useDataMutation } from "@dhis2/app-runtime";

// muatation querry
const dataMutationQuery = {
  resource: 'dataValueSets',
  type: 'create',
  dataSet: 'ULowA8V3ucd',
  data: _ref => {
    let {
      value,
      dataElement,
      period,
      orgUnit
    } = _ref;
    return {
      dataValues: [{
        dataElement: dataElement,
        period: period,
        orgUnit: orgUnit,
        value: value
      }]
    };
  }
};

// request to get commodities
const request = {
  request0: {
    resource: "/dataSets/ULowA8V3ucd",
    params: {
      fields: "displayName,dataSetElements[dataElement[id,displayName]]"
    }
  }
};
export function UpdateCommodity(props) {
  // data muatation and data querry
  const [mutate, {
    loadingM,
    errorM
  }] = useDataMutation(dataMutationQuery);
  const {
    loading,
    error,
    data
  } = useDataQuery(request);

  // on submit
  function submit(formInput) {
    // get date, index 0 is year 1 is month
    const date = new Date().toISOString().split("-");
    // send muatation querry
    mutate({
      value: formInput.value,
      dataElement: formInput.dataElement,
      period: date[0] + date[1],
      orgUnit: 'xQIU41mR69s'
    });
  }

  // makes a list of all the options based on a dataset of commodities
  function getOptions(data) {
    const list = [];
    data.request0.dataSetElements.map(elem => {
      const names = elem.dataElement.displayName.split("- ")[1];
      list.push({
        label: names,
        value: elem.dataElement.id
      });
    });
    return list;
  }

  // on error fetching commodities
  if (error) {
    return /*#__PURE__*/React.createElement("span", null, "ERROR: ", error.message);
  }
  // when loding fetching commodities
  if (loading) {
    return /*#__PURE__*/React.createElement(CircularLoader, null);
  }
  // when data is pressent fetching commodities
  if (data) {
    // return form
    return /*#__PURE__*/React.createElement(ReactFinalForm.Form, {
      onSubmit: submit
    }, _ref2 => {
      let {
        handleSubmit
      } = _ref2;
      return /*#__PURE__*/React.createElement("form", {
        onSubmit: handleSubmit
      }, /*#__PURE__*/React.createElement(ReactFinalForm.Field, {
        name: "dataElement",
        label: data.request0.displayName,
        id: "singleSelect",
        placeholder: "Select - One",
        validate: composeValidators(hasValue),
        component: SingleSelectFieldFF,
        options: getOptions(data),
        inputWidth: "300px"
      }), /*#__PURE__*/React.createElement(ReactFinalForm.Field, {
        name: "value",
        label: "New amount",
        placeholder: "A number greater than 0",
        inputWidth: "300px",
        component: InputFieldFF,
        validate: composeValidators(hasValue, integer, createMinNumber(0))
      }), /*#__PURE__*/React.createElement(Button, {
        type: "submit"
      }, "Submit"));
    });
  }
}
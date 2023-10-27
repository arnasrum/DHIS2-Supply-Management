import React from "react";
import { useDataQuery } from "@dhis2/app-runtime";
import { ReactFinalForm, CircularLoader, Button } from "@dhis2/ui";
import { AmountField } from "./AmountField";
import { CommodityField } from "./CommodityField";
import { NameField } from "./NameField";
const request = {
  meRequest: {
    resource: "/me.json",
    params: {
      fields: "id,name,organisationUnits"
    }
  },
  commodityFieldRequest: {
    resource: `/dataSets/ULowA8V3ucd`,
    params: {
      fields: "displayName,dataSetElements[dataElement[id,displayName,*]]"
    }
  }
};
export function DispenseCommodity(props) {
  const {
    loading,
    error,
    data
  } = useDataQuery(request);
  if (error) {
    return /*#__PURE__*/React.createElement("span", null, "ERROR: ", error.message);
  }
  if (loading) {
    return /*#__PURE__*/React.createElement(CircularLoader, null);
  }
  if (data) {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("h1", null, "Dispense Commodity"), /*#__PURE__*/React.createElement(ReactFinalForm.Form, {
      onSubmit: onSubmit
    }, _ref => {
      let {
        handleSubmit
      } = _ref;
      return /*#__PURE__*/React.createElement("form", {
        onSubmit: handleSubmit
      }, /*#__PURE__*/React.createElement(CommodityField, {
        data: data.commodityFieldRequest
      }), /*#__PURE__*/React.createElement(AmountField, null), /*#__PURE__*/React.createElement(NameField, {
        name: "dispensedTo",
        label: "Dispensed To: ",
        placeholder: "Name of receiver"
      }), /*#__PURE__*/React.createElement(Button, {
        type: "submit",
        primary: true
      }, "Dispense"));
    }));
  }
  function onSubmit(formInput) {
    let query = "http://localhost:9999/api/dataValues.json?";
    query = query + "de=" + formInput.commodity.split("&")[0];
    const date = new Date();
    const datelist = date.toISOString().split("-");
    query = query + "&pe=" + datelist[0] + datelist[1];
    query = query + "&ou=xQIU41mR69s";
    query = query + "&co=J2Qf1jtZuj8";
    alert(formInput.dispensedAmount + " " + formInput.commodity.split("&")[1] + " dispensed to " + formInput.dispensedTo);
    fetch(query).then(response => response.json()).then(data => {
      const newStock = parseInt(data[0]) - formInput.dispensedAmount;
      if (newStock < 0) {
        throw new Error("Dispensed amount is higher than current stock");
      }
      fetch(query + "&value=" + newStock.toString(), {
        method: "POST"
      });
    }).then(response => {
      const postQuery = "http://localhost:9999/api/dataStore/IN5320-27/" + crypto.randomUUID();
      fetch(postQuery, {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({
          date: date.toISOString(),
          amount: formInput.dispensedAmount,
          commodityID: formInput.commodity.split("&")[0],
          dispensedBy: data.meRequest.name,
          dispensedTo: formInput.dispensedTo,
          commodityName: formInput.commodity.split("&")[1]
        })
      }).then(response => response.json()).then(response => console.log(response));
    }).catch(error => console.error(error));
  }
}
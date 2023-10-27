import React, { useState, useEffect } from "react";
import { useDataQuery } from "@dhis2/app-runtime";
import { DropDown } from "../components/Dropdown";
import { ReactFinalForm, InputFieldFF, Button, CircularLoader, composeValidators } from "@dhis2/ui";
import { Table, TableBody, TableCell, TableCellHead, TableHead, TableRow, TableRowHead } from "@dhis2/ui";
const request = {
  commodities: {
    resource: "/dataSets/ULowA8V3ucd",
    params: {
      fields: "displayName,dataSetElements[dataElement[id,displayName]]"
    }
  },
  clinics: {
    resource: "/organisationUnits?id=xQIU41mR69s",
    params: {
      fields: "displayName"
    }
  }
};
export function RequestCommodity(props) {
  const [tableVisibility, setTableVisibility] = useState(false);
  const [commodityData, setCommodityData] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null); // Store the selected option from dropdown

  const fetchData = selectedValue => {
    const query = {
      resource: `/dataValues.json?de=${selectedValue}&pe=202310&ou=xQIU41mR69s&co=J2Qf1jtZuj8`,
      params: {
        fields: "*"
      }
    };

    // Use the useDataQuery hook to fetch data
    const {
      loading,
      error,
      data
    } = useDataQuery(query);
    if (error) {
      console.error("Error fetching data:", error.message);
    }
    if (!loading && data) {
      // Check and filter the data values where value > 0
      const filteredData = data.dataValues.filter(dataValue => dataValue.value > 0);
      console.log("filteredData", filteredData);

      // Set the filtered data for display
      setCommodityData(filteredData);
    }
  };
  async function onSubmit(values) {
    let value = values.dataElement;
    let query = `http://localhost:9999//api/dataValues.json?de=${value}&pe=202310&ou=xQIU41mR69s&co=J2Qf1jtZuj8`;
    console.log("query", query);
    try {
      const response = await fetch(query);
      if (response.ok) {
        const amount = await response.json();
        console.log("Amount:", amount);
      } else {
        console.error("HTTP Error:", response.status);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  // Execute the data query
  const {
    loading,
    error,
    data
  } = useDataQuery(request);
  if (error) {
    console.error("Error fetching data from the new API:", error.message);
  }
  if (loading) {
    return /*#__PURE__*/React.createElement(CircularLoader, null);
  }
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("h1", null, "Request Commodity"), /*#__PURE__*/React.createElement("p", null, "Here you can request commodities from nearby clinics who have the requested commodity in stock."), /*#__PURE__*/React.createElement(ReactFinalForm.Form, {
    onSubmit: onSubmit
  }, _ref => {
    let {
      handleSubmit
    } = _ref;
    return /*#__PURE__*/React.createElement("form", {
      onSubmit: handleSubmit,
      autoComplete: "off"
    }, /*#__PURE__*/React.createElement(DropDown, {
      data: data.commodities
    }), /*#__PURE__*/React.createElement(Button, {
      type: "submit",
      primary: true
    }, "Request"));
  }), /*#__PURE__*/React.createElement("br", null), commodityData.length > 0 && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", null, "Fetched Data"), /*#__PURE__*/React.createElement("ul", null, commodityData.map(dataValue => /*#__PURE__*/React.createElement("li", {
    key: dataValue.id
  }, dataValue.value)))));
}
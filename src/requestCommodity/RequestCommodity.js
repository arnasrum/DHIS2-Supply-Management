import React, { useState, useEffect } from "react";
import { useDataQuery } from "@dhis2/app-runtime";
import { DropDown } from "../components/Dropdown";

import {
  ReactFinalForm,
  InputFieldFF,
  Button,
  CircularLoader,
  composeValidators,
} from "@dhis2/ui";
import {
  Table,
  TableBody,
  TableCell,
  TableCellHead,
  TableHead,
  TableRow,
  TableRowHead,
} from "@dhis2/ui";

const request = {
  commodities: {
    resource: "/dataSets/ULowA8V3ucd",
    params: {
      fields: "displayName,dataSetElements[dataElement[id,displayName]]",
    },
  },
  clinics: {
    resource: "/organisationUnits?id=xQIU41mR69s",
    params: {
      fields: "displayName",
    },
  },
};

export function RequestCommodity(props) {
  const [tableVisibility, setTableVisibility] = useState(false);
  const [commodityData, setCommodityData] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null); // Store the selected option from dropdown

  const fetchData = (selectedValue) => {
    const query = {
      resource: `/dataValues.json?de=${selectedValue}&pe=202310&ou=xQIU41mR69s&co=J2Qf1jtZuj8`,
      params: {
        fields: "*",
      },
    };

    // Use the useDataQuery hook to fetch data
    const { loading, error, data } = useDataQuery(query);

    if (error) {
      console.error("Error fetching data:", error.message);
    }

    if (!loading && data) {
      // Check and filter the data values where value > 0
      const filteredData = data.dataValues.filter(
        (dataValue) => dataValue.value > 0
      );
      console.log("filteredData", filteredData);

      // Set the filtered data for display
      setCommodityData(filteredData);
    }
  };

  function onSubmit(values) {
    let value = values.dataElement;
    let query = `http://localhost:9999//api/dataValues.json?de=${value}&pe=202310&ou=xQIU41mR69s&co=J2Qf1jtZuj8`;
    console.log("query", query);
    fetch(query)
      .then((response) => console.log("response", response.json))
      .then((data) => {
        const value = parseInt(data[0]); // Access the first (and only) element in the array
        console.log("value", value);
      })
      .catch((error) => console.error(error));
  }

  // Execute the data query
  const { loading, error, data } = useDataQuery(request);

  if (error) {
    console.error("Error fetching data from the new API:", error.message);
  }

  if (loading) {
    return <CircularLoader />;
  }

  return (
    <>
      <h1>Request Commodity</h1>
      <p>
        Here you can request commodities from nearby clinics who have the
        requested commodity in stock.
      </p>
      <ReactFinalForm.Form onSubmit={onSubmit}>
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit} autoComplete="off">
            <DropDown data={data.commodities} />
            <Button type="submit" primary>
              Request
            </Button>
          </form>
        )}
      </ReactFinalForm.Form>
      <br />
      {commodityData.length > 0 && (
        <div>
          <h2>Fetched Data</h2>
          <ul>
            {commodityData.map((dataValue) => (
              <li key={dataValue.id}>{dataValue.value}</li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

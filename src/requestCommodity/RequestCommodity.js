import React, { useState, useEffect } from "react";
import { useDataQuery } from "@dhis2/app-runtime";
import { DropDown } from "../components/Dropdown";

import {
  ReactFinalForm,
  InputFieldFF,
  Button,
  SingleSelectFieldFF,
  hasValue,
  CircularLoader,
  number,
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
  // clinics: {
  //   // resource: `/api/organisationUnits?id=${selectedOption.value}`,
  //   resource: `/api/organisationUnits?id=DiszpKrYNg8`,
  //   params: {
  //     fields: "displayName",
  //   },
  // },
};

export function RequestCommodity(props) {
  const [tableVisibility, setTableVisibility] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null); // Store the selected option from dropdown

  function onSubmit(values) {
    console.log(values);
  }

  const handleOptionChange = (selectedValue) => {
    console.log("selected", selectedValue);
    setSelectedOption(selectedValue);
  };

  const handleFormSubmit = (values) => {
    if (selectedOption) {
      console.log("Selected option:", selectedOption);
      // You can also access specific properties of the selected option, e.g., selectedOption.value
      // console.log("Selected value:", selectedOption.value);
    } else {
      console.log("No option selected");
    }
    // You can also log the form values if needed
    console.log("Form values:", values);
  };

  // useEffect(() => {

  // Execute the data query
  const { loading, error, data } = useDataQuery(request);

  if (error) {
    console.error("Error fetching data from the new API:", error.message);
  }

  if (loading) {
    return <CircularLoader />;
  }

  if (data) {
    // Handle the new data as needed
    console.log("Data from the new API:", data);

    return (
      <>
        <h1>Request Commodity</h1>
        <p>
          Here you can request commodities from nearby clincs who has the
          requested commodity in stock.
        </p>
        <ReactFinalForm.Form onSubmit={handleFormSubmit}>
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit} autoComplete="off">
              <DropDown
                data={data.commodities}
                onChange={handleOptionChange}
              ></DropDown>
            </form>
          )}
        </ReactFinalForm.Form>
        <br />
        <div>
          {/* <Table>
            <TableHead>
              <TableRowHead>
                <TableCellHead>Clinic</TableCellHead>
                <TableCellHead>Commodity</TableCellHead>
                <TableCellHead>Stock count</TableCellHead>
                <TableCellHead>Amount to request</TableCellHead>
              </TableRowHead>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell>
                  <ReactFinalForm.Form onSubmit={onSubmit}>
                    {({ handleSubmit }) => (
                      <form onSubmit={handleSubmit} autoComplete="off">
                        <ReactFinalForm.Field
                          name="value"
                          component={InputFieldFF}
                          validate={composeValidators(hasValue, number)}
                        />
                      </form>
                    )}
                  </ReactFinalForm.Form>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table> */}
          <br />
          <Button
            onClick={() => {
              if (selectedOption) {
                console.log("Selected value:", selectedOption.value);
              } else {
                console.log("No option selected");
              }
            }}
            type="submit"
            primary
          >
            Request
          </Button>
        </div>
      </>
    );
  }
}

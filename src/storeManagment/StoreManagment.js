import React, { useState, useEffect } from "react";
import { useDataQuery } from "@dhis2/app-runtime";

import {
  ReactFinalForm,
  InputFieldFF,
  Button,
  CircularLoader,
  composeValidators,
  hasValue,
  number,
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
};

export function StoreManagment() {
  // Execute the data query
  const { loading, error, data } = useDataQuery(request);
  console.log("data", data);

  function onSubmit() {
    console.log("query");
  }

  if (error) {
    console.error("Error fetching data from the new API:", error.message);
  }

  if (loading) {
    return <CircularLoader />;
  }

  if (data) {
    const rows = data.commodities.dataSetElements
      .map((dataset) => ({
        id: dataset.dataElement.id,
        displayName: dataset.dataElement.displayName.replace(
          "Commodities - ",
          ""
        ),
      }))
      .sort((a, b) => a.displayName.localeCompare(b.displayName))
      .map((dataset) => (
        <TableRow key={dataset.id}>
          <TableCell>{dataset.id}</TableCell>
          <TableCell>{dataset.displayName}</TableCell>
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
      ));

    return (
      <>
        <h1>Request Commodity</h1>
        <Table>
          <TableHead>
            <TableRowHead>
              <TableCellHead>ID</TableCellHead>
              <TableCellHead>Display Name</TableCellHead>
              <TableCellHead>Amount</TableCellHead>
            </TableRowHead>
          </TableHead>
          <TableBody>{rows}</TableBody>
        </Table>
      </>
    );
  }
}

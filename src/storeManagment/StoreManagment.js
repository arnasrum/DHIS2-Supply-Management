import React, { useState, useEffect } from "react";
import { useDataQuery, useDataMutation } from "@dhis2/app-runtime";
import {
  requestCommodities,
  requestComValues,
  dataMutationQuery,
} from "../apiConstants";

import classes from "../App.module.css";

import {
  ReactFinalForm,
  InputFieldFF,
  Button,
  CircularLoader,
  composeValidators,
  hasValue,
  number,
  createMinNumber,
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

export function StoreManagment() {
  // Get values and commodities form the API
  const {
    loading: loadingVal,
    error: errorVal,
    data: dataVal,
  } = useDataQuery(requestComValues);
  const {
    loading: loadingCom,
    error: errorCom,
    data: dataCom,
  } = useDataQuery(requestCommodities);
  //Data mutation
  const [mutate, { loadingM, errorM }] = useDataMutation(dataMutationQuery);

  // State for input values in the form
  const [inputValues, setInputValues] = useState({});

  // Function to handle input change
  function handleInputChange(dataElement, value) {
    console.log("jellu");
    setInputValues((prevInputValues) => ({
      ...prevInputValues,
      [dataElement]: value,
    }));
  }

  // Function to handle form submit
  function onSubmit() {
    console.log("inputValues", inputValues);
    alert("Commodity stock updated successfully!");
    // Send mutation query for each input value
    for (const dataElement in inputValues) {
      if (inputValues.hasOwnProperty(dataElement)) {
        const value = parseInt(inputValues[dataElement]);
        if (!isNaN(value)) {
          mutate({
            value,
            dataElement,
            period: "202310",
            orgUnit: "xQIU41mR69s",
          });
          console.log("value", value);
        }
      }
    }
  }

  if (errorVal || errorCom) {
    console.error("Error fetching data from the new API:", error.message);
  }

  // Map values to commodities
  const values = new Map();
  if (dataVal)
    dataVal.request0.dataValues.forEach((el) => {
      // Fetch the first element as it is the newest in the list
      if (!values.has(el.dataElement))
        values.set(el.dataElement, parseInt(el.value));
    });

  if (loadingCom || loadingVal) {
    return <CircularLoader />;
  }

  // If data is fetched, create a table row for each commodity
  if (dataCom) {
    const rows = dataCom.commodities.dataSetElements
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
          <TableCell>{values.get(dataset.id)}</TableCell>
          <TableCell>
            <ReactFinalForm.Form onSubmit={onSubmit}>
              {({ handleSubmit }) => (
                <form onSubmit={handleSubmit} autoComplete="off">
                  <ReactFinalForm.Field
                    name="value"
                    id={dataset.id}
                    component={InputFieldFF}
                    validate={composeValidators(
                      hasValue,
                      number,
                      createMinNumber(0)
                    )}
                    onChange={(event) =>
                      handleInputChange(dataset.id, event.target.value)
                    }
                    value={inputValues[dataset.id] || ""}
                  />
                </form>
              )}
            </ReactFinalForm.Form>
          </TableCell>
        </TableRow>
      ));

    return (
      <div className={classes.storemanagment}>
        <h1>Store Management</h1>
        <p>
          Update stock count balance when receiving the monthly delivery, enter
          the amount you received.
        </p>
        <Table className={classes.table}>
          <TableHead>
            <TableRowHead>
              <TableCellHead>ID</TableCellHead>
              <TableCellHead>Display Name</TableCellHead>
              <TableCellHead>Current Amount</TableCellHead>
              <TableCellHead>Amount</TableCellHead>
            </TableRowHead>
          </TableHead>
          <TableBody>{rows}</TableBody>
        </Table>
        <Button className={classes.submitbutton} onClick={onSubmit} primary>
          Submit
        </Button>
      </div>
    );
  }
}

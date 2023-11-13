import React, { useState, useEffect } from "react";
import { useDataQuery, useDataMutation } from "@dhis2/app-runtime";
import {
  requestCommodities,
  requestComValues,
  dataMutationQuery,
} from "../apiConstants";
import {
  getCommoditiesNames,
  getCommoditiesData,
  getCommoditiesValues,
} from "../logicLayer/ApiCalls";
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
  AlertBar,
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

export function StoreManagement() {
  const commodities = getCommoditiesNames();
  const comValues = getCommoditiesValues();

  console.log("commodities", comValues[0]);
  // Get values and commodities form the API
  const {
    loading: loadingVal,
    error: errorVal,
    data: dataVal,
  } = useDataQuery(requestComValues);
  console.log("dataVal", dataVal);
  //Data mutation
  const [mutate, { loadingM, errorM }] = useDataMutation(dataMutationQuery);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFail, setShowFail] = useState(false);

  // Helper function to update the commodity values
  async function getCommodityValueFromAPI(commodityId) {
    const query = `http://localhost:9999/api/dataValues.json?de=${commodityId}&pe=202310&ou=xQIU41mR69s`;
    try {
      const response = await fetch(query);
      const result = await response.json();
      return result;
    } catch (err) {
      console.error(err);
    }
  }

  // Function to handle form submit
  function onSubmit(formInput) {
    for (const element in formInput) {
      const value = parseInt(formInput[element]);
      if (!isNaN(value)) {
        // Fetch the current value of the commodity with id = element
        getCommodityValueFromAPI(element)
          .then((currentValue) => {
            const newValue = parseInt(currentValue) + parseInt(value);
            console.log("newValue", newValue);
            mutate({
              value: newValue, // Add the input value to the existing value and update it
              dataElement: element,
              period: "202310",
              orgUnit: "xQIU41mR69s",
            });
            setShowSuccess(true);
          })
          .catch((err) => {
            console.error(err);
            setShowFail(true);
          });
      }
    }
  }

  if (errorVal) {
    console.error("Error fetching data from the new API:", error.message);
  }

  // Map values to commodities
  const values = new Map();
  if (comValues[0] instanceof Array)
    comValues[0].forEach((el) => {
      // Fetch the first element as it is the newest in the list
      if (!values.has(el.dataElement))
        values.set(el.dataElement, parseInt(el.value));
    });

  if (loadingVal) {
    return <CircularLoader />;
  }

  // If data is fetched, create a table row for each commodity
  if (!(commodities instanceof Array)) {
    return commodities;
  } else {
    return (
      <div className={classes.storemanagement}>
        <h1>Store Management</h1>
        <p>
          Update stock count balance when receiving the monthly delivery, enter
          the amount you received.
        </p>
        <ReactFinalForm.Form onSubmit={onSubmit}>
          {({ handleSubmit, form }) => (
            <form
              onSubmit={async (event) => {
                await handleSubmit(event);
                form.reset();
              }}
              autoComplete="off"
            >
              <Table className={classes.table}>
                <TableHead>
                  <TableRowHead>
                    <TableCellHead>Display Name</TableCellHead>
                    <TableCellHead>Current Amount</TableCellHead>
                    <TableCellHead>Amount</TableCellHead>
                  </TableRowHead>
                </TableHead>
                <TableBody>
                  {commodities &&
                    commodities
                      .map((dataset) => ({
                        id: dataset.id,
                        displayName: dataset.displayName.replace(
                          "Commodities - ",
                          ""
                        ),
                      }))
                      .sort((a, b) =>
                        a.displayName.localeCompare(b.displayName)
                      )
                      .map((dataset) => (
                        <TableRow key={dataset.id}>
                          <TableCell>{dataset.displayName}</TableCell>
                          <TableCell>{values.get(dataset.id)}</TableCell>
                          <TableCell>
                            <ReactFinalForm.Field
                              name={dataset.id}
                              component={InputFieldFF}
                              validate={composeValidators(
                                number,
                                createMinNumber(0)
                              )}
                              onChange={(event) =>
                                handleInputChange(
                                  dataset.id,
                                  event.target.value
                                )
                              }
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                </TableBody>
              </Table>
              <Button className={classes.submitbutton} type="submit" primary>
                Submit
              </Button>
            </form>
          )}
        </ReactFinalForm.Form>
        {showSuccess && (
          <AlertBar duration={8000} permanent success>
            Successfully restocked
          </AlertBar>
        )}
        {showFail && (
          <AlertBar duration={8000} critical permanent>
            Failed to restock
          </AlertBar>
        )}
      </div>
    );
  }
}

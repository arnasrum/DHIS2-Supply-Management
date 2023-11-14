import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableCellHead,
  TableHead,
  TableRow,
  TableRowHead,
} from "@dhis2/ui";

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


import { getCurPeriod } from "../logicLayer/Helpers";


export function InputTable(props) {
    const onSubmit = props.onSubmit;
    const headerNames = props.headerNames;
    const propertyNames = props.propertyNames;
    const data = props.data;
    const orgs = props.orgs;

    const [orgData, setOrgData] = useState([]);
    const [inputValues, setInputValues] = useState({});



    
    return (
        <>
        <ReactFinalForm.Form onSubmit={onSubmit}>
          {({ handleSubmit, form }) => (
            <form
              onSubmit={async (event) => {
                await handleSubmit(event);
                form.reset();
              }}
              autoComplete="off"
            >
            <Table>
                <TableHead>
                <TableRowHead>
                    {headerNames.map((item) => {
                        return <TableCellHead>
                            {item}
                        </TableCellHead>
                    })}
                </TableRowHead>
                </TableHead>
                <TableBody>
                {data.map((item) => {
                    return (
                    <TableRow key={crypto.randomUUID()}>
                        <TableCell>{item["name"]}</TableCell>
                        <TableCell>{getCommodityValue(item.dataElements, commodity)}</TableCell> 
                        <TableCell>
                            <ReactFinalForm.Field
                              name={item.id}
                              component={InputFieldFF}
                              validate={composeValidators(
                                number,
                                createMinNumber(0)
                              )}
                              value={inputValues[item.id] || ""}
                            />
                        </TableCell>
                    </TableRow>
                    );
                })}
                </TableBody>
            </Table>
            <Button type="submit" primary>Submit</Button>
            </form>
            )}
        </ReactFinalForm.Form>
        </>
    );
}
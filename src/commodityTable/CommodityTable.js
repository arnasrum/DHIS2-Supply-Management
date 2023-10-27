import React, { useState } from "react";
import { useDataQuery } from "@dhis2/app-runtime";
import { CircularLoader, Menu, MenuItem, SingleSelectField, SingleSelectOption } from "@dhis2/ui";
import {
    Table,
    TableBody,
    TableCell,
    TableCellHead,
    TableHead,
    TableRow,
    TableRowHead
  } from "@dhis2/ui";

const requestCommodities = {
    request0: {
      resource: "/dataSets/ULowA8V3ucd",
      params: {
        fields: "displayName,dataSetElements[dataElement[id,displayName]]"
      }
    }
  }

const requestValues = {
    request0: {
        resource: "/dataValueSets",
        params: {
            orgUnit: "xQIU41mR69s",
            period: "202310",
            dataSet: "ULowA8V3ucd"
        }
    }
}

export function CommodityTable(props) {
    const { loading: loadingVal, error: errorVal, data: dataVal } = useDataQuery(requestValues);
    const { loading: loadingCom, error: errorCom, data: dataCom } = useDataQuery(requestCommodities);

    const values = new Map();
    if (dataVal) dataVal.request0.dataValues.forEach((el) => {
        // Fetch the first element as it is the newest in the list
        if (!values.has(el.dataElement)) values.set(el.dataElement, parseInt(el.value))
    });

    if (loadingCom || loadingVal) {
        return <CircularLoader />;
    }

    function CommodityRows() {
        if (dataCom) {
            return dataCom.request0.dataSetElements.map((el) => {
                const tokens = el.dataElement.displayName.split(" ").slice(2)
                return (
                    <TableRow>
                        <TableCell>{tokens.join(" ")}</TableCell>
                        <TableCell>{values.get(el.dataElement.id)}</TableCell>
                    </TableRow>
            )});
        }
    }

    return (
        <>
            <h1>Commodity Table</h1>
            <Table>
                <TableHead>
                    <TableRowHead>
                        <TableCellHead>Commodity</TableCellHead>
                        <TableCellHead>Stock balance</TableCellHead>
                    </TableRowHead>
                </TableHead>
                <TableBody>
                    <CommodityRows />
                </TableBody>
            </Table>
        </>
    );
}
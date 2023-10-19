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

const request = {
    request0: {
      resource: "/dataSets/ULowA8V3ucd",
      params: {
        fields: "displayName,dataSetElements[dataElement[id,displayName]]"
      }
    }
  }

export function CommodityTable(props) {
    const { loading, error, data } = useDataQuery(request);

    function CommodityRows() {
        if (data) {
            
            data.request0.dataSetElements.map((el) => {
            });
        }
    }

    return (
        <>
            <h1>Commodity Table</h1>
            <SingleSelectField label="Choose category" >
                <SingleSelectOption label="Live-Saving commodities" value="1" />
            </SingleSelectField>
            <Table>
                <TableHead>
                    <TableRowHead>
                        <TableCellHead>Commodity</TableCellHead>
                        <TableCellHead>Stock balance</TableCellHead>
                    </TableRowHead>
                </TableHead>
            </Table>
        </>
    );
}
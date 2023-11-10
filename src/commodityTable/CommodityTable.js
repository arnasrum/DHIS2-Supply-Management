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

const requestCategoryOptions = {
    request0: {
        resource: "/categoryOptionCombos",
        params: {
            paging: false
        }
    }
}

const requestValues = {
    request0: {
        resource: "/dataValueSets",
        params: {
            orgUnit: "xQIU41mR69s",
            period: "202311",
            dataSet: "ULowA8V3ucd"
        }
    }
}

export function CommodityTable(props) {
    const { loading: loadingCom, error: errorCom, data: dataCom } = useDataQuery(requestCommodities);
    const { loading: loadingCat, error: errorCat, data: dataCat } = useDataQuery(requestCategoryOptions);
    const { loading: loadingVal, error: errorVal, data: dataVal } = useDataQuery(requestValues);

    // data[id] = [displayName, [catOptID_1, Val_1], [...2], ...]
    // Gets all commodieties and maps theirs ID to Displaynames in data
    const data = new Map();
    if (dataCom) dataCom.request0.dataSetElements.forEach((el) => {
        data.set(el.dataElement.id, [el.dataElement.displayName]);
    })

    // Gets all commodieties' values (all kind of) and pushes to commodieties' array in data
    const categories = new Map();
    if (dataVal) dataVal.request0.dataValues.forEach((el) => {
        if (!categories.has(el.categoryOptionCombo)) {
            dataCat.request0.categoryOptionCombos.forEach((cat) => {
                if (cat.id === el.categoryOptionCombo) categories.set(cat.id, cat.displayName)
            })
        }
        const list = data.get(el.dataElement)
        if (list) list.push([el.categoryOptionCombo, el.value])
    });

    // Creates an array of what to be displayed in the table
    const displayData = [];
    data.forEach((el) => {
        const tokens = el[0].split(" ").slice(2)
        el.slice(1).forEach((cat) => {
            displayData.push([tokens.join(" "), categories.get(cat[0]), cat[1]])
        })
    });

    // Sorts first by value type, then by commodity
    displayData.sort()
        
    if (loadingCom || loadingVal) {
        return <CircularLoader />;
    }

    function CommodityRows() {
        if (data) {
            const rows = [];
            displayData.forEach((el) => {
                rows.push(
                    <TableRow>
                        <TableCell>{el[0]}</TableCell>
                        <TableCell>{el[1]}</TableCell>
                        <TableCell>{el[2]}</TableCell>
                    </TableRow>
                )
            });
            return rows;
        }
    }

    return (
        <>
            <h1>Commodity Table</h1>
            <Table>
                <TableHead>
                    <TableRowHead>
                        <TableCellHead>Commodity</TableCellHead>
                        <TableCellHead>Consumption</TableCellHead>
                        <TableCellHead>End Balance</TableCellHead>
                        <TableCellHead>Quantity to be ordered</TableCellHead>
                    </TableRowHead>
                </TableHead>
                <TableBody>
                    <CommodityRows />
                </TableBody>
            </Table>
        </>
    );
}
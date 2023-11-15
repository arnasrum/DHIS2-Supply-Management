import React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableCellHead,
    TableHead,
    TableRow,
    TableRowHead
  } from "@dhis2/ui";
import {
    getCommoditiesData
} from "../logicLayer/ApiCalls.js";


export function CommodityStock(props) {
    const data = getCommoditiesData();
    
    if (React.isValidElement(data[0])) {
        return data[0];
    }

    function CommodityRows(props) {
        if (props.inData) {
            const rows = [];
            props.inData[0].forEach((el) => {
                rows.push(
                    <TableRow key={el.DataElement}>
                        <TableCell>{el.DataElementName}</TableCell>
                        <TableCell>{el.Consumption}</TableCell>
                        <TableCell>{el.EndBalance}</TableCell>
                        <TableCell>{el.QuantityToBeOrdered}</TableCell>
                    </TableRow>
                )
            });
            return rows;
        }
    }

    return (
        <>
            <h1>Commodity Stock</h1>
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
                    <CommodityRows inData={data}/>
                </TableBody>
            </Table>
        </>
    );
}
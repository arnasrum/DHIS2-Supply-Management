import React, { useState } from "react";
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
    // [a, b]: a - which column, b - is either 0 or 1, 0 for ascending order, 1 for descending
    const [orderBy, setOrderBy] = useState([1, 0]); 

    const data = getCommoditiesData();
    
    if (React.isValidElement(data[0])) {
        return data[0];
    }

    function flipOrder(numb) {
        if (orderBy[1]) {
            if (numb == 1) return -1
            else return 1
        }
        else return numb
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
            rows.sort((a, b) => {
                const el_a = a.props.children[orderBy[0]].props.children
                const el_b = b.props.children[orderBy[0]].props.children
                if (orderBy[0] == 0) {
                    if (el_a > el_b) return flipOrder(1)
                    else return flipOrder(-1)
                }
                else {
                    if (parseInt(el_a) > parseInt(el_b)) return flipOrder(1)
                    else return flipOrder(-1)
                }
            })
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
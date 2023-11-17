import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableCellHead,
  TableHead,
  TableRow,
  TableRowHead,
  Tooltip,
} from "@dhis2/ui";
import { getCommoditiesData } from "../../logicLayer/ApiCalls";
import "./CommodityStock.css";

export function CommodityStock(props) {
  // [a, b]: a - which column, b - is either 0 or 1, 0 for ascending order, 1 for descending
  const [orderBy, setOrderBy] = useState([0, 0]);

  const data = getCommoditiesData();

  if (React.isValidElement(data[0])) {
    return data[0];
  }

  function flipOrder(numb) {
    if (orderBy[1]) {
      if (numb == 1) return -1;
      else return 1;
    } else return numb;
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
        );
      });
      rows.sort((a, b) => {
        const el_a = a.props.children[orderBy[0]].props.children;
        const el_b = b.props.children[orderBy[0]].props.children;
        if (orderBy[0] == 0) {
          if (el_a > el_b) return flipOrder(1);
          else return flipOrder(-1);
        } else {
          if (parseInt(el_a) > parseInt(el_b)) return flipOrder(-1);
          else return flipOrder(1);
        }
      });
      return rows;
    }
  }

  function changeOrder(column) {
    if (column == orderBy[0])
      setOrderBy([
        column,
        orderBy[1] ? !1 : 1,
      ]); // second element is basically an XOR
    else setOrderBy([column, 0]);
  }

  function Arrow(column) {
    if (orderBy[0] != column) return;
    if (orderBy[1]) return <>↑</>;
    else return <>↓</>;
  }

  return (
    <>
      <h1>Commodity Stock</h1>
      <p>Overview of commodities and values</p>
      <p>
        <strong>Hint:</strong> Click on a column name to change the order with
        respect to the selected property.
      </p>
      <Table>
        <TableHead>
          <TableRowHead>
            <TableCellHead>
              <p className="cellHeadText" onClick={() => changeOrder(0)}>
                <Tooltip content="Name of the commodity" openDelay={500}>
                  Commodity {Arrow(0)}
                </Tooltip>
              </p>
            </TableCellHead>
            <TableCellHead>
              <p className="cellHeadText" onClick={() => changeOrder(1)}>
                <Tooltip
                  content="Amount of commodities dispensed so far this period (month)"
                  openDelay={500}
                >
                  Consumption {Arrow(1)}
                </Tooltip>
              </p>
            </TableCellHead>
            <TableCellHead>
              <p className="cellHeadText" onClick={() => changeOrder(2)}>
                <Tooltip
                  content="Stock balance of the commodity"
                  openDelay={500}
                >
                  End Balance {Arrow(2)}
                </Tooltip>
              </p>
            </TableCellHead>
            <TableCellHead>
              <p className="cellHeadText" onClick={() => changeOrder(3)}>
                <Tooltip
                  content="Amount of commodities to be ordered for the next period (month)"
                  openDelay={500}
                >
                  Quantity to be ordered {Arrow(3)}
                </Tooltip>
              </p>
            </TableCellHead>
          </TableRowHead>
        </TableHead>
        <TableBody>
          <CommodityRows inData={data} />
        </TableBody>
      </Table>
    </>
  );
}

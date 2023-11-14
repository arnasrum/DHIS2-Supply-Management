import React, { useState, useEffect } from "react";
import {
  CircularLoader,
  Table,
  TableBody,
  TableCell,
  TableCellHead,
  TableHead,
  TableRow,
  TableRowHead,
} from "@dhis2/ui";

import { getCurPeriod } from "../logicLayer/Helpers";


function getCommodityValue(dataElements, commodityID) {
    const value = dataElements.filter((item) => {
        if(item.dataElement == commodityID) return true;
        return false;
    })
    return value[0].value;
}

export function ClinicTableOld(props) {
    const commodity = props.commodity;
    const orgs = props.orgs;
    const [orgData, setOrgData] = useState([]);


    useEffect(() => {
        if (!commodity) {
            return;
        }
        const fetchPromises = orgs.map(async (item) => {
            let query = "http://localhost:9999/api/dataValueSets.json?";
            query = query + "orgUnit=" + item.id;
            query = query + "&dataSet=" + "ULowA8V3ucd";
            query = query + "&period=" + getCurPeriod();

            return fetch(query)
                .then((response) => response.json())
                .then((response) => response.dataValues.filter((item) => {
                    if(item.categoryOptionCombo == "J2Qf1jtZuj8") return true;
                    return false;
                }))
                .then((response) => {
                    const obj = {};
                    obj.id = item.id;
                    obj.name = item.name;
                    obj.dataElements = response;
                    return obj;
                })
        });

        // Wait for all fetch requests to complete
        Promise.all(fetchPromises)
            .then((data) => {
                return data;
            })
            .then((data) => {
                setOrgData(data); // Update the state with the fetched values
                return data;
            })
            //.then((data) => console.log("data", data))
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
        }, [commodity]);
    
    return (
        <>
        <Table>
            <TableHead>
            <TableRowHead>
                <TableCellHead>Clinic</TableCellHead>
                <TableCellHead>Value</TableCellHead>
            </TableRowHead>
            </TableHead>
            <TableBody>
            {orgData.map((item) => {
                return (
                <TableRow key={item.id}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{getCommodityValue(item.dataElements, commodity)}</TableCell> 
                </TableRow>
                );
            })}
            </TableBody>
        </Table>
        </>
    );
}

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

export function ClinicTable(props) {
    const commodity = props.commodity;
    const values = props.values;
    const setValues = props.setValues;
    //const [values, setValues] = useState([]); // Use state to store the values


    useEffect(() => {
        if (!commodity) {
            return;
        }

        const fetchPromises = props.orgs.map((item) => {
            let query = "http://localhost:9999/api/dataValues.json?";
            query = query + "ou=" + item.id;
            query = query + "&pe=202310";
            query = query + "&co=J2Qf1jtZuj8";
            query = query + "&de=" + commodity;

            // Return the fetch promise
            return fetch(query)
                .then((response) => response.json())
                .then((response) => ({
                    id: item.id,
                    value: response[0],
                }));
        });

        // Wait for all fetch requests to complete
        Promise.all(fetchPromises)
            .then((data) => {
                setValues(data); // Update the state with the fetched values
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, [commodity, props.orgs]);
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
                    {values.map((item) => {
                        return (
                            <TableRow key={item.id}>
                                <TableCell>{item.id}</TableCell>
                                <TableCell>{item.value}</TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </>
    );
}
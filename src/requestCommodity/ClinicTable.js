import React, { useState, useEffect } from "react";
import { useDataQuery } from "@dhis2/app-runtime"; 
import {
    Checkbox,
  CircularLoader,
  Table,
  TableBody,
  TableCell,
  TableCellHead,
  TableHead,
  TableRow,
  TableRowHead,
} from "@dhis2/ui";

import { getCommoditiesData } from "../logicLayer/ApiCalls";
import { getCurPeriod } from "../logicLayer/Helpers";

export function ClinicTable(props) {

    console.log(props);
    const orgs = props.orgs;
    const [orgData, setOrgData] = useState();


    let i = -1;
    const request = orgs.reduce((obj, item) => {
        i = i + 1;
        return {...obj, [`request${i}`]: {
            resource: "/dataValueSets",
            params: {
                orgUnit: item.id,
                period: getCurPeriod(),
                dataSet: "ULowA8V3ucd"
            }}
        }
    }, {});

    const {error, loading, data} = useDataQuery(request);

    const sendRequest = () => {
        const { loading, error, data } = useDataQuery(request)
        if (error) {
            return <span>ERROR: {error.message}</span>
        }

        if (loading) {
            return <CircularLoader/>
        }

        if (data && !orgData) {
            //To-do: return a component using the data response 
            const filteredData = Object.values(data).map((item) => {
                return {"orgUnit": item.orgUnit, "dataElements": item.dataValues.filter((item) => {
                    if(item.categoryOptionCombo == "J2Qf1jtZuj8") return true;
                    return false;
                })}
            });
            setOrgData(filteredData);
        }
    }
    function makeTable() {
        if(props.commodity) {
            return(
                <Table>
                    <TableHead>
                    <TableRowHead>
                        <TableCellHead>Clinic</TableCellHead>
                        <TableCellHead>Value</TableCellHead>
                        <TableCellHead>Request Amount</TableCellHead>
                    </TableRowHead>
                    </TableHead>
                    <TableBody>
                    {orgData.map((item) => {
                        return (
                        <TableRow key={item.orgUnit}>
                            <TableCell>{item.orgUnit}</TableCell>
                            <TableCell>{item.dataElements.filter((item) => {
                                if(item.dataElement == props.commodity) return true;
                                return false;
                            })[0].value}</TableCell> 
                        </TableRow>
                        );
                    })}
                    </TableBody>
                </Table>
            );
        }
        return(<h3>Please Select a Commodity</h3>);

    }

    return (
        <>
            {sendRequest()}
            {makeTable()}
        </>
    );
}

import React, {useState, useEffect} from "react";

import { useDataQuery } from "@dhis2/app-runtime";

import { ClinicTable } from "./ClinicTable";
import { CommoditySelect } from "./CommoditySelect";
import {
  Table,
  TableBody,
  TableCell,
  TableCellHead,
  TableHead,
  TableRow,
  TableRowHead,
} from "@dhis2/ui";

const request = {
  request0: {
    resource: "/organisationUnits/g5ptsn0SFX8",
    params: {
      fields: "children"
    }
  },
}


export function ClinicStock(props) {

    const [commodity, setCommodity] = useState("");
    const { loading, error, data } = useDataQuery(request)
    if (error) {
        return <span>ERROR: {error.message}</span>
    }

    if (loading) {
        return <span>Loading...</span>
    }

    if (data) {
        return(
            <>
                <h1>Clinic Stock</h1>
                <CommoditySelect commodity={commodity} setCommodity={setCommodity}/>
                <ClinicTable data={data.request0.children} commodity={commodity}/>
            </>
        );
    }
}
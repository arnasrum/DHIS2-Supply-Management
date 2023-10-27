import React, { useState, useEffect } from "react";
import { useDataQuery } from "@dhis2/app-runtime";
import { CircularLoader } from "@dhis2/ui";

import { CommoditySelect } from "./CommoditySelect";
import { ClinicTable } from "./ClinicTable";
import { RequestTable } from "./RequestTable";


const request = {
    request0: {
        resource: "/organisationUnits/g5ptsn0SFX8",
        params: {
            fields: "children"
        }
    },
}

export function RequestCommodity(props) {

    // Replace with logged in users org 
    const myOrg = "xQIU41mR69s";
    const [orgValue, setOrgValue] = useState([]);
    const [commodity, setCommodity] = useState("");    

    const {error, loading, data} = useDataQuery(request);

    if(error) {
        return <span>ERROR: {error.error}</span>
    }
    if(loading) {
        return <CircularLoader/>
    }
    if(data) {
        return(
            <>
                <CommoditySelect commodity={commodity} setCommodity={setCommodity}/>                
                <ClinicTable orgs={data.request0.children} commodity={commodity} values={orgValue} setValues={setOrgValue}/>
                <RequestTable orgs={orgValue} commodity={commodity} usersOrg={myOrg}/>
            </>
        );
    }

}

import React, { useState, useEffect } from "react";
import { useDataQuery } from "@dhis2/app-runtime";
import { CircularLoader } from "@dhis2/ui";

import { CommoditySelect } from "./CommoditySelect";
import { ClinicTable } from "./ClinicTable";
import { RequestTable } from "./RequestTable";

import { fetchOrgUnit, getCommoditiesData } from "../logicLayer/ApiCalls";

export function RequestCommodity(props) {

    // Replace with logged in users org 
    const orgs = fetchOrgUnit();
    const commodityData = getCommoditiesData();
    const myOrg = "xQIU41mR69s";
    console.log(orgs);
    const [orgValue, setOrgValue] = useState([]);
    const [commodity, setCommodity] = useState("");    


    if(Array.isArray(orgs)) {
        return(
            <>
                <CommoditySelect commodity={commodity} setCommodity={setCommodity} commodities={commodityData}/>                
                <ClinicTable orgs={orgs} commodity={commodity} values={orgValue} setValues={setOrgValue}/>
                <RequestTable orgs={orgValue} commodity={commodity} usersOrg={myOrg}/>
            </>
        );
    }
    if(orgs) {
        return orgs;
    }
}

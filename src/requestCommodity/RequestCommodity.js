import React, { useState, useEffect } from "react";
import { useDataQuery } from "@dhis2/app-runtime";
import { CircularLoader } from "@dhis2/ui";

import { CommoditySelect } from "./CommoditySelect";
import { ClinicTable } from "./ClinicTable";
import { ClinicRequestTable } from "./ClinicRequestTable";
import { RequestTable } from "./RequestTable";

import { fetchOrgUnit, getCommoditiesData } from "../logicLayer/ApiCalls";

export function RequestCommodity(props) {

    // Replace with logged in users org 
    const myOrg = "xQIU41mR69s";
    const orgs = fetchOrgUnit();
    const commodityData = getCommoditiesData();
    const [orgValue, setOrgValue] = useState([]);
    const [commodity, setCommodity] = useState("");    


    if(Array.isArray(orgs)) {
        const filteredOrgs = orgs.filter((item) => {
            if(item.id == myOrg) return false;
                return true;
        });
        return(
            <>
                <CommoditySelect commodity={commodity} setCommodity={setCommodity} commodities={commodityData}/>                
                <ClinicRequestTable orgs={filteredOrgs} commodity={commodity} values={orgValue} setValues={setOrgValue}/>
                <RequestTable orgs={filteredOrgs} commodity={commodity} usersOrg={myOrg}/>
            </>
        );
    }
    if(orgs) {
        return orgs;
    }
}

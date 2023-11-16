import React, { useState } from "react";

import { CommoditySelect } from "./CommoditySelect";
import { ClinicRequestTable } from "./ClinicRequestTable";

import { fetchOrgUnit, getCommoditiesNames } from "../logicLayer/ApiCalls";

export function RequestCommodity(props) {
    // Replace with logged in users org
    const myOrg = "xQIU41mR69s";
    const orgs = fetchOrgUnit();
    const commodityName = getCommoditiesNames();
    const [commodity, setCommodity] = useState("");

    if (Array.isArray(orgs)) {
        const filteredOrgs = orgs.filter((item) => {
        if (item.id == myOrg) return false;
            return true;
        });
        return (
        <>
            <h1>Request commodity from a nearby clinic</h1>
            <CommoditySelect
            commodity={commodity}
            setCommodity={setCommodity}
            commodities={commodityName}
            />
            <ClinicRequestTable
            orgs={filteredOrgs}
            commodity={commodity}
            usersOrg={myOrg}
            />
        </>
        );
    }
    if (orgs) {
        return orgs;
    }
}

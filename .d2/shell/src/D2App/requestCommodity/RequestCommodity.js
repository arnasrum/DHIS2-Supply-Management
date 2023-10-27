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
  }
};
export function RequestCommodity(props) {
  // Replace with logged in users org 
  const myOrg = "xQIU41mR69s";
  const [orgValue, setOrgValue] = useState([]);
  const [commodity, setCommodity] = useState("");
  const {
    error,
    loading,
    data
  } = useDataQuery(request);
  if (error) {
    return /*#__PURE__*/React.createElement("span", null, "ERROR: ", error.error);
  }
  if (loading) {
    return /*#__PURE__*/React.createElement(CircularLoader, null);
  }
  if (data) {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(CommoditySelect, {
      commodity: commodity,
      setCommodity: setCommodity
    }), /*#__PURE__*/React.createElement(ClinicTable, {
      orgs: data.request0.children,
      commodity: commodity,
      values: orgValue,
      setValues: setOrgValue
    }), /*#__PURE__*/React.createElement(RequestTable, {
      orgs: orgValue,
      commodity: commodity,
      usersOrg: myOrg
    }));
  }
}
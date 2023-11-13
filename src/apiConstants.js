export const requestCommodities = {
  commodities: {
    resource: "/dataSets/ULowA8V3ucd",
    params: {
      fields: "displayName,dataSetElements[dataElement[id,displayName]]",
    },
  },
};

export const dataMutationQuery = {
  resource: "dataValueSets",
  type: "create",
  dataSet: "ULowA8V3ucd",
  data: ({ value, dataElement, period, orgUnit, categoryOptionCombo }) => ({
    dataValues: [
      {
        dataElement: dataElement,
        period: period,
        orgUnit: orgUnit,
        value: value,
        categoryOptionCombo: categoryOptionCombo,
      },
    ],
  }),
};

// temp
export const requestComValues = {
  request0: {
    resource: "/dataValueSets",
    params: {
      orgUnit: "xQIU41mR69s",
      period: "202311",
      dataSet: "ULowA8V3ucd",
    },
  },
};

export const requestCommodityValues = {
  comVals: {
    resource: "/dataValueSets",
    params: ({ period, orgUnit }) => ({
      orgUnit: orgUnit,
      period: period,
      dataSet: "ULowA8V3ucd",
    }),
  },
};

export const requestCategoryOptionCombos = {
  comVals: {
    resource: "/categoryOptionCombos",
    params: {
      paging: false,
    },
  },
};

export const requestUser = {
  meRequest: {
    resource: "/me.json",
    params: {
      fields: "id,name,organisationUnits",
    },
  },
};

export const requestOrgUnits = {
  orgRequest: {
    resource: "/organisationUnits/g5ptsn0SFX8",
    params: {
      fields: "children",
    },
  },
};

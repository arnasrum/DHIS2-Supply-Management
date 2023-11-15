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

export const dataMutationQueryMultiple = {
  resource: "dataValueSets",
  type: "create",
  dataSet: "ULowA8V3ucd",
  data: ({ dataValues }) => ({
    dataValues: dataValues,
  }),
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
      fields: "children[name,id]",
    },
  },
};

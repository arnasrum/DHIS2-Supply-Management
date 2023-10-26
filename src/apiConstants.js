export const requestCommodities = {
  commodities: {
    resource: "/dataSets/ULowA8V3ucd",
    params: {
      fields: "displayName,dataSetElements[dataElement[id,displayName]]",
    },
  },
};
export const requestComValues = {
  request0: {
    resource: "/dataValueSets",
    params: {
      orgUnit: "xQIU41mR69s",
      period: "202310",
      dataSet: "ULowA8V3ucd",
    },
  },
};
// Mutation query for updating data values of commodities
export const dataMutationQuery = {
  resource: "dataValueSets",
  type: "create",
  dataSet: "ULowA8V3ucd",
  data: ({ value, dataElement, period, orgUnit }) => ({
    dataValues: [
      {
        dataElement: dataElement,
        period: period,
        orgUnit: orgUnit,
        value: value,
      },
    ],
  }),
};

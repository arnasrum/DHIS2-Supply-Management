import React, { useState } from "react"
import { useDataQuery } from '@dhis2/app-runtime'
import { CircularLoader,
    ReactFinalForm,
    SingleSelectFieldFF,
    InputFieldFF,
    composeValidators,
    hasValue,
    integer,
    createMinNumber,
    Button 
} from '@dhis2/ui'
import { useDataMutation } from "@dhis2/app-runtime"

const dataMutationQuery = {
    resource: 'dataValueSets',
    type: 'create',
    dataSet: 'ULowA8V3ucd',
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
}

export function UpdateCommodity(props) {

    const [mutate, { loadingM, errorM }] = useDataMutation(dataMutationQuery)

    const request = {
        request0: {
          resource: "/dataSets/ULowA8V3ucd",
          params: {
            fields: "displayName,dataSetElements[dataElement[id,displayName]]"
          }
        }
      }

    function submit (formInput) {
        console.log(formInput)
        mutate({
            value: formInput.value,
            dataElement: formInput.dataElement,
            period: '202310',
            orgUnit: 'xQIU41mR69s',
        })
    }

    function getOptions (data) {
        const list = []
        data.request0.dataSetElements.map(elem => {
            const names = elem.dataElement.displayName.split("- ")[1]
            list.push({label: names, value: elem.dataElement.id})
        })
        return list
    }

    const { loading, error, data } = useDataQuery(request)
      if (error) {
          return <span>ERROR: {error.message}</span>
      }
  
      if (loading) {
          return <CircularLoader/>
      }
      if (data) {
        return (
            <ReactFinalForm.Form onSubmit={submit}>
                {({ handleSubmit }) => (
                    <form onSubmit={handleSubmit}>
                        <ReactFinalForm.Field
                            name="dataElement"
                            label={data.request0.displayName}
                            id="singleSelect"
                            placeholder="Select - One"
                            validate={composeValidators(hasValue)}
                            component={SingleSelectFieldFF}
                            options={getOptions(data)}
                        />
                        <ReactFinalForm.Field
                        name="value"
                        label="new amount"
                        component={InputFieldFF}
                        validate={composeValidators(hasValue, integer, createMinNumber(0))}
                        />
                        <Button type="submit">Submit</Button>
                    </form>
                )}
            </ReactFinalForm.Form> 
    )}
    
    return (
        <h1>UpdateCommodity</h1>
    )
}
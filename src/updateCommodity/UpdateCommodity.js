import React, { useState } from "react"
import { useDataQuery } from '@dhis2/app-runtime'
import { CircularLoader,
    SingleSelectField ,
    SingleSelectOption ,
    MenuItem,
    ReactFinalForm,
    SingleSelectFieldFF,
    Field,
    Input,
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

    const [selectedCommodity, setSelectedCommodity] = useState()
    const [selectedAmount, setSelectedAmount] = useState()
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
        //console.log(formInput)
        if (!(selectedCommodity)) {
            alert("No commodity was selected")
            return
        }
        if (!(selectedAmount)) {
            alert("No number provided")
            return
        }
        if (selectedAmount < 0 || selectedAmount % 1 != 0) {
            alert("innvalid number " + selectedAmount + "\nThe number must be a whole number greater than 0")
            return
        }
        console.log(selectedAmount)
        console.log(selectedCommodity)
        mutate({
            value: selectedAmount,
            dataElement: selectedCommodity,
            period: '202310',
            orgUnit: 'xQIU41mR69s',
        })
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
                        <SingleSelectField
                            label={data.request0.displayName}
                            onChange={(data) => setSelectedCommodity(data.selected)}
                            selected={selectedCommodity}
                            id="singleSelect"
                            placeholder="Select - One"
                        >
                            {data.request0.dataSetElements.map(elem => {
                                const names = elem.dataElement.displayName.split("- ")[1]
                                return(
                                    <SingleSelectOption key={names} value={elem.dataElement.id} label={names}></SingleSelectOption>
                                )
                            })}
                        </SingleSelectField>
                        <Field
                            label="new amount"
                        >
                            <Input
                                onChange={(data) => setSelectedAmount(data.value)}
                                type="number"
                                step="1"
                                min="0"
                                id="uppdateNum"
                            ></Input>
                        </Field>
                        <Button onClick={submit}>Submit</Button>
                    </form>
                )}
            </ReactFinalForm.Form> 
    )}
    
    return (
        <h1>UpdateCommodity</h1>
    )
}
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

// muatation querry
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

// request to get commodities
const request = {
    request0: {
        resource: "/dataSets/ULowA8V3ucd",
        params: {
            fields: "displayName,dataSetElements[dataElement[id,displayName]]"
        }
    }
}

export function UpdateCommodity(props) {
    // data muatation and data querry
    const [mutate, { loadingM, errorM }] = useDataMutation(dataMutationQuery)
    const { loading, error, data } = useDataQuery(request)

    // on submit
    function submit (formInput) {
        // send muatation querry
        mutate({
            value: formInput.value,
            dataElement: formInput.dataElement,
            period: '202310',
            orgUnit: 'xQIU41mR69s',
        })
    }

    // makes a list of all the options based on a dataset of commodities
    function getOptions (data) {
        const list = []
        data.request0.dataSetElements.map(elem => {
            const names = elem.dataElement.displayName.split("- ")[1]
            list.push({label: names, value: elem.dataElement.id})
        })
        return list
    }

    // on error fetching commodities
    if (error) {
      return <span>ERROR: {error.message}</span>
    }
    // when loding fetching commodities
    if (loading) {
      return <CircularLoader/>
    }
    // when data is pressent fetching commodities
    if (data) {
        // return form
        return (
            <ReactFinalForm.Form onSubmit={submit}>
                {({ handleSubmit }) => (
                    <form onSubmit={handleSubmit}>
                        <ReactFinalForm.Field
                            name="dataElement"
                            label={data.request0.displayName}                                id="singleSelect"
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
        )
    }
}
import React from 'react';
import {
  ReactFinalForm,
  SingleSelectFieldFF,
  InputFieldFF,
  composeValidators,
  hasValue,
  integer,
  createMinNumber,
  Button,
} from "@dhis2/ui";
import { changeCommodityCount, changeCommodityCountMutator } from "../ApiCalls";

export function UpdateCommodity(props) {

  const mutator = changeCommodityCountMutator() 
  let coms = props.data.reduce((arr, elem) => {
    if (!(arr.includes(elem.DataElementName))) {arr.push(elem.DataElementName)}
    return arr
  }, [])
  coms = coms.map((elem) => {
    return {
      "displayName": elem,
      "id": props.data.filter((x) => {return x.DataElementName === elem})[0].DataElement
    }
  })

  // on submit
  function submit(formInput) {
    // alert("Updated amount to " + formInput.value);
    changeCommodityCount(mutator, formInput.value, formInput.dataElement, props.refetch)
  }

  // makes a list of all the options based on a dataset of commodities
  function getOptions(data) {
    return data.map((elem) => {
      return { label: elem.displayName, value: elem.id }
    });
  }

    // return form
    return (
      <ReactFinalForm.Form onSubmit={submit}>
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <ReactFinalForm.Field
              name="dataElement"
              label="Life-Saving Commodities"
              id="singleSelect"
              placeholder="Select - One"
              validate={composeValidators(hasValue)}
              component={SingleSelectFieldFF}
              options={getOptions(coms)}
              inputWidth="300px"
            />
            <ReactFinalForm.Field
              name="value"
              label="New amount"
              placeholder="A number greater than 0"
              inputWidth="300px"
              component={InputFieldFF}
              validate={composeValidators(
                hasValue,
                integer,
                createMinNumber(0)
              )}
            />
            <br />
            <Button type="submit" primary>
              Submit
            </Button>
          </form>
        )}
      </ReactFinalForm.Form>
    );
}

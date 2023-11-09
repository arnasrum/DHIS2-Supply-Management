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
import { changeCommodityCount, getSingleChangeMutator } from "../logicLayer/ApiMuatations";
import { getCommoditiesNames } from '../logicLayer/ApiCalls';

export function UpdateCommodity(props) {
  const mutator = getSingleChangeMutator()

  // on submit
  async function submit(formInput) {
    alert("Updated amount to " + formInput.value);
    changeCommodityCount(mutator, formInput.value, formInput.dataElement, "rQLFnNXXIL0")
  }

  // return form
  const coms = getCommoditiesNames()
  if (!(coms instanceof Array)) {return coms}
  else {
    return (
      <ReactFinalForm.Form onSubmit={submit}>
        {({ handleSubmit, form }) => (
          <form onSubmit={(event) => {
            handleSubmit(event).then(() => form.reset())
          }}>
            <ReactFinalForm.Field
              name="dataElement"
              label="Life-Saving Commodities"
              id="singleSelect"
              placeholder="Select - One"
              validate={composeValidators(hasValue)}
              component={SingleSelectFieldFF}
              options={coms.map((elem) => {return { label: elem.displayName, value: elem.id }})}
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
}

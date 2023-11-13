import React, { useState } from 'react';
import {
  ReactFinalForm,
  SingleSelectFieldFF,
  InputFieldFF,
  composeValidators,
  hasValue,
  integer,
  createMinNumber,
  Button,
  AlertBar,
  AlertStack
} from "@dhis2/ui";
import { changeCommodityCount, getSingleChangeMutator } from "../logicLayer/ApiMuatations";
import { getCommoditiesNames } from '../logicLayer/ApiCalls';

export function UpdateCommodity(props) {
  const [alert, setAlert] = useState([])
  const mutator = getSingleChangeMutator()
  const coms = getCommoditiesNames()

  // on submit
  async function submit(formInput) {
    changeCommodityCount(mutator, formInput.value, formInput.dataElement, "rQLFnNXXIL0")
    // set alert
    setAlert((prev) => {
      return [...prev, (
        <AlertBar 
          success 
        >
          {coms.filter((x) => {return x.id === formInput.dataElement})[0].displayName} successfully recounted
        </AlertBar>
      )]
    })
  }

  // return form
  if (!(coms instanceof Array)) {return coms}
  else {
    return (
      <div>
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
        <AlertStack>
          {alert}
        </AlertStack>
      </div>
    );
  }
}

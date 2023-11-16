import React, { useState } from "react";
import { AlertBar, AlertStack } from "@dhis2/ui";
import {
  changeCommodityCountMultiple,
  getMultipleChangeMutator,
} from "../logicLayer/ApiMuatations";
import { getCommoditiesData } from "../logicLayer/ApiCalls";
import { InputTable } from "../components/InputTable";
import { makeDatavalueMap } from "../logicLayer/Helpers";

export function UpdateCommodity(props) {
  // states values
  const [alert, setAlert] = useState([]);
  const [mutator, error] = getMultipleChangeMutator();
  const [coms, refetch] = getCommoditiesData();
  const [keyCount, setKeyCount] = useState(0);

  // set alert for success
  function submit(formInput) {
    // update counter for key
    setKeyCount(keyCount + 1);
    // if no value updated
    if (Object.entries(formInput).length < 1) {
      // set alert for missing info
      setAlert((prev) => {
        return [
          ...prev,
          <AlertBar info key={keyCount} children={"no value was provided"} />,
        ];
      });
      return;
    }
    // mutate when value provided
    const errM = changeCommodityCountMultiple(
      mutator,
      Object.entries(formInput).map((pair) => {
        return makeDatavalueMap(pair[1], pair[0], undefined, "rQLFnNXXIL0");
      }),
      refetch,
      error
    );
    // check for error
    Promise.all([errM]).then((values) => {
      if (values[0]) {
        setAlert((prev) => {
          return [...prev, values[0]];
        });
      } else {
        // set alert for success
        setAlert((prev) => {
          return [
            ...prev,
            <AlertBar
              success
              key={keyCount}
              children={
                coms
                  .reduce((tot, curVal) => {
                    if (Object.keys(formInput).includes(curVal.DataElement)) {
                      return tot + ", " + curVal.DataElementName;
                    }
                    return tot;
                  }, "")
                  .slice(2) + " successfully recounted"
              }
            />,
          ];
        });
      }
    });
  }

  // return form
  if (!(coms instanceof Array)) {
    return coms;
  } else {
    return (
      <div>
        <h1>Stock Recount</h1>
        <p>
          Update the stock count of commodities, for when commodity overview
          deviates from actual stock.
        </p>
        <InputTable
          headerNames={["Commodity", "Current Balance", "Recounted Balance"]}
          propertyNames={["DataElementName", "EndBalance"]}
          onSubmit={submit}
          data={coms}
        />
        <AlertStack>{alert}</AlertStack>
      </div>
    );
  }
}

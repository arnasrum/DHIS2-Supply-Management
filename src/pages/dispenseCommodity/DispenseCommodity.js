import React, { useState } from "react";
import { AlertBar, AlertStack, Divider } from "@dhis2/ui";

import { NameField } from "./NameField";
import { getCommoditiesData, fetchUser } from "../../logicLayer/ApiCalls";
import { consumeCommodityCount, getCurPeriod } from "../../logicLayer/Helpers";
import { getMultipleChangeMutator } from "../../logicLayer/ApiMutations";
import { InputTable } from "../../components/InputTable";
import { log } from "../../logicLayer/Log";

export function DispenseCommodity(props) {
  const [mutator, error] = getMultipleChangeMutator();
  const [commodities, refetch] = getCommoditiesData();
  const [alerts, setAlerts] = useState([]);
  const [dispenseToName, setDispenseToName] = useState("");
  const user = fetchUser();

  if (Array.isArray(commodities)) {
    return (
      <>
        <h1>Dispense Commodity</h1>
        <NameField
          label={"Dispense To: "}
          name={"dispensedTo"}
          placeholder={"Dispense To"}
          value={dispenseToName}
          setValue={setDispenseToName}
          setAlerts={setAlerts}
        />
        <Divider />
        <InputTable
          data={commodities}
          onSubmit={onSubmit}
          headerNames={["Commidity", "Current Stock", "Dispense Amount"]}
          propertyNames={["DataElementName", "EndBalance"]}
        />
        <AlertStack> {alerts.map((item) => item)} </AlertStack>
      </>
    );
    }
    if (commodities) {
        return <>{commodities}</>;
    }
    function onSubmit(formInput) {
        if(dispenseToName === "") {
            setAlerts((prev) =>  [...prev, <AlertBar info children={"Please input a name"} key={crypto.randomUUID()}/>]);
            return;
        }        
        if(Object.keys(formInput).length <= 0) {
            setAlerts((prev) => [...prev, <AlertBar info key={crypto.randomUUID()} children={"No value was provided"} />]);
            return;
        }

        const logQueue = [];
        Object.keys(formInput).forEach((id) => {
            const dispensedCommodityData = commodities.filter((item) => item.DataElement == id)[0];
            if(dispensedCommodityData.EndBalance - formInput[id] < 0) {
                setAlerts((prev) => [
                    ...prev, 
                    <AlertBar
                        critical
                        key={crypto.randomUUID()}
                        children={"Failed to dispense " 
                            + dispensedCommodityData.DataElementName
                            + ", "
                            + "cannot dispense more than current stock" 
                        } 
                        />]);
                return;
            }

            const mutatePromise = consumeCommodityCount(
                mutator, 
                formInput[id],
                dispensedCommodityData.EndBalance,
                dispensedCommodityData.Consumption,
                dispensedCommodityData.DataElement,
                getCurPeriod(),
                "xQIU41mR69s",
                refetch,
                error
            );
            Promise.resolve(mutatePromise)
                .then((values) => {
                    if (values) {
                        setAlerts((prev) => [...prev, values[0]])
                    } else {
                        setAlerts((prev) => [...prev,
                        <AlertBar success 
                            children={formInput[id].toString() + " " +
                            dispensedCommodityData.DataElementName + " " +
                            "dispensed to " + dispenseToName}
                            key={crypto.randomUUID()}
                        />]);
                    }
                })
                .then(() => {
                    const date = new Date();
                    const logItem = 
                        {
                            date: date.toISOString(),
                            amount: formInput[id],
                            commodityID: dispensedCommodityData.DataElement,
                            user: user.meRequest,
                            dispensedTo: dispenseToName,
                            commodityName: dispensedCommodityData.DataElementName,
                        };
                    logQueue.push(logItem);
                }) 
        })
        log(logQueue, "dispense").catch((error) => {
            setAlerts((prev) => 
                [...prev, 
                <AlertBar critical children={"Failed to log action. " + error.toString()} 
                    key={crypto.randomUUID()}/>]
            );
        });
        setDispenseToName("")
    }
}
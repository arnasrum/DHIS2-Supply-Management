import React from "react"
import { useDataQuery } from '@dhis2/app-runtime'
import {CircularLoader,
    DropdownButton,
    FlyoutMenu,
    MenuItem
} from '@dhis2/ui'


export function UpdateCommodity(props) {

    const request = {
        request0: {
          resource: "/dataSets/ULowA8V3ucd",
          params: {
            fields: "displayName,dataSetElements[dataElement[id,displayName]]"
          }
        }
      }

    const { loading, error, data } = useDataQuery(request)
      if (error) {
          return <span>ERROR: {error.message}</span>
      }
  
      if (loading) {
          return <CircularLoader/>
      }
  
      if (data) {
        console.log(data.request0.dataSetElements[0].dataElement.displayName)
        return (
            <DropdownButton
            component={<FlyoutMenu>
                {data.request0.dataSetElements.map(elem => {
                    const names = elem.dataElement.displayName.split("- ")[1]
                    return(
                        <MenuItem key={names} label={names} id={names}></MenuItem>
                    )
                })}
                </FlyoutMenu>}
            name="buttonName"
            value="buttonValue"
            >{data.request0.displayName}</DropdownButton>
    )}
    
    return (
        <h1>UpdateCommodity</h1>
    )
}
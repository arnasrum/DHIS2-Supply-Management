import React from "react"
import { useDataQuery } from '@dhis2/app-runtime'
import {CircularLoader} from '@dhis2/ui'


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
        console.log(data.request0.dataSetElements)
        return (
            <h1>UpdateCommodity</h1>
    )}

    
    
    return (
        <h1>UpdateCommodity</h1>
    )
}
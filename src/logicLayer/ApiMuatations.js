import { useDataMutation } from "@dhis2/app-runtime";
import { getCurPeriod } from "./Helpers";
import { dataMutationQuery, dataMutationQueryMultiple } from "./apiConstants";

const getSingleChangeMutator = () => {
    /**
     * gets the mutator for the datamutation of one value
     * 
     * returns:
     *     mutate: a function whom on call does the mutation
     */
    const [mutate] = useDataMutation(dataMutationQuery);
    return mutate
}

const getMultipleChangeMutator = () => {
    /**
     * gets the mutator for the datamutation of multiple values
     * 
     * returns:
     *     mutate: a function whom on call does the mutation
     */
    const [mutate] = useDataMutation(dataMutationQueryMultiple);
    return mutate
}

const changeCommodityCount = (
    mutator, 
    value, 
    dataElement,  
    categoryOptionCombo = "HllvX50cXC0",
    period = getCurPeriod(), 
    orgUnit = "xQIU41mR69s" 
    ) => {
    /**
     * uses a mutator to do a post query
     *
     * args:
     *     mutator: the muatator data combo from the corresponding function
     *     value: the value to be changed
     *     dataElement: the id of the commodity to be changed
     *     categoryOptionCombo (default "HllvX50cXC0"): category option combo, the default id is for "default" catoegory option
     *     period (default: current period): a perdiod
     *     orgUnit (default: "xQIU41mR69s"): org unit id
    */
    // do muattion
    mutator({
            dataElement: dataElement,
            period: period,
            orgUnit: orgUnit,
            value: value,
            categoryOptionCombo: categoryOptionCombo
    });
}

const changeCommodityCountMultiple = (mutator, dataValueArray) => {
    /**
     * mutate multiple commodities
     * args:
     *     mutator: the muatator data combo from the corresponding function
     *     dataValueArray: an array which is suposed to contain a list of mapped elements of typr:
     *         value: the value to be changed
     *         dataElement: the id of the commodity to be changed
     *         categoryOptionCombo (default "HllvX50cXC0"): category option combo, the default id is for "default" catoegory option
     *         period (default: null): a perdiod, current period will be used if not provided
     *         orgUnit (default: "xQIU41mR69s"): org unit id
     */
    mutator({dataValues: dataValueArray})
}

// TODO:
//
// datastore post

export { 
    getSingleChangeMutator, 
    getMultipleChangeMutator, 
    changeCommodityCount, 
    changeCommodityCountMultiple 
}
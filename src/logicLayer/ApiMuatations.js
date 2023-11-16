import { useDataMutation } from "@dhis2/app-runtime";
import { getCurPeriod } from "./Helpers";
import { dataMutationQuery, dataMutationQueryMultiple } from "./apiConstants";
import { AlertBar } from "@dhis2/ui";

const getSingleChangeMutator = () => {
    /**
     * gets the mutator for the datamutation of one value
     * 
     * returns:
     *     mutate: a function whom on call does the mutation
     *     error: where the error message will be pressent
     */
    const [mutate, {error}] = useDataMutation(dataMutationQuery);
    return [mutate, error]
}

const getMultipleChangeMutator = () => {
    /**
     * gets the mutator for the datamutation of multiple values
     * 
     * returns:
     *     mutate: a function whom on call does the mutation
     *     error: where the error message will be pressent
     */
    const [mutate, {error}] = useDataMutation(dataMutationQueryMultiple);
    return [mutate, error]
}

const changeCommodityCount = async (
    mutator, 
    value, 
    dataElement,  
    categoryOptionCombo = "HllvX50cXC0",
    period = getCurPeriod(), 
    orgUnit = "xQIU41mR69s",
    refetch = null,
    error = null
    ) => {
    /**
     * uses a mutator to do a post query
     * this function is async
     *
     * args:
     *     mutator: the muatator data combo from the corresponding function
     *     value: the value to be changed
     *     dataElement: the id of the commodity to be changed
     *     categoryOptionCombo (default "HllvX50cXC0"): category option combo, the default id is for "default" catoegory option
     *     period (default: current period): a perdiod
     *     orgUnit (default: "xQIU41mR69s"): org unit id
     *     refetch (default: null): a function used to reftch, no refetching is done if not provided
     *     error (default: null): an error from the mutation which only is pressent on error when posting, error is not handeled if not provided
     * 
     * returns:
     *     promis: it is null if all is well, else is it a jsx alert giving an error
    */
    // do muattion
    await mutator({
            dataElement: dataElement,
            period: period,
            orgUnit: orgUnit,
            value: value,
            categoryOptionCombo: categoryOptionCombo
    });
    // on error
    if (error) {
        console.error(error)
        return (
        <AlertBar
        warning 
        key={crypto.randomUUID()}
        children={"there was an error when posting, see consol for more information"}
        />)
    }
    // refetch
    if (refetch) {
        refetch()
    }
    return null
}

const changeCommodityCountMultiple = async (
    mutator, 
    dataValueArray, 
    refetch = null,
    error = null) => {
    /**
     * mutate multiple commodities
     * this function is async
     * 
     * args:
     *     mutator: the muatator data combo from the corresponding function
     *     dataValueArray: an array which is suposed to contain a list of mapped elements of typr:
     *         value: the value to be changed
     *         dataElement: the id of the commodity to be changed
     *         categoryOptionCombo (default "HllvX50cXC0"): category option combo, the default id is for "default" catoegory option
     *         period (default: null): a perdiod, current period will be used if not provided
     *         orgUnit (default: "xQIU41mR69s"): org unit id
     *         refetch (default: null): a function used to reftch, no refetching is done if not provided
     *         error (default: null): an error from the mutation which only is pressent on error when posting, error is not handeled if not provided
     * 
     * returns:
     *     promis: it is null if all is well, else is it a jsx alert giving an error
     */
    await mutator({dataValues: dataValueArray})
    // on error
    if (error) {
        console.error(error)
        return (
        <AlertBar
        warning 
        key={crypto.randomUUID()}
        children={"there was an error when posting, see consol for more information"}
        />)
    }
    // refetch
    if (refetch) {
        refetch()
    }
    return null
}

export { 
    getSingleChangeMutator, 
    getMultipleChangeMutator, 
    changeCommodityCount, 
    changeCommodityCountMultiple 
}
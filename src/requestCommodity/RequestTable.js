import {
    ReactFinalForm,
    Button,
} from "@dhis2/ui";
import { AmountField } from "./AmountField";
import { OrgField } from "./OrgField";

export function RequestTable(props) {

    const orgs = props.orgs;

    function onSubmit(formInput) {
        console.log(formInput);
    }

    return(
        <>
            <h2>Request Table</h2> 
            <ReactFinalForm.Form onSubmit={onSubmit}>
                {({handleSubmit}) => (
                    <form onSubmit={handleSubmit}>
                        <AmountField/>
                        <OrgField orgs={orgs}/>
                       <Button type="submit"primary>Submit</Button>
                    </form>
                )} 

            </ReactFinalForm.Form>
        </>
    );

}
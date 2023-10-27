import { ReactFinalForm, Button } from "@dhis2/ui";
import { AmountField } from "./AmountField";
import { OrgField } from "./OrgField";

export function RequestTable(props) {
  const orgs = props.orgs;

  function onSubmit(formInput) {
    alert("Requested commodity from " + formInput.org.split("-")[1]);
    const date = new Date();
    const postQuery =
      "http://localhost:9999/api/dataStore/IN5320-27-requests/" +
      crypto.randomUUID();
    fetch(postQuery, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        commodityID: props.commodity,
        requestedClinic: formInput.org.split("-")[1],
        date: date.toISOString(),
        amount: formInput.requestAmount,
        requestBy: props.usersOrg,
        requestedTo: formInput.org.split("-")[0],
      }),
    })
      .then((response) => response.json())
      .then((response) => console.log(response))
      .catch((error) => console.error(error));
  }

  return (
    <>
      <h2>Request commodity from clinic</h2>
      <ReactFinalForm.Form onSubmit={onSubmit}>
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <OrgField orgs={orgs} />
            <AmountField />
            <br />
            <Button type="submit" primary>
              Submit
            </Button>
          </form>
        )}
      </ReactFinalForm.Form>
    </>
  );
}

import React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableCellHead,
    TableHead,
    TableRow,
    TableRowHead,
} from "@dhis2/ui";

import {
    ReactFinalForm,
    InputFieldFF,
    Button,
    composeValidators,
    number,
    createMinNumber,
} from "@dhis2/ui";

export function InputTable(props) {
    const onSubmit = props.onSubmit;
    const headerNames = props.headerNames;
    const propertyNames = props.propertyNames;
    // this objects needs to have DataElement key
    const data = props.data;
    return (
        <>
        <ReactFinalForm.Form onSubmit={onSubmit}>
            {({ handleSubmit, form }) => (
            <form
                onSubmit={async (event) => {
                await handleSubmit(event);
                form.reset();
                }}
                autoComplete="off"
            >
                <Table>
                <TableHead>
                    <TableRowHead>
                    {headerNames.map((item) => {
                        return (
                        <TableCellHead key={crypto.randomUUID()}>
                            {item}
                        </TableCellHead>
                        );
                    })}
                    </TableRowHead>
                </TableHead>
                <TableBody>
                    {data.map((item) => {
                    return (
                        <TableRow key={item.DataElement}>
                        {propertyNames.map((property, i) => {
                            return <TableCell key={i}>{item[property]}</TableCell>;
                        })}
                        <TableCell>
                            <ReactFinalForm.Field
                            component={InputFieldFF}
                            name={item.DataElement}
                            placeholder={"Not Selected"}
                            validate={composeValidators(
                                number,
                                createMinNumber(1)
                            )}
                            />
                        </TableCell>
                        </TableRow>
                    );
                    })}
                </TableBody>
                </Table>{" "}
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

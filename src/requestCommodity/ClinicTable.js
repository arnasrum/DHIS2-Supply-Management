import { useDataQuery } from "@dhis2/app-runtime";
import {
    CircularLoader,
    Table,
    TableBody,
    TableCell,
    TableCellHead,
    TableHead,
    TableRow,
    TableRowHead,
} from "@dhis2/ui";


export function ClinicTable(props) {

    const commodity = props.commodity;
    if(!commodity) {
        return(<h3>Input Commodity</h3>);
    }


    const request = {}

    console.log("request", request);
    props.data.map((item, i) => {
        request[i] = {
            resource: "/dataValues.json",
            params: {
                ou: item.id,
                pe: "202310",
                de: commodity,
                co: "J2Qf1jtZuj8"
            }
        }
    })
    const {error, loading, data} = useDataQuery(request);

    if(error) {
        return <span>ERROR: {error.error}</span>
    }

    if(loading) {
        return <CircularLoader/>
    }
    if(data) {
        console.log("data", data);
        return(
            <>
                <h1>Clinic Table</h1>
                <Table>
                    <TableHead>
                        <TableRowHead>
                            <TableCellHead>Clinic</TableCellHead>
                            <TableCellHead>Value</TableCellHead>
                        </TableRowHead>
                    </TableHead>
                    <TableBody>
                        {props.data.map((item, i) => {
                            return <TableRow key={crypto.randomUUID()}>
                                <TableCell>{item.id}</TableCell>
                                <TableCell>{
                                    data[i][0]
                                }</TableCell>
                            </TableRow>
                        })}
                    </TableBody>
                </Table>
            </>
        );
    }
}
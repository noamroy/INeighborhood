import './ProgramRow.scss'
import { NavLink } from "react-router-dom";

function ProgramRow(props) {
    var status = "off";
    if (props.status === true){
        status = "on";
    }
    return (
        <tr>
            <th scope="row">{props.id}</th>
            <td>{props.name}</td>
            <td>{props.startSource}</td>
            <td>{props.startDelay}</td>
            <td>{props.finishSource}</td>
            <td>{props.finishDelay}</td>
            <td>{props.status}</td>
            <td className={props.status === true ? 'statusOnClass' : 'statusOffClass'}>{status}</td>
            <td><NavLink className="btn btn-info editbtnclass" to={`/addprogram?id=${props.id}`}>Edit/Delete</NavLink></td>
        </tr>
    );
}
export default ProgramRow;
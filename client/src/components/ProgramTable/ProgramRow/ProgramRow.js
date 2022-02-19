import { NavLink } from "react-router-dom";
import './ProgramRow.scss'

function ProgramRow(props) {
    var status = "off";
    if (props.currentStatus == true){
        status = "on";
    }
    if (localStorage.getItem("group")==0){
        return (
            <tr className="program-item-row-class">
                <th className="program-item-row-class" scope="row">{props.id}</th>
                <td className="program-item-row-class">{props.name}</td>
                <td className="program-item-row-class">{props.startSource}</td>
                <td className="program-item-row-class">{props.startDelay}</td>
                <td className="program-item-row-class">{props.finishSource}</td>
                <td className="program-item-row-class">{props.finishDelay}</td>
                <td className={props.currentStatus == true ? 'statusOnClass program-item-row-class' : 'statusOffClass program-item-row-class'}>{status}</td>
                <td className="program-item-row-class"><NavLink className="btn btn-info editbtnclass" to={`/addprogram?id=${props.id}`}>Edit/Delete</NavLink></td>
            </tr>
        );
    } else {
        return(
        <tr className="program-item-row-class">
            <th className="program-item-row-class" scope="row">{props.id}</th>
            <td className="program-item-row-class">{props.name}</td>
            <td className="program-item-row-class">{props.startSource}</td>
            <td className="program-item-row-class">{props.startDelay}</td>
            <td className="program-item-row-class">{props.finishSource}</td>
            <td className="program-item-row-class">{props.finishDelay}</td>
            <td className={props.status === true ? 'statusOnClass program-item-row-class' : 'statusOffClass program-item-row-class'}>{status}</td>
            <td className="program-item-row-class">Unauthorized</td>
        </tr>
        )
    }
    
}
export default ProgramRow;
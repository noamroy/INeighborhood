import React, { useState } from "react";
import './SystemRow.scss'
import constants from '../../../static/constants'
import axios from 'axios';
import { NavLink } from "react-router-dom";



function SystemRow(props) {
    const [status, setStatus] = React.useState([]);


    React.useEffect(() => {
        if(props.mode === 'automate'){
        const url = `${constants.host}/api/program/${props.program}`;
        axios.get(url)
            .then(function (response) {
                if(response.data.currentStatus === 1){
                    setStatus('On')
                }
                else{
                    setStatus('Off')
                }
                
            })
            .catch(function (error) {
                console.log(error);
            });
        }
        if(props.mode==='manual-on'){
            setStatus('On')
        }
        else{
            setStatus('Off')
        }
    }, []);
    function handleMapChange(newValue) {
        console.log("SystemRow map change")
        console.log(newValue)
        props.mapChangeFunction(newValue);
    }
    
    return (
        <tr>
            <th scope="row">{props.id}</th>
            <td>{props.name}</td>
            <td><p onClick={()=> handleMapChange(props.address)} className="clickAbleP" value={props.address}>{props.address}</p></td>
            <td>{props.ip}</td>
            <td>{props.mode}</td>
            <td>{props.type}</td>
            <td className={status === 'On'?'statusOnClass':'statusOffClass'}>{status}</td>
            <td><NavLink className="btn btn-info editbtnclass" to={`/addsystem?id=${props.id}`}>Edit/Delete</NavLink></td>
        </tr>
    );
}
export default SystemRow;
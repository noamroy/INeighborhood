import React, { useState } from "react";
import { NavLink } from 'react-router-dom';

function SystemRow(props) {
    return (
        <tr>
            <th scope="row">{props.id}</th>
            <td>{props.name}</td>
            <td><p class="clickAbleP" onclick="setMap(\''+s.address+'\')">{props.address}</p></td>
            <td>{props.ip}</td>
            <td>{props.mode}</td>
            <td>{props.type}</td>
            <td>{props.current_status}</td>
            <td><span class="btn btn-info editbtnclass" id="editbtnid-' + s.id + '" h>Edit/Delete</span></td>
        </tr>
    );
}

export default SystemRow;
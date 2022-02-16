import React, { useState } from "react";
import './UserRow.scss'
import constants from '../../../static/constants'
import axios from 'axios';



function UserRow(props) {
    const [id, setId] = React.useState(props.id);
    const [name, setName] = React.useState(props.name);
    const [group, setGroup] = React.useState(props.group);


    React.useEffect(() => {
        document.getElementById(`group-UserId-${props.id}`).value = group;
    }, []);

    async function handleSubmitUserGroup(event) {

        event.preventDefault();
        const value = document.getElementById(`group-UserId-${props.id}`).value;
        const url = `${constants.hostNoam}user/${props.id}`;

        const data = { group: value };
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `token ${localStorage.getItem('token')}`
        };
        axios.put(url, data, { headers })
            .then(response => alert(`User id:${props.id} group updated`))
            .catch(function (error) {
                alert("Error Updating user group")
            })
    }
    return (
        <tr>
            <th className="row-item-index" scope="row">{props.id}</th>
            <td className="row-item">{props.name}</td>
            <td className="row-item">
                <form className="formclass" id="systemForm">
                    <div className="col-12">
                        <input type="number" id={`group-UserId-${props.id}`} min="0" max="5" name={`group-UserId-${props.id}`} className="form-control" />
                    </div>
                    <div id="button place">
                        <button id="submitBtn" className="formBtn btn btn-info" onClick={handleSubmitUserGroup}>Save</button>
                    </div>
                </form>
            </td>
        </tr>
    );
}
export default UserRow;
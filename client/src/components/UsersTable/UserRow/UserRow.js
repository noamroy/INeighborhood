import React, { useState } from "react";
import './UserRow.scss'
import constants from '../../../static/constants'
import axios from 'axios';



function UserRow(props) {
    const [id, setId] = React.useState("");
    const [name, setName] = React.useState("");
    const [group, setGroup] = React.useState(0);


    React.useEffect(() => {
        
    }, []);

    async function handleSubmitUserGroup() {
        console.log("Submiting")
        const value = document.getElementById(`group-UserId-${props.id}`).value;
        const url = `${constants.hostNoam}user/${props.id}`;
        const res = await fetch(url, {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `token ${localStorage.getItem('token')}`
            },
            body: {
                group: value
            }
        })
        const resjson = await res.json();
        console.log(resjson);
        if (resjson.status == 200) {
            alert("User Group Updated");
        }
        else {
            alert("User Group Update error");
        }
    }
    return (
        <tr>
            <th className="row-item-index" scope="row">{props.id}</th>
            <td className="row-item">{props.name}</td>
            <td className="row-item">
                <form className="formclass" id="systemForm">
                    <div className="col-12">
                        <input type="number" id={`group-UserId-${props.id}`} min="0" max="5" name={`group-UserId-${props.id}`} className="form-control"  />
                    </div>
                    <div id="button place">
                        <button id="submitBtn" className="formBtn" onClick={handleSubmitUserGroup}>Save</button>
                    </div>
                </form>
            </td>
        </tr>
    );
}
export default UserRow;
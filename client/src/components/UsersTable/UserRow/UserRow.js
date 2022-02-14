import React, { useState } from "react";
import './UserRow.scss'
import constants from '../../../static/constants'
import axios from 'axios';



function UserRow(props) {
    const [id, setName] = React.useState("");
    const [name, setName] = React.useState("");
    const [group, setGroup] = React.useState(0);


    React.useEffect(() => {
    }, []);
    function handleSubmit() {
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
        if (res.status == 200) {
            alert("User Group Updated");
        }
        else{
            alert("User Group Update error");
        }
    }
    return (
        <tr>
            <th scope="row">{props.id}</th>
            <td>{props.name}</td>
            <td>
                {props.group}
                <form className="formclass" id="systemForm">
                    <div className="col-12">
                        <label className="visually-hidden">Group</label>
                        <br />
                        <input type="number" id={`group-UserId-${props.id}`} min="0" max="5" name={`group-UserId-${props.id}`} className="form-control" value={props.group} />
                    </div>
                    <div id="button place">
                        <button id="submitBtn" className="formBtn" onClick={this.handleSubmit}>Save</button>
                    </div>
                </form>
            </td>
        </tr>
    );
}
export default UserRow;
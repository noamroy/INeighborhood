import React from "react";
import constants from "../../static/constants";
import UserRow from "./UserRow/UserRow";
import axios from 'axios';
import './UsersTable.scss';
function UsersTable(props) {
    const [data, setData] = React.useState([]);


    React.useEffect(() => {
        const url = `${constants.hostNoam}user`;
        axios.get(url, {
            headers: {
                'Authorization': `token ${localStorage.getItem('token')}`
            }
        })
            .then(function (response) {
                setData(response.data)

            })
            .catch(function (error) {
                alert(error);
            });
    }, []);


    React.useEffect(() => {

    }, [data]);


    return (
        <table className="usersTableClass" id="systemstable">
            <thead className="thead-dark">
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Group</th>
                </tr>
            </thead>
            <tbody>
                {data.map((value, index) => {
                    return <UserRow key={`userRowId_${value.id}`} id={value.id} name={value.name} group={value.group} />
                })}
            </tbody>
        </table>
    )
}

export default UsersTable;
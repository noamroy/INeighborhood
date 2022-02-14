import React from "react";
import constants from "../../static/constants";
import SystemRow from "./SystemRow/SystemRow";
import axios from 'axios';
import './UserRow.scss';
function UsersTable(props) {
    const [data, setData] = React.useState([]);


    React.useEffect(() => {
        const url = `${constants.hostNoam}users`;
        axios.get(url, {
            headers: {
                'Authorization': `token ${localStorage.getItem('token')}`
            }
        })
            .then(function (response) {
                setData(response.data)

            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);


    React.useEffect(() => {
        if (data.length !== 0) {
            setIsLoading(false);
        }

    }, [data]);

    function handleMapChange(newValue) {
        console.log("Table map change")
        props.onMapLocationChange(newValue);
    }

    return (
        <table className="table" id="systemstable">
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
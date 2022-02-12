import React, { useState } from "react";
import { NavLink } from 'react-router-dom';
import constants from "../../static/constants";
import SystemRow from "./SystemRow.js/SystemRow";
function SystemTable(props) {
    const [isLoading, setIsLoading] = React.useState(true);
    const [data, setData] = React.useState([]);


    React.useEffect(() => {
        const url = `${constants.host}/api/neighborhoodsystem`;
        console.log(url)
        fetch(url)
            .then((response) => {
                response.json()
            })
            .then((json) => {
                console.log(json)
                setData(json)
            })
            .catch((error) => console.log(error));
    }, []);

    React.useEffect(() => {
        if (data.length !== 0) {
            setIsLoading(false);
        }
    }, [data]);

    return (
        <table className="table" id="systemstable">
            <thead className="thead-dark">
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Address</th>
                    <th scope="col">IP</th>
                    <th scope="col">Mode</th>
                    <th scope="col">Type</th>
                    <th scope="col">Current Status</th>
                    <th scope="col">Options</th>
                </tr>
            </thead>
            <tbody>
                {data.map((value, index) => {
                    <SystemRow id={value.id} name={value.name} address={value.address} ip={value.ip} mode={value.mode} type={value.type} status={value.current_status} />
                })}
            </tbody>
        </table>
    )
}

export default SystemTable;
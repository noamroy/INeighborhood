import React from "react";
import constants from "../../static/constants";
import SystemRow from "./SystemRow.js/SystemRow";
import axios from 'axios';
function SystemTable(props) {
    const [isLoading, setIsLoading] = React.useState(true);
    const [data, setData] = React.useState([]);


    React.useEffect(() => {
        const url = `${constants.host}/api/neighborhoodsystem`;
        axios.get(url)
            .then(function (response) {
                setData(response.data)

            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);git 


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
                    return <SystemRow key={`rowId_${value.id}`} id={value.id} name={value.name} address={value.address} ip={value.ip} mode={value.mode} type={value.type} current_status={value.current_status} program={value.program} mapChangeFunction={handleMapChange}/>
                })}
            </tbody>
        </table>
    )
}

export default SystemTable;
import React from "react";
import constants from "../../static/constants";
import SystemRow from "./SystemRow/SystemRow";
import axios from 'axios';
function check_authorized(system_auth){
    const group = localStorage.getItem("group");
    if (group == 0){
        return true;
    }
    if (Math.round((system_auth%Math.pow(10,group))/(Math.pow(10,group-1)))==1){
        return true;
    }
    return false;
}
function SystemTable(props) {
    const [isLoading, setIsLoading] = React.useState(true);
    const [data, setData] = React.useState([]);

    React.useEffect(() => {
        const url = `${constants.hostNoam}neighborhoodsystem`;
        axios.get(url,{
            headers:{
                'Authorization': `token ${localStorage.getItem('token')}`
            }
        })  .then(function (response) {
                setData(response.data)
        })  .catch(function (error) {
            console.log(error);
        });
    }, []);
    React.useEffect(() => {
        if (data.length !== 0) {
            setIsLoading(false);
        }
    }, [data]);

    function handleMapChange(newValue) {
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
                    if (check_authorized(value.group)==true)
                        return <SystemRow key={`rowId_${value.id}`} id={value.id} name={value.name} address={value.address} ip={value.ip} mode={value.mode} type={value.type} program={value.program} mapChangeFunction={handleMapChange}/>
                })}
            </tbody>
        </table>
    )
}

export default SystemTable;
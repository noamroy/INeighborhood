import React from "react";
import constants from "../../static/constants";
import ProgramRow from "./ProgramRow/ProgramRow";
import axios from 'axios';
import './ProgramTable.scss'

function ProgramTable(props) {
    const [isLoading, setIsLoading] = React.useState(true);
    const [data, setData] = React.useState([]);
    React.useEffect(() => {
        const url = `${constants.hostNoam}program`;
        axios.get(url,{
            headers:{
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
        <table className="programTableClass" id="programstable">
            <thead className="thead-dark">
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Start source</th>
                    <th scope="col">Start delay</th>
                    <th scope="col">Finish source</th>
                    <th scope="col">Finish delay</th>
                    <th scope="col">Current Status</th>
                    <th scope="col">Options</th>
                </tr>
            </thead>
            <tbody>
                {data.map((value, index) => {
                    return <ProgramRow key={`rowId_${value.id}`} id={value.id} name={value.name} startSource={value.startSource} startDelay={value.startDelay} finishSource={value.finishSource} finishDelay={value.finishDelay} current_status={value.current_status} mapChangeFunction={handleMapChange}/>
                })}
            </tbody>
        </table>
    )
}

export default ProgramTable;
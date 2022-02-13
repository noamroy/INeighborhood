import { Component } from 'react';
import { updateSystems, setValuesForProgram } from './ExternalFunctions';
import constants from '../../static/constants';
import axios from 'axios';
import './SystemForm.scss'

class SystemForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formState: 'ADD',
            id: '',
            name: '',
            address: '',
            ip: '',
            program: 1,
            mode: 'automate',
            type: 'trafficLights',
            group: 0,
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeAddress = this.handleChangeAddress.bind(this);
        this.handleChangeIp = this.handleChangeIp.bind(this);
        this.handleChangeProgram = this.handleChangeProgram.bind(this);
        this.handleChangeMode = this.handleChangeMode.bind(this);
        this.handleChangeType = this.handleChangeType.bind(this);
        this.handleChangeGroup = this.handleChangeGroup.bind(this);
    }
    handleChangeName(event) {
        this.setState({ name: event.target.value });
    }
    handleChangeAddress(event) {
        this.setState({ address: event.target.value });
    }
    handleChangeIp(event) {
        this.setState({ ip: event.target.value });
    }
    handleChangeProgram(event) {
        this.setState({ program: event.target.value });
    }
    handleChangeMode(event) {
        this.setState({ mode: event.target.value });
    }
    handleChangeType(event) {
        this.setState({ type: event.target.value });
    }
    handleChangeGroup(event) {
        this.setState({ group: event.target.value });
    }

    handleSubmit(event) {
        updateSystems(this.state, this.state.formState);
        event.preventDefault();
    }
    handleDelete(event) {
        const url = `${constants.hostNoam}neighborhoodsystem/${this.state.id}`;
        axios.delete(url, {
            headers: {
                'Authorization': `token ${localStorage.getItem('token')}`
            }
        })
            .then(function (response) {
                window.location.href = '/dashboard';
            })
            .catch(function (error) {
                alert("Error Deleting item")
            });
        event.preventDefault();
    }

    async componentDidMount() {
        await setValuesForProgram();
        const idOfSystem = new URLSearchParams(window.location.search).get('id');
        const submitBtn = document.getElementById('submitBtn');
        const deleteBtn = document.getElementById('deleteBtn');
        const componentRefrence = this;
        if (idOfSystem) {
            const url = `${constants.hostNoam}neighborhoodsystem/${idOfSystem}`;
            axios.get(url, {
                headers: {
                    'Authorization': `token ${localStorage.getItem('token')}`
                }
            })
                .then(function (response) {
                    var systemItem = response.data;
                    componentRefrence.setState({
                        name: systemItem.name,
                        id: systemItem.id,
                        address: systemItem.address,
                        ip: systemItem.ip,
                        program: systemItem.program,
                        mode: systemItem.mode,
                        type: systemItem.type,
                        group: systemItem.group,
                    });
                    document.getElementById("program").value = systemItem.program;
                    document.getElementById("mode").value = systemItem.mode;
                    document.getElementById("type").value = systemItem.type;
                })
                .catch(function (error) {
                    alert("Error Loading item")
                });

            submitBtn.innerHTML = "EDIT";
            deleteBtn.style.display = "block"
            this.setState({ formState: 'EDIT' });
        }
        else {
            submitBtn.innerHTML = "ADD"
            deleteBtn.style.display = "none";
            this.setState({ formState: 'ADD' });
        }

    }

    render() {
        return (
            <form className="formclass" id="systemForm">
                <div className="form-outline mb-4">
                    <label className="form-label" >Name:</label>
                    <input type="text" id="name" name="name" className="form-control" value={this.state.name} onChange={this.handleChangeName} required />
                </div>
                <div className="form-outline mb-4">
                    <label className="form-label" >Address:</label>
                    <input type="text" id="address" name="address" className="form-control" value={this.state.address} onChange={this.handleChangeAddress} required />
                </div>
                <div className="form-outline mb-4">
                    <label className="form-label" >IP:</label>
                    <input type="text" id="ip" name="ip" className="form-control" value={this.state.ip} onChange={this.handleChangeIp} required />
                </div>
                <div className="col-12">
                    <label className="visually-hidden" >Program:</label>
                    <select className="select" id="program" name="program" onChange={this.handleChangeProgram}>
                    </select>

                    <label className="visually-hidden" >Mode:</label>
                    <br />
                    <select className="select" id="mode" name="mode" onChange={this.handleChangeMode}>
                        <option value="automate">Automate</option>
                        <option value="manual-on">Manual On</option>
                        <option value="manual-off">Manual Off</option>
                    </select>
                    <div className="col-12">
                        <label className="visually-hidden">Type</label>
                        <br />
                        <select className="select" id="type" name="type" onChange={this.handleChangeType}>
                            <option value="trafficLights">Traffic light</option>
                            <option value="streetLights">Headlight</option>
                        </select>
                    </div>
                    <div className="col-12">
                        <label className="visually-hidden">Group</label>
                        <br />
                        <input type="number" id="group" min="0" max="5" name="group" className="form-control" value={this.state.group} onChange={this.handleChangeGroup} required />
                    </div>
                </div>
                <div id="button place">
                    <button id="submitBtn" className="formBtn" onClick={this.handleSubmit}>Add</button>
                    <button id="deleteBtn" className="formBtn" onClick={this.handleDelete}>Delete</button>
                </div>
            </form>
        );
    }
}

export default SystemForm;

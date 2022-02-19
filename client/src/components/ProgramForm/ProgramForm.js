import { Component } from 'react';
import { updateProgram } from './ExternalFunctions';
import constants from '../../static/constants';
import Button from "react-bootstrap/Button";
import axios from 'axios';
import './ProgramForm.scss'

class ProgramForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formState: 'ADD',
            id: '',
            name: '',
            startSource: 'localTime',
            startDelay: 0,
            finishSource: 'localTime',
            finishDelay: 0,
            currentStatus: false,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeStartSource = this.handleChangeStartSource.bind(this);
        this.handleChangeStartDelay = this.handleChangeStartDelay.bind(this);
        this.handleChangeFinishSource = this.handleChangeFinishSource.bind(this);
        this.handleChangeFinishDelay = this.handleChangeFinishDelay.bind(this);
    }
    handleChangeName(event) {
        this.setState({ name: event.target.value });
    }
    handleChangeStartSource(event) {
        this.setState({ startSource: event.target.value });
    }
    handleChangeStartDelay(event) {
        this.setState({ startDelay: event.target.value });
    }
    handleChangeFinishSource(event) {
        this.setState({ finishSource: event.target.value });
    }
    handleChangeFinishDelay(event) {
        this.setState({ finishDelay: event.target.value });
    }
    handleSubmit(event) {
        updateProgram(this.state, this.state.formState);
        event.preventDefault();
    }
    handleDelete(event) {
        const url = `${constants.hostNoam}program/${this.state.id}`;
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
        const idOfProgram = new URLSearchParams(window.location.search).get('id');
        const submitBtn = document.getElementById('submitBtn');
        const deleteBtn = document.getElementById('deleteBtn');
        const componentRefrence = this;
        if (idOfProgram) {
            const url = `${constants.hostNoam}program/${idOfProgram}`;
            axios.get(url, {
                headers: {
                    'Authorization': `token ${localStorage.getItem('token')}`
                }
            })
                .then(function (response) {
                    var programItem = response.data;
                    componentRefrence.setState({
                        name: programItem.name,
                        id: programItem.id,
                        startSource: programItem.startSource,
                        startDelay: programItem.startDelay,
                        finishSource: programItem.finishSource,
                        finishDelay: programItem.finishDelay,
                        currentStatus: false,
                    });
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
            <form className="formclass" id="programForm">
                <div className="form-outline mb-4 programNameDiv">
                    <label className="form-label" >Name:</label>
                    <input type="text" id="name" name="name" className="form-control" value={this.state.name} onChange={this.handleChangeName} required />
                </div>
                <div className="form-outline mb-4 programStartSourceDiv">
                    <label className="form-label" >Start source:</label>
                    <select name="startSource" id="startSource" className="form-control" value={this.state.startSource} onChange={this.handleChangeStartSource} required>
                        <option value="localTime">localTime(00:00)</option>
                        <option value="sunRise">sunRise</option>
                        <option value="sunSet">sunSet</option>
                    </select>
                </div>
                <div className="form-outline mb-4 programStartDelayDiv">
                    <label className="form-label" >Start delay (in minutes):</label>
                    <input type="number" id="startDelay" name="startDelay" className="form-control" min="0" max="1440" value={this.state.startDelay} onChange={this.handleChangeStartDelay} required />
                </div>
                <div className="form-outline mb-4 programFinishSourceDiv">
                    <label className="form-label" >Finish source:</label>
                    <select name="finishSource" id="finishSource" className="form-control" value={this.state.finishSource} onChange={this.handleChangeFinishSource} required>
                        <option value="localTime">localTime(00:00)</option>
                        <option value="sunRise">sunRise</option>
                        <option value="sunSet">sunSet</option>
                    </select>
                </div>
                <div className="form-outline mb-4 programFinishDelayDiv">
                    <label className="form-label" >Finish delay (in minutes):</label>
                    <input type="number" id="finishDelay" name="finishDelay" className="form-control" min="0" max="1440" value={this.state.finishDelay} onChange={this.handleChangeFinishDelay} required />
                </div>
                <div className="programButtonsDiv">
                    <Button block size="lg" id="submitBtn" className="formBtn" onClick={this.handleSubmit}>Add</Button>
                    <br />
                    <Button variant="danger" block size="lg" id="deleteBtn" className="formBtn" onClick={this.handleDelete}>Delete</Button>
                </div>
            </form>
        );
    }
}

export default ProgramForm;

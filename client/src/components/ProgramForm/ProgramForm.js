import { Component } from 'react';
import { updateProgram } from './ExternalFunctions';
import constants from '../../static/constants';
import axios from 'axios';
import './ProgramForm.scss'

class ProgramForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formState: 'ADD',
            id: '',
            name: '',
            startSource: '',
            startDelay: 0,
            finishSource: '',
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
        this.setState({ mode: event.target.value });
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
        await setValuesForProgram();
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
                    /*document.getElementById("program").value = programItem.program;
                    document.getElementById("mode").value = programItem.mode;
                    document.getElementById("type").value = programItem.type;*/
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
                <div className="form-outline mb-4">
                    <label className="form-label" >Name:</label>
                    <input type="text" id="name" name="name" className="form-control" value={this.state.name} onChange={this.handleChangeName} required />
                </div>
                <div className="form-outline mb-4">
                    <label className="form-label" >Start source:</label>
                    <select name="startSource" id="startSource" className="form-control" value={this.state.startSource} onChange={this.handleChangeStartSource} required>
                        <option value="localTime">localTime(00:00)</option>
                        <option value="sunRise">sunRise</option>
                        <option value="sunSet">sunSet</option>
                    </select>
                </div>
                <div className="form-outline mb-4">
                    <label className="form-label" >Start delay (in minutes):</label>
                    <input type="number" id="startDelay" name="startDelay" className="form-control" min="0" max="1440" value={this.state.startDelay} onChange={this.handleChangeStartDelay} required />
                </div>
                <div className="form-outline mb-4">
                    <label className="form-label" >Finish source:</label>
                    <select name="finishSource" id="finishSource" className="form-control" value={this.state.finishSource} onChange={this.handleChangeFinishSource} required>
                        <option value="localTime">localTime(00:00)</option>
                        <option value="sunRise">sunRise</option>
                        <option value="sunSet">sunSet</option>
                    </select>
                </div>
                <div className="form-outline mb-4">
                    <label className="form-label" >Finish delay (in minutes):</label>
                    <input type="number" id="finishDelay" name="finishDelay" className="form-control" min="0" max="1440" value={this.finish.startDelay} onChange={this.handleChangeFinishDelay} required />
                </div>
                <div id="button place">
                    <button id="submitBtn" className="formBtn" onClick={this.handleSubmit}>Add</button>
                    <button id="deleteBtn" className="formBtn" onClick={this.handleDelete}>Delete</button>
                </div>
            </form>
        );
    }
}

export default ProgramForm;

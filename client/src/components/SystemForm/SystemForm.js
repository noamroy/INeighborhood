import { Component } from 'react';
import { updateSystems, setValuesForProgram } from './ExternalFunctions';
import Button from "react-bootstrap/Button";
import constants from '../../static/constants';
import axios from 'axios';
import './SystemForm.scss'
import { parseTwoDigitYear } from 'moment';

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
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeAddress = this.handleChangeAddress.bind(this);
        this.handleChangeIp = this.handleChangeIp.bind(this);
        this.handleChangeProgram = this.handleChangeProgram.bind(this);
        this.handleChangeMode = this.handleChangeMode.bind(this);
        this.handleChangeType = this.handleChangeType.bind(this);
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
    handleSubmit(event) {
        var groupValue=0;
        for (let index = 1; index <= 5; index++) {
            if (document.getElementById(`group${index}`).checked==true){
                groupValue+=Math.pow(10,index-1);
                console.log(`group${index} is checkd group value = ${groupValue}`);
            }       
        }
        updateSystems(this.state, this.state.formState, groupValue);
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
                    
                    var check1= document.getElementById("group1");
                    var check2= document.getElementById("group2");
                    var check3= document.getElementById("group3");
                    var check4= document.getElementById("group4");
                    var check5= document.getElementById("group5");
                    const defaultGroup = systemItem.group;
                    if (Math.round(defaultGroup/10000)==1){
                        check5.defaultChecked=true;
                    }
                    if ((Math.round(defaultGroup%10000/1000))==1){
                        check4.defaultChecked=true;
                    }
                    if ((Math.round(defaultGroup%1000/100))==1){
                        check3.defaultChecked=true;
                    }
                    if ((Math.round(defaultGroup%100/10))==1){
                        check2.defaultChecked=true;
                    }
                    if ((defaultGroup%10)==1){
                        check1.defaultChecked=true;
                    }
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
            <form className="systemFormClass" id="systemForm">
                <div className="form-outline mb-4 systemNameDiv">
                    <label className="form-label" >Name:</label>
                    <input type="text" id="name" name="name" className="form-control inputPlaceClass" value={this.state.name} onChange={this.handleChangeName} required />
                </div>
                <div className="form-outline mb-4 systemAddressDiv">
                    <label className="form-label" >Address:</label>
                    <input type="text" id="address" name="address" className="form-control inputPlaceClass" value={this.state.address} onChange={this.handleChangeAddress} required />
                </div>
                <div className="form-outline mb-4 systemIpDiv">
                    <label className="form-label" >IP:</label>
                    <input type="text" id="ip" name="ip" className="form-control inputPlaceClass" value={this.state.ip} onChange={this.handleChangeIp} required />
                </div>
                <div className="col-12 systemProgramDiv">
                    <label className="visually-hidden" >Program:</label>
                    <select className="select inputPlaceClass" id="program" name="program" onChange={this.handleChangeProgram}>
                    </select>
                </div>
                <div className="col-12 systemModeDiv">
                    <label className="visually-hidden" >Mode:</label>
                    <select className="select inputPlaceClass" id="mode" name="mode" onChange={this.handleChangeMode}>
                        <option value="automate">Automate</option>
                        <option value="manual-on">Manual On</option>
                        <option value="manual-off">Manual Off</option>
                    </select>
                </div>
                <div className="col-12 systemTypeDiv">
                    <label className="visually-hidden">Type</label>
                    <select className="select inputPlaceClass" id="type" name="type" onChange={this.handleChangeType}>
                        <option value="trafficLights">Traffic light</option>
                        <option value="streetLights">Headlight</option>
                    </select>
                </div>
                <div className="col-12 systemGroupDiv">
                    <div>
                    <label className="visually-hidden">Authorization user groups: </label>
                    </div>
                    <div>
                    <label> group1 </label>                    
                    <input type="checkbox" id="group1" />
                    </div>
                    <div>
                    <label> group2 </label>                    
                    <input type="checkbox" id="group2" />
                    </div>
                    <div>
                    <label> group3 </label>                    
                    <input type="checkbox" id="group3" />
                    </div>
                    <div>
                    <label> group4 </label>                    
                    <input type="checkbox" id="group4" />
                    </div>
                    <div>
                    <label> group5 </label>                    
                    <input type="checkbox" id="group5" />
                    </div>
                </div>
                <div id="button place" className='systemButtonsDiv'>
                    <Button block size="lg" id="submitBtn" className="formBtn" onClick={this.handleSubmit}>Add</Button>
                    <br />
                    <Button variant="danger" block size="lg" id="deleteBtn" className="formBtn" onClick={this.handleDelete}>Delete</Button>
                </div>
            </form>
        );
    }
}

export default SystemForm;
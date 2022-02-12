import { Component } from 'react';
import {updateSystems,setValuesForProgram} from './ExternalFunctions';
import './SystemForm.scss'

class SystemForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formState:'ADD',
            id: '',
            name: '',
            address: '',
            ip: '',
            program: '',
            mode: '',
            type: '',
        };

        this.handleSubmit = this.handleSubmit.bind(this);
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
        updateSystems(this.state,this.state.formState)
        event.preventDefault();
    }
    componentDidMount(){
        setValuesForProgram();
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
                    <input type="text" id="ip" name="ip" className="form-control"  value={this.state.ip} onChange={this.handleChangeIp} required />
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
                        <label className="visually-hidden" for="inlineFormSelectPref">Type</label>
                        <br />
                        <select className="select" id="type" name="type" onChange={this.handleChangeType}>
                            <option value="trafficLights">Traffic light</option>
                            <option value="streetLights">Headlight</option>
                        </select>
                    </div>
                </div>
                <div id="button place">
                    <button className="formBtn" onClick={this.handleSubmit}>Add</button>
                </div>
            </form>
        );
    }
}

export default SystemForm;

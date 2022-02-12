import  { Component } from 'react';
import './RegisterForm.scss'

class RegisterForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id:null,
            firstName: '',
            lastName: '',
            password: '',
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeID = this.handleChangeID.bind(this);
        this.handleChangeFirstName = this.handleChangeFirstName.bind(this);
        this.handleChangeLastName = this.handleChangeLastName.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
    }
    handleChangeID(event) {
        this.setState({ id: event.target.value });
    }
    handleChangeFirstName(event) {
        this.setState({ firstName: event.target.value });
    }
    handleChangeLastName(event) {
        this.setState({ lastName: event.target.value });
    }
    handleChangePassword(event) {
        this.setState({ password: event.target.value });
    }

    handleSubmit(event) {
        this.props.formCallback(this.state);
        event.preventDefault();
    }

    render(){
        return (
                <form class="form-class" >
                    <label>
                        <div className="input-label">ID:</div>
                        <input className="input-text" type="text" value={this.state.id} onChange={this.handleChangeID}  />
                    </label>
                    <label>
                        <div className="input-label">First Name:</div>
                        <input className="input-text" type="text" value={this.state.firstName} onChange={this.handleChangeFirstName}  />
                    </label>
                    <label>
                        <div className="input-label">First Name:</div>
                        <input className="input-text" type="text" value={this.state.lastName} onChange={this.handleChangeLastName}  />
                    </label>
                    <label>
                        <div className="input-label">Password:</div>
                        <input className="input-text" type="password" value={this.state.price} onChange={this.handleChangePrice}  />
                    </label>
                    <button className="" onClick={this.handleSubmit}>Register</button>
                </form>
        );
    }
}

export default RegisterForm;

import  { Component } from 'react';
import './LoginForm.scss'

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id:'',
            firstName: '',
            lastName: '',
            password: '',
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeID = this.handleChangeID.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
    }
    handleChangeID(event) {
        this.setState({ id: event.target.value });
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
                <form className="form-class" >
                    <label>
                        <div className="input-label">ID:</div>
                        <input className="input-text" type="text" value={this.state.id} onChange={this.handleChangeID}  />
                    </label>
                    <label>
                        <div className="input-label">Password:</div>
                        <input className="input-text" type="password" value={this.state.price} onChange={this.handleChangePrice}  />
                    </label>
                    <button className="" onClick={this.handleSubmit}>Login</button>
                </form>
        );
    }
}

export default LoginForm;

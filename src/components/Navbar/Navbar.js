import React, { Component } from 'react';

import './Navbar.scss';

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }
    componentDidMount() {
    }
    render() {
        if (localStorage.getItem("group")==0){
            return (            //ADMINISTRATOR USER NAV
                <ul className="navigation">
                    <a href = "#" onClick={()=>{this.props.pageChange("systemPage");this.props.modeChange("list")}}><li>Systems List</li></a>
                    <a href = "#" onClick={()=>{this.props.pageChange("systemPage");this.props.modeChange("add")}}><li>Add System</li></a>
                    <a href = "#" onClick={()=>{this.props.pageChange("programPage");this.props.modeChange("list")}}><li>Program List</li></a>
                    <a href = "#" onClick={()=>{this.props.pageChange("programPage");this.props.modeChange("add")}}><li>Add Program</li></a>
                    <a href = "#" onClick={()=>{this.props.pageChange("userPage");this.props.modeChange("list")}}><li>User List</li></a>
                    <a href = "#" onClick={()=>{this.props.pageChange("userPage");this.props.modeChange("add")}}><li>Add User</li></a>
                    <a href = "#" onClick={()=>this.props.onLogout()}>Logout</a>
                </ul>
            );
        } else {                //REGULAR USER NAV
            return (
                <ul className="navigation">
                    <a href = "#" onClick={()=>{this.props.pageChange("systemPage");this.props.modeChange("list")}}><li>Systems List</li></a>
                    <a href = "#" onClick={()=>{this.props.pageChange("systemPage");this.props.modeChange("add")}}><li>Add System</li></a>
                    <a href = "#" onClick={()=>{this.props.pageChange("programPage");this.props.modeChange("list")}}><li>Program List</li></a>
                    <a href = "#" onClick={()=>this.props.onLogout()}><li>Logout</li></a>
                </ul>
            );
        }
    }
}

export default Navbar;
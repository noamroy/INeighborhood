import React, { Component } from 'react';

import SystemTable from '../SystemTable/SystemTable';

import './MainSection.scss';

class MainSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            itemId : 0,
        }
        this.handleItemIdChange=this.handleItemIdChange.bind(this);
        this.pageModeChange=this.pageModeChange.bind(this);
    }
    componentDidMount() {
        console.log(`main section: ${this.props.page} ${this.props.mode} id:${this.state.itemId}`); //DEBUG
    }
    handleItemIdChange(newId){
        if (newId!=this.state.itemId){
            console.log(`choose item number: ${newId}`);   //DEBUG
            this.setState({
                itemId: newId
            });
        }
    }
    pageModeChange(newMode){
        if (newMode!=this.props.mode){
            console.log(`go to mode: ${newMode}`);  //DEBUG
            this.props.modeChange(newMode)
        }
    }
    render() {
        switch (this.props.page) {
            case "systemPage":
                if (this.props.mode=="list" && this.state.itemId==0){
                    return(
                        <SystemTable onPress={this.handleItemIdChange} onMapLocationChange={this.props.onMapLocationChange}/>
                    );
                }   else {
                    return(
                        <h1>NOW ITS SYSTEM FORM for {this.state.itemId}</h1>
                    )
                }
                break;
            case "programPage":
                if (this.props.mode=="list"  && this.state.itemId==0){
                    return(
                        <h1>NOW ITS PROGRAM LIST</h1>
                    );
                }   else {
                    return(
                        <h1>NOW ITS PROGRAM FORM  for {this.state.itemId}</h1>
                    );
                }
                break;
            case "userPage":
                if (this.props.mode=="list"  && this.state.itemId==0){
                    return(
                        <h1>NOW ITS USER LIST</h1>
                    );
                }   else {
                    return(
                        <h1>NOW ITS USER FORM  for {this.state.itemId}</h1>
                    );
                }
                break;
            default:
                return(
                    <h1>HERE COME MAIN SECTION</h1>
                );
                break;
        }   

    }
}

export default MainSection;
import React, { Component } from "react";

import GoogleMap from "../GoogleMap/GoogleMap";
import Header from "../Header/Header";
import Navbar from "../Navbar/Navbar";
import MainSection from "../MainSection/MainSection";

import './Dashboard.scss';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mapLocation : "shenkar%20College",
            mainPage : "systemPage",
            pageMode : "list",
        };
        this.handleMapChange=this.handleMapChange.bind(this);
        this.handlemainPageChange=this.handlemainPageChange.bind(this);
        this.handlepageModeChange=this.handlepageModeChange.bind(this);
    }
    componentDidMount() {
        if(!(localStorage.getItem("token")&&localStorage.getItem("name")&&localStorage.getItem("group"))){
            alert("Unauthorized");
            this.props.onLogout();
        }
    }
    handleMapChange(newLocation){
        if (newLocation!=this.state.mapLocation){
            //console.log(`change map location to: ${newLocation}`); //DEBUG
            this.setState({
                mapLocation: newLocation
            });
        }   
    }
    handlemainPageChange(newPage){
        if (newPage!=this.state.mainPage){
            console.log(`change main section to: ${newPage}`);   //DEBUG
            this.setState({
                mainPage: newPage
            });
        }
    }
    handlepageModeChange(newPageMode){
        if (newPageMode!=this.state.pageMode){
            console.log(`change page mode to: ${newPageMode}`);   //DEBUG
            this.setState({
                pageMode: newPageMode
            });
        }
    }
    render() {
        return (
            <main>
                <Header page={this.state.mainPage}/>
                <div className="flex">
                    <Navbar onLogout={()=>this.props.onLogout("login")} pageChange={this.handlemainPageChange} modeChange={this.handlepageModeChange}/>
                    <MainSection page={this.state.mainPage} mode={this.state.pageMode} modeChange={this.handlepageModeChange} onMapLocationChange={this.handleMapChange}/>
                    <GoogleMap location={this.state.mapLocation} />
                </div>
            </main>
        );
        
    }
}
export default Dashboard;
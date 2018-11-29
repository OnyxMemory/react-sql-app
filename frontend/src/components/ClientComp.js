import React, { Component } from 'react';
import Member from './ClientMemberComp';
import './ClientComp.css'

class ClientComponent extends Component {
    constructor() {
        super();
        this.state = {
            clientList: []
        }
    }

    updateBox = (event) => {
        console.log(event.target.value)
        if(event.target.value){
            fetch(`http://127.0.0.1:5000/clientn/${event.target.value}`)
            .then(response=>response.json())
            .then(data=>this.setState({clientList: data}))
        }
        //.then(data=>this.setState({clientBox: data}))
    }

    sendId = (id) => {
        this.props.memberClick(id);
    }

    render() {
        var ren = [];
        for(var i = 0; i<this.state.clientList.length; i++){
            let clId = this.state.clientList[i][0];
            let clName = this.state.clientList[i][1];
            ren.push(
                <div>
                    <Member id={clId} name={clName} onClick={()=>this.props.memberClick(clId)}/>
                </div>
            )
        }

        return (
            <div className = "ClientComp">
                <button onClick={this.updateBox} value='all'>All Clients</button>
                <input onChange={this.updateBox}></input>
                <br/>
                <div className="Client Container">
                    {ren}
                </div>
            </div>
        )
    }
}

export default ClientComponent;
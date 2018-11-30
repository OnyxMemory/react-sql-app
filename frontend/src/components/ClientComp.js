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

    render() {

        return (
            <div className = "ClientComp">
                <button onClick={this.updateBox} value='all'>All Clients</button>
                <input onChange={this.updateBox}></input>
                <br/>
                <div className="Client Container">
                    {this.state.clientList.map((client,i)=> {
                        return <Member key={i} id={client[0]} name={client[1]} onClick = {() => this.props.memberClick(client[0])}/>
                    })}
                </div>
            </div>
        )
    }
}

export default ClientComponent;
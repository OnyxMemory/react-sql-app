import React, { Component } from 'react';
import Member from './ClientMemberComp';
import './ClientComp.css'
import '../utils/fetches'
import { getClients } from '../utils/fetches';

class ClientComponent extends Component {
    constructor() {
        super();
        this.state = {
            clientList: [],
        }
        this.search = ''
    }

    renderClients = () => {
        if(this.search){
            getClients(this.search).then(data => {
                this.setState({clientList: data})
                //console.log(data)
            });
    
        } else {
            this.setState({clientList: []})
        }
    }

    updateInput = (event) => {
        this.search=event.target.value
        this.renderClients();
    }

    render() {

        return (
            <div className = "ClientComp">
                <button onClick={this.updateInput} value='all'>All Clients</button>
                <input onChange={this.updateInput}></input>
                <br/>
                <div className="Client Container">
                    {this.state.clientList.map((client,i)=> {
                        return <Member key={i} id={client[0]} name={client[1]} onClick = {() => this.props.memberClick(client[0])} renderWait = {this.renderClients}/>
                    })}
                </div>
            </div>
        )
    }
}

export default ClientComponent;
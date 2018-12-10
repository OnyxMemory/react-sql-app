import React, { Component } from 'react';
import './ClientMemberComp.css';
import updateState from '../utils/updateField'
import '../utils/fetches'
import { postClient, deleteClient } from '../utils/fetches';

class ClientMemberComponent extends Component {
    constructor() {
        super()
        this.state = {
            displayUpdate: false,
            newName: ''
        }
    }

    updateValue = (event) => {
        this.updateState(event);
    }

    postC = () => {
        if(this.state.newName){
            postClient(this.props.id,this.state.newName).then(this.props.renderWait());
            
            // .then(response=>response.json())
            // .then(data=>console.log(data))
            // .then(this.props.renderWait());    
        }
        this.setState({displayUpdate: false});
    }
    deleteC = () => {
        deleteClient(this.props.id).then(this.props.renderWait());
            
        this.setState({displayUpdate: false});
    }
        
    
    render() {
        let updateField;
        if(this.state.displayUpdate){
            updateField = <div>
                Name:<input name='newName'onChange={this.updateValue}/>
                <br/>
                <button onClick={this.postC}>Save</button>
                <button onClick={this.deleteC}>Delete</button>
            </div>;
        } else {
            updateField='';
        }

        return (
            <div className = 'container-client'>
            <div className = 'info' onClick={() => this.props.onClick()}>
                Id: {this.props.id}
                <br/>
                Name: {this.props.name}
                <br/>  
            </div>
            <button onClick={()=>this.setState({displayUpdate: true})}>Update</button>
            {updateField}
            </div>
        )
    }

}

ClientMemberComponent.prototype.updateState=updateState;

export default ClientMemberComponent;


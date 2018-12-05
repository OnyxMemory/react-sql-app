import React, { Component } from 'react';
import './ClientMemberComp.css';
import updateState from '../utils/updateField'

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

    postClient = () => {
        if(this.state.newName){
            fetch(`http://127.0.0.1:5000/client/${this.props.id}`, {
                method: 'put',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify({
                    name: this.state.newName
                })       
            })
            .then(response=>response.json())
            .then(data=>console.log(data))
            .then(this.props.renderWait());
        }
        this.setState({displayUpdate: false});
    }
    deleteClient = () => {
        fetch(`http://127.0.0.1:5000/client/${this.props.id}`, {
                method: 'delete',
                headers: {'Content-type': 'application/json'},

            })
            .then(response=>response.json())
            .then(data=>console.log(data))
            .then(this.props.renderWait())
        this.setState({displayUpdate: false});
        }
    
    render() {
        let updateField;
        if(this.state.displayUpdate){
            updateField = <div>
                Name:<input name='newName'onChange={this.updateValue}/>
                <br/>
                <button onClick={this.postClient}>Save</button>
                <button onClick={this.deleteClient}>Delete</button>
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


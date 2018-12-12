import React, { Component } from 'react';
import './InsertComp.css'
import updateState from '../utils/updateField';
import { insertClient, insertInvoices } from '../utils/fetches';

class InsertComponent extends Component {
    constructor(){
        super();
        this.state = {
            client_name: '',
            client_id: '',
            location: '',
            total: '',
            msg: ''
        }
    }


    createEntry = (event) => {
        if (event.target.name === 'client'){
            if(this.state.client_name){
                insertClient(this.state.client_name).then(data => {
                    this.setState({msg:data,
                        client_name: ''})
                    //this.props.update();
                })
            } else {
                this.setState({msg:'Client Name is Invalid!'})
            }
        } else if (event.target.name === 'invoice'){
            if(this.state.client_id && this.state.location && this.state.total){
                insertInvoices(this.state.location,this.state.client_id,this.state.total).then(data => {
                    this.setState({msg:data,
                        location: '',
                        client_id: '',
                        total:''})
                    //this.props.update();
                })
            }else {
                this.setState({msg:'Client_ID or Location is Invalid!'})
            }
        }
    }

    updateValue = (event) => {
        this.updateState(event);
    }
    
    render(){
       return(
           <div className='insert-container'>
           Create Entries
            <div className='create-box'>
                <h4>Create Client</h4>
                Name: <input name='client_name' onChange={this.updateValue}></input>
                <br/>
                <button name='client' onClick={this.createEntry}>Submit</button>
            </div>
            <div className='create-box'>
                <h4>Create Invoice</h4>
                Client ID:<input name='client_id' onChange={this.updateValue} value={this.state.client_id}/>
                <br/>
                Location:<input name='location' onChange={this.updateValue} value={this.state.location}/>
                <br/>
                Total:<input name='total' onChange={this.updateValue} value={this.state.total}/>
                <br/>
                <button name='invoice' onClick={this.createEntry}>Submit</button>
            </div>
            <div>
                {this.state.msg}
            </div>
           </div>
       )
    }
}

InsertComponent.prototype.updateState = updateState;

export default InsertComponent;
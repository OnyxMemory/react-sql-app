import React, { Component } from 'react';
import './ClientMemberComp.css';

class ClientMemberComponent extends Component {
    render() {
        return (
            <div className = 'container-client'>
            <div className = 'info' onClick={() => this.props.onClick()}>
                Id: {this.props.id}
                <br/>
                Name: {this.props.name}
                <br/>
                
            </div>
            <button>Update</button>
            </div>
        )
    }

}

export default ClientMemberComponent;


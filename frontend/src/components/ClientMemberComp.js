import React, { Component } from 'react';
import './ClientMemberComp.css';

class ClientMemberComponent extends Component {
    render() {
        return (
            <div onClick={() => this.props.onClick()} className = 'container-client'>
                Id: {this.props.id}
                <br/>
                Name: {this.props.name}
                <br/>
            </div>
        )
    }

}

export default ClientMemberComponent;


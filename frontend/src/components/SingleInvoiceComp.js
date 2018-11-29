import React, { Component } from 'react';
import './ClientMemberComp.css'

class SingleInvoiceComponent extends Component {
    render() {
        return (
            <div className = 'container-client'>
                Id: {this.props.id}
                <br/>
                Date: {this.props.date}
                <br/>
                Location : {this.props.location}
            </div>
        )
    }

}

export default SingleInvoiceComponent;


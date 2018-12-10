import React, { Component } from 'react';
import Invoice from './SingleInvoiceComp'
import './Invoices.css'

class InvoicesComp extends Component {
    render() {
        return(
            <div className ='invoices'>
                Invoices
                {this.props.invoices.map((invoice,i)=> {
                        return <Invoice key={i} id={invoice[2]} date={invoice[3]} location={invoice[4]} total={invoice[6]}/>
                })}
            </div>
        )
    }
}

export default InvoicesComp;
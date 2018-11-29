import React, { Component } from 'react';
import Invoice from './SingleInvoiceComp'
import './Invoices.css'

class InvoicesComp extends Component {
    constructor() {
        super();
        this.state = {
            invoices: []
        }
        this.id=null;
    }

    // setData = (arg) => {
    //     this.invoices = arg;
    // }


    render() {
        var ren = [];
        for(var i = 0; i<this.state.invoices.length; i++){
            let invId = this.state.invoices[i][2];
            let invDate = this.state.invoices[i][3];
            let invLocation = this.state.invoices[i][4];
            ren.push(
                <div>
                    <Invoice id={invId} date={invDate} location={invLocation}/>
                </div>
            )
        }

        return(
            <div className ='invoices'>
                Invoices
                {ren}
            </div>
        )
    }
    componentDidUpdate () {
        if(this.props.id && this.props.id != this.id){
            this.id=this.props.id;
            fetch(`http://127.0.0.1:5000/inv/${this.props.id}`)
            .then(response=>response.json())
            .then(data=>this.setState({invoices: data}))
        }
    }
}

export default InvoicesComp;
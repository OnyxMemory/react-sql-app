import React, { Component } from 'react';
import Invoice from './SingleInvoiceComp'
import './Invoices.css'
// import { getInvoices } from '../utils/fetches';

class InvoicesComp extends Component {
    // constructor() {
    //     super();
    //     // this.state = {
    //     //     invoices: []
    //     // }
    //     // this.invoices = [];
    //     // this.id=null;
    // }

    // setData = (arg) => {
    //     this.invoices = arg;
    // }


    render() {
        // var ren = [];
        // for(var i = 0; i<this.state.invoices.length; i++){
        //     let invId = this.state.invoices[i][2];
        //     let invDate = this.state.invoices[i][3];
        //     let invLocation = this.state.invoices[i][4];
        //     ren.push(
        //         <div>
        //             <Invoice id={invId} date={invDate} location={invLocation}/>
        //         </div>
        //     )
        // }
        // getInvoices(this.props.id);

        // getInvoices(this.props.id).then(data => {this.invoices=data})
        
        return(
            <div className ='invoices'>
                Invoices
                {this.props.invoices.map((invoice,i)=> {
                        return <Invoice key={i} id={invoice[2]} date={invoice[3]} location={invoice[4]} total={invoice[6]}/>
                })}
            </div>
        )
    }
    // componentDidUpdate () {
    //     if(this.props.id && this.props.id !== this.id){
    //         this.id=this.props.id;
    //         fetch(`http://127.0.0.1:5000/inv/${this.props.id}`)
    //         .then(response=>response.json())
    //         .then(data=>this.setState({invoices: data}))
    //     }
    // }
}

export default InvoicesComp;
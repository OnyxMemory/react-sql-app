import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ClientComp from './components/ClientComp'
import InvoicesComp from './components/InvoicesComp'
import InsertComp from './components/InsertComp'
import {getInvoices} from './utils/fetches'

class App extends Component {

  constructor() {
    super()
    this.state = {
      invoices: []
    }
    this.cur_id = '';
  }

  clientClick = (id) => {
    getInvoices(id).then(data => this.setState({invoices: data}))
    // this.cur_id = id;
    // this.updateInvoices();

  }
  updateInvoices = () => {
    // getInvoices(this.cur_id).then(data => this.setState({invoices: data}))
  }


  render() {

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <div className="container">
        <div className='section'>
        <ClientComp memberClick={this.clientClick}/>
        </div>
        <div className='section'>
        <InvoicesComp invoices={this.state.invoices}/>
        </div>
        <div className='section'>
        <InsertComp update={this.updateInvoices}/>
        </div>

        </div>
      </div>
    );
  }
}

export default App;

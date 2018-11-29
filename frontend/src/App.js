import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ClientComp from './components/ClientComp'
import InvoicesComp from './components/InvoicesComp'

class App extends Component {

  constructor() {
    super()
    this.state = {
      invoicesId: null
    }
  }

  clientClick = (id) => {
    this.setState({invoicesId: id})
  }

  render() {

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <div className="container">
        <ClientComp memberClick={this.clientClick}/>
        <InvoicesComp id={this.state.invoicesId}/>
        </div>
      </div>
    );
  }
}

export default App;

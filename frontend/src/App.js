import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ClientComp from './components/ClientComp'
import InvoicesComp from './components/InvoicesComp'
import InsertComp from './components/InsertComp'

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
        <div className='section'>
        <ClientComp memberClick={this.clientClick}/>
        </div>
        <div className='section'>
        <InvoicesComp id={this.state.invoicesId}/>
        </div>
        <div className='section'>
        <InsertComp/>
        </div>

        </div>
      </div>
    );
  }
}

export default App;

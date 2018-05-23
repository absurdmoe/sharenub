import React, { Component } from 'react';
import Codewriter from './Codewriter';
import Codeexecuter from './Codeexecuter';
import './App.css';


class App extends Component {
 
  render() {
    return (
      <div className="app">
        <div className="code-holder">
          <Codewriter />
          <Codeexecuter />
        </div>
      </div>
    );
  }
}

export default App;

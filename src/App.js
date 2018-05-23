import React, { Component } from 'react';
import Codewriter from './Codewriter';
import Codeexecuter from './Codeexecuter';
import './App.css';


class App extends Component {
  state = {
    choseChannel: false,
    channel: 'default'
  }
  gotoChannel(){
    let title = this.refs.title.value;
    this.setState({
      choseChannel: true,
      channel: title
    })
  }
  render() {
    return (
      <div className="app">
        <h1>Sharenub:</h1>
        {
          this.state.choseChannel?
          <div className="code-holder">
            <Codewriter channel={this.state.channel}/>
            <Codeexecuter />
          </div>
          :
          <div>
            <h3>Create a new webpage or collaborate on your team's existing webpage:</h3>
            <form>
              <p>create a new webpage or go to your team's existing webpage by using the title they gave you:</p>
              <input placeholder="title" ref="title" />
              <button
              type="button"
              onClick={() => this.gotoChannel()} >go</button>
            </form>
          </div>
        }

      </div>
    );
  }
}

export default App;

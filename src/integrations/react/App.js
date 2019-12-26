import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
    events = [{
        start: '2019-11-26 00:00:00',
        end: '2019-11-26 04:00:00',
        title: 'testing',
        description: 'testing',
        background: '#d2e7e3'
    },
        {
            start: '2019-11-27 04:00:00',
            end: '2019-11-27 12:00:00',
            title: 'testing',
            description: 'testing',
            background: '#e9e1f1'
        }];

    test(payload) {
        console.log(payload.detail);
    }

    componentDidMount() {
        this.myRef.events = this.events;
        this.myRef.addEventListener('viewChange', this.test);
        this.myRef.addEventListener('eventUpdate', this.test);
    }

    render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
          <sm-calendar style={{'height': '600px'}} ref={myRef => this.myRef = myRef}></sm-calendar>
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import './App.css';

import AppHeader from '../AppHeader/AppHeader';
import AppMain from '../AppMain/AppMain';

class App extends Component {
  render() {
    return (
      <div className="App">
        <AppHeader />
        <AppMain />
      </div >
    );
  }
}

export default App;
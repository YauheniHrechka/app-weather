import React, { Component } from 'react';
import './App.css';

import AppHeader from '../AppHeader/AppHeader';
import AppSidebar from '../AppSidebar/AppSidebar.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <AppHeader />
        </header>
        <div className="App-sidebar">
          <AppSidebar />
        </div>
        <main className="App-main">
          <h1>Main</h1>
        </main>
      </div>
    );
  }
}

export default App;
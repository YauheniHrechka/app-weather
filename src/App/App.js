import React, { Component } from 'react';
import './App.css';

import AppSidebar from '../AppSidebar/AppSidebar';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Header</h1>
        </header>
        <div className="App-sidebar">
          <h1>Sidebar</h1>
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
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.css';

import AppHeader from '../AppHeader/AppHeader';
import AppMain from '../AppMain/AppMain';

class App extends Component {
  render() {
    let { defaultCity, defaultID } = this.props;

    return (
      <div className="App">
        <AppHeader />
        <AppMain
          defaultCity={defaultCity}
          defaultID={defaultID}
        />
      </div >
    );
  }
}

App.propTypes = {
  defaultCity: PropTypes.string,
  defaultID: PropTypes.string
}

App.defaultProps = {
  defaultCity: 'Minsk',
  defaultID: ''
}

export default App;
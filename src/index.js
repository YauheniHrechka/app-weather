import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';

let valueLocalStorage = {
  defaultCity: localStorage.getItem('defaultCity'),
  defaultID: localStorage.getItem('defaultID')
}

ReactDOM.render(
  <React.StrictMode>
    <App
      defaultCity={valueLocalStorage.defaultCity === null ? `Minsk` : valueLocalStorage.defaultCity}
      defaultID={valueLocalStorage.defaultID === null ? `` : valueLocalStorage.defaultID}
    />
  </React.StrictMode>,
  document.getElementById('root')
);
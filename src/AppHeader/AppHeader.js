import React, { Component } from 'react';
import './AppHeader.css';

class AppHeader extends Component {
    render() {
        return (
            <header className="App-header">
                <div className="header">
                    <img src="https://openweathermap.org/img/w/01d.png" alt="logo" />
                    <span>Weather in your city</span>
                </div>
            </header>
        )
    }
}

export default AppHeader;
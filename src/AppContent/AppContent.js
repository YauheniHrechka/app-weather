import React, { Component } from 'react';
import './AppContent.css';

class AppContent extends Component {
    render() {
        let { id } = this.props.city;
        // console.log(this.props);
        return (
            <h1>App content {id}</h1>
        )
    }
}

export default AppContent;
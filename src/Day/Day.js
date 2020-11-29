import React, { Component } from 'react';
import './Day.css';

class Day extends Component {
    render() {
        let { mainDate } = this.props;

        return (
            <div className="day">
                <span>{mainDate}</span>
            </div>
        )
    }
}

export default Day;
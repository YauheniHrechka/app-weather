import React from 'react';
import './Day.css';

const Day = ({ mainDate }) => {
    return (
        <div className="day">
            <span>{mainDate}</span>
        </div>
    )
}

export default Day;
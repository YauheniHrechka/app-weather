import React from 'react';
import { NavLink } from 'react-router-dom';
import './Days.css';

import Day from '../Day/Day';

const Days = ({ id, days }) => {
    return (
        <nav className="nav-days">
            <ul>
                {days.map(({ mainDate, date }) => {
                    return (
                        <li key={mainDate}>
                            <NavLink
                                exact to={`/city/${id}/${date}`}
                                activeClassName="day-active"
                            >
                                <Day mainDate={mainDate} />
                            </NavLink>
                        </li>
                    )
                })}
            </ul>
        </nav>
    )
}

export default Days;
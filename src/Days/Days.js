import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './Days.css';

import Day from '../Day/Day';

class Days extends Component {
    render() {
        let { id, arrDays } = this.props;

        return (
            <nav className="nav-days">
                <ul>
                    {arrDays.map(({ mainDate, date }) => {
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
}

export default Days;
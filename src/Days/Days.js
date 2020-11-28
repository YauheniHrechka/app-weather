import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './Days.css';

class Days extends Component {

    render() {
        let { id, arrDays } = this.props;
        console.log(this.props);
        return (
            <nav className="nav-days">
                <ul>
                    {arrDays.map(({ mainDate, date }) => {
                        return (
                            <li key={mainDate}>
                                <NavLink
                                    exact
                                    to={`/city/${id}/${date}`}
                                    activeClassName="day-active"
                                >
                                    {mainDate}
                                </NavLink>
                            </li>
                        )
                    })}
                </ul>
            </nav>
        )
    }
}

{/* <div className="day">
                <span>{mainDate}</span>
            </div> */}

export default Days;
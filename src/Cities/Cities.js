import React from 'react';
import { NavLink } from 'react-router-dom';
import './Cities.css';

import City from '../City/City';

function Cities(props) {
    let { arrCites, currentDate } = props;

    return (
        <nav className="cities">
            <ul>
                {arrCites.map((city, index) => {
                    return (
                        <li key={city.id}>
                            <NavLink
                                exact
                                to={`/city/${city.id}/${currentDate}`}
                                activeClassName="city-active"
                            >
                                <City city={city} />
                            </NavLink>
                        </li>
                    )
                })}
            </ul>
        </nav >
    )
}

export default Cities;
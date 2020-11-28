import React from 'react';
import { NavLink } from 'react-router-dom';
import './Cities.css';

import City from '../City/City';

function Cities(props) {
    let { arrCites } = props;

    return (
        <nav className="cities">
            <ul>
                {arrCites.map(city => {
                    return (
                        <li key={city.id}>
                            <NavLink
                                exact
                                to={`/city/${city.id}`}
                                activeClassName="city-active"
                            >
                                <City city={city} />
                            </NavLink>
                        </li>
                    )
                })}
            </ul>
        </nav>
    )
}

export default Cities;
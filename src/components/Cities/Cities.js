import React from 'react';
import { NavLink } from 'react-router-dom';
import './Cities.css';

import City from '../City/City';

const Cities = ({ cities, currentDate }) => {
    return (
        <nav className="cities">
            <ul>
                {cities.map(city => {
                    return (
                        <li key={city.id}>
                            <NavLink
                                exact to={`/city/${city.id}/${currentDate}`}
                                isActive={match => {
                                    if (match) return true;
                                }}
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
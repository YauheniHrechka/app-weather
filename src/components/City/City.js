import React from 'react';
import './City.css';

const City = ({ city: { main, name, sys, weather } }) => {

    let { description, icon } = weather[0];
    let temperature = main.temp;
    let country = sys.country.toLowerCase();

    return (
        <div className="city">
            <div className="city-header">
                <div>
                    <span><b>{`${name}, ${sys.country}`}</b></span>
                    <img className="offset" src={`http://openweathermap.org/images/flags/${country}.png`} alt={country} />
                </div>
                <div>
                    <em className="offset">{description}</em>
                </div>
            </div>

            <div className="temperature">
                <img src={`https://openweathermap.org/img/w/${icon}.png`} alt={`temperature ${icon}`} />
                <span className="offset"><b>{`${temperature} °C`}</b></span>
            </div>
        </div>
    )
}

export default City;
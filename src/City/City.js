import React, { Component } from 'react';
import './City.css';

class City extends Component {
    // constructor(props) {
    //     super(props);
    // }

    getTemperature = (temp) => {
        return (temp - 273).toFixed(2);
    }

    getCountry = (country) => {
        return country.toLowerCase();
    }

    render() {
        let { main, name, sys, weather } = this.props.city;
        let { description, icon } = weather[0];

        let temperature = this.getTemperature(main.temp);
        let country = this.getCountry(sys.country);

        // console.log(name);
        return (
            <div className="city">
                <span><b>{`${name}, ${sys.country}`}</b></span>
                <img className="offset" src={`http://openweathermap.org/images/flags/${country}.png`} alt={country} />
                <em className="offset">{description}</em>

                <div className="temperature">
                    <img src={`https://openweathermap.org/img/w/${icon}.png`} alt={`temperature ${icon}`} />
                    <span className="offset"><b>{`${temperature} °C`}</b></span>
                </div>
            </div>
        )
    }
}

export default City;
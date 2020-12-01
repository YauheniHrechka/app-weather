import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './AppContent.css';

import Days from '../Days/Days';
import Chart from '../Chart/Chart';

class AppContent extends Component {
    state = {
        arrDays: []
    }

    getConverterDate = (UNIX_timestamp) => {
        let a = new Date(UNIX_timestamp * 1000);
        let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        return {
            year: a.getFullYear(),
            monthName: months[a.getMonth()],
            month: a.getMonth() + 1,
            date: a.getDate(),
            hours: a.getHours()
        }
    }

    setArrDays = (arrForecast) => {

        let arrDates = [];
        let arrData = [];
        let arrLabels = [];         // array of labels ...
        let arrTemps = [];          // array of temperatures ...
        let arrIcons = [];          // array of icons ...
        let tempDate = "";

        arrForecast.forEach(({ dt, weather, main, wind }, index) => {

            let { icon, description } = weather[0];
            let objDate = this.getConverterDate(dt);

            let currentStrDate = `${objDate.monthName} ${objDate.date}`;
            let currentDate = `${objDate.year}${objDate.month}${objDate.date}`;
            let currentTime = `${objDate.hours}:00`;

            if (index === 0) {
                tempDate = currentStrDate;
            }

            if (tempDate !== currentStrDate) {
                arrDates.push({
                    "mainDate": arrData[0].strDate,
                    "date": arrData[0].date,
                    "forecast": arrData,
                    "labels": arrLabels,
                    "temps": arrTemps,
                    "icons": arrIcons
                });

                tempDate = currentStrDate;
                arrData = [];
                arrLabels = [];
                arrTemps = [];
                arrIcons = [];
            }

            arrLabels.push(currentTime);
            arrTemps.push(main.temp);

            let currentIcon = new Image();
            currentIcon.src = `https://openweathermap.org/img/w/${icon}.png`;

            arrIcons.push(currentIcon);

            arrData.push({
                strDate: currentStrDate,
                date: currentDate,
                time: currentTime,
                icon: icon,
                temp: main.temp,
                tempSymbol: main.temp >= 0 ? '+' : '-',
                description: description,
                speed: wind.speed,
                humidity: main.humidity,
                pressure: main.pressure
            });
        });

        this.setState({ arrDays: arrDates });
    }

    componentDidMount = () => {

        let { id } = this.props.city;

        let promiseCities = new Promise((resolve, reject) => {
            fetch(`http://api.openweathermap.org/data/2.5/forecast?id=${id}&units=metric&appid=70e1ed322b02acbc57d443dd91065f3e`)
                .then(data => {
                    resolve(data.json())
                })
        });

        promiseCities
            .then(data => {
                this.setArrDays(data.list);
            });
    }

    getCountry = (country) => {
        return country.toLowerCase();
    }

    render() {
        let { id, name, sys, weather } = this.props.city;
        let { arrDays } = this.state;
        let { description } = weather[0];
        let country = this.getCountry(sys.country);

        return (
            <Router>
                <div className="App-content">
                    <div className="header-content">
                        <span><b>{`${name}, ${sys.country}`}</b></span>
                        <img className="offset" src={`http://openweathermap.org/images/flags/${country}.png`} alt={country} />
                        <em className="offset">{description}</em>
                    </div>
                    <Days id={id} arrDays={arrDays} />
                    <Switch>
                        {arrDays.map(day => {
                            return (
                                <Route
                                    key={day.mainDate}
                                    exact path={`/city/${id}/${day.date}`}
                                    render={() => <Chart day={day} />}
                                />
                            )
                        })}
                    </Switch>
                </div>
            </Router>
        )
    }
}

export default AppContent;
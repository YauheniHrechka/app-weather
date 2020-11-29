import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Router, Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import './AppMain.css';

import Cities from '../Cities/Cities';
import AppContent from '../AppContent/AppContent';

const history = createBrowserHistory();

class AppMain extends Component {
    state = {
        arrCites: []
    };

    componentDidMount = () => {
        let { defaultCity } = this.props;
        this.getArrCities(defaultCity);
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

    getArrCities = (curCity) => {
        if (curCity === "" || curCity.length <= 2) {
            return;
        }

        let promiseCities = new Promise((resolve, reject) => {
            fetch(`http://api.openweathermap.org/data/2.5/find?q=${curCity}&units=metric&appid=70e1ed322b02acbc57d443dd91065f3e`)
                .then(data => {
                    resolve(data.json())
                });
        });

        promiseCities
            .then(data => {
                this.setState({ arrCites: data.list });
            });
    }

    handleChange = (e) => {
        let curCity = e.target.value.trim().toLowerCase();
        this.getArrCities(curCity);
    }

    render() {
        let { defaultCity, defaultID } = this.props;
        let { arrCites } = this.state;

        // get current date ...
        let currentDate = '';
        if (arrCites.length > 0) {
            let objDate = this.getConverterDate(arrCites[0].dt);
            currentDate = `${objDate.year}${objDate.month}${objDate.date + 1}`;

            if (defaultID) {
                history.push(`/city/${defaultID}/${currentDate}`);
            } else {
                history.push(`/city/${arrCites[0].id}/${currentDate}`);

                localStorage.setItem('defaultCity', arrCites[0].name);
                localStorage.setItem('defaultID', arrCites[0].id);
            }
        }

        return (
            <Router history={history}>
                <main className="App-main">
                    <div className="App-sidebar">
                        <div className="search">
                            <input type="text" onChange={this.handleChange} defaultValue={defaultCity} placeholder="input your city" />
                        </div>
                        <Cities arrCites={arrCites} currentDate={currentDate} />
                    </div>
                    <Switch>
                        {arrCites.map(city => {
                            return (
                                <Route
                                    key={city.id}
                                    exact path={`/city/${city.id}/${currentDate}`}
                                    render={() => <AppContent city={city} />}
                                />
                            )
                        })}
                    </Switch>
                </main>
            </Router>
        )
    }
}

AppMain.propTypes = {
    defaultCity: PropTypes.string,
    defaultID: PropTypes.string
}

AppMain.defaultProps = {
    defaultCity: 'Minsk',
    defaultID: ''
}

export default AppMain;
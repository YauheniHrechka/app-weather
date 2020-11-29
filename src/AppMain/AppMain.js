import React, { Component } from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import './AppMain.css';

import Cities from '../Cities/Cities';
import AppContent from '../AppContent/AppContent';

const history = createBrowserHistory();

class AppMain extends Component {
    state = {
        arrCites: []
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

    handleChange = (e) => {
        let curCity = e.target.value.trim().toLowerCase();

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

    render() {
        let { arrCites } = this.state;

        // get current date ...
        let currentDate = '';
        if (arrCites.length > 0) {
            let objDate = this.getConverterDate(arrCites[0].dt);
            currentDate = `${objDate.year}${objDate.month}${objDate.date + 1}`;
            history.push(`/city/${arrCites[0].id}/${currentDate}`);
        }
        // console.log('arrCites', arrCites);

        return (
            <Router history={history}>
                <main className="App-main">
                    <div className="App-sidebar">
                        <div className="search">
                            <input type="text" onChange={this.handleChange} placeholder="input your city" />
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

export default AppMain;
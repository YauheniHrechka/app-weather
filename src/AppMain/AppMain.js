import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './AppMain.css';

import Cities from '../Cities/Cities';
import AppContent from '../AppContent/AppContent';

class AppMain extends Component {
    state = {
        arrCites: []
    }

    handleChange = (e) => {
        let curCity = e.target.value.trim().toLowerCase();

        if (curCity === "" || curCity.length <= 2) {
            return;
        }

        let promiseCities = new Promise((resolve, reject) => {
            fetch(`http://api.openweathermap.org/data/2.5/find?q=${curCity}&appid=70e1ed322b02acbc57d443dd91065f3e`)
                .then(data => {
                    resolve(data.json())
                })
        });

        promiseCities.then(data => {
            this.setState({ arrCites: data.list });
        });
    }

    render() {
        let { arrCites } = this.state;
        // console.log(arrCites);
        return (
            <Router>
                <main className="App-main">
                    <div className="App-sidebar">
                        <div className="search">
                            <input type="text" onChange={this.handleChange} />
                        </div>
                        <Cities arrCites={arrCites} />
                    </div>
                    <div className="App-content">
                        <Switch>
                            {arrCites.map(city => {
                                return (
                                    <Route
                                        key={city.id}
                                        exact path={`/city/${city.id}`}
                                        render={() => <AppContent city={city} />}
                                    />
                                )
                            })}
                        </Switch>
                    </div>
                </main>
            </Router >
        )
    }
}

export default AppMain;
import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import './AppSidebar.css';

import Cities from '../Cities/Cities';

class AppSidebar extends Component {
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
            <div className="App-sidebar">
                <div className="search">
                    <input type="text" onChange={this.handleChange} />
                </div>
                <Cities arrCites={arrCites} />
                <Switch>
                    {arrCites.map(city => {
                        return (
                            <Route
                                key={city.id}
                                exact path={`/${city.id}`}
                            // render={() => <AppMain id={city.id} />}
                            />
                        )
                    })}
                </Switch>
            </div>
        )
    }
}

export default AppSidebar;
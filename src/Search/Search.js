import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './Search.css';

import Cities from '../Cities/Cities';
import AppMain from '../AppMain/AppMain';

class Search extends Component {
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
            <>
                <div className="search">
                    <input type="text" onChange={this.handleChange} />
                </div>
                <BrowserRouter>
                    <Cities arrCites={arrCites} />
                    <Switch>
                        {arrCites.map(city => {
                            return (
                                <Route
                                    key={city.id}
                                    exact path={`/${city.id}`}
                                    render={() => <AppMain id={city.id} />}
                                />
                            )
                        })}
                    </Switch>
                </BrowserRouter>
            </>
        )
    }
}

export default Search;
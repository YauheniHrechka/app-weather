import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import './AppMain.css';

import { connect } from 'react-redux';

import Cities from '../Cities/Cities';
import AppContent from '../AppContent/AppContent';

const history = createBrowserHistory();

const AppMain = ({ defaultCity, defaultID, cities, setCities, setDefaultCity, setDefaultID }) => {

    let curDate = '';

    React.useEffect(() => {
        getCities(defaultCity);
    }, []);

    const getConverterDate = (UNIX_timestamp) => {
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

    const getCities = (curCity) => {
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
                setCities(data.list);
            });
    }

    const handleChange = (e) => {
        let curCity = e.target.value.trim().toLowerCase();
        getCities(curCity);
    }

    if (cities.length > 0) {
        let { dt, id, name } = cities[0];

        let objDate = getConverterDate(dt);
        curDate = `${objDate.year}${objDate.month}${objDate.date}`;

        setDefaultCity(name);
        setDefaultID(id);

        history.push(`/city/${defaultID}/${curDate}`);
    }

    return (
        <Router history={history}>
            <main className="App-main">
                <div className="App-sidebar">
                    <div className="search">
                        <input type="text" onChange={handleChange} defaultValue={defaultCity} placeholder="input your city" />
                    </div>
                    <Cities cities={cities} currentDate={curDate} />
                </div>
                <Switch>
                    {cities.map(city => {
                        return (
                            <Route
                                key={city.id}
                                exact path={`/city/${city.id}/${curDate}`}
                                render={() => <AppContent city={city} />}
                            />
                        )
                    })}
                </Switch>
            </main>
        </Router>
    )
}

export default connect(
    state => ({
        cities: state.cities.cities,
        defaultCity: state.cities.defaultCity,
        defaultID: String(state.cities.defaultID)
    }),
    dispatch => ({
        setCities: cities => (
            dispatch({
                type: 'SET_CITIES',
                payload: cities
            })
        ),
        setDefaultCity: city => (
            dispatch({
                type: 'SET_DEFAULT_CITY',
                payload: city
            })
        ),
        setDefaultID: id => (
            dispatch({
                type: 'SET_DEFAULT_ID',
                payload: id
            })
        )
    })
)(AppMain);
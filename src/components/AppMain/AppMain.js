import React from 'react';
import PropTypes from 'prop-types';
import { Router, Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import './AppMain.css';

import Cities from '../Cities/Cities';
import AppContent from '../AppContent/AppContent';

const history = createBrowserHistory();

const AppMain = ({ defaultCity, defaultID }) => {

    let curDate = '';
    let curDefaultID = defaultID;

    const [cities, setCities] = React.useState([]);

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

        curDefaultID = ''
    }

    if (cities.length > 0) {
        let { dt, id, name } = cities[0];

        let objDate = getConverterDate(dt);
        curDate = `${objDate.year}${objDate.month}${objDate.date}`;

        if (curDefaultID) {
            history.push(`/city/${curDefaultID}/${curDate}`);
        } else {
            history.push(`/city/${id}/${curDate}`);

            localStorage.setItem('defaultCity', name);
            localStorage.setItem('defaultID', id);
        }
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

AppMain.propTypes = {
    defaultCity: PropTypes.string,
    defaultID: PropTypes.string
}

AppMain.defaultProps = {
    defaultCity: 'Minsk',
    defaultID: ''
}

export default AppMain;
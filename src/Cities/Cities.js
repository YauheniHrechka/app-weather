import './Cities.css';

import City from '../City/City';

function Cities(props) {
    let { arrCites } = props;
    // console.log('arrCites', arrCites);
    return (
        <div className="cities">
            {arrCites.map(city =>
                <City
                    key={city.id}
                    city={city}
                />
            )}
        </div>
    )
}

export default Cities;
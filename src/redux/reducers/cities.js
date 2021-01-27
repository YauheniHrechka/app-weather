const initialState = {
    cities: [],
    defaultCity: 'Minsk',
    defaultID: 625144
};

const cities = (state = initialState, action) => {
    if (action.type === 'SET_CITIES') {
        return {
            ...state,
            cities: action.payload
        };

    } else if (action.type === 'SET_DEFAULT_CITY') {
        return {
            ...state,
            defaultCity: action.payload
        };

    } else if (action.type === 'SET_DEFAULT_ID') {
        return {
            ...state,
            defaultID: action.payload
        };

    }

    return state;
}

export default cities;
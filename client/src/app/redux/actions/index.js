import { findAll, findContinents, getOne } from "../../services/countriesService";
import { findAllAc, getCountAct } from "../../services/activitiesService";
import { ALL, FILTER_CONT, FILT_ACT, GET_ACTS, GET_ALL, GET_CONTS, GET_COUNTRY, GET_PAGES, SET_ACT, SET_CONT, SET_ORDER, SET_PAGE, SET_SEARCH, SET_SEASON } from "./actionType";


export const getAll = (country, order, continent) => {
    return (dispatch) => {
        return findAll(country, order, continent)
            .then((response) => {
                dispatch({ type: GET_ALL, payload: response })
            })
            .catch((err) => console.log(err));
    };
};

export const getOneCountry = (id) => {
    return (dispatch)=>{
        return getOne(id)
        .then(response => {dispatch({type: GET_COUNTRY, payload: response})})
        .catch(err=>console.log(err))
    }
}

export const allCountries = () => {
    return (dispatch) => {
        return findAll()
            .then(response => dispatch({ type: ALL, payload: response }))
            .catch(err => console.log(err))
    }
}

export const getCountriesByAct = (nameACt, name, order, continent) => {
    return (dispatch) => {
        return getCountAct(nameACt, name, order, continent)
            .then(response => {
                dispatch({ type: FILT_ACT, payload: response })
            })
            .catch(err => console.log(err));
    };
};

export const getContinents = () => {
    return (dispatch) => {
        return findContinents()
            .then((response) => {
                dispatch({ type: GET_CONTS, payload: response })
            })
            .catch((err) => console.log(err));
    };
};

export const getActivities = () => {
    return (dispatch) => {
        return findAllAc()
            .then((response) => {
                dispatch({ type: GET_ACTS, payload: response })
            })
            .catch((err) => console.log(err));
    };
};

export const setSch = (seacrh) => {
    return {
        type: SET_SEARCH,
        payload: seacrh
    };
};

export const getPages = () => {
    return {
        type: GET_PAGES,
    }
};

export const setPage = (page) => {
    return {
        type: SET_PAGE,
        payload: page,
    };
};

export const setOrder = (order) => {
    return {
        type: SET_ORDER,
        payload: order
    };
};

export const filterCont = () => {
    return {
        type: FILTER_CONT,
    };
};

export const setCont = (continent) => {
    return {
        type: SET_CONT,
        payload: continent
    };
};

export const setAct = (activity) => {
    return {
        type: SET_ACT,
        payload: activity
    };
};

export const setSeason = (season) =>{
    return{
        type: SET_SEASON,
        payload: season
    }
};





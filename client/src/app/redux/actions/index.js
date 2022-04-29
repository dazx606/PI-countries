import { findAll, findContinents } from "../../services/countriesService";
import { FILTER_CONT, GET_ACTS, GET_ALL, GET_CONTS, GET_PAGES, SET_CONT, SET_ORDER, SET_PAGE, SET_SEARCH } from "./actionType";
import {findAllAc} from "../../services/activitiesService"

export const getAll = (country, order)=>{
    return (dispatch)=>{
        return findAll(country, order)
        .then((response)=>{
            dispatch({type: GET_ALL, payload: response})
        })
        .catch((err)=>console.log(err))
    }
};

export const getContinents = () => {
    return (dispatch)=>{
        return findContinents()
            .then((response)=>{
                dispatch({type: GET_CONTS, payload: response})
            })
            .catch((err)=>console.log(err))
    }
};

export const getActivities = () => {
    return (dispatch)=>{
        return findAllAc()
            .then((response)=>{
                dispatch({type: GET_ACTS, payload: response})
            })
            .catch((err)=>console.log(err))
    }
};

export const setSch = (seacrh) => {
    return {
        type: SET_SEARCH,
        payload: seacrh
    }
}

export const getPages = () => {
    return {
        type: GET_PAGES,
    }
};

export const setPage = (page) => {
    return {
        type: SET_PAGE,
        payload: page,
    }
};

export const setOrder = (order) =>
{
    return {
        type: SET_ORDER,
        payload: order
    }
};

export const filterCont = () =>{
    return{
        type: FILTER_CONT,
    }
};

export const setCont = (continent) =>{
    return{
        type: SET_CONT,
        payload: continent
    }
}

import { findAll } from "../../services/countriesService";
import { GET_ALL } from "./actionType";

export const getAll = ()=>{
    return (dispatch)=>{
        return findAll()
        .then((response)=>{
            dispatch({type: GET_ALL, payload: response})
        })
        .catch((err)=>console.log(err))
    }
}

export const log = () => {
    console.log("HOLA");
}
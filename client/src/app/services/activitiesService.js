import { URL_API_ACTIVITIES } from "../config";

export function findAllAc(){
    const path = "/";
    const config = {
        method:"GET",
        mode:"cors",
    }
    return fetch(URL_API_ACTIVITIES + path, config)
    .then((response) => response.ok ? response.json() : Promise.reject(response.statusText))
    .catch((err)=>{console.log(err)})
};
import { URL_API_COUNTRIES } from "../config";

// -> CONFIG
//             -> METODO HTTP
//             -> MODO DE CONECCION -> CORS
//             -> HEADERS -> INFO DEL CUERPO O TOKEN DE AUTORIZACION
//             -> BODY -> CUERPO DE LA PETICION {JSON}

export function findAll(country, order) {
    const path = "";
    const config = {
        method: "GET",
        mode: "cors",
    }
    if (!country) {
        if (!order) {
            return fetch(URL_API_COUNTRIES + path, config)
                .then((response) => response.ok ? response.json() : Promise.reject(response.statusText))
                .catch((err) => { console.log(err) })
        } else if (order) {
            return fetch(URL_API_COUNTRIES + path + "?order=" + order, config)
                .then((response) => response.ok ? response.json() : Promise.reject(response.statusText))
                .catch((err) => { console.log(err) })
        }
    } else if (country) {
        if (country && !order) {
            return fetch(URL_API_COUNTRIES + path + "?name=" + country, config)
                .then((response) => response.ok ? response.json() : Promise.reject(response.statusText))
                .catch((err) => { console.log(err) })
        } else if (country && order) {
            return fetch(URL_API_COUNTRIES + path + "?name=" + country + "&order=" + order, config)
                .then((response) => response.ok ? response.json() : Promise.reject(response.statusText))
                .catch((err) => { console.log(err) })}
        }
        
};



export function findContinents() {
    const path = "/continents";
    const config = {
        method: "GET",
        mode: "cors"
    }
    return fetch(URL_API_COUNTRIES + path, config)
        .then((response) => response.ok ? response.json() : Promise.reject(response.statusText))
        .catch((err) => console.log(err))
};


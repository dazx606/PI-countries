import { URL_API_ACTIVITIES } from "../config";

export function findAllAc() {
    const path = "/";
    const config = {
        method: "GET",
        mode: "cors",
    };
    return fetch(URL_API_ACTIVITIES + path, config)
        .then((response) => response.ok ? response.json() : Promise.reject(response.statusText))
        .catch((err) => { console.log(err) })
};

export function getCountAct(nameAct, name, order, continent) {
    const path = `/${nameAct}`;
    const config = {
        method: "GET",
        mode: "cors"
    };
    if (!name) {
        if (!order) {
            return !continent ? fetch(URL_API_ACTIVITIES + path, config)
                .then((response) => response.ok ? response.json() : Promise.reject(response.statusText))
                .catch((err) => console.log(err))
                :
                fetch(URL_API_ACTIVITIES + path + "?continent=" + continent, config)
                    .then((response) => response.ok ? response.json() : Promise.reject(response.statusText))
                    .catch((err) => console.log(err))
        } else if (order) {
            return !continent ? fetch(URL_API_ACTIVITIES + path + "?order=" + order, config)
                .then((response) => response.ok ? response.json() : Promise.reject(response.statusText))
                .catch((err) => console.log(err))
                :
                fetch(URL_API_ACTIVITIES + path + "?continent=" + continent + "&order=" + order, config)
                    .then((response) => response.ok ? response.json() : Promise.reject(response.statusText))
                    .catch((err) => console.log(err))
        }

    } else if (name) {
        if (!order) {
            return !continent ? fetch(URL_API_ACTIVITIES + path + "?name=" + name, config)
                .then((response) => response.ok ? response.json() : Promise.reject(response.statusText))
                .catch((err) => console.log(err))
                :
                fetch(URL_API_ACTIVITIES + path + "?continent=" + continent + "&name=" + name, config )
                    .then((response) => response.ok ? response.json() : Promise.reject(response.statusText))
                    .catch((err) => console.log(err))
        } else if (order) {
            return !continent ? fetch(URL_API_ACTIVITIES + path + "?order=" + order + "&name=" + name , config)
                .then((response) => response.ok ? response.json() : Promise.reject(response.statusText))
                .catch((err) => console.log(err))
                :
                fetch(URL_API_ACTIVITIES + path + "?continent=" + continent + "&order=" + order + "&name=" + name, config)
                    .then((response) => response.ok ? response.json() : Promise.reject(response.statusText))
                    .catch((err) => console.log(err))
        }
    }
};
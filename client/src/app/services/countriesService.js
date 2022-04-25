import { URL_API_COUNTRIES } from "../config";

// -> CONFIG
//             -> METODO HTTP
//             -> MODO DE CONECCION -> CORS
//             -> HEADERS -> INFO DEL CUERPO O TOKEN DE AUTORIZACION
//             -> BODY -> CUERPO DE LA PETICION {JSON}

export function findAll(){
    const path = "/";
    const config = {
        method:"GET",
        mode:"cors",
    }
    return fetch(URL_API_COUNTRIES + path, config)
    .then((response)=>{

        if(response.ok) {
            console.log("si me ejecuto");
            // let a = response.json()
            // console.log(a)
            return response.json()}
        else Promise.reject(response.statusText)
        // response.status===200 ? response.json() : Promise.reject(response.statusText)
    })
    .catch((err)=>{console.log(err)})
};
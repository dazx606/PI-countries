import { GET_ALL } from "../actions/actionType"

const initialState = {
    countries:[]
};

export default function rootReducer (state = initialState, {type, payload}){

    switch(type){
        case GET_ALL:{
            return {
                ...state,
                countries: payload
            }
        }
        
        default: return state
    }
}
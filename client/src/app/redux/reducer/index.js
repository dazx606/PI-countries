import { ALL, FILTER_CONT, FILT_ACT, GET_ACTS, GET_ALL, GET_CONTS, GET_COUNTRY, GET_PAGES, SET_ACT, SET_CONT, SET_ORDER, SET_PAGE, SET_SEARCH, SET_SEASON } from "../actions/actionType"

const initialState = {
    countries: [],
    continents: [],
    page: 1,
    activities: [],
    country: {},
    pages: 1,
    search: "",
    ordering: "A-Z",
    continent: "",
    activity:"",
    all:[],
    season:''
};

export default function rootReducer(state = initialState, { type, payload }) {

    switch (type) {
        case GET_ALL: {
            return {
                ...state,
                countries: payload
            }
        }

        case GET_COUNTRY:{
            return{
                ...state,
                country: payload
            }
        }

        case SET_SEASON:{
            return{
                ...state,
                season:payload
            }
        }

        case ALL:{
            return {
                ...state,
                all: payload
            }
        }

        case FILT_ACT:{
            return{
                ...state,
                countries: payload
            }
        }

        case GET_CONTS: {
            return {
                ...state,
                continents: payload
            }
        }
        case GET_ACTS: {
            return {
                ...state,
                activities: payload
            }
        }
        case GET_PAGES: {
            
            return {
                ...state,
                // 
                pages: (state.countries.length - 9) > 0 ? Math.ceil((state.countries.length - 9) / 10)+1 : 1
            }
        }

        case SET_SEARCH: {
            return {
                ...state,
                search: payload
            }
        }

        case SET_PAGE: {
            return {
                ...state,
                page: payload
            }
        }

        case SET_ORDER: {
            return {
                ...state,
                ordering: payload,
            }
        }

        case SET_CONT: {
            return{
                ...state,
                continent: payload
            }
        }

        case FILTER_CONT: {
            return {
                ...state,
                countries: state.countries.filter(e => e.continent === state.continent)
            }
        }

        case SET_ACT:{
            return{
                ...state,
                activity: payload
            }
        }

        default: return state
    }
}


import { FILTER_CONT, GET_ACTS, GET_ALL, GET_CONTS, GET_PAGES, SET_CONT, SET_ORDER, SET_PAGE, SET_SEARCH } from "../actions/actionType"

const initialState = {
    countries: [],
    continents: [],
    page: 1,
    activities: [],
    country: {},
    pages: 1,
    //[{"A-Z":"ASC"},"Z-A","more populated","less populated"],
    search: "",
    ordering: "A-Z",
    continent: ""
};

export default function rootReducer(state = initialState, { type, payload }) {

    switch (type) {
        case GET_ALL: {
            return {
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
                pages: parseInt((state.countries.length - 9) / 10) > 10 ? parseInt((state.countries.length - 9) / 10) : 1
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

        default: return state
    }
}


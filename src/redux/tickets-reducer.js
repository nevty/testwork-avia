import {ticketsAPI} from "../api/api";

const SET_TICKETS = "SET_TICKETS";
const SET_TICKETS_ERROR_RESPONSE = "SET_TICKETS_ERROR_RESPONSE";
const SET_TICKETS_FETCHING = "SET_TICKETS_FETCHING";
const SET_SEARCH_ID = "SET_SEARCH_ID";
const SORT_TICKETS_BY_PRICE = "SORT_TICKETS_BY_PRICE";
const SORT_TICKETS_BY_DURATION = "SORT_TICKETS_BY_DURATION";
const SET_FILTER_TICKETS_BY_STOPS = "SET_FILTER_TICKETS_BY_STOPS";

let initialState = {
    tickets: [],
    searchId: "",
    filteredByStops: "",
    sorted: null,
    stop: false,
    maxSize: 10,
    ticketsErrorResponse: null,
    isFetching: false,
}

const ticketsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TICKETS:
            return {
                ...state,
                tickets: action.tickets
            }
        case SET_TICKETS_ERROR_RESPONSE:
            return {
                ...state,
                ticketsErrorResponse: action.error,
            }
        case SET_TICKETS_FETCHING:
            return {
                ...state,
                isFetching: action.boolean,
            }

        case SET_SEARCH_ID:
            return {
                ...state,
                searchId: action.id
            }
        case SORT_TICKETS_BY_PRICE:
            return {
                ...state,
                sorted: "cheap",
                tickets: state.tickets.sort((a,b)=>{
                    return a.price - b.price;
                })
            }
        case SORT_TICKETS_BY_DURATION:
            return {
                ...state,
                sorted: "fast",
                tickets: state.tickets.sort((a,b)=>{
                    return a.segments[0].duration - b.segments[0].duration;
                })
            }
        case SET_FILTER_TICKETS_BY_STOPS:
            return {
                ...state,
                filteredByStops: action.number
            }
        default:
            return state;
    }
}

export const setTicketsCreator = (tickets) => ({type: SET_TICKETS, tickets});

export const setTicketsErrorResponse = (error)=> ({type: SET_TICKETS_ERROR_RESPONSE,error});

export const setSearchId = (id) => ({type: SET_SEARCH_ID, id});

export const getTicketsRequest = () => (dispatch) => {
        ticketsAPI.getSearchId()
        .then(response=>{
            dispatch(setSearchId(response.data.searchId));
            return response.data.searchId
        })
        .then(id=>{
            dispatch(setTicketsFetchingCreator(true));
            let tickets = [];
            (async (id) => {
                let resolveCounter = 0;
                let errorCounter = 0;
                let searchStop = false;
                while (resolveCounter < 50 && !searchStop && errorCounter < 50) {
                    await ticketsAPI.getTickets(id).then(response=>{
                            tickets.push(response.data.tickets.flat());
                            searchStop = response.data.stop;
                            resolveCounter++;
                        },error=>errorCounter++)
                }
                dispatch(setTicketsCreator(tickets.flat()));
                dispatch(setTicketsFetchingCreator(false));
            })(id)
        },error => {
            dispatch(setTicketsFetchingCreator(false));
            dispatch(setTicketsErrorResponse(error.response.status))
        })

}

export const sortTicketsByPriceActionCreator = ()=>({type:SORT_TICKETS_BY_PRICE});

export const sortTicketsByDurationActionCreator = ()=>({type:SORT_TICKETS_BY_DURATION});

export const setFilterTicketsByStopsActionCreator = (number)=> ({type:SET_FILTER_TICKETS_BY_STOPS,number});

export const setTicketsFetchingCreator = (boolean) => ({type: SET_TICKETS_FETCHING,boolean});

export default ticketsReducer;
import ticketsReducer from "./tickets-reducer";
import {applyMiddleware, combineReducers, createStore} from "redux";
import ThunkMiddleware from "redux-thunk";


let reducers = combineReducers({
    ticketsPage: ticketsReducer,
})

let store = createStore(reducers,applyMiddleware(ThunkMiddleware));

export default store
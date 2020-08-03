import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialstate = {
    fetch: null,
    events: null,
    users: null,
    isLoading: false,
    error: null
}

const fetchStart = ( state, action ) => {
    return updateObject( state,{
        isLoading: true
    })
}

const fetchError = ( state, action ) => {
    return updateObject( state, {
        isLoading: false,
        error: {
            ...action.error,
            customMessage: "Error al obtener los usuarios"
        }})
}

const fetchSuccessUsers = ( state, action ) => {
    return updateObject( state, {
        isLoading: false,
        users: action.users
    })
}

const fetchSuccessEvents = ( state, action ) => {
    return updateObject( state, {
        isLoading: false,
        fetch: action.fetch,
        events: action.events
    })
}

const reducer = ( state = initialstate, action ) => {
    switch ( action.type ) {
        case actionTypes.FETCH_START:
            return fetchStart( state, action )
        case actionTypes.FETCH_ERROR:
            return fetchError( state, action )
        case actionTypes.FETCH_SUCCESS_USERS:
            return fetchSuccessUsers( state, action )
        case actionTypes.FETCH_SUCCESS_EVENTS:
            return fetchSuccessEvents( state, action )
        default: return state;
    }
}

export default reducer;
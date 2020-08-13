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
            customMessage: "Error al obtener los datos"
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

const createStart = ( state, action ) => {
    return updateObject( state, {
        isLoading: true,
    })
}

const createError = ( state, action ) => {
    return updateObject( state, {
        isLoading: false,
        error: {
            ...action.error,
            customMessage: "Error al crear"
        }
    })
}

const createSuccess = ( state, action ) => {
    return updateObject( state, {
        isLoading: false
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
        case actionTypes.CREATE_START:
            return createStart( state, action )
        case actionTypes.CREATE_ERROR:
            return createError( state, action )
        case actionTypes.CREATE_SUCCESS:
            return createSuccess( state, action )
        default: return state;
    }
}

export default reducer;
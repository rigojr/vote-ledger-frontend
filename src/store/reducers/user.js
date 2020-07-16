import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';
const initialState = {
    users: [],
    isLoading: false,
    error: null
}

const fetchUserStart = ( state, action ) => {
    return updateObject({ state,
        isLoading: true
    })
}

const fetchUserError = ( state, action ) => {
    return updateObject({ state,
        isLoading: false,
        error: {
            ...action.error,
            customMessage: "Error al obtener los usuarios"
        }})
}

const fetchUserSuccess = ( state, action ) => {
    return updateObject({ state,
        isLoading: false,
        users: action.users
    })
}

const reducer = ( state = initialState, action) => {
    switch (action.type){
        case actionTypes.FETCH_USERS_START:
            return fetchUserStart( state, action )
        case actionTypes.FETCH_USERS_ERROR:
            return fetchUserError( state, action )
        case actionTypes.FETCH_USERS_SUCCESS:
            return fetchUserSuccess( state, action )
        default: return state
    }
}

export default reducer;
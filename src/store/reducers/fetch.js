import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    fetch: [],
    isLoading: false,
    error: null
}

const fetchStart = ( state, action ) => {
    return updateObject( state,
        {
            isLoading: true,
            fetch: []
        }
    )
}

const fetchError = ( state, action ) => {
    return updateObject( state,
        {
            isLoading: false,
            error: {
                ...action.error,
                customMessage: "Error obteniendo datos"
            }
        }
    )
}

const fetchSuccess = ( state, action ) => {
    return updateObject( state,
        {
            isLoading: false,
            fetch: action.fetch
        }
    )
}

const reducer = ( state = initialState , action) => {
    switch (action.type){
        case actionTypes.FETCH_START:
            return fetchStart( state, action )
        case actionTypes.FETCH_ERROR:
            return fetchError( state, action )
        case actionTypes.FETCH_SUCCESS:
            return fetchSuccess( state, action )
        default: return state
    }
}

export default reducer;
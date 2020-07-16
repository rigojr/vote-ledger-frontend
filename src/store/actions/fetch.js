import * as actionTypes from './actionTypes';
import axios from '../../axios';

export const fetchStart = () => {
    return ({
        type: actionTypes.FETCH_START    
    })
}

export const fetchError = ( error ) => {
    return ({
        type: actionTypes.FETCH_ERROR,
        error: error
    })
}

export const fetchSuccess = ( fetch ) => {
    return ({
        type: actionTypes.FETCH_SUCCESS,
        fetch: fetch
    })
}

export const fetch = ( endPoint ) => {
    return dispatch => {
        dispatch( fetchStart() );
        axios.get( endPoint )
        .then( response => {
            dispatch( fetchSuccess( response.data ) );
        })
        .catch( error => {
            dispatch( fetchError( error ) );
        })
    }
}
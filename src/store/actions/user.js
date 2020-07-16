import * as actionTypes from './actionTypes';
import axios from '../../axios';

export const fetchUserStart = () => {
    return ({
        type: actionTypes.FETCH_USERS_START    
    })
}

export const fetchUserError = ( error ) => {
    return ({
        type: actionTypes.FETCH_USERS_ERROR,
        error: error
    })
}

export const fetchUserSuccess = ( users ) => {
    return ({
        type: actionTypes.FETCH_USERS_SUCCESS,
        users: users
    })
}

export const fetchUser = ( endPoint ) => {
    return dispatch => {
        dispatch( fetchUserStart() );
        axios.get( endPoint )
        .then( response => {
            const fetch = response.data;

            //for( let key in response.data){
            //    fetch.push(response.data[key]);
            //}
            dispatch( fetchUserSuccess( fetch ) );
        })
        .catch( error => {
            dispatch( fetchUserError( error ) );
        })
    }
}
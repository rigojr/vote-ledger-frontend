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
            const fetch = [];
            for( let key in response.data){
                fetch.push({
                    id: response.data[key].id,
                    name: response.data[key].name,
                    faculty: response.data[key].faculty,
                    school: response.data[key].school,
                    email: response.data[key].email
                });
            }
            dispatch( fetchUserSuccess( fetch ) );
        })
        .catch( error => {
            console.log(error);
            dispatch( fetchUserError( error ) );
        })
    }
}
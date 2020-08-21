import * as actionTypes from './actionTypes';
import axios from '../../axios-tg';
import {parseRawDataUser} from '../utility';

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

export const fetchUserSuccess = ( users, fetch ) => {
    return ({
        type: actionTypes.FETCH_USERS_SUCCESS,
        users: users,
        fetch: fetch
    })
}

export const fetchUser = ( ) => {
    return dispatch => {
        dispatch( fetchUserStart() );

        axios.post( `/user/getall`, { parameter: "" } )
        .then( response => {
            const fetch = [];
            const users = [];
            const jsonData = JSON.parse(response.data.mensaje);
            for( let key in jsonData){
                const data = parseRawDataUser(jsonData[key].Record);
                users.push({...data.user});
                fetch.push({...data.fetch})
            }
            dispatch( fetchUserSuccess(users, fetch) )
        })
        .catch( error => {dispatch( fetchUserError(error) )})
    }
}

export const createUserStart = () => {
    return ({
        type: actionTypes.CREATE_USER_START
    })
}

export const createUserSuccess = () => {
    return({
        type: actionTypes.CREATE_USER_SUCCESS
    })
}

export const createUserError = (error) => {
    return({
        type: actionTypes.CREATE_USER_ERROR,
        error: error
    })
}

export const localSaveUser = (user) => {
    return({
        type: actionTypes.LOCAL_SAVE_USER,
        rawUser: user
    })
}

export const createUser = ( user ) => {
    return dispatch => {
        dispatch( createUserStart() )

        axios.post('/user/save', {
            parameter: user
        })
        .then( response => {
            dispatch(createUserSuccess());
            dispatch(localSaveUser(JSON.parse(response.data.mensaje)));
        })
        .catch( error => createUserError(error))
    }
}
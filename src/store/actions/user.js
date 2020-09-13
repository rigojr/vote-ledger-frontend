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

export const fetchOrgStart = () => {
    return({
        type: actionTypes.FETCH_ORG_START
    })
}

export const fetchOrgSuccess = ( electoralOrganizations ) => {
    return ({
        type: actionTypes.FETCH_ORG_SUCCESS,
        electoralOrganizations: electoralOrganizations
    })
}

export const fetchOrgError = ( error ) => {
    return({
        type: actionTypes.FETCH_ORG_ERROR,
        error: error
    })
}

export const fetchOrg = () => {
    return dispatch => {
        dispatch( fetchOrgStart() )

        axios.post('/org/getall')
        .then( response => {
            dispatch( fetchOrgSuccess(response.data.mensaje) )
        })
        .catch( error => dispatch(fetchOrgError( error )))
    }
}

export const showOrgModal = () => {
    return({
        type: actionTypes.SHOW_ORG_MODAL
    })
}

export const createOrgStart = () => {
    return({
        type: actionTypes.CREATE_ORG_START
    })
}

export const createOrgError = (error) => {
    return({
        type: actionTypes.CREATE_ORG_ERROR,
        error: error
    })
}

export const createOrgSuccess = (electoralOrg) => {
    return({
        type: actionTypes.CREATE_ORG_SUCCESS,
        electoralOrg: electoralOrg
    })
}

export const createOrg = ( electoralOrg ) => {
    return dispatch => {
        dispatch( createOrgStart() )

        axios.post('/org/add', {
            nombre: electoralOrg
        })
        .then( response => {
            dispatch( createOrgSuccess(electoralOrg) )
        })
        .catch( error => dispatch( createOrgError(error) ))
    }
}
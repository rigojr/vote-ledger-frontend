import * as actionTypes from './actionTypes'
import axios from '../../axios-tg'


export const loginStart = () => {
    return ({
        type: actionTypes.LOGIN_START,
    })
}

export const loginError = (error) => {
    return({
        type: actionTypes.LOGIN_ERROR,
        error: error
    })
}

export const loginSuccess = ( userInfo ) => {
    return({
        type: actionTypes.LOGIN_SUCCESS,
        userInfo: userInfo
    })
}

export const loginFail = () => {
    return ({
        type: actionTypes.LOGIN_FAIL
    })
}

export const login = ( ci, password, userInfo ) => {
    return dispatch => {
        dispatch( loginStart() )
        axios.post( '/user/login', {
            idUsuario: ci,
            passwordHash: password
        })
        .then( response => {
            if( response.data.mensaje === "ValidLogin" )
                dispatch( loginSuccess( userInfo ) )
            else 
                dispatch( loginFail() )
        })
        .catch( error => dispatch( loginError(error) ))
    }
}

export const logout = () => {
    return ({
        type: actionTypes.LOGOUT
    })
}
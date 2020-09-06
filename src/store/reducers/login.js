import { updateObject } from '../utility'
import * as actionTypes from '../actions/actionTypes'

const initialState = {
    userProfile: { },
    isDemo: false,
    isLoading: false,
    failMessage: '',
}

const loginStart = (state, action) => {
    return updateObject( state, {
        isLoading: true,
        failMessage: '',
    })
}

const loginSuccess = (state, action) => {
    return updateObject( state, {
        userProfile: {...action.userInfo},
        isLoading: false,
        failMessage: '',
    })
}

const loginError = (state, action) => {
    return updateObject( state, {
        isLoading: false,
        error: {
            ...action.error,
            customMessage: "Error al logear el usuario"
        },
        message: "Hubo un error al logear el usuario "
    })
}

const loginFail = (state, action) => {
    return updateObject( state, {
        isLoading: false,
        failMessage: 'La contraseña es incorrecta',
    })
}

const reducer = ( state = initialState, action ) => {
    switch (action.type) {
        case actionTypes.LOGIN_START:
            return loginStart( state, action )
        case actionTypes.LOGIN_SUCCESS:
            return loginSuccess( state, action )
        case actionTypes.LOGIN_ERROR:
            return loginError( state, action )
        case actionTypes.LOGIN_FAIL:
            return loginFail( state, action )
        default: return state
    }
}

export default reducer
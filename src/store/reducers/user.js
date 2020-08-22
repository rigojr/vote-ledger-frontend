import * as actionTypes from '../actions/actionTypes';
import { updateObject, parseRawDataUser, immmutableInsertItem, immutableRemoveItem } from '../utility';

const initialState = {
    fetch: [],
    users: [],
    isLoading: false,
    error: null,
    message:''
}

const fetchUserStart = ( state, action ) => {
    return updateObject( state,{
        isLoading: true
    })
}

const fetchUserError = ( state, action ) => {
    return updateObject( state,{
        isLoading: false,
        error: {
            ...action.error,
            customMessage: "Error al obtener los usuarios"
        }})
}

const fetchUserSuccess = ( state, action ) => {
    return updateObject( state,{
        isLoading: false,
        users: action.users,
        fetch: action.fetch
    })
}

const createUserStart = ( state, action ) => {
    return updateObject( state, {
        isLoading: true,
        message: 'Enviando información al bockchain'
    })
}

const createUserError = ( state, action ) => {
    return updateObject( state, {
        isLoading: false,
        error: {
            ...action.error,
            customMessage: "Error al crear usuario"
        },
        message: 'Hubo un error al guardar la información'
    })
}

const createUserSuccess = ( state, action) => {
    return updateObject( state, {
        isLoading: false,
        message: 'La información se ha guardado con éxito'
    })
}

const setMessage = ( state, action ) => {
    return updateObject( state, {
        message: action.message
    })
}

const localSaveUser = ( state, action ) => {
    const data = parseRawDataUser(action.rawUser)
    let tempUsers = state.users
    let tempFetch = state.fetch
    let indexUsers = state.users.findIndex( user => user.id == action.rawUser.id )
    let indexFetch = state.fetch.findIndex( fetch => fetch.id == action.rawUser.id)
    if( indexUsers !== -1 ){
        tempUsers = immutableRemoveItem(tempUsers,{index:indexUsers})
        tempFetch = immutableRemoveItem(tempFetch,{index:indexFetch})

    } else {
        indexUsers = tempUsers.length
        indexFetch = tempFetch.length
    }
    tempUsers = immmutableInsertItem(tempUsers,{index:indexUsers,item:data.user})
    tempFetch = immmutableInsertItem(tempFetch,{index:indexFetch,item:data.fetch})
    return updateObject( state, {
        isLoading: false,
        fetch: tempFetch,
        users: tempUsers
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
        case actionTypes.CREATE_USER_START:
            return createUserStart( state, action )
        case actionTypes.CREATE_USER_ERROR:
            return createUserError( state, action )
        case actionTypes.CREATE_USER_SUCCESS:
            return createUserSuccess( state, action )
        case actionTypes.SET_MESSAGE:
            return setMessage( state, action )
        case actionTypes.LOCAL_SAVE_USER:
            return localSaveUser( state, action)
        default: return state
    }
}

export default reducer;
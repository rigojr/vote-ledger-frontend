import { faSmileBeam } from '@fortawesome/free-solid-svg-icons';
import * as actionTypes from '../actions/actionTypes';
import { updateObject, parseRawDataUser, immmutableInsertItem, immutableRemoveItem } from '../utility';

const initialState = {
    fetch: [],
    users: [],
    isLoading: false,
    error: null,
    message:'',
    electoralOrg: [],
    isOrgModal: false,
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

const fetchOrgStart = ( state, action ) => {
    return updateObject( state, {
        isLoading: true,
        message: 'Recibiendo Información de las organizaciones '
    })
}

const fetchOrgError = ( state, action ) => {
    return updateObject( state, {
        isLoading: false,
        error: {
            ...action.error,
            customMessage: "Error al recibir las organizaciones "
        },
        message: 'Hubo un error al guardar la información'
    } )
}

const fetchOrgSuccess = ( state, action ) => {
    return updateObject( state, {
        isLoading: false,
        electoralOrg: action.electoralOrganizations
    })
}

const createOrgStart = ( state, action ) => {
    return updateObject( state, {
        isLoading: true
    } )
}

const createOrgSuccess = ( state, action ) => {
    return updateObject( state, {
        isLoading: false,
        electoralOrg: immmutableInsertItem( state.electoralOrg,
            {
                index: state.electoralOrg.length,
                item: action.electoralOrg
            })
    })
}

const createOrgError = ( state, action ) => {
    return updateObject( state, {
        isLoading: false,
        error: {
            ...action.error,
            customMessage: "Error al recibir las organizaciones "
        },
        message: 'Hubo un error al guardar la información'
    } )
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
        case actionTypes.FETCH_ORG_SUCCESS:
            return fetchOrgSuccess( state, action )
        case actionTypes.FETCH_ORG_ERROR:
            return fetchOrgError( state, action )
        case actionTypes.FETCH_ORG_START:
            return fetchOrgStart( state, action)
        case actionTypes.SHOW_ORG_MODAL:
            return updateObject( state, { isOrgModal: !state.isOrgModal, message: ''} )
        case actionTypes.CREATE_ORG_START:
            return createOrgStart( state, action )
        case actionTypes.CREATE_ORG_SUCCESS:
            return createOrgSuccess( state, action )
        case actionTypes.CREATE_ORG_ERROR:
            return createOrgError( state, action )
        default: return state
    }
}

export default reducer;
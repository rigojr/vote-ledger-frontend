import * as actionTypes from '../actions/actionTypes';
import { updateObject, immmutableInsertItem, immutableRemoveItem, parseRawData} from '../utility';

const initialstate = {
    fetch: null,
    events: null,
    users: null,
    isLoading: false,
    error: null,
    message: ''
}

const fetchStart = ( state, action ) => {
    return updateObject( state,{
        isLoading: true
    })
}

const fetchError = ( state, action ) => {
    return updateObject( state, {
        isLoading: false,
        error: {
            ...action.error,
            customMessage: "Error al obtener los datos"
        }})
}

const fetchSuccessEvents = ( state, action ) => {
    return updateObject( state, {
        isLoading: false,
        fetch: action.fetch,
        events: action.events
    })
}

const createStart = ( state, action ) => {
    return updateObject( state, {
        isLoading: true,
        message: 'Enviando información al bockchain'
    })
}

const createError = ( state, action ) => {
    return updateObject( state, {
        isLoading: false,
        error: {
            ...action.error,
            customMessage: "Error al crear"
        },
        message: 'Hubo un error al guardar la información'
    })
}

const createSuccess = ( state, action ) => {
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

const localSave = ( state, action ) => {

    const data = parseRawData(action.rawEvent)

    let tempEvents = state.events
    let tempFetch = state.fetch
    const indexEvents = state.events.findIndex( event => event.id == action.rawEvent.id )
    const indexFetch = state.fetch.findIndex( fetch => fetch.id == action.rawEvent.id)

    if( indexEvents !== -1 ){
        tempEvents = immutableRemoveItem(state.events,{index:indexEvents})
        tempFetch = immutableRemoveItem(state.fetch,{index:indexFetch})
    }

    tempEvents = immmutableInsertItem(tempEvents,{index:tempEvents.length,item:data.event})
    tempFetch = immmutableInsertItem(tempFetch,{index:tempFetch.length,item:data.fetch})

    return updateObject( state, {
        isLoading: false,
        fetch: tempFetch,
        events: tempEvents
    })
}

const reducer = ( state = initialstate, action ) => {
    switch ( action.type ) {
        case actionTypes.FETCH_START:
            return fetchStart( state, action )
        case actionTypes.FETCH_ERROR:
            return fetchError( state, action )
        case actionTypes.FETCH_SUCCESS_EVENTS:
            return fetchSuccessEvents( state, action )
        case actionTypes.CREATE_START:
            return createStart( state, action )
        case actionTypes.CREATE_ERROR:
            return createError( state, action )
        case actionTypes.CREATE_SUCCESS:
            return createSuccess( state, action )
        case actionTypes.SET_MESSAGE:
            return setMessage( state, action )
        case actionTypes.LOCAL_SAVE:
            return localSave( state, action)
        default: return state;
    }
}

export default reducer;
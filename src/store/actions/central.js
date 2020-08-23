import * as actionTypes from './actionTypes';
import axios from '../../axios-tg';
import {parseRawData} from '../utility';


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

export const fetchSuccessEvents = ( fetch, events ) => {
    return ({
        type: actionTypes.FETCH_SUCCESS_EVENTS,
        events: events,
        fetch: fetch
    })
}

export const fetch = ( ) => {
    return dispatch => {
        dispatch( fetchStart() );
        
        axios.post( '/event/getall', {
            parameter :""
        })
        .then( response => {
            const fetch = [];
            const events = [];
            const jsonData = JSON.parse(response.data.mensaje);
            for( let key in jsonData){
                console.log(jsonData[key].Record)
                const data = parseRawData(jsonData[key].Record)
                console.log(data)
                fetch.push({...data.fetch})
                events.push({...data.event})
            }
            dispatch( fetchSuccessEvents( fetch, events ) );
        })
        .catch( error => console.log(error));


    }
}

export const localSave = ( event ) => {
    return ({
        type: actionTypes.LOCAL_SAVE,
        rawEvent: event
    })
}

export const createStart = () => {
    return ({
        type: actionTypes.CREATE_START    
    })
}

export const createError = ( error ) => {
    return ({
        type: actionTypes.CREATE_ERROR,
        error: error
    })
}

export const createSuccess = ( ) => {
    return ({
        type: actionTypes.CREATE_SUCCESS,
    })
}

export const create = ( electoralEvent ) => {
    return dispatch => {
        dispatch( createStart() );
        axios.post('/event/save', {
            parameter: electoralEvent
        })
        .then( response => {
            dispatch(createSuccess());
            dispatch(localSave(JSON.parse(response.data.mensaje)));
        })
        .catch( error => createError(error) );
    }
}

export const setMessage = ( message ) => {
    return ({
        type: actionTypes.SET_MESSAGE,
        message: message
    })
}
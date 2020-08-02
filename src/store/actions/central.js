import * as actionTypes from './actionTypes';
import axios from '../../axios-tg';

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

export const fetchSuccessUsers = ( users ) => {
    return ({
        type: actionTypes.FETCH_SUCCESS_USERS,
        users: users
    })
}

export const fetchSuccessEvents = ( events ) => {
    return ({
        type: actionTypes.FETCH_SUCCESS_EVENTS,
        events: events
    })
}

export const fetch = ( ) => {
    return dispatch => {
        dispatch( fetchStart() );
        
         axios.post( '/service', {
            function: "GetAll",
            parameter :""
        })
        .then( response => {
            const fetch = [];
            const jsonData = JSON.parse(response.data.mensaje);
            for( let key in jsonData){
                fetch.push({
                    id: jsonData[key].Key,
                    record: {
                        ...jsonData[key].Record
                    }
                })
            }
            dispatch( fetchSuccessEvents( fetch ) );
        })
        .catch( error => console.log(error));


    }
}
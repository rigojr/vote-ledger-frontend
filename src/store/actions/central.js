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
        
         axios.post( '/service', {
            function: "GetAll",
            parameter :""
        })
        .then( response => {
            const fetch = [];
            const events = [];
            const jsonData = JSON.parse(response.data.mensaje);
            for( let key in jsonData){

                const eventsTemp = {
                    id: jsonData[key].Key,
                    state: jsonData[key].Record.estado,
                    initDate: jsonData[key].Record.fechainicio,
                    endDate: jsonData[key].Record.fechafin,
                };

                fetch.push({
                    ...eventsTemp,
                    record: {
                        elections: {...jsonData[key].Record.Election},
                        pollingStations: {...jsonData[key].Record.PollingTable}
                    }
                })

                events.push( {...eventsTemp} )
            }
            dispatch( fetchSuccessEvents( fetch, events ) );
        })
        .catch( error => console.log(error));


    }
}
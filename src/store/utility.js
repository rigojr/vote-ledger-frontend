export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};

export const createArg = (electoralEvent) => {

    let elections;
    let pollingStations;

    if ( electoralEvent.elections ){

    } else {
        elections = ""
    }

    if ( electoralEvent.pollingStations ){

    } else {
        pollingStations = ""
    }

    const elecotralEventArg = "{\"id\"\:\"${electoralEvent.id}\",\"estado\":\"${electoralEvent.state}\"}"

    /* const elecotralEventArg = `
        {
            \"id"\:\"${electoralEvent.id}\",
            \"estado\":\"${electoralEvent.state}\",
            \"fechainicio\":${+new Date(electoralEvent.initDate)},
            \"fechafin\":${+new Date(electoralEvent.endDate)},
            ${pollingStations}
            ${elections}
        }
    ` */
    return elecotralEventArg
}
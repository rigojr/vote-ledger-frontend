import {schools} from '../constants/schools';
import { schoolsCES, schoolsIng, schoolsHE, schoolsD, schoolsT} from '../constants/schoolsFaculties';
import queryVoteServices from '../services/queryVote';

export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};

export const compareValues = (key, order = 'asc') => {
    return function innerSort(a, b) {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        // property doesn't exist on either object
        return 0;
      }
  
      const varA = (typeof a[key] === 'string')
        ? a[key].toUpperCase() : a[key];
      const varB = (typeof b[key] === 'string')
        ? b[key].toUpperCase() : b[key];
  
      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return (
        (order === 'desc') ? (comparison * -1) : comparison
      );
    };
  }

  export const immmutableInsertItem = (array, payload) => {
    return [...array.slice(0, payload.index), payload.item, ...array.slice(payload.index)]
  }
  
  export const immutableRemoveItem = (array, payload) => {
    return [...array.slice(0, payload.index), ...array.slice(payload.index + 1)]
  }

  export const parseRawData = (rawEvent) => {
    const tempInitDate = new Date(rawEvent.fechainicio)
    const tempEndDate = new Date(rawEvent.fechafin)

    const eventsTemp = {
        id: rawEvent.id,
        eventName: rawEvent.nombreevento,
        state: rawEvent.estado,
        initDate: tempInitDate.toString(),
        endDate: tempEndDate.toString(),
    };

    const fetchTemp = {
        ...eventsTemp,
        record: {
            elections: {...rawEvent.Election},
            pollingStations: {...rawEvent.PollingTable}
        }
    }

    return {
      event: eventsTemp,
      fetch: fetchTemp
    }

  }

  export const parseRawDataUser = (rawUser) => {

    const userTemp = {
      id: rawUser.id,
      name: rawUser.nombre,
      faculty: rawUser.facultad,
      school: rawUser.escuela,
      email: rawUser.email,
    };

    const fetchTemp = {
      ...userTemp,
      password: rawUser.password,
      type: rawUser.type,
      status: rawUser.status,
      voteRercord: {...rawUser.HistorialVotos}
    }

    return {
      user: userTemp,
      fetch: fetchTemp
    }

  }

  export const areThereElection = ElectoralEvents => {
    return ElectoralEvents.every( electoralEvent => electoralEvent.state !== 'Elección' )
  }

  export const canCreateUpdate = ElectoralEvents => {
    const afterElection = ["Elección", "Escrutinio", "Adjudicación", "Finalizado"]
    return ElectoralEvents.every( electoralEvent => 
      afterElection.every( e => e !== electoralEvent.state)
    )
  }

  export const canShowEsc = (ElectoralEvent, StateArray) => {
    return StateArray.every( e => e !== ElectoralEvent.state)
  }

  export const candidatesNull = (Elections) => {
    const keys = Object.keys(Elections)
    if(!(keys.length > 0))
      return false
    return keys.every( key => Elections[key].Candidatos !== null )
  }

  export const SchoolToFaculty = (School) => {
    switch (School) {
        case "Administración y Contaduría":
            return "Ciencias Económicas y Sociales";
            
        case "Civil":
            return "Ingeniería"
        case "Ciencias Sociales":
            return "Ciencias Económicas y Sociales";
            
        case "Comunicación Social":
            return "Humanidades y Educación";
            
        case "Derecho":
            return "Derecho";
            
        case "Educación":
            return "Humanidades y Educación";
            
        case "Economía":
            return "Ciencias Económicas y Sociales";
            
        case "Filosofía":
            return "Humanidades y Educación";
            
        case "Industrial":
            return "Ingeniería";
            
        case "Informática":
            return "Ingeniería";
            
        case "Letras":
            return "Humanidades y Educación";
            
        case "Psicología":
            return "Humanidades y Educación";
            
        case "Telecomunicaciones":
            return "Ingeniería";
            
        case "Teología":
            return "Teología";
    
    }
  }

  export const electionsWithUCAB = (Elections) => {
    const keys = Object.keys(Elections)
    return keys.every( key =>  Elections[key].escuela !== "UCAB" )
  }

  export const countSchools = (PollingStations) => {
    const keys = Object.keys(PollingStations)

     return keys.reduce(
      (counter, key) => {
        const acum = counter
        acum[PollingStations[key].escuela] = (acum[PollingStations[key].escuela] || 0) + 1
        return acum
      },
      [{}])

  }

  export const pollingStationsWithUCAB = (PollingStations) => {
    const occurencesArrayObj = countSchools(PollingStations)
    return schools.length === (Object.keys(occurencesArrayObj).length - 1)
  }

  export const validateFacultiesSchools = ( Elections, PollingStations ) => {
    const ElectionsKeys = Object.keys(Elections)
    return ElectionsKeys.every( key => {
      if(Elections[key].tipoeleccion === 'Consejo de Facultad'){
        const occurencesArrayObj = Object.keys(countSchools(PollingStations))
        switch (Elections[key].escuela) {
          case 'Ciencias Económicas y Sociales':
            return schoolsCES.every( school => occurencesArrayObj.includes(school))
          case 'Ingeniería':
            return schoolsIng.every( school => occurencesArrayObj.includes(school))
          case 'Humanidades y Educación':
            return schoolsHE.every( school => occurencesArrayObj.includes(school))
          case 'Derecho':
            return schoolsD.every( school => occurencesArrayObj.includes(school))
          case 'Teología':
            return schoolsT.every( school => occurencesArrayObj.includes(school))
        }
      } else {
        return true
      }
    })
  }

  export const validateSchools = ( Elections, PollingStations  ) => {
    const ElectionsKeys = Object.keys(Elections)
    return ElectionsKeys.every( key => {
      if(Elections[key].tipoeleccion === 'Consejo de Escuela'){
        const occurencesArrayObj = Object.keys(countSchools(PollingStations))
        return occurencesArrayObj.includes(Elections[key].escuela)
      } else {
        return true
      }
    })
  }


  export const validateElectoralEvent = (ElectoralEvent) => {
    const ElectionsKeys = Object.keys(ElectoralEvent.record.elections)
    const PollingStations = Object.keys(ElectoralEvent.record.pollingStations)

    if( !(ElectionsKeys.length > 0) || !(PollingStations.length > 0))
      return { validate: false, message: "Error, no existen mesas electorales y/o elecciones registradas para el evento electoral"}
    
    if( !(candidatesNull(ElectoralEvent.record.elections)) )
      return { validate: false, message: "Error, no existen candidatos registrados para 1 o más elecciones del evento electoral" }

    if( !(electionsWithUCAB(ElectoralEvent.record.elections)) )
      if( !pollingStationsWithUCAB(ElectoralEvent.record.pollingStations) )
        return { validate: false, message: "Error, existe una elección para la UCAB. Por lo tanto, debe existir una mesa electoral por escuela"}

    if( !validateFacultiesSchools( ElectoralEvent.record.elections, ElectoralEvent.record.pollingStations ))
      return { validate: false, message: "Error, una o más elecciones de tipo facultad no tienen la cantidad necesaria de mesas electorales por escuelas" }

    if( !validateSchools( ElectoralEvent.record.elections, ElectoralEvent.record.pollingStations ))
      return { validate: false, message: "Error, una o más elecciones de tipo escuela no tienen la cantidad necesaria de mesas electorales por la escuela" }

    return {validate: true, message: "Puede pasar"}
  }

  export const itBelong = ( user, election) => {
    if(election.tipoeleccion === "Consejo Universitario")
      return true
    if(election.tipoeleccion === "Consejo de Facultad"){
      return election.escuela === user.faculty
    } else {
      return election.escuela === user.school
    }
  }

  export const countVotes = async (electoralEvent) => {
    const electionsKeys = Object.keys(electoralEvent.record.elections)
    const pollingStatiosKeys = Object.keys(electoralEvent.record.pollingStations)
    const pollingStationAcum = []
    const candidateAcum = []

    for (const pollingStationkey of pollingStatiosKeys) {
      const pollingStation = electoralEvent.record.pollingStations[pollingStationkey]
      for (const electionKey of electionsKeys) {
        const candidatos = electoralEvent.record.elections[electionKey].Candidatos
        for (const candidato of candidatos) {
          await queryVoteServices()
            .getCountVotes(
                electoralEvent.id,
                electionKey,
                pollingStationkey,
                candidato.idusuario
            )
            .then( response => {
                const candidateIndex = 
                  candidateAcum.findIndex( candidateData => candidateData.idusuario === candidato.idusuario)
                  const toSum = isNaN(response.data.mensaje) ? 0 : parseInt(response.data.mensaje)
                if(candidateIndex === -1){
                  candidateAcum.push({
                    idusuario: candidato.idusuario,
                    votes: toSum
                  })
                }
                else{
                  candidateAcum[candidateIndex] = {
                    idusuario: candidato.idusuario,
                    votes: candidateAcum[candidateIndex].votes + toSum
                  }
                }
            })
        }

        await queryVoteServices().getCountVotes(
          electoralEvent.id,
          electionKey,
          pollingStationkey,
          null
          )
        .then( response => {
              const pollingStationIndex = 
                pollingStationAcum.findIndex( pollingStationData => pollingStationData.id === pollingStation.id)
                const toSum = isNaN(response.data.mensaje) ? 0 : parseInt(response.data.mensaje)
              if(pollingStationIndex === -1){
                pollingStationAcum.push({
                  id: pollingStation.id,
                  votes: toSum
                })
              }
              else{
                pollingStationAcum[pollingStationIndex] = {
                  id: pollingStation.id,
                  votes: pollingStationAcum[pollingStationIndex].votes + toSum
                }
              }
        })

      }
    }
    return await { candidates: candidateAcum, pollingStations: pollingStationAcum }
  }
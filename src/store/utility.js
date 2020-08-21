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
      voteRercord: {...rawUser.HistorialVotos}
    }

    return {
      user: userTemp,
      fetch: fetchTemp
    }

  }
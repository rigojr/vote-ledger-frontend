import axios from '../axios-tg'

const queryVoteServices = () => {
    return {
        getCountVotes: 
            (idEventoElectoral, idEleccion, idMesa, idUsuario) => axios.post('/vote/gettotal', {
                tipo:"c",
                idEventoElectoral,
                idEleccion,
                idMesa,
                idUsuario: idUsuario ? idUsuario : ""
            }),
    }
}

export default queryVoteServices
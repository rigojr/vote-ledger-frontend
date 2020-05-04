import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import Aux from '../../hoc/Aux';
import SubHeader from '../../components/Layout/Subheader/Subheader';
import AllTable from '../../components/AllTable/AllTable';

class ElectoralEvent extends Component {

    state = {
        users: [
            { id: "1", nombre: "José Salas", facultad: "Ingeniería", escuela: "Informática", email: "jsalas@gmail.com"},
            { id: "2", nombre: "Simón Esperanza", facultad: "Ingeniería", escuela: "Informática", email: "esperanzas@gmail.com"},
            { id: "3", nombre: "Ramón Bravo", facultad: "Ciencias Sociales", escuela: "Comunicación Social", email: "bravor@gmail.com"},
            { id: "4", nombre: "Victoria Ramirez", facultad: "Derecho", escuela: "Derecho", email: "ramirezv@gmail.com"},
            { id: "5", nombre: "José Salas", facultad: "Ingeniería", escuela: "Informática", email: "jsalas@gmail.com"},
            { id: "6", nombre: "Simón Esperanza", facultad: "Ingeniería", escuela: "Informática", email: "esperanzas@gmail.com"},
            { id: "7", nombre: "Ramón Bravo", facultad: "Ciencias Sociales", escuela: "Comunicación Social", email: "bravor@gmail.com"},
            { id: "8", nombre: "Victoria Ramirez", facultad: "Derecho", escuela: "Derecho", email: "ramirezv@gmail.com"},
            { id: "9", nombre: "José Salas", facultad: "Ingeniería", escuela: "Informática", email: "jsalas@gmail.com"},
            { id: "10", nombre: "Simón Esperanza", facultad: "Ingeniería", escuela: "Informática", email: "esperanzas@gmail.com"},
            { id: "11", nombre: "Ramón Bravo", facultad: "Ciencias Sociales", escuela: "Comunicación Social", email: "bravor@gmail.com"},
            { id: "12", nombre: "Victoria Ramirez", facultad: "Derecho", escuela: "Derecho", email: "ramirezv@gmail.com"},
            { id: "13", nombre: "José Salas", facultad: "Ingeniería", escuela: "Informática", email: "jsalas@gmail.com"},
            { id: "14", nombre: "Simón Esperanza", facultad: "Ingeniería", escuela: "Informática", email: "esperanzas@gmail.com"},
            { id: "15", nombre: "Ramón Bravo", facultad: "Ciencias Sociales", escuela: "Comunicación Social", email: "bravor@gmail.com"},
            { id: "16", nombre: "Victoria Ramirez", facultad: "Derecho", escuela: "Derecho", email: "ramirezv@gmail.com"},
            { id: "17", nombre: "Fernanda Chacón", facultad: "Ciencias Sociales", escuela: "Letras", email: "chacof@gmail.com"}
        ],
        theaderTable: ["Cédula","Nombre","Facultad","Escuela","Email","Acción"],
        showModal: false,
        showElection: false,
        search: ''
    }

    componentDidMount () {
        console.log("Users.js is mount");
        // Here we ask for the initial data
    }

    createUserHandler = () => {
        console.log("Creating New User");
    }

    modalHandler = () => {
        console.log("Modal Handler");
        const modalBoolean = this.state.showModal;
        const showModalUpdated = !modalBoolean;
        this.setState( { showModal: showModalUpdated } );
    }

    showElectionHandler = () => {
        console.log("Show Election Handler");
        const electionBoolean = this.state.showElection;
        const showElectionUpdated = !electionBoolean;
        this.setState( { showElection: showElectionUpdated } );
    }

    searchUserHandler = () => {
        console.log("Searching User");
        console.log(this.state.search);
    }

    handleOnInputSearchChange = (event) => {
        const search = event.target.value;
        this.setState({ search } );
    };

    render(){

        let UsersComponent = this.props.isAuthed ?
        <AllTable 
            theadArray={this.state.theaderTable}
            payloadArray={this.state.users}/>    
            :
        <Redirect from="/Dashboard" to="/login"/>;

        return(
            <Aux>
                <SubHeader
                    subHeaderTitle="Eventos Electorales"
                    searchHandler={this.searchUserHandler}
                    btnName="Evento Electoral"
                    searchPlaceholder="Código del Evento Electoral"
                    showModal={this.modalHandler}
                    onChange={this.handleOnInputSearchChange}
                    typeInput="button"/>
                {UsersComponent}
            </Aux>
        )
    }

}

export default ElectoralEvent;
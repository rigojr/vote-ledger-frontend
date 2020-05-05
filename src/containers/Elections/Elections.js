import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import Aux from '../../hoc/Aux';
import SubHeader from '../../components/Layout/Subheader/Subheader';
import CreateModal from '../../components/Elections/ElectionCreateModal/ElectionCreateModal';
import AllTable from '../../components/AllTable/AllTable';
import AllModal from '../../components/Layout/Modal/AllModal';
class Elections extends Component {

    state = {
        elections: [
            { id: "1", description: "Electora Election 1", typeElection:"Consejo Universitario"},
            { id: "2", description: "Electora Election 2", typeElection:"Consejo de Facultad"},
            { id: "3", description: "Electora Election 3", typeElection:"Consejo de Escuela"},
            { id: "4", description: "Electora Election 4", typeElection:"Consejo de Facultad"},
            { id: "5", description: "Electora Election 5", typeElection:"Conse de Escuela"}
        ],
        electoralEvents: [
            { id: "1", estado: "Convocatoria", fechaInicio: "2020-05-05T06:00", fechaFin: "2020-05-05T20:00"},
            { id: "2", estado: "Adjudicación", fechaInicio: "2019-05-05T06:00", fechaFin: "2019-05-05T20:00"},
            { id: "3", estado: "Adjudicación", fechaInicio: "2018-05-05T06:00", fechaFin: "2018-05-05T20:00"}
        ],
        showModal: false,
        showElection: false,
        search: '',
        theaderTable: ["Código","Descripción","Tipo de Elección", ""],
    }

    componentDidMount () {
        console.log("Elections.js is mount")
        // Here we ask for the initial data
    }

    searchElectionHandler = () =>{
        console.log("Searching Election");
        console.log(this.state.search);
    }

    handleOnInputSearchChange = (event) => {
        const search = event.target.value;
        this.setState({ search } );
    };

    modalHandler = () => {
        console.log("Modal Handler");
        const modalBoolean = this.state.showModal;
        const showModalUpdated = !modalBoolean;
        this.setState( { showModal: showModalUpdated } );
    }

    createElectionHandler = () => {
        console.log("Creating New Election")
    }

    consultElectionHanlder = () => {
        console.log("Consulting Election");
    }

    deleteElectionHandler = () => {
        console.log("Deleting Election");
    }

    render(){

        let ElectionTable = this.props.isAuthed ?
        <AllTable 
            theadArray={this.state.theaderTable}
            payloadArray={this.state.elections}
            consultHandler={this.consultElectionHanlder}
            deleteHandler={this.deleteElectionHandler}
            deleteAction={true}/>
            :
        <Redirect from="/Dashboard" to="/login"/>;

        return(
            <Aux>
                <SubHeader 
                    subHeaderTitle="Elecciones del Sistema"
                    searchHandler={this.searchElectionHandler}
                    btnName="Eventos Electorales"
                    searchPlaceholder="Código de la Elección"
                    showModal={this.modalHandler}
                    typeInput="drop"
                    onChange={this.handleOnInputSearchChange}/>
                {ElectionTable}
                <AllModal
                    showModal={this.modalHandler}
                    modalBoolean={this.state.showModal}
                    createHandler={this.createElectionHandler}
                    modalTitile="Crear Elección"
                    create={true}>
                    <CreateModal />
                </AllModal>
            </Aux>
        )
    }

}

export default Elections;
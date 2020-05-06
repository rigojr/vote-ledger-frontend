import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import Aux from '../../hoc/Aux';
import SubHeader from '../../components/Layout/Subheader/Subheader';
import CreateModal from '../../components/Elections/ElectionCreateModal/ElectionCreateModal';
import AllTable from '../../components/Layout/AllTable/AllTable';
import AllModal from '../../components/Layout/Modal/AllModal';
import CardMessage from '../../components/Layout/CardMessage/CardMessage';
import InfraHeader from '../../components/Layout/InfraHeader/InfraHeader';

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
        selectElectoralEvent: '',
        showModal: false,
        search: '',
        theaderTable: ["Código","Descripción","Tipo de Elección", ""],
        showMessage: true,
        showTable: false,
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

    selectElectoralEventHandler = ( ElectoralEvent ) => {
        console.log("Selecting " + ElectoralEvent + " as a Electoral Event");
        const tempShowMessage = false;
        const tempShowTable = true;
        this.setState(
            {
                showMessage: tempShowMessage,
                showTable: tempShowTable,
                selectElectoralEvent: ElectoralEvent
            }
        );
    }

    render(){

        let ElectionMessage = this.state.showMessage ?
        <CardMessage messageTitle="Por favor, seleccione un evento electoral para continuar."/> :
        null;

        let ElectionContent = this.state.showTable ?
        <Aux>
            <InfraHeader 
                title={this.state.selectElectoralEvent}
                btnName="Elección"
                showModal={this.modalHandler}
                btnBlockBoolean={true}/>
            <AllTable 
                theadArray={this.state.theaderTable}
                payloadArray={this.state.elections}
                consultHandler={this.consultElectionHanlder}
                deleteHandler={this.deleteElectionHandler}
                deleteAction={true}/>
        </Aux>
        
            :
        null;

        let ElectionComponent = this.props.isAuthed ?
        <Aux>
            <SubHeader 
                subHeaderTitle="Elecciones del Sistema"
                searchHandler={this.searchElectionHandler}
                btnName="Eventos Electorales"
                btnPayload={this.state.electoralEvents}
                btnSelect={this.selectElectoralEventHandler}
                searchPlaceholder="Código de la Elección"
                typeInput="drop"
                onChange={this.handleOnInputSearchChange}/>
            {ElectionMessage}
            {ElectionContent}
            <AllModal
                showModal={this.modalHandler}
                modalBoolean={this.state.showModal}
                createHandler={this.createElectionHandler}
                modalTitile="Crear Elección"
                create={true}>
                <CreateModal />
            </AllModal>
        </Aux>:
         <Redirect from="/Dashboard" to="/login"/>;

        return(
            <Aux>
                {ElectionComponent}
            </Aux>
        )
    }

}

export default Elections;
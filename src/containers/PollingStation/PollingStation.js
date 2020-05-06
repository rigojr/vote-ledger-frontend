import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import Aux from '../../hoc/Aux';
import SubHeader from '../../components/Layout/Subheader/Subheader';
import CreateModal from '../../components/PollingStation/PollingStationCreateModal/PollingStationCreateModal';
import AllTable from '../../components/Layout/AllTable/AllTable';
import AllModal from '../../components/Layout/Modal/AllModal';
import CardMessage from '../../components/Layout/CardMessage/CardMessage';
import InfraHeader from '../../components/Layout/InfraHeader/InfraHeader';

class PollingStation extends Component {

    state = {
        pollingStation: [
            { id: "1", voters: "0", initDate: "2020-05-05T06:00", endDate: "", enable: false, idFather: "1", school: "Telecomunicaciones"},
            { id: "2", voters: "150", initDate: "2019-05-05T06:00", endDate: "2019-05-05T20:00", enable: false, idFather: "2", school: "Educación"},
            { id: "3", voters: "230", initDate: "2019-05-05T06:00", endDate: "2019-05-05T20:00", enable: false, idFather: "2", school: "Derecho"},
            { id: "4", voters: "600", initDate: "2019-05-05T06:00", endDate: "2019-05-05T20:00", enable: false, idFather: "2", school: "Civil"},
            { id: "5", voters: "2", initDate: "2018-05-05T06:00", endDate: "2018-05-05T20:00", enable: false, idFather: "3", school: "Informática"}
        ],
        electoralEvents: [
            { id: "1", estado: "Convocatoria", fechaInicio: "2020-05-05T06:00", fechaFin: "2020-05-05T20:00"},
            { id: "2", estado: "Adjudicación", fechaInicio: "2019-05-05T06:00", fechaFin: "2019-05-05T20:00"},
            { id: "3", estado: "Adjudicación", fechaInicio: "2018-05-05T06:00", fechaFin: "2018-05-05T20:00"}
        ],
        selectElectoralEvent: '',
        showModal: false,
        search: '',
        theaderTable: ["Código","Votantes","Inicio", "Finalización", "Habilitado", "Evento Electoral", "Escuela", ""],
        showMessage: true,
        showTable: false,
    }

    componentDidMount () {
        console.log("PollingStation.js is mount")
        // Here we ask for the initial data
    }

    searchPollingStationHandler = () =>{
        console.log("Searching Polling Station");
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

    createPollingStationHandler = () => {
        console.log("Creating New Polling Station")
    }

    consultPollingStationHanlder = () => {
        console.log("Consulting Polling Station");
    }

    deletePollingStationHandler = () => {
        console.log("Deleting Polling Station");
    }

    enablePollingStationHandler = () => {
        console.log("Enabling/Disabling Polling Station");
    }

    uninstallPollingStationHanlder = () => {
        console.log("Uninstalling Polling Station");
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

        let PollingStationMessage = this.state.showMessage ?
        <CardMessage messageTitle="Por favor, seleccione un evento electoral para continuar."/> :
        null;

        let PollingStationContent = this.state.showTable ?
        <Aux>
            <InfraHeader 
                title={this.state.selectElectoralEvent}
                btnName="Mesa Electoral"
                showModal={this.modalHandler}
                btnBlockBoolean={true}/>
            <AllTable 
                theadArray={this.state.theaderTable}
                payloadArray={this.state.pollingStation}
                consultHandler={this.consultPollingStationHanlder}
                deleteHandler={this.deletePollingStationHandler}
                deleteAction={true}
                pollingStation={true}
                enableHandler={this.enablePollingStationHandler}
                uninstallHandler={this.uninstallPollingStationHanlder}/>
        </Aux>
        
            :
        null;

        let PollingStationComponent = this.props.isAuthed ?
        <Aux>
            <SubHeader 
                subHeaderTitle="Mesas Electorales del Sistema"
                searchHandler={this.searchPollingStationHandler}
                btnName="Eventos Electorales"
                btnPayload={this.state.electoralEvents}
                btnSelect={this.selectElectoralEventHandler}
                searchPlaceholder="Código de la Mesa Electoral"
                typeInput="drop"
                onChange={this.handleOnInputSearchChange}/>
            {PollingStationMessage}
            {PollingStationContent}
            <AllModal
                showModal={this.modalHandler}
                modalBoolean={this.state.showModal}
                createHandler={this.createPollingStationHandler}
                modalTitile="Crear Mesa Electoral"
                create={true}>
                <CreateModal />
            </AllModal>
        </Aux>:
         <Redirect from="/Dashboard" to="/login"/>;

        return(
            <Aux>
                {PollingStationComponent}
            </Aux>
        )
    }

}

export default PollingStation;
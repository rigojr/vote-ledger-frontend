import React, { Component } from 'react';

import { Redirect } from 'react-router-dom';

import Aux from '../../hoc/Aux';
import SubHeader from '../../components/Layout/Subheader/Subheader';
import ContentModal from '../../components/Candidates/CandidatesModalInput/CandidatesModalInput';
import AllTable from '../../components/Layout/AllTable/AllTable';
import AllModal from '../../components/Layout/Modal/AllModal';
import CardMessage from '../../components/Layout/CardMessage/CardMessage';
import InfraHeader from '../../components/Layout/InfraHeader/InfraHeader';

class Candidates extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            candidates: [
               {id:"1", name:"1", faculty:"1", school:"Administración y Contaduría", email:"1"},
               {id:"2", name:"2", faculty:"2", school:"Administración y Contaduría", email:"2"},
               {id:"3", name:"3", faculty:"3", school:"Administración y Contaduría", email:"3"}
               
            ],
            electoralEvents: [
                { id: "1", estado: "Convocatoria", fechaInicio: "2020-05-05T06:00", fechaFin: "2020-05-05T20:00"},
                { id: "2", estado: "Adjudicación", fechaInicio: "2019-05-05T06:00", fechaFin: "2019-05-05T20:00"},
                { id: "3", estado: "Adjudicación", fechaInicio: "2018-05-05T06:00", fechaFin: "2018-05-05T20:00"}
            ],
            selectElectoralEvent: '',
            showModal: false,
            search: '',
            theaderTable: ["Cédula","Nombre","Facultad", "Escuela", "Correo Electrónico", ""],
            showMessage: true,
            showTable: false,
         };
    }

    searchHandler = () =>{
        console.log("Searching Candidate");
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

    createHandler = () => {
        console.log("Creating New Election")
    }

    consultHanlder = () => {
        console.log("Consulting Election");
    }

    deleteHandler = () => {
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

    render() {

        let ElectionMessage = this.state.showMessage ?
        <CardMessage messageTitle="Por favor, seleccione un evento electoral para continuar."/> :
        null;

        let CandidateContent = this.state.showTable ?
        <Aux>
            <InfraHeader 
                title={this.state.selectElectoralEvent}
                btnName="Candidato"
                showModal={this.modalHandler}
                btnBlockBoolean={true}/>
            <AllTable 
                theadArray={this.state.theaderTable}
                payloadArray={this.state.candidates}
                consultHandler={this.consultHanlder}
                deleteHandler={this.deleteHandler}
                deleteAction={true}/>
        </Aux>
        
            :
        null;

        let ElectionComponent = this.props.isAuthed ?
        <Aux>
            <SubHeader 
                subHeaderTitle="Candidatos del Sistema"
                searchHandler={this.searchHandler}
                btnName="Eventos Electorales"
                btnPayload={this.state.electoralEvents}
                btnSelect={this.selectElectoralEventHandler}
                searchPlaceholder="Cédula del Candidato"
                typeInput="drop"
                onChange={this.handleOnInputSearchChange}/>
            {ElectionMessage}
            {CandidateContent}
            <AllModal
                showModal={this.modalHandler}
                modalBoolean={this.state.showModal}
                createHandler={this.createHandler}
                modalTitile="Crear Candidato"
                create={true}>
                <ContentModal />
            </AllModal>
        </Aux>:
            <Redirect from="/candidates" to="/login"/>;

        return (
            <Aux>
                {ElectionComponent}
            </Aux>
        );
    }
}

export default Candidates;
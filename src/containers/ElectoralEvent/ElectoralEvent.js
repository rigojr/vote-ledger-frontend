import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import Aux from '../../hoc/Aux';
import SubHeader from '../../components/Layout/Subheader/Subheader';
import AllTable from '../../components/AllTable/AllTable';

class ElectoralEvent extends Component {

    state = {
        electoralEvents: [
            { id: "1", estado: "Convocatoria", fechaInicio: "2020-05-05T06:00", fechaFin: "2020-05-05T20:00"},
            { id: "2", estado: "Adjudicación", fechaInicio: "2019-05-05T06:00", fechaFin: "2019-05-05T20:00"},
            { id: "3", estado: "Adjudicación", fechaInicio: "2018-05-05T06:00", fechaFin: "2018-05-05T20:00"}
        ],
        theaderTable: ["Código","Estado","Inicio","Finalización", ""],
        showModal: false,
        showElection: false,
        search: ''
    }

    componentDidMount () {
        console.log("ElectoralEvents.js is mount");
        // Here we ask for the initial data
    }

    createElectoralEventHandler = () => {
        console.log("Creating New Electoral Event");
    }

    consultElectoralEventHandler = () =>{
        console.log("Consulting Electoral Event");
    }

    deleteElectoralEventHandler = () =>{
        console.log("Deleting Electoral Event");
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

        let ElectoralEventsComponent = this.props.isAuthed ?
        <AllTable 
            theadArray={this.state.theaderTable}
            payloadArray={this.state.electoralEvents}
            consultHandler={this.consultElectoralEventHandler}
            deleteHandler={this.deleteElectoralEventHandler}
            deleteAction={true}/>    
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
                {ElectoralEventsComponent}
            </Aux>
        )
    }

}

export default ElectoralEvent;
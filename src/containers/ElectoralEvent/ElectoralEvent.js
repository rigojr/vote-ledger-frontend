import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import axios from '../../axios';

import Aux from '../../hoc/Aux';
import SubHeader from '../../components/Layout/Subheader/Subheader';
import AllTable from '../../components/Layout/AllTable/AllTable';
import AllModal from '../../components/Layout/Modal/AllModal';
import CreateModal from '../../components/ElectoralEvent/ElectoralEventCreateModal/ElectoralEventCreatModal';
import Spinner from '../../components/UI/Spinner/Spinner';

class ElectoralEvent extends Component {

    state = {
        electoralEvents: null,
        theaderTable: ["Código","Estado","Inicio","Finalización", ""],
        showModal: false,
        search: '',
        form: {
            initDate: null,
            endDate: null,
            eventCode: ''
        },
        modalMessage: '',
        enableState: false
    }

    componentDidMount () {
        axios.get('/electoral-events.json')
        .then( response => {
            const fetch = [];
            for( let key in response.data){
                fetch.push({
                    id: response.data[key].id,
                    state: response.data[key].state,
                    initDate: response.data[key].initDate,
                    endDate: response.data[key].endDate
                });
            }
            this.setState({ electoralEvents: fetch });
        })
        .catch( error => {
            console.log(error)
        })
    }

    setInitDate = (date) => {
        this.setState( prevState => ({ form:{
            ...prevState.form,
            initDate: date
        } }) )
    }

    setEndDate = (date) => {
        this.setState( prevState => ({ form:{
            ...prevState.form,
            endDate: date
        } }) )
    }

    setEventCode = (e) => {
        const eventCode = e.target.value;
        this.setState( prevState => ({ form: {...prevState.form, eventCode } }) )
    }

    setModalMessage = (message) => {
        console.log("setModalMessage");
        console.log(message)
        this.setState(  { modalMessage: message} );
    }

    cleanModalHandler = () => {
        this.setState( { 
            enableState: false,
            form:{
                initDate: null,
                endDate: null,
                eventCode: ''
            }
        } );
    }

    createHandler = () => {
        console.log("Creating New Electoral Event");
        this.setModalMessage("Enviando información al Blockchain");
        this.setState( { enableState: true} );
        axios.post('/electoral-events.json', {
            id: this.state.form.eventCode,
            state: 'Convocatoria',
            initDate: this.state.form.initDate,
            endDate: this.state.form.endDate
        })
        .then( (response) => {
            console.log(response);
            this.setModalMessage("Guardado con éxito!");
        })
        .catch( error => {
            console.log(error);
        });
        setTimeout(this.cleanModalHandler,3000);
    }

    consultHandler = () =>{
        console.log("Consulting Electoral Event");
    }

    deleteHandler = () =>{
        console.log("Deleting Electoral Event");
    }

    modalHandler = () => {
        console.log("Modal Handler");
        const modalBoolean = this.state.showModal;
        const showModalUpdated = !modalBoolean;
        this.setState( { showModal: showModalUpdated } );
    }


    searchHandler = () => {
        console.log("Searching Electoral Event");
        console.log(this.state.search);
    }

    handleOnInputSearchChange = (event) => {
        const search = event.target.value;
        this.setState({ search } );
    };

    render(){

        let RedirectComponent = this.props.isAuthed ?
            null
            :
        <Redirect from="/electora-events" to="/login"/>;

        let ElectoralEventsComponent = <Spinner/>;

        if (this.state.electoralEvents){
            ElectoralEventsComponent = (
                <AllTable 
                    theadArray={this.state.theaderTable}
                    payloadArray={this.state.electoralEvents}
                    consultHandler={this.consultHandler}
                    deleteHandler={this.deleteHandler}
                    deleteAction={true}/> 
            );
        }

        return(
            <Aux>
                <SubHeader
                    subHeaderTitle="Eventos Electorales"
                    searchHandler={this.searchHandler}
                    btnName="Evento Electoral"
                    searchPlaceholder="Código del Evento Electoral"
                    showModal={this.modalHandler}
                    onChange={this.handleOnInputSearchChange}
                    typeInput="button"/>
                {ElectoralEventsComponent}
                <AllModal
                    showModal={this.modalHandler}
                    modalBoolean={this.state.showModal}
                    createHandler={this.createHandler}
                    modalTitile="Crear Evento Electoral"
                    create={true}
                    enableState={this.state.enableState}
                    modalMessage={this.state.modalMessage}>
                    <CreateModal 
                        setInitValue={this.setInitDate}
                        setEndValue={this.setEndDate}
                        setEvent={this.setEventCode}
                        inputValues={this.state.form}/>
                </AllModal>
                {RedirectComponent}
            </Aux>
        )
    }

}

export default ElectoralEvent;
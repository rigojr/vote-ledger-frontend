import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux';
import SubHeader from '../../components/Layout/Subheader/Subheader';
import AllTable from '../../components/Layout/AllTable/AllTable';
import AllModal from '../../components/Layout/Modal/AllModal';
import CreateModal from '../../components/ElectoralEvent/ElectoralEventCreateModal/ElectoralEventCreatModal';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';
import { eventStates } from '../../constants/eventStates';

class ElectoralEvent extends Component {

    state = {
        electoralEvents: null,
        theaderTable: ["Código","Nombre","Estado","Inicio","Finalización", ""],
        showModal: false,
        search: '',
        form: {
            initDate: null,
            endDate: null,
            eventCode: '',
            eventName: '',
            state: eventStates[0]
        },
        modalMessage: '',
        enableState: false,
        modalCreateBtn: false
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
        const value = e.target.value;
        const name = [e.target.name];
        this.setState( prevState => (
            {
                ...prevState, 
                form: {
                    ...prevState.form, 
                    [name]: value  
                } 
            }));
    }

    setModalMessage = (message) => {
        this.setState(  { modalMessage: message} );
    }

    cleanModalHandler = () => {
        this.setState( { 
            enableState: false,
            form:{
                initDate: null,
                endDate: null,
                eventCode: '',
                eventName: '',
                state: eventStates[0]
            }
        } );
        this.setModalMessage("");
    }

    setOnCreate = (elections, pollingStations) => {
        const electoralEvent = {
            id: this.state.form.eventCode,
            estado: this.state.form.state,
            fechainicio: +new Date(this.state.form.initDate),
            fechafin: +new Date(this.state.form.endDate),
            nombreevento: this.state.form.eventName,
            election: elections,
            pollingtable: pollingStations
        }
        this.props.onCreate(JSON.stringify(electoralEvent));
        this.props.onFetch();
    }

    createHandler = () => {
        this.setOnCreate(null, null);
        this.setModalMessage("Enviando información al Blockchain");
        this.setState( { enableState: true} );
        setTimeout(this.cleanModalHandler,3000);
    }

    consultModal = ( selectUser ) => {
        let adminBoolean = false;
        if( selectUser.id.charAt(selectUser.id.length - 1) === "A")
            adminBoolean = true;
        this.modalHandler( false, false);
        this.setEnableInput( true );
        this.setState( { 
            user: selectUser,
            selectedTypeOfUser: adminBoolean,
            inputTypeOfUser: true
        } );
    }


    consultHandler = (select) =>{
        this.modalHandler(false);
        this.setState( { enableState: true} );
        this.setState(
            {form: {
                initDate: new Date(select['initDate']),
                endDate: new Date(select['endDate']),
                eventCode: select['id'],
                state: select['state'],
                eventName: select['eventName'],
            }}
        )
    }


    modalHandler = ( create ) => {
        const modalBoolean = this.state.showModal;
        const showModalUpdated = !modalBoolean;
        if(create){
            this.cleanModalHandler();
        }
        this.setState( { 
            showModal: showModalUpdated,
            modalCreateBtn: create
        } );
    }


    searchHandler = () => {
        let found = false;
        if(this.props.events && !(this.state.search == '')){
            for (let i in this.props.events) {
                if(this.state.search === this.props.events[i].id){
                    const searchElectoralEvent = this.props.events[i];
                    this.setState( { 
                        form: {
                            initDate: new Date(searchElectoralEvent['initDate']),
                            endDate: new Date(searchElectoralEvent['endDate']),
                            eventCode: searchElectoralEvent['id']

                        },
                        search: ''
                    } );
                    this.setState( { enableState: true} );
                    this.searchModal();
                    found = true;
                }
            }
            if(!found)
                alert("Evento Electoral con el Código " + this.state.search + ", no fue encontrado");
        }else{
            alert("Error en la búsqueda, verifique entradas y conexión con el back");
        }
    }

    searchModal = () => {
        this.modalHandler( false );
    }

    handleOnInputSearchChange = (event) => {
        const search = event.target.value;
        this.setState({ search } );
    };

    handleChangeStatus =  async (payload) => {
        const eventRaw = this.props.fetch.find( event => event.id === payload.id);
        const newIndex = eventStates.indexOf(payload['state']) + 1;
        if( newIndex < eventStates.length){
            if (confirm(`El Evento Electoral de Id ${payload['id']} cambiara su estado de ${payload['state']} a ${eventStates[newIndex]}. ¿Desea continuar?`)){
                await this.setState(
                    {form: {
                        initDate: new Date(payload['initDate']),
                        endDate: new Date(payload['endDate']),
                        eventCode: payload['id'],
                        state: eventStates[newIndex],
                        eventName: payload['eventName'],
                    }}
                )
                this.setOnCreate(eventRaw.record.elections, eventRaw.record.pollingStations)
            }
        } else {
            alert("Error, el evento electoral ya está fnializado");
        }

    }

    render(){

        let RedirectComponent = this.props.isAuthed ?
            null
            :
        <Redirect from="/electora-events" to="/login"/>;

        let ElectoralEventsComponent = <Spinner/>;

        if (this.props.events){
            ElectoralEventsComponent = (
                <AllTable 
                    theadArray={this.state.theaderTable}
                    payloadArray={this.props.events}
                    consultHandler={this.consultHandler}
                    deleteHandler={this.deleteHandler}
                    deleteAction={true}
                    changeStatus={this.handleChangeStatus}/> 
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
                    typeInput="button"
                    searchValue={this.state.search}
                    updateHandler={this.props.onFetch}/>
                {ElectoralEventsComponent}
                <AllModal
                    showModal={this.modalHandler}
                    modalBoolean={this.state.showModal}
                    createHandler={this.createHandler}
                    modalTitile="Crear Evento Electoral"
                    create={this.state.modalCreateBtn}
                    enableState={this.state.enableState}
                    modalMessage={this.state.modalMessage}>
                    <CreateModal 
                        setInitValue={this.setInitDate}
                        setEndValue={this.setEndDate}
                        setEvent={this.setEventCode}
                        inputValues={this.state.form}
                        enableState={this.state.enableState}/>
                </AllModal>
                {RedirectComponent}
            </Aux>
        )
    }

}

const mapStateToProps = state => {
    return{
        events: state.central.events,
        fetch: state.central.fetch
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onCreate: (electoralEvent) => dispatch( actions.create(electoralEvent) ),
        onFetch: () => dispatch( actions.fetch() )
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ElectoralEvent);
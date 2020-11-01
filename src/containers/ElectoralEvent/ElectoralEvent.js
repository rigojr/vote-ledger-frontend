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
import { compareValues, validateElectoralEvent, countVotes } from '../../store/utility';
import CandidatesModalEV from '../../components/ElectoralEvent/CandidatesModalEV/CandidatesModalEV';
import EscModal from '../../components/ElectoralEvent/EscModal/EscModal';
import ModalMessage from '../../components/UI/ModalMessage/ModalMessage';
import { ErrorMessage } from '../../constants/cssProperties';

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
        modalCreateBtn: false,
        isShowCandidatesModal: false,
        selectedElectoralEvet: null,
        isShowEscModal: false,
        isLoadingEscModal: false,
        responseEscModal: null,
        modalWarning: null
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
        this.props.onSetMessage('');
    }

    setOnCreate = (elections, pollingStations) => {
        const electoralEvent = {
            id: this.state.form.eventCode,
            estado: this.state.form.state,
            fechainicio: +new Date(this.state.form.initDate),
            fechafin: +new Date(this.state.form.endDate),
            nombreevento: this.state.form.eventName,
            Election: elections,
            PollingTable: pollingStations
        }
        this.props.onCreate(JSON.stringify(electoralEvent));
    }

    createHandler = () => {
        let modalWarning = null
        if( this.props.events.findIndex( (event) => event.id === this.state.form.eventCode) == -1 ){
            if(
                !(this.state.form.eventCode === '' ||
                this.state.form.initDate === null ||
                this.state.form.endDate === null ||
                this.state.form.eventName === '')
            ){
                const tempDate = new Date()
                tempDate.setDate( this.state.form.initDate.getDate() + 47 )
                if( tempDate <= this.state.form.endDate){
                    this.setOnCreate(null, null);
                    this.setState( { enableState: true} );
                    setTimeout(this.cleanModalHandler,3000);
                } else {
                    modalWarning =`La fecha de fin debe ser mayor por 47 días continuos que la fecha de inicio`
                }
            } else {
                modalWarning = `Termine de ingresar los datos`
            }
        } else {
            modalWarning = `El id ${this.state.form.eventCode} ya existe`
        }
        this.setState( prevState => ({
            ...prevState,
            modalWarning
        }))
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
        this.props.onSetMessage('');
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
        let modalWarning = null
        if(this.props.events && !(this.state.search == '')){
            for (let i in this.props.events) {
                if(this.state.search === this.props.events[i].id){
                    const searchElectoralEvent = this.props.events[i];
                    this.setState( { 
                        form: {
                            initDate: new Date(searchElectoralEvent['initDate']),
                            endDate: new Date(searchElectoralEvent['endDate']),
                            eventCode: searchElectoralEvent['id'],
                            eventName: searchElectoralEvent['eventName'],
                            state: searchElectoralEvent['state'],
                            
                        },
                        search: ''
                    } );
                    this.setState( { enableState: true} );
                    this.searchModal();
                    found = true;
                }
            }
            if(!found)
                modalWarning = "Evento Electoral con el Código " + this.state.search + ", no fue encontrado"
        }else{
            modalWarning = "Error en la búsqueda, verifique entradas y conexión con el back"
        }
        this.setState( prevState => ({
            ...prevState,
            modalWarning
        }))
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
        let modalWarning = null
        if( newIndex < eventStates.length){
            if (confirm(`El Evento Electoral de Id ${payload['id']} cambiara su estado de ${payload['state']} a ${eventStates[newIndex]}. ${payload['state'] === 'Inscripción' ? 'Por favor, recuerde actualizar el padrón electoral antes de abandonar el proceso de inscripción' : '' }¿Desea continuar?`)){ // eslint-disable-line no-eval
                const returnObject = validateElectoralEvent(eventRaw);
                if( eventRaw.state !== 'Inscripción' || returnObject.validate){
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
                else{
                    modalWarning = returnObject.message
                }
            }
        } else {
            modalWarning = "Error, el evento electoral ya está finalizado"
        }
        this.setState( prevState => ({
            ...prevState,
            modalWarning
        }))
    }

    setModalCandidates = (payload) => {
        this.setState( prevState => ({
            ...prevState,
            isShowCandidatesModal: !this.state.isShowCandidatesModal,
            selectedElectoralEvet: this.props.fetch.find( event => event.id === payload.id)
        }) )
    }

    modalCandidatesHandler = () => {
        this.setState( prevState => ({
            ...prevState,
            isShowCandidatesModal: !this.state.isShowCandidatesModal
        }))
    }

    setModalEsc = (payload) => {
        const electoralEvent = this.props.fetch.find( event => event.id === payload.id)
        this.setState( prevState => ({
            ...prevState,
            isLoadingEscModal: true,
            selectedElectoralEvet: electoralEvent,
        }))
        this.modalEsc()
        countVotes(electoralEvent)
        .then( response => {
            this.setState( prevState => ({
                ...prevState,
                isLoadingEscModal: false,
                responseEscModal: response
            }) )
        })
        .catch( err => {
            this.setState( prevState => ({
                ...prevState,
                isLoadingEscModal: false,
                responseEscModal: null
            }) )
        })
        
    }

    modalEsc = () => {
        this.setState( prevState => ({
            ...prevState,
            isShowEscModal: !this.state.isShowEscModal,
            responseEscModal: null
        }) )
    }

    render(){

        let RedirectComponent = this.props.isAuthed ?
            null
            :
        <Redirect from="/electora-events" to="/login"/>;

        let ElectoralEventsComponent = <Spinner/>;

        if (this.props.events && !this.props.isLoading){
            ElectoralEventsComponent = (
                <AllTable 
                    theadArray={this.state.theaderTable}
                    payloadArray={this.props.events.sort(compareValues('id'))}
                    consultHandler={this.consultHandler}
                    changeStatus={this.handleChangeStatus}
                    candidates={this.setModalCandidates}
                    esc={this.setModalEsc}/> 
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
                    modalTitile="Evento Electoral"
                    create={this.state.modalCreateBtn}
                    enableState={this.state.enableState}
                    modalMessage={this.props.message}>
                    <CreateModal 
                        setInitValue={this.setInitDate}
                        setEndValue={this.setEndDate}
                        setEvent={this.setEventCode}
                        inputValues={this.state.form}
                        enableState={this.state.enableState}
                        create={this.state.modalCreateBtn}/>
                </AllModal>
                {RedirectComponent}
                {
                    this.state.selectedElectoralEvet 
                    ?
                    <Aux>
                        <CandidatesModalEV 
                            modalHandler={this.modalCandidatesHandler}
                            showModal={this.state.isShowCandidatesModal}
                            electoralEvent={this.state.selectedElectoralEvet}
                            users={this.props.users}/>
                            {
                                this.state.responseEscModal ? 
                                <EscModal 
                                    modalHandler={this.modalEsc}
                                    showModal={this.state.isShowEscModal}
                                    electoralEvent={this.state.selectedElectoralEvet}
                                    users={this.props.users}
                                    responseEscModal={this.state.responseEscModal}/>
                                : this.state.isShowEscModal && this.state.isLoadingEscModal ?
                                    <ModalMessage
                                        modalHandler={ () => this.setState( prevState => ({...prevState, isLoadingEscModal: false, isShowEscModal: false})) }>
                                        <Spinner/>
                                    </ModalMessage> : null
                            }
                        
                    </Aux>
                    : null
                }
                {
                    this.state.modalWarning ? 
                        <ModalMessage
                            modalHandler={() => this.setState( prevState => ({...prevState, modalWarning: null}))}
                            modalTitile={"Error"}>
                            <ErrorMessage>{ this.state.modalWarning }</ErrorMessage>
                        </ModalMessage> : null
                }
                
            </Aux>
        )
    }

}

const mapStateToProps = state => {
    return{
        events: state.central.events,
        fetch: state.central.fetch,
        isLoading: state.central.isLoading,
        message: state.central.message,
        users: state.user.users,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onCreate: (electoralEvent) => dispatch( actions.create(electoralEvent) ),
        onFetch: () => dispatch( actions.fetch() ),
        onSetMessage: (message) => dispatch( actions.setMessage(message) )
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ElectoralEvent);
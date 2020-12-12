import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux';
import SubHeader from '../../components/Layout/Subheader/Subheader';
import CreateModal from '../../components/PollingStation/PollingStationCreateModal/PollingStationCreateModal';
import AllTable from '../../components/Layout/AllTable/AllTable';
import AllModal from '../../components/Layout/Modal/AllModal';
import CardMessage from '../../components/Layout/CardMessage/CardMessage';
import InfraHeader from '../../components/Layout/InfraHeader/InfraHeader';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import ActInitModalPDF from '../../components/PollingStation/ActInitModalPDF/ActInitModalPDF';
import { canCreateUpdate, countVotes } from '../../store/utility';
import ModalMessage from '../../components/UI/ModalMessage/ModalMessage';
import { ErrorMessage } from '../../constants/cssProperties';

class PollingStation extends Component {

    state = {
        pollingStations: [],
        electoralEvents: null,
        selectElectoralEvent: '',
        showModal: false,
        search: '',
        theaderTable: ["Código","Nombre","Escuela", ""],
        showMessage: true,
        showTable: false,
        form: {
            id: '',
            name: '',
            school: 'Administración y Contaduría'
        },
        modalMessage: '',
        enableState: false,
        modalCreateBtn: false,
        modalUpdateBtn: false,
        UpdateBoolean: false,
        isShowingModalAct: false,
        PDFContent: null,
        FullDataEV: {},
        isLoadingPDFModal: false,
        responsePDFModal: null
    }

    componentDidMount () {

    }

    setLocalElections (ElectoralEvent) {
        const pollingStationsTemp = [];
        const rawData = this.props.fetch.find(
            events => events.id === ElectoralEvent.toString()
        )['record'].pollingStations;
        for( let key in rawData){

            pollingStationsTemp.push({
                id: rawData[key].id,
                name: rawData[key].nombre,
                school: rawData[key].escuela
            });
        }
        this.setState( prevState => ({
            ...prevState,
            pollingStations: pollingStationsTemp
        }))
    }

    setOnCreate = (rawElectoralEvent, voters, enable) => {
        const electoralEvent = {
            id: rawElectoralEvent.id,
            estado: rawElectoralEvent.state,
            fechainicio: +new Date(rawElectoralEvent.initDate),
            fechafin: +new Date(rawElectoralEvent.endDate),
            nombreevento: rawElectoralEvent.eventName,
            PollingTable: {
                ...rawElectoralEvent.record.pollingStations,
                [this.state.form.id]: {
                    id: this.state.form.id,
                    votantes: voters,
                    habilitada: enable,
                    escuela: this.state.form.school,
                    nombre: this.state.form.name
                }
            },
            Election: {...rawElectoralEvent.record.elections}
        }
        this.props.onCreate(JSON.stringify(electoralEvent));
    }

    setValue = (e) => {
        const value = e.target.value;
        const name = [e.target.name];
        this.setState( prevState => ({
            form: {
                ...prevState.form,
                [name]: value 
            }
         }));
    };

    setModalMessage = (message) => {
        this.setState(  { modalMessage: message} );
    }

    cleanModalHandler = () => {
        this.setState( { 
            enableState: false,
            UpdateBoolean: false,
            form:{
                id: '',
                name: '',
                school: 'Administración y Contaduría'
            }
        } );
        this.props.onSetMessage('');
    }

    searchHandler = () => {
        let found = false;
        let modalWarning = null
        if(this.state.pollingStations && this.state.search !== ''){
            if(this.state.showTable){
                for (let i in this.state.pollingStations) {
                    if(this.state.search === this.state.pollingStations[i].id){
                        const search = this.state.pollingStations[i];
                        this.setState( { 
                            form: {
                                id: search['id'],
                                name: search['name'],
                                school: search['school']
                            },
                            search: ''
                        } );
                        this.setState( { enableState: true, UpdateBoolean: false } );
                        this.searchModal();
                        found = true;
                    }
                }
                if(!found)
                    modalWarning = "Evento Electoral con el Código " + this.state.search + ", no fue encontrado"
            } else {
                modalWarning = "Por favor, seleccione un evento electoral para buscar."
            }
        }else{
            modalWarning = "Error en la búsqueda, verifique entradas y conexión con el back"
        }
        this.setState( prevState => ({
            ...prevState,
            modalWarning
        }))
    }

    searchModal = () => {
        this.modalHandler( false, false );
    }

    handleOnInputSearchChange = (event) => {
        const search = event.target.value;
        this.setState({ search } );
    };

    modalHandler = ( create, update ) => {
        const modalBoolean = this.state.showModal;
        const showModalUpdated = !modalBoolean;
        if(create){
            this.cleanModalHandler();
        }
        this.setState( { 
            showModal: showModalUpdated,
            modalCreateBtn: create,
            modalUpdateBtn: update
        } );
    }

    createHandler = () => {
        let modalWarning = null
        if( canCreateUpdate([this.state.FullDataEV]) ){
            if( this.state.pollingStations.findIndex( pollingStation => pollingStation.id === this.state.form.id) ){
                if(
                    !(
                        this.state.form.id === '' ||
                        this.state.form.name === ''
                    )
                ){
                    const electoralEvent = this.props.fetch.find( fetch => fetch.id === this.state.selectElectoralEvent )
                    const pollingKeys = Object.keys(electoralEvent.record.pollingStations)
                    if( electoralEvent && pollingKeys.findIndex( polling => electoralEvent.record.pollingStations[polling].escuela === this.state.form.school) === -1 ){
                        this.setOnCreate(electoralEvent, 0, "0")
                        this.setModalMessage("Enviando información al Blockchain");
                        this.setState( { enableState: true, UpdateBoolean: false } );
                        this.setModalMessage("Guardado con éxito!");
                        setTimeout(this.cleanModalHandler,3000);
                        setTimeout( () => this.setLocalElections(this.state.selectElectoralEvent), 3000)
                    } else {
                        modalWarning = `Error, ya existe una mesa electoral para la escuela ${this.state.form.school}`
                    }
                } else {
                    modalWarning = "Error, termine de ingresar los datos"
                }
            }else{
                modalWarning = `El id ${this.state.form.id} ya existe`
            }
        } else {
            modalWarning = "El estado del evento electoral no permite realizar ninguna actualización a los registros."
        }
        this.setState( prevState => ({
            ...prevState,
            modalWarning
        }))
    }

    consultHanlder = (select) => {
        this.modalHandler(false ,false);
        this.setState( { enableState: true, UpdateBoolean: false} );
        this.setState(
            {
                form: {
                    id: select['id'],
                    name: select['name'],
                    school: select['school']
            }}
        )
        this.props.onSetMessage('');
    }

    enablePollingStationHandler = async ( payload ) => {
        const tempRawElectoralEvent = this.props.fetch.find( fetch => fetch.id === this.state.selectElectoralEvent )
        const tempRawPollingStation = tempRawElectoralEvent.record.pollingStations[payload.id]
        if( confirm(`La mesa electoral de Id ${payload.id} cambiará su estado a ${tempRawPollingStation.habilitada == '0' ? 'Habilitado': 'Inhabilitado'}. ¿Desea Continuar?`) ){ 
            await this.setState(
                {form: {
                    id: tempRawPollingStation.id,
                    name: tempRawPollingStation.nombre,
                    school: tempRawPollingStation.escuela
                }}
            )
            this.setOnCreate(tempRawElectoralEvent, tempRawPollingStation.votantes, tempRawPollingStation.habilitada == '0' ? "1" : "0")
        }

    }

    setPDFModal = (payload) => {
        const electoralEvent = this.props.fetch.find( event => event.id === payload)
        this.setState( prevState => ({
            ...prevState,
            isLoadingPDFModal: true
        }))
        countVotes(electoralEvent)
        .then( response => {
            this.setState( prevState => ({
                ...prevState,
                isShowEscModal: !this.state.isShowEscModal,
                selectedElectoralEvet: electoralEvent,
                isLoadingPDFModal: false,
                responsePDFModal: response
            }) )
        })
        .catch( err => {
            this.setState( prevState => ({
                ...prevState,
                isLoadingPDFModal: false,
                responsePDFModal: null
            }) )
            setTimeout( () => alert('Error, las elecciones necesitan candidatos para que las actas puedan ser emitidas.') , 1000)
        })
    }

    selectElectoralEventHandler = ( ElectoralEvent ) => {
        const tempShowMessage = false;
        const tempShowTable = true;
        this.setState(
            {
                showMessage: tempShowMessage,
                showTable: tempShowTable,
                selectElectoralEvent: ElectoralEvent,
                FullDataEV: this.props.fetch.find( fetch => fetch.id === ElectoralEvent ),
                responsePDFModal: null
            }
        );
        const pollingStationsTemp = [];
        const rawData = this.props.fetch.find(
            events => events.id === ElectoralEvent.toString()
        )['record'].pollingStations;
        
        for( let key in rawData ){
            pollingStationsTemp.push({
                id: rawData[key].id,
                name: rawData[key].nombre,
                school: rawData[key].escuela
            })
        }

        this.setState( prevState => ({
            ...prevState,
            pollingStations: pollingStationsTemp
        }))
        this.setPDFModal(ElectoralEvent)
    }

    updateModal = ( selectPollingStations ) => {
        let modalWarning = null
        if( canCreateUpdate([this.state.FullDataEV]) ){
            this.modalHandler( false, true)
            this.setState( prevState => ({
                ...prevState,
                UpdateBoolean: true,
                enableState: false,
                form: {
                    ...selectPollingStations
                }
            }))
        } else {
            modalWarning = "El estado del evento electoral no permite realizar ninguna actualización a los registros."
        }
        this.setState( prevState => ({
            ...prevState,
            modalWarning
        }))
    }

    updateHandler = () => {
        let modalWarning = null
        if(
            !(
                this.state.form.name === ''
            )
        ){
            const tempRawElectoralEvent = this.props.fetch.find( fetch => fetch.id == this.state.selectElectoralEvent )
            const tempRawPollingStation = tempRawElectoralEvent.record.pollingStations[this.state.form.id]
            this.setOnCreate(tempRawElectoralEvent, tempRawPollingStation.votantes, tempRawPollingStation.habilitada)
            this.setState( { enableState: true, UpdateBoolean: false} );
            setTimeout( () => this.setLocalElections(this.state.selectElectoralEvent), 3000)
            setTimeout( () => this.modalHandler(false,false), 3000 )
        }else{
            modalWarning = `Termine de ingresar los datos`
        }
        this.setState( prevState => ({
            ...prevState,
            modalWarning
        }))
    }

    modalAct = () => {
        this.setState( prevState => ({
            ...prevState,
            isShowingModalAct: !this.state.isShowingModalAct
        }))
    }

    initAct = ( payload ) => {
        const tempRawElectoralEvent = this.props.fetch.find( fetch => fetch.id == this.state.selectElectoralEvent )
        const pollingStationData = tempRawElectoralEvent.record.pollingStations[payload.id]
        const tempPDFData = {
            ...pollingStationData,
            state: tempRawElectoralEvent.state
        }
        this.setState( prevState => ({
            ...prevState,
            isShowingModalAct: !this.state.isShowingModalAct,
            PDFContent: tempPDFData
        }))
    }

    render(){

        let PollingStationMessage = this.state.showMessage ?
        <CardMessage messageTitle="Por favor, seleccione un evento electoral para continuar."/> :
        null;

        let ComponentAllTable = 
            (<AllTable 
                theadArray={this.state.theaderTable}
                payloadArray={this.state.pollingStations}
                consultHandler={this.consultHanlder}
                changeHandler={this.updateModal}
                deleteChange={true}
                deleteAction={false}
                pollingStation={true}
                enableHandler={this.enablePollingStationHandler}
                initAct={this.initAct}
                enableActa={this.state.responsePDFModal}/>)

        if(this.state.pollingStations.length <= 0)
            ComponentAllTable = <CardMessage messageTitle="No existen mesas electorales registradas"/>

        if(this.props.isLoading)
            ComponentAllTable = <Spinner/>

        let PollingStationContent = this.state.showTable ?
        <Aux>
            <InfraHeader 
                title={`${this.state.selectElectoralEvent} - ${this.props.events.find( event => event.id === this.state.selectElectoralEvent).eventName}`}
                btnName="Mesa Electoral"
                showModal={this.modalHandler}
                btnBlockBoolean={true}/>
            {ComponentAllTable}
        </Aux>
        
            :
        null;

        let PollingStationComponent = <Spinner/>;

        if( this.props.fetch && this.props.events ){
            PollingStationComponent = (
                <Aux>
                    <SubHeader 
                        subHeaderTitle="Mesas Electorales"
                        searchHandler={this.searchHandler}
                        btnName="Eventos Electorales"
                        btnPayload={this.props.events}
                        btnSelect={this.selectElectoralEventHandler}
                        searchPlaceholder="Código de la Mesa Electoral"
                        typeInput="drop"
                        onChange={this.handleOnInputSearchChange}
                        searchValue={this.state.search}
                        updateHandler={this.props.onFetch}/>
                    {PollingStationMessage}
                    {PollingStationContent}
                    <AllModal
                        showModal={this.modalHandler}
                        modalBoolean={this.state.showModal}
                        createHandler={this.createHandler}
                        modalTitile="Mesa Electoral"
                        create={this.state.modalCreateBtn}
                        enableState={this.state.enableState}
                        modalMessage={this.props.message}
                        update={this.state.modalUpdateBtn}
                        UpdateHandler={this.updateHandler}>
                        <CreateModal 
                            inputValues={this.state.form}
                            setValue={this.setValue}
                            enableState={this.state.enableState}
                            UpdateBoolean={this.state.UpdateBoolean}/>
                    </AllModal>
                </Aux>
            );
        }

         let RedirectComponent = this.props.isAuthed ?
            null
            :
        <Redirect from="/polling-station" to="/login"/>;

        return(
            <Aux>
                {PollingStationComponent}
                {RedirectComponent}
                {
                    this.state.selectElectoralEvent !== '' && this.state.responsePDFModal && this.state.PDFContent ?
                    <ActInitModalPDF 
                        modalHandler={this.modalAct}
                        showModal={this.state.isShowingModalAct}
                        data={this.state.PDFContent}
                        responsePDFModal={this.state.responsePDFModal}/> : 
                            this.state.isLoadingPDFModal && this.state.isShowingModalAct ?
                            <ModalMessage
                                modalHandler={this.modalAct}>
                                <Spinner/>
                            </ModalMessage> : null
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

const mapDispatchToProps = dispatch => {
    return {
        onCreate: (electoralEvent) => dispatch( actions.create(electoralEvent) ),
        onFetch: () => dispatch( actions.fetch() ),
        onSetMessage: (message) => dispatch( actions.setMessage(message) )
    }
}

const mapStateToProps = state => {
    return{
        fetch: state.central.fetch,
        events: state.central.events,
        isLoading: state.central.isLoading,
        message: state.central.message
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(PollingStation);
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux';
import SubHeader from '../../components/Layout/Subheader/Subheader';
import CreateModal from '../../components/Elections/ElectionCreateModal/ElectionCreateModal';
import AllTable from '../../components/Layout/AllTable/AllTable';
import AllModal from '../../components/Layout/Modal/AllModal';
import CardMessage from '../../components/Layout/CardMessage/CardMessage';
import InfraHeader from '../../components/Layout/InfraHeader/InfraHeader';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import { canCreateUpdate, itBelong} from '../../store/utility';
import CandiateModalInput from '../../components/Candidates/CandidatesModalInput/CandidatesModalInput'
import ModalMessage from '../../components/UI/ModalMessage/ModalMessage';
import { ErrorMessage } from '../../constants/cssProperties';

class Elections extends Component {

    state = {
        elections: [],
        form: {
            id: '',
            typeElection: 'Consejo Universitario',
            desc: '',
            name: '',
            school: 'Administración y Contaduría',
            faculty: 'Ciencias Económicas y Sociales'
        },
        formCandidates: {
            id: '',
            electoralOrg: []
        },
        electoralEvents: null,
        selectElectoralEvent: '',
        showModal: false,
        search: '',
        theaderTable: ["Código","Nombre","Descripción", "Organización", "Tipo", ""],
        showMessage: true,
        showTable: false,
        modalMessage: '',
        enableState: false,
        modalCreateBtn: false,
        modalUpdateBtn: false,
        UpdateBoolean: false,
        candidateModal: false,
        selectedElection: {},
        FullDataEV: {},
        modalWarning: null
    }

    componentDidMount () {
        this.props.onFetchOrg()
    }

    setLocalElections (ElectoralEvent) {
        const electionsTemp = [];
        const rawData = this.props.fetch.find(
            events => events.id === ElectoralEvent.toString()
        )['record'].elections;
        for( let key in rawData){

            electionsTemp.push({
                id: rawData[key].id,
                name: rawData[key].nombre,
                desc: rawData[key].descripcion,
                school: rawData[key].escuela,
                typeElection: rawData[key].tipoeleccion
            });
        }
        this.setState( prevState => ({
            ...prevState,
            elections: electionsTemp
        }))
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

    searchHandler = () => {
        let found = false;
        let modalWarning = null
        if(this.state.elections){
            if(this.state.showTable){
                for (let i in this.state.elections) {
                    if(this.state.search === this.state.elections[i].id){
                        const search = this.state.elections[i];
                        this.setState( { 
                            form: {
                                id: search['id'],
                                typeElection: search['typeElection'],
                                desc: search['desc'],
                                name: search['name'],
                                school: search['school'],
                                faculty: search['school']
                            },
                            search: ''
                        } );
                        this.setState( { enableState: true, UpdateBoolean: false} );
                        this.searchModal();
                        found = true;
                    }
                }
                if(!found)
                    modalWarning = "Elección con el Código " + this.state.search + ", no fue encontrado"
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

    handleOnInputSearchChange = (event) => {
        const search = event.target.value;
        this.setState({ search } );
    };

    searchModal = () => {
        this.modalHandler( false, false );
    }

    modalHandler = ( create, update) => {
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
        this.props.onSetMessage('')
    }

    setOnCreate = (rawElectoralEvent) => {
        const orgTemp = this.state.form.typeElection === 'Consejo Universitario' ? 'UCAB' 
        : this.state.form.typeElection === 'Consejo de Facultad' ? this.state.form.faculty
        : this.state.form.school

        const electoralEvent = {
            id: rawElectoralEvent.id,
            estado: rawElectoralEvent.state,
            fechainicio: +new Date(rawElectoralEvent.initDate),
            fechafin: +new Date(rawElectoralEvent.endDate),
            nombreevento: rawElectoralEvent.eventName,
            Election: {
                ...rawElectoralEvent.record.elections,
                [this.state.form.id]: {
                    Candidatos: null,
                    descripcion: this.state.form.desc,
                    escuela: orgTemp,
                    id: this.state.form.id,
                    maximovotos: this.state.form.typeElection === 'Consejo Universitario' ? 3 : 2,
                    tipoeleccion: this.state.form.typeElection,
                    nombre: this.state.form.name
                }
            },
            PollingTable: {...rawElectoralEvent.record.pollingStations}
        }
        this.props.onCreate(JSON.stringify(electoralEvent));
        }

    createElectionHandler = () => {
        let modalWarning = null
        if( canCreateUpdate([this.state.FullDataEV]) ){
            if( this.state.elections.findIndex( election => election.id === this.state.form.id ) === -1 ){
                if(
                    !(
                        this.state.form.id === '' ||
                        this.state.form.desc === '' ||
                        this.state.form.name === '' ||
                        this.state.form.school === ''
                    )
                ){
                    this.setOnCreate(this.props.fetch.find( fetch => fetch.id === this.state.selectElectoralEvent ))
                    this.setModalMessage("Enviando información al Blockchain");
                    this.setState( { enableState: true, UpdateBoolean: false} );
                    setTimeout(this.cleanModalHandler,3000);
                    setTimeout(() => this.modalHandler( false, false ),3000);
                    setTimeout( () => this.setLocalElections(this.state.selectElectoralEvent), 3000)
                }else{
                    modalWarning = `Termine de ingresar los datos`
                }
            } else {
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
        this.modalHandler(false, false);
        this.setState( { enableState: true, UpdateBoolean: false} );
        this.setState(
            {
                form: {
                    id: select['id'],
                    typeElection: select['typeElection'],
                    desc: select['desc'],
                    name: select['name'],
                    school: select['school'],
                    faculty: select['school']
            }}
        )
    }


    selectElectoralEventHandler = ( ElectoralEvent ) => {
        const tempShowMessage = false;
        const tempShowTable = true;
        this.setState(
            {
                showMessage: tempShowMessage,
                showTable: tempShowTable,
                selectElectoralEvent: ElectoralEvent,
                FullDataEV: this.props.fetch.find( fetch => fetch.id === ElectoralEvent )
            }
        );
        this.setLocalElections(ElectoralEvent)
    }

    cleanModalHandler = () => {
        this.setState( { 
            enableState: false,
            UpdateBoolean: false,
            form:{
                id: '',
                typeElection: 'Consejo Universitario',
                desc: '',
                name: '',
                school: 'Administración y Contaduría',
                faculty: 'Ciencias Económicas y Sociales'
            }
        } );
    }

    updateModal = ( selectElection ) => {
        let modalWarning = null
        if( canCreateUpdate([this.state.FullDataEV]) ){
            this.modalHandler( false, true)
            this.setState( prevState => ({
                ...prevState,
                UpdateBoolean: true,
                enableState: false,
                form: {
                    ...selectElection,
                    faculty: selectElection['school']
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
                this.state.form.desc === '' ||
                this.state.form.name === '' ||
                this.state.form.school === ''
            )
        ){
            this.setOnCreate(this.props.fetch.find( fetch => fetch.id == this.state.selectElectoralEvent ))
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

    setValueCandidates = (e) => {
        const value = e.target.value;
        const name = [e.target.name];
        this.setState( prevState => ({
            ...prevState,
            formCandidates: {
                ...prevState.formCandidates,
                [name]: value 
            }
         }));
    };

    setOnCreateCandidates = (rawElectoralEvent, candidateCI) => {
        let prevCandidates = rawElectoralEvent.record.elections[this.state.selectedElection.id].Candidatos
        if(!prevCandidates)
            prevCandidates = []
        const candidatesArray = [...prevCandidates]
        candidatesArray.push({ idusuario: candidateCI, votos: 0, organizacion: [...this.state.formCandidates.electoralOrg]})
        const electoralEvent = {
            id: rawElectoralEvent.id,
            estado: rawElectoralEvent.state,
            fechainicio: +new Date(rawElectoralEvent.initDate),
            fechafin: +new Date(rawElectoralEvent.endDate),
            nombreevento: rawElectoralEvent.eventName,
            Election: {
                ...rawElectoralEvent.record.elections,
                [this.state.selectedElection.id]: {
                    ...this.state.selectedElection,
                    Candidatos: candidatesArray,
                }
            },
            PollingTable: {...rawElectoralEvent.record.pollingStations}
        }
        this.props.onCreate(JSON.stringify(electoralEvent));
    }

    modalCandidatesHandler = (isShowing) =>{
        this.setState( prevState => ({
            ...prevState,
            candidateModal: isShowing,
            formCandidates: {
                id: '',
                electoralOrg: []
            }
        }))
    }

    candidatesHandler = (election) => {
        this.modalCandidatesHandler(true)
        this.setState( prevState => ({
            ...prevState,
            selectedElection: this.props.fetch.find( event => event.id === this.state.selectElectoralEvent).record.elections[election.id]
        }))
    }

    setValueElectoralOrg = (electoralOrg) => {
        this.setState( prevState => ({
            ...prevState,
            formCandidates: {
                ...prevState.formCandidates,
                electoralOrg: electoralOrg
            }
        }))
    }

    setCandidate = () => {
        let modalWarning = null
        const rawEvent = this.props.fetch.find( event => event.id === this.state.selectElectoralEvent)
        if(rawEvent.state === "Inscripción"){
            if(this.state.formCandidates.id !== '' && this.state.formCandidates.electoralOrg.length > 0){
                const user = this.props.users.find( user => user.id === this.state.formCandidates.id)
                const rawCandidates = rawEvent.record.elections[this.state.selectedElection.id].Candidatos
                const electionsKeys = Object.keys(rawEvent.record.elections)
                const isRegister = electionsKeys.every( key => {
                    if(rawEvent.record.elections[key].Candidatos)
                        return rawEvent.record.elections[key].Candidatos.every( candidate => candidate.idusuario !== this.state.formCandidates.id)
                    return true
                })
                if(user && user.status === "1" ){
                    if( itBelong(user, rawEvent.record.elections[this.state.selectedElection.id]) ){
                        if( isRegister && user.type !== "admin" ){
                            if(rawCandidates && rawCandidates.find( candidato => candidato.idusuario === this.state.formCandidates.id)){
                                modalWarning = `CI ${this.state.formCandidates.id} ya es un candidato registrado`
                            }else{
                                let tempCandidates = this.state.selectedElection.Candidatos
                                if(!tempCandidates)
                                    tempCandidates = []
                                this.setOnCreateCandidates(rawEvent,user.id)
                                tempCandidates.push({ idusuario: this.state.formCandidates.id, votos: 0, organizacion: this.state.formCandidates.electoralOrg})
                                this.setState( prevState => ({
                                    ...prevState,
                                    selectedElection: {
                                        ...this.state.selectedElection,
                                        Candidatos: tempCandidates
                                    },
                                    formCandidates: {
                                        ...prevState.formCandidates,
                                        id: '',
                                    }
                                }))
                            }
                        }else{
                            modalWarning = `El usuario con el CI ${this.state.formCandidates.id}, no es de tipo elector o ya esta registrado como candidato`
                        }
                    } else {
                        modalWarning = "Error, el usuario no pertenece a la organización que gestiona la elección"
                    }
                } else {
                    modalWarning = `El usuario con el CI ${this.state.formCandidates.id}, no es un usuario registrado o se encuentra inhabilitado`
                }
            }else{
                modalWarning = 'No deje selección/espacios vacíos'
            }
        } else {
            modalWarning = 'Error, el estado del evento electoral es diferente a Inscripción'
        }
        this.setState( prevState => ({
            ...prevState,
            modalWarning
        }))
    }


    render(){

        const CandidatesModal = 
        (<AllModal
            modalBoolean={this.state.candidateModal}
            showModal={this.modalCandidatesHandler}
            modalTitile={`Candidatos de la elección ${this.state.selectedElection.id} - ${this.state.selectedElection.nombre} - ${this.state.selectedElection.tipoeleccion}`}>
                <CandiateModalInput
                    candidates={this.state.selectedElection.Candidatos}
                    register={this.setCandidate}
                    inputValues={this.state.formCandidates}
                    setValueCandidates={this.setValueCandidates}
                    users={this.props.users}
                    electoralOrg={this.props.electoralOrg}
                    setElectoralOrg={this.setValueElectoralOrg}/>
        </AllModal>)

        let ElectionMessage = this.state.showMessage ?
        <CardMessage messageTitle="Por favor, seleccione un evento electoral para continuar."/> :
        null;

        let ComponentAllTable = 
            (<AllTable 
                theadArray={this.state.theaderTable}
                payloadArray={this.state.elections}
                consultHandler={this.consultHanlder}
                changeHandler={this.updateModal}
                deleteChange={true}
                deleteAction={false}
                candidates={this.candidatesHandler}/>)
        
        if(this.state.elections.length <= 0)
            ComponentAllTable = <CardMessage messageTitle="No existen elecciones registradas"/>

        if(this.props.isLoading)
            ComponentAllTable = <Spinner/>

        let ElectionContent = this.state.showTable ?
        <Aux>
            <InfraHeader 
                title={`${this.state.selectElectoralEvent} - ${this.props.events.find( event => event.id === this.state.selectElectoralEvent).eventName}`}
                btnName="Elección"
                showModal={this.modalHandler}
                btnBlockBoolean={true}/>
            {ComponentAllTable}
        </Aux>
        
            :
        null;

        let ElectionComponent = <Spinner/>;

        if( this.props.events ){
            ElectionComponent = (
                <Aux>
                    <SubHeader 
                        subHeaderTitle="Elecciones"
                        searchHandler={this.searchHandler}
                        btnName="Eventos Electorales"
                        btnPayload={this.props.events}
                        btnSelect={this.selectElectoralEventHandler}
                        searchPlaceholder="Código de la Elección"
                        typeInput="drop"
                        onChange={this.handleOnInputSearchChange}
                        searchValue={this.state.search}
                        updateHandler={this.props.onFetch}/>
                    {ElectionMessage}
                    {ElectionContent}
                    <AllModal
                        showModal={this.modalHandler}
                        modalBoolean={this.state.showModal}
                        createHandler={this.createElectionHandler}
                        modalTitile="Elección"
                        enableState={this.state.enableState}
                        modalMessage={this.props.message}
                        create={this.state.modalCreateBtn}
                        update={this.state.modalUpdateBtn}
                        UpdateHandler={this.updateHandler}>
                        <CreateModal 
                            setValue={this.setValue}
                            inputValues={this.state.form}
                            enableState={this.state.enableState}
                            UpdateBoolean={this.state.UpdateBoolean}/>
                    </AllModal>
                    {CandidatesModal}
                </Aux>
            )
        }

        let RedirectComponent = this.props.isAuthed ?
            null
            :
        <Redirect from="/elections" to="/login"/>;

        return(
            <Aux>
                {ElectionComponent}
                {RedirectComponent}
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
        fetch: state.central.fetch,
        events: state.central.events,
        isLoading: state.central.isLoading,
        message: state.central.message,
        users: state.user.fetch,
        electoralOrg: state.user.electoralOrg
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onCreate: (electoralEvent) => dispatch( actions.create(electoralEvent) ),
        onFetch: () => dispatch( actions.fetch() ),
        onSetMessage: (message) => dispatch( actions.setMessage(message) ),
        onFetchOrg: () => dispatch( actions.fetchOrg() )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Elections);
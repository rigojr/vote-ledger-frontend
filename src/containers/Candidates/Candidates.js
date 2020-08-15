import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux';
import SubHeader from '../../components/Layout/Subheader/Subheader';
import ContentModal from '../../components/Candidates/CandidatesModalInput/CandidatesModalInput';
import AllTable from '../../components/Layout/AllTable/AllTable';
import AllModal from '../../components/Layout/Modal/AllModal';
import CardMessage from '../../components/Layout/CardMessage/CardMessage';
import InfraHeader from '../../components/Layout/InfraHeader/InfraHeader';
import axios from '../../axios';
import Spinner from '../../components/UI/Spinner/Spinner';

class Candidates extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            candidates: null,
            elections: null,
            users: null,
            form: {
                id: '',
                name: '',
                faculty: '',
                school: '',
                email: ''
            },
            selectElectoralEvent: '',
            selectElection: '',
            showModal: false,
            search: '',
            theaderTable: ["Cédula","Nombre","Facultad", "Escuela", "Correo Electrónico", ""],
            showMessage: true,
            showTable: false,
            enableState: true,
            modalMessage: '',
            message: 'Por favor, seleccione un evento electoral para continuar.',
            btnMessage: 'Eventos Electorales'
         };
    }

    componentDidMount () {

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
    }

    setModalMessage = (message) => {
        this.setState(  { modalMessage: message} );
    }

    cleanModalHandler = () => {
        this.setState( {
            enableState: true,
            form: {
                id: '',
                name: '',
                faculty: '',
                school: '',
                email: ''
            }
        } );
    }

    searchHandler = () => {
        let found = false;
        if(this.state.elections && this.state.candidates){
            if(this.state.showTable){
                for (let i in this.state.candidates) {
                    if(this.state.search === this.state.candidates[i].id){
                        const search = this.state.candidates[i];
                        this.setState( { 
                            form: {
                                id: search['id'],
                                name: search['name'],
                                faculty: search['faculty'],
                                school: search['school'],
                                email: search['email']
                            },
                            search: ''
                        } );
                        this.setState( { enableState: true} );
                        this.searchModal();
                        found = true;
                    }
                }
                if(!found)
                    alert("Candidado con CI " + this.state.search + ", no fue encontrado");
            } else {
                alert("Por favor, seleccione una eleccion para buscar.");
            }
        }else{
            alert("Error en la búsqueda, verifique entradas y conexión con el back");
        }
    }

    searchModal = () => {
        this.modalHandler( false );
    }

    searchUserHandler = () => {
        let found = false;
        if(this.state.users && !(this.state.form.id == '')){
            for (let i in this.state.users) {
                if(this.state.form.id === this.state.users[i].id){
                    const search = this.state.users[i];
                    this.setState( {
                        form: {
                            id: search['id'],
                            name: search['name'],
                            faculty: search['faculty'],
                            school: search['school'],
                            email: search['email']
                        }
                    } );
                    found = true;
                    this.setState( { enableState: false} );
                }
            }
            if(!found)
                alert("Usuario con el ID " + this.state.search + ", no fue encontrado");
        }else{
            alert("Error en la búsqueda, verifique entradas y conexión con el back");
        }
    }

    handleOnInputSearchChange = (event) => {
        const search = event.target.value;
        this.setState({ search } );
    };

    modalHandler = ( create ) => {
        const modalBoolean = this.state.showModal;
        const showModalUpdated = !modalBoolean;
        if(create){
            this.cleanModalHandler();
        }
        this.setState( { 
            showModal: showModalUpdated
        } );
    }

    createHandler = async () => {
        this.setModalMessage("Enviando información al Blockchain");
        this.setState( { enableState: true} );
        await axios.post('/candidates.json', this.state.form)
        .then( (response) => {
            this.setModalMessage("Guardado con éxito!");
        })
        .catch( error => {
            this.setModalMessage("Hubo un error en la comunicación, no se guardo la información");
        });
        setTimeout(this.cleanModalHandler,3000);
    }

    consultHanlder = (select) => {
        this.modalHandler(false);
        this.setState( { enableState: true} );
        this.setState(
            {
                form: {
                    id: select['id'],
                    name: select['name'],
                    faculty: select['faculty'],
                    school: select['school'],
                    email: select['email']
            }}
        )
    }

    selectElectoralEventHandler = ( ElectoralEvent ) => {
        const tempShowMessage = true;
        const tempShowTable = false;
        this.setState(
            {
                showMessage: tempShowMessage,
                showTable: tempShowTable,
                selectElectoralEvent: ElectoralEvent
            }
        );

        const electionsTemp = [];
        const rawData = this.props.fetch.find(
            events => events.id === ElectoralEvent.toString()
        )['record'].elections;

        for( let key in rawData){

            electionsTemp.push({
                id: rawData[key].id,
                name: key,
                candidates: rawData[key].Candidatos
            });
        }

        this.setState( prevState => ({
            ...prevState,
            elections: electionsTemp
        }))

    }

    selectElectionsHandler = ( election ) => {
        this.setState( prevState => ({
            ...prevState,
            showMessage: false,
            showTable: true,
            selectElection: election
        }))

        /* const cadidatesTemp = [];
        const rawData = this.props. */
    }

    handlerBtnSelect = ( payload ) => {
        if( !this.state.elections ){
            this.selectElectoralEventHandler(payload);
            this.setState( prevState => ({
                ...prevState,
                message: "Por favor, seleccione una elección para continuar.",
                btnMessage: "Elecciones"
            }));
        }
        else {
            this.selectElectionsHandler(payload);
        }

    }

    render() {

        

        let ElectionMessage = this.state.showMessage ?
        <CardMessage messageTitle={this.state.message}/> :
        null;

        let CandidateContent = this.state.showTable ?
        <Aux>
            <InfraHeader 
                title={this.state.selectElectoralEvent}
                btnName="Candidato"
                showModal={ () => this.modalHandler(true)}
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

        let ElectionComponent = <Spinner/>;

        if( this.props.events && this.props.fetch ){
            ElectionComponent = (
                <Aux>
                    <SubHeader 
                        subHeaderTitle="Candidatos del Sistema"
                        searchHandler={this.searchHandler}
                        btnName={this.state.btnMessage}
                        btnPayload={
                            !this.state.elections ? this.props.events : this.state.elections
                        }
                        btnSelect={this.handlerBtnSelect}
                        searchPlaceholder="Cédula del Candidato"
                        typeInput="drop"
                        onChange={this.handleOnInputSearchChange}
                        searchValue={this.state.search}/>
                    {ElectionMessage}
                    {CandidateContent}
                    <AllModal
                        showModal={this.modalHandler}
                        modalBoolean={this.state.showModal}
                        createHandler={this.createHandler}
                        modalTitile="Crear Candidato"
                        create={true}
                        enableState={this.state.enableState}
                        modalMessage={this.state.modalMessage}>
                        <ContentModal 
                            inputValues={this.state.form}
                            setValue={this.setValue}
                            searchUser={this.searchUserHandler}/>
                    </AllModal>
                </Aux>
            )
        }

        let RedirectComponent = this.props.isAuthed ?
            null
            :
        <Redirect from="/candidates" to="/login"/>;

        return (
            <Aux>
                {ElectionComponent}
                {RedirectComponent}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return{
        fetch: state.central.fetch,
        events: state.central.events
    }
}

export default connect(mapStateToProps)(Candidates);
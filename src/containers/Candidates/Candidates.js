import React, { Component } from 'react';

import { Redirect } from 'react-router-dom';

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
            showModal: false,
            search: '',
            theaderTable: ["Cédula","Nombre","Facultad", "Escuela", "Correo Electrónico", ""],
            showMessage: true,
            showTable: false,
            enableState: true,
            modalMessage: ''
         };
    }

    componentDidMount () {

        axios.get('/elections.json')
        .then( response => {
            const fetch =[];
            for( let key in response.data){
                fetch.push({
                    id: response.data[key].id,
                    typeElection: response.data[key].typeElection,
                    desc: response.data[key].desc
                });
            }
            this.setState({ elections: fetch });
        })
        .catch( error => {
            console.log(error);
        });

        axios.get('/users.json')
        .then( response => {
            const fetchUsers = [];
            for( let key in response.data){
                fetchUsers.push({
                    id: response.data[key].id,
                    name: response.data[key].name,
                    faculty: response.data[key].faculty,
                    school: response.data[key].school,
                    email: response.data[key].email
                });
            }
            this.setState({ users: fetchUsers });
        })
        .catch( error => {
            console.log(error)
        });

        axios.get('/candidates.json')
        .then( response => {
            const fetchUsers = [];
            for( let key in response.data){
                fetchUsers.push({
                    id: response.data[key].id,
                    name: response.data[key].name,
                    faculty: response.data[key].faculty,
                    school: response.data[key].school,
                    email: response.data[key].email
                });
            }
            this.setState({ candidates: fetchUsers });
        })
        .catch( error => {
            console.log(error)
        });

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
        console.log("setModalMessage");
        console.log(message)
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
        console.log("Searching Candidate");
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
        console.log("Searching User");
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
        console.log("Modal Handler");
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
        console.log("Creating New Election");
        this.setModalMessage("Enviando información al Blockchain");
        this.setState( { enableState: true} );
        await axios.post('/candidates.json', this.state.form)
        .then( (response) => {
            console.log(response);
            this.setModalMessage("Guardado con éxito!");
        })
        .catch( error => {
            console.log(error);
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

        if( this.state.elections && this.state.users ){
            ElectionComponent = (
                <Aux>
                    <SubHeader 
                        subHeaderTitle="Candidatos del Sistema"
                        searchHandler={this.searchHandler}
                        btnName="Elecciones"
                        btnPayload={this.state.elections}
                        btnSelect={this.selectElectoralEventHandler}
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

export default Candidates;
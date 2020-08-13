import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import axios from '../../axios';

import Aux from '../../hoc/Aux';
import SubHeader from '../../components/Layout/Subheader/Subheader';
import AllTable from '../../components/Layout/AllTable/AllTable';
import AllModal from '../../components/Layout/Modal/AllModal';
import CreateModal from '../../components/ElectoralEvent/ElectoralEventCreateModal/ElectoralEventCreatModal';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';

class ElectoralEvent extends Component {

    state = {
        electoralEvents: null,
        theaderTable: ["Código","Estado","Inicio","Finalización", ""],
        showModal: false,
        search: '',
        form: {
            initDate: null,
            endDate: null,
            eventCode: '',
            eventName: ''
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
                eventCode: '',
                eventName: ''
            }
        } );
    }

    createHandler = () => {
        const electoralEvent = {
            id: this.state.form.eventCode,
            estado: 'Convocatoria',
            fechainicio: this.state.form.initDate,
            fechafin: this.state.form.endDate,
            nombre: this.state.form.eventName,
            election: null,
            pollingtable: null
        }
        this.props.onCreate(JSON.stringify(electoralEvent));
        console.log(JSON.stringify(electoralEvent))
        /* console.log("Creating New Electoral Event");
        this.setModalMessage("Enviando información al Blockchain");
        this.setState( { enableState: true} );
        await axios.post('/electoral-events.json', {
            id: this.state.form.eventCode,
            state: 'Convocatoria',
            initDate: this.state.form.initDate,
            endDate: this.state.form.endDate,
            name: this.state.form.eventName
        })
        .then( (response) => {
            console.log(response);
            this.setModalMessage("Guardado con éxito!");
        })
        .catch( error => {
            console.log(error);
            this.setModalMessage("Hubo un error en la comunicación, no se guardo la información");
        });
        setTimeout(this.cleanModalHandler,3000); */
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
                eventCode: select['id']
            }}
        )
    }

    deleteHandler = (selectId) =>{
        console.log("Deleting Electoral Event" + selectId);
    }

    modalHandler = ( create ) => {
        console.log("Modal Handler");
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
        console.log("Searching Electoral Event");
        let found = false;
        if(this.state.electoralEvents && !(this.state.search == '')){
            for (let i in this.state.electoralEvents) {
                if(this.state.search === this.state.electoralEvents[i].id){
                    const searchElectoralEvent = this.state.electoralEvents[i];
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
                    typeInput="button"
                    searchValue={this.state.search}/>
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
        events: state.central.events
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onCreate: (electoralEvent) => dispatch( actions.create(electoralEvent) )
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ElectoralEvent);
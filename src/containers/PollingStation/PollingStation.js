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
import axios from '../../axios';
import Spinner from '../../components/UI/Spinner/Spinner';

class PollingStation extends Component {

    state = {
        pollingStation: null,
        electoralEvents: null,
        selectElectoralEvent: '',
        showModal: false,
        search: '',
        theaderTable: ["Código","Habilitado","Escuela", ""],
        showMessage: true,
        showTable: false,
        form: {
            id: '',
            enable: false,
            school: 'Administración y Contaduría'
        },
        modalMessage: '',
        enableState: false
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
    };

    setModalMessage = (message) => {
        this.setState(  { modalMessage: message} );
    }

    cleanModalHandler = () => {
        this.setState( { 
            enableState: false,
            form:{
                id: '',
                enable: false,
                school: 'Administración y Contaduría'
            }
        } );
    }

    searchHandler = () => {
        let found = false;
        if(this.state.electoralEvents && this.state.pollingStation){
            if(this.state.showTable){
                for (let i in this.state.pollingStation) {
                    if(this.state.search === this.state.pollingStation[i].id){
                        const search = this.state.pollingStation[i];
                        this.setState( { 
                            form: {
                                id: search['id'],
                                enable: search['enable'],
                                school: search['school']
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
            } else {
                alert("Por favor, seleccione un evento electoral para buscar.");
            }
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

    createHandler = async () => {
        this.setModalMessage("Enviando información al Blockchain");
        this.setState( { enableState: true} );
        await axios.post('/polling-station.json', this.state.form)
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
                    enable: select['enable'],
                    school: select['school']
            }}
        )
    }

    deletePollingStationHandler = ( id ) => {
    }

    enablePollingStationHandler = ( id ) => {
    }

    selectElectoralEventHandler = ( ElectoralEvent ) => {
        const tempShowMessage = false;
        const tempShowTable = true;
        this.setState(
            {
                showMessage: tempShowMessage,
                showTable: tempShowTable,
                selectElectoralEvent: ElectoralEvent
            }
        );
        const pollingStationsTemp = [];
        const rawData = this.props.fetch.find(
            events => events.id === ElectoralEvent.toString()
        )['record'].pollingStations;
        
        for( let key in rawData ){
            pollingStationsTemp.push({
                id: rawData[key].id,
                enable: rawData[key].habilitada,
                school: rawData[key].escuela
            })
        }

        this.setState( prevState => ({
            ...prevState,
            pollingStation: pollingStationsTemp
        }))

    }

    render(){

        let PollingStationMessage = this.state.showMessage ?
        <CardMessage messageTitle="Por favor, seleccione un evento electoral para continuar."/> :
        null;

        let PollingStationContent = this.state.showTable ?
        <Aux>
            <InfraHeader 
                title={this.state.selectElectoralEvent}
                btnName="Mesa Electoral"
                showModal={this.modalHandler}
                btnBlockBoolean={true}/>
            <AllTable 
                theadArray={this.state.theaderTable}
                payloadArray={this.state.pollingStation}
                consultHandler={this.consultHanlder}
                deleteHandler={this.deletePollingStationHandler}
                deleteAction={true}
                pollingStation={true}
                enableHandler={this.enablePollingStationHandler}/>
        </Aux>
        
            :
        null;

        let PollingStationComponent = <Spinner/>;

        if( this.props.fetch && this.props.events ){
            PollingStationComponent = (
                <Aux>
                    <SubHeader 
                        subHeaderTitle="Mesas Electorales del Sistema"
                        searchHandler={this.searchHandler}
                        btnName="Eventos Electorales"
                        btnPayload={this.props.events}
                        btnSelect={this.selectElectoralEventHandler}
                        searchPlaceholder="Código de la Mesa Electoral"
                        typeInput="drop"
                        onChange={this.handleOnInputSearchChange}
                        searchValue={this.state.search}/>
                    {PollingStationMessage}
                    {PollingStationContent}
                    <AllModal
                        showModal={this.modalHandler}
                        modalBoolean={this.state.showModal}
                        createHandler={this.createHandler}
                        modalTitile="Crear Mesa Electoral"
                        create={true}
                        enableState={this.state.enableState}
                        modalMessage={this.state.modalMessage}>
                        <CreateModal 
                            inputValues={this.state.form}
                            setValue={this.setValue}
                            enableState={this.state.enableState}/>
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
            </Aux>
        )
    }

}

const mapStateToProps = state => {
    return{
        fetch: state.central.fetch,
        events: state.central.events
    }
}

export default connect(mapStateToProps)(PollingStation);
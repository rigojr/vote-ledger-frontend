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
import axios from '../../axios';
import Spinner from '../../components/UI/Spinner/Spinner';

class Elections extends Component {

    state = {
        elections: null,
        form: {
            id: '',
            typeElection: 'Consejo Universitario',
            desc: ''
        },
        electoralEvents: null,
        selectElectoralEvent: '',
        showModal: false,
        search: '',
        theaderTable: ["Código","Nombre","Descripción", "Org", "Tipo", ""],
        showMessage: true,
        showTable: false,
        modalMessage: '',
        enableState: false,
        modalCreateBtn: false
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

    searchHandler = () => {
        let found = false;
        if(this.state.electoralEvents && this.state.elections){
            if(this.state.showTable){
                for (let i in this.state.elections) {
                    if(this.state.search === this.state.elections[i].id){
                        const search = this.state.elections[i];
                        this.setState( { 
                            form: {
                                id: search['id'],
                                typeElection: search['typeElection'],
                                desc: search['desc']
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

    handleOnInputSearchChange = (event) => {
        const search = event.target.value;
        this.setState({ search } );
    };

    searchModal = () => {
        this.modalHandler( false );
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

    createElectionHandler = async () => {
        this.setModalMessage("Enviando información al Blockchain");
        this.setState( { enableState: true} );
        await axios.post('/elections.json', {
            id: this.state.form.id,
            typeElection: this.state.form.typeElection,
            desc: this.state.form.desc
        })
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
                    typeElection: select['typeElection'],
                    desc: select['desc']
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
                desc: rawData[key].descripcion,
                org: rawData[key].escuela,
                type: rawData[key].tipoeleccion
            });
        }

        this.setState( prevState => ({
            ...prevState,
            elections: electionsTemp
        }))
    }

    cleanModalHandler = () => {
        this.setState( { 
            enableState: false,
            form:{
                id: '',
                typeElection: 'Consejo Universitario',
                desc: ''
            }
        } );
    }

    render(){

        let ElectionMessage = this.state.showMessage ?
        <CardMessage messageTitle="Por favor, seleccione un evento electoral para continuar."/> :
        null;

        let ElectionContent = this.state.showTable ?
        <Aux>
            <InfraHeader 
                title={this.state.selectElectoralEvent}
                btnName="Elección"
                showModal={this.modalHandler}
                btnBlockBoolean={true}/>
            <AllTable 
                theadArray={this.state.theaderTable}
                payloadArray={this.state.elections}
                consultHandler={this.consultHanlder}
                deleteHandler={this.deleteElectionHandler}
                deleteAction={true}/>
        </Aux>
        
            :
        null;

        let ElectionComponent = <Spinner/>;

        if( this.props.fetch && this.props.events ){
            ElectionComponent = (
                <Aux>
                    <SubHeader 
                        subHeaderTitle="Elecciones del Sistema"
                        searchHandler={this.searchHandler}
                        btnName="Eventos Electorales"
                        btnPayload={this.props.events}
                        btnSelect={this.selectElectoralEventHandler}
                        searchPlaceholder="Código de la Elección"
                        typeInput="drop"
                        onChange={this.handleOnInputSearchChange}
                        searchValue={this.state.search}/>
                    {ElectionMessage}
                    {ElectionContent}
                    <AllModal
                        showModal={this.modalHandler}
                        modalBoolean={this.state.showModal}
                        createHandler={this.createElectionHandler}
                        modalTitile="Crear Elección"
                        enableState={this.state.enableState}
                        modalMessage={this.state.modalMessage}
                        create={this.state.modalCreateBtn}>
                        <CreateModal 
                            setValue={this.setValue}
                            inputValues={this.state.form}
                            enableState={this.state.enableState}/>
                    </AllModal>
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

export default connect(mapStateToProps)(Elections);
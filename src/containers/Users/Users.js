import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux';
import { sha256 } from 'js-sha256'
import SubHeader from '../../components/Layout/Subheader/Subheader';
import ContentModal from '../../components/Users/UserInputModal/UserInputModal';
import ContentBatchModal from '../../components/Users/UserBatchModal/UserBatchModal';
import AllTable from '../../components/Layout/AllTable/AllTable';
import AllModal from '../../components/Layout/Modal/AllModal';
import Spinner from '../../components/UI/Spinner/Spinner';
import PDF from '../../components/PDF/PDF';
import UsersPDF from '../../components/PDF/UsersPDF/UsersPDF';
import { areThereElection } from '../../store/utility';
import * as actions from '../../store/actions/index';

class User extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            users: null,
            form: {
                id: '',
                name: '',
                faculty: '',
                school: 'Administración y Contaduría',
                email: '',
                password: '',
                enable: true,
                type: ''
            },
            userPassword: "",
            theaderTable: ["Cédula","Nombre","Facultad","Escuela","Email",""],
            checkLabel: "admin",
            showModal: false,
            modalMessage: "",
            search: '',
            inputEnable: false,
            inputTypeOfUser: false,
            modalTitle: 'Usuario',
            modalCreateBtn: false,
            modalUpdateBtn: false,
            selectedTypeOfUser: true,
            isBatchModal: false,
            isPDFRender: false,
            pdf: {}
        };
    }

    setValue = (e) => {
        const value = e.target.value;
        const name = [e.target.name];
        this.setState( prevState => ({
            ...prevState,
            form: {
                ...prevState.form,
                [name]: value 
            }
         }));
    }

    setFaculty = (school) => {
        let faculty;
        switch (school){
            case "Administración y Contaduría":
                faculty = "Ciencias Económicas y Sociales";
                break;
            case "Civil":
                faculty = "Ingeniería";
                break;
            case "Ciencias Sociales":
                faculty = "Ciencias Económicas y Sociales";
                break;
            case "Comunicación Social":
                faculty = "Humanidades y Educación";
                break;
            case "Derecho":
                faculty = "Derecho";
                break;
            case "Educación":
                faculty = "Humanidades y Educación";
                break;
            case "Economía":
                faculty = "Ciencias Económicas y Sociales";
                break;
            case "Filosofía":
                faculty = "Humanidades y Educación";
                break;
            case "Industrial":
                faculty = "Ingeniería";
                break;
            case "Informática":
                faculty = "Ingeniería";
                break;
            case "Letras":
                faculty = "Humanidades y Educación";
                break;
            case "Psicología":
                faculty = "Humanidades y Educación";
                break;
            case "Telecomunicaciones":
                faculty = "Ingeniería";
                break;
            case "Teología":
                faculty = "Teología";
                break;
        }
        this.setState( prevState => ({ form: {...prevState.form, faculty}}));
        return faculty
    }


    setUserClean = () => {
        const user = {id:"", name:"", faculty:"", school:"Administración y Contaduría", email:"", password:""};
        this.setState( { form: user } );
        this.setState ( { 
            userPassword:"", 
            selectedTypeOfUser: true,
            inputTypeOfUser: false,
            pdf :{}
        } );
    }

    setAdminLabel = () => {
        this.setState( prevState => ({ form: {...prevState.form, type: this.state.checkLabel} }));
    }

    setLabel = (tag) => {
        let boolTypeOfUser = false;
        if( tag === "admin") 
            boolTypeOfUser = true
        this.setState( { 
            checkLabel: tag,
            selectedTypeOfUser: boolTypeOfUser
        } );
    }

    setEnableInput = ( boolean ) => {
        this.setState( { inputEnable: boolean} );
    }

    setEnableInputTypeOf = ( boolean ) => {
        this.setState( { inputTypeOfUser: boolean } );
    }

    setModalMessage = (message) => {
        this.setState(  { modalMessage: message} );
    }

    setOnCreate = ( voteRecord, oldPassword, status) => {
        let password
        if(!oldPassword){
            password = sha256(this.state.form.password)
        } else {
            password = oldPassword
        }
        const user = {
            id: this.state.form.id,
            nombre: this.state.form.name,
            facultad: this.setFaculty(this.state.form.school),
            escuela: this.state.form.school,
            email: this.state.form.email,
            password,
            HistorialVotos: voteRecord,
            type: !voteRecord ? this.state.form.type : this.props.fetch.find( user => user.id === this.state.form.id).type,
            status: status
        }
        this.props.onCreateUser(JSON.stringify(user));
    }

    createHandler = async () => {
        if( this.props.users.findIndex( user => user.id === this.state.form.id) === -1 ){
                await this.setFaculty(this.state.form.school);
                await this.setAdminLabel();
            if(
                !(
                    this.state.form.id === '' ||
                    this.state.form.name === '' ||
                    this.state.form.faculty === '' ||
                    this.state.form.school === '' ||
                    this.state.form.email === '' ||
                    this.state.form.password === ''
                )
            ){
                if( this.state.form.password.length > 8){
                    this.setModalMessage("Enviando información al Blockchain");
                    this.setEnableInput( true );
                    this.setEnableInputTypeOf( true );
                    this.setOnCreate(null, null, "1");
                    setTimeout(this.cleanModalHandler,3000);
                }
                else {
                    alert("Error, el password debe tener + 8 caracteres")
                }
            } else {
                alert(`Termine de ingresar los datos`)
            }
        }else {
            alert(`El id ${this.state.form.id} ya existe`)
        }
        
    }

    createModal = () => {
        if( areThereElection( this.props.electoralEvents ) ){
            this.modalHandler( true, false);
            this.cleanModalHandler();
        } else {
            alert("Existe un evento electoral en proceso de elección, los cambios o registros estarán inhabilitado hasta que no existan procesos de elección activos.")
        }
    }
        

    cleanModalHandler = () => {
        this.setEnableInput( false );
        this.setEnableInputTypeOf( false);
        this.setUserClean();
    }

    consultModal = ( selectUser ) => {
        let adminBoolean = false;
        if( this.props.fetch.find( user => user.id === selectUser.id).type === "admin")
            adminBoolean = true;
        this.modalHandler( false, false);
        this.setEnableInput( true );
        this.setState( { 
            form: selectUser,
            selectedTypeOfUser: adminBoolean,
            inputTypeOfUser: true,
            pdf :{}
        } );
    }


    updateModal = ( selectUser ) => {
        if( areThereElection(this.props.electoralEvents) ){
            let adminBoolean = false;
            if( this.props.fetch.find( user => user.id === selectUser.id).type === "admin")
                adminBoolean = true;
            this.modalHandler( false, true);
            this.setEnableInput( false );
            this.setState( prevState => ({
                ...prevState, 
                form: {...prevState.form, ...selectUser},
                selectedTypeOfUser: adminBoolean,
                inputTypeOfUser: true,
                pdf :{},
            }) );
        } else {
            alert("Existe un evento electoral en proceso de elección, los cambios o registros estarán inhabilitado hasta que no existan procesos de elección activos.")
        }
    }

    updateHandler = () => {
        const rawUser = this.props.fetch.find( user => user.id === this.state.form.id)
        if(this.state.form.password === ''){
            this.setOnCreate(rawUser.voteRercord, rawUser.password, rawUser.status)
        }else{
            if( this.state.form.password.length > 8)
                {
                    this.setOnCreate(rawUser.voteRercord, null, rawUser.status)
                    this.cleanModalHandler()
                    this.modalHandler(false,false)
                }
            else
                alert("Error, el password debe tener + 8 caracteres")
        }
        
    }

    modalHandler = ( create, update ) => {
        const modalBoolean = this.state.showModal;
        const showModalUpdated = !modalBoolean;
        this.setState( { 
            showModal: showModalUpdated,
            modalCreateBtn: create,
            modalUpdateBtn: update,
            pdf :{},
        } );
    }

    searchHandler = () => {
        let found = false;
        if(this.props.fetch && !(this.state.search == '')){
            for (let i in this.props.users) {
                if(this.state.search === this.props.fetch[i].id){
                    this.setState( { 
                        form: {
                            id: this.props.fetch[i].id,
                            name: this.props.fetch[i].name,
                            faculty: this.props.fetch[i].faculty,
                            school: this.props.fetch[i].school,
                            email: this.props.fetch[i].email,
                            type: this.props.fetch[i].type
                        },
                        search: ''
                    } );
                    this.searchModal();
                    found = true;
                    let adminBoolean = false;
                    if( this.props.fetch[i].type === "admin")
                        adminBoolean = true;
                    this.setState( { 
                        selectedTypeOfUser: adminBoolean,
                        pdf :{},
                    } );
                }
            }
            if(!found)
                alert("Usuario con el ID " + this.state.search + ", no fue encontrado");
        }else{
            alert("Error en la búsqueda, verifique entradas y conexión con el back");
        }
    }

    searchModal = () => {
        this.modalHandler( false, false );
        this.setEnableInput( true );
        this.setEnableInputTypeOf( true );
    }

    handleOnInputSearchChange = (event) => {
        const search = event.target.value;
        this.setState({ search } );
    };

    enableUserHandler = async (payload) => {
        const tempRawUser = this.props.fetch.find( fetch => fetch.id === payload.id )
        if( confirm(`El usuario de CI ${payload.id} cambiará su estado a ${tempRawUser.status === '0' ? 'Habilitado': 'Inhabilitado'}. ¿Desea Continuar?`) ){
            await this.setState(
                {form: {
                    id: tempRawUser.id,
                    name: tempRawUser.name,
                    faculty: tempRawUser.faculty,
                    school: tempRawUser.school,
                    email: tempRawUser.email,
                    type: tempRawUser.type
                }, pdf :{}}
            )
            this.setOnCreate(tempRawUser.voteRecord, tempRawUser.password, tempRawUser.status === '0' ? '1': '0')
        }
    }

    batchModal = () => {
        this.setState( prevState => ({
            ...prevState,
            isBatchModal: !prevState.isBatchModal,
            pdf :{}
        }))
    }

    batchProcessHandler = (data, fileInfo) => {
        delete data[0]
        Object.keys(data).forEach(index => {
        
        const doesUserExist = this.props.fetch.find( user => user.id === data[index][0])
        
        const user = {
            id: doesUserExist ? doesUserExist.id : data[index][0],
            nombre: data[index][1],
            facultad: this.setFaculty(data[index][2]),
            escuela: data[index][2],
            email: data[index][3],
            password: sha256(data[index][4]),
            HistorialVotos: doesUserExist ? doesUserExist.voteRecord : null,
            type: doesUserExist ? doesUserExist.type : 'elector',
            status: data[index][5]
        }
        this.props.onCreateUser(JSON.stringify(user));
        });   
    }
    
    genPDF = () => {
        const tempPDF = (
            <PDF title={'Electores registrados en el sistema'}>
                <UsersPDF 
                    users={this.props.fetch}/>
            </PDF>
        )
        this.setState( prevState => ({
            ...prevState,
            pdf :{
                fileName: 'usuarios.pdf',
                document: tempPDF
            }
        }))
    }

    render(){

        let RedirectComponent = this.props.isAuthed ?
            null
            :
        <Redirect from="/Dashboard" to="/login"/>;

        let UsersTableComponent = <Spinner/>;
        let pdf = null;

        if (!this.props.isLoading){
            UsersTableComponent = (
                <AllTable 
                    theadArray={this.state.theaderTable}
                    payloadArray={this.props.users}
                    consultHandler={this.consultModal}
                    changeHandler={this.updateModal}
                    deleteAction={false}
                    deleteChange={true}
                    pollingStation={true}
                    enableHandler={this.enableUserHandler}/>
            );
        }

        return(
            <Aux>
                <SubHeader
                    subHeaderTitle="Usuarios"
                    btnName="Usuario"
                    searchPlaceholder="Cédula de Identidad"
                    typeInput="button"
                    searchValue={this.state.search}
                    searchHandler={this.searchHandler}
                    showModal={this.createModal}
                    onChange={this.handleOnInputSearchChange}
                    updateHandler={this.props.onFetchUsers}
                    batchModal={this.batchModal}
                    pdf={this.state.pdf}
                    genpdf={this.genPDF}/>
                {UsersTableComponent}
                <AllModal
                    showModal={this.modalHandler}
                    createHandler={this.createHandler}
                    UpdateHandler={this.updateHandler}
                    modalBoolean={this.state.showModal}
                    modalTitile={this.state.modalTitle}
                    create={this.state.modalCreateBtn}
                    update={this.state.modalUpdateBtn}
                    enableState={this.state.inputEnable}
                    modalMessage={this.state.modalMessage}>
                    <ContentModal 
                        inputValues={this.state.form}
                        setValue={this.setValue}
                        enableState={this.state.inputEnable}
                        typeOfUser={this.state.selectedTypeOfUser}
                        inputTypeOfUser={this.state.inputTypeOfUser}
                        tagLabel={this.setLabel}/>
                </AllModal>
                <AllModal
                    showModal={this.batchModal}
                    modalBoolean={this.state.isBatchModal}
                    modalTitile="Proceso en lote"
                    small>
                        <ContentBatchModal 
                            initBatchProcess={this.batchProcessHandler}/>
                </AllModal>
                {RedirectComponent}
            </Aux>
        )
    }

}

const mapStateToProps = state => {
    return{
        users: state.user.users,
        fetch: state.user.fetch,
        isLoading: state.user.isLoading,
        electoralEvents: state.central.fetch
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchUsers: () => dispatch( actions.fetchUser( ) ),
        onCreateUser: (user) => dispatch( actions.createUser(user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(User);
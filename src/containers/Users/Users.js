import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import Aux from '../../hoc/Aux';
import axios from '../../axios';
import { sha256 } from 'js-sha256'
import SubHeader from '../../components/Layout/Subheader/Subheader';
import UserCreateModal from '../../components/Users/UserCreateModal/UserCreateModal';
import AllTable from '../../components/Layout/AllTable/AllTable';
import AllModal from '../../components/Layout/Modal/AllModal';

class User extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            users: null,
            user: {id:"", name:"", faculty:"", school:"Administración y Contaduría", email:"", password:"", enable: true},
            userPassword: "",
            theaderTable: ["Cédula","Nombre","Facultad","Escuela","Email",""],
            checkLabel: "A",
            showModal: false,
            modalMessage: "",
            search: '',
            inputEnable: false
        };
    }

    setId = (e) => {
        const id = e.target.value;
        this.setState( prevState => ({ user: {...prevState.user, id} }));
    }

    setName = (e) => {
        const name = e.target.value;
        this.setState( prevState => ({ user: {...prevState.user, name}}));
    }

    setSchool = (e) => {
        const school = e.target.value;
        this.setState( prevState => ({ user: {...prevState.user, school}}));
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
        this.setState( prevState => ({ user: {...prevState.user, faculty}}));
    }

    setEmail = (e) => {
        const email = e.target.value;
        this.setState( prevState => ({ user: {...prevState.user, email}}));
    }

    setPassword = (e) => {
        const userPassword = e.target.value;
        const password = sha256(e.target.value);
        this.setState( prevState => ({ user: {...prevState.user, password}}));
        this.setState ( { userPassword } )
    }

    setUserClean = () => {
        const user = {id:"", name:"", faculty:"", school:"Administración y Contaduría", email:"", password:"", enable: true};
        this.setState( { user } );
        this.setState ( { userPassword:"" } );
    }

    setAdminLabel = () => {
        const id = this.state.user.id + this.state.checkLabel;
        this.setState( prevState => ({ user: {...prevState.user, id} }));
    }

    setLabel = (tag) => {
        this.setState( { checkLabel: tag } );
    }

    setEnableInput = () => {
        const status = !this.state.inputEnable;
        this.setState( { inputEnable: status} );
    }

    setModalMessage = (message) => {
        console.log("setModalMessage");
        console.log(message)
        this.setState(  { modalMessage: message} );
    }

    componentDidMount () {
        console.log("Users.js is mount");
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
        })
    }

    componentWillMount () {
        
    }

    createUserHandler = async () => {
        console.log("Creating New User");
        this.setModalMessage("Enviando información al Blockchain");
        await this.setFaculty(this.state.user.school);
        await this.setAdminLabel();
        this.setEnableInput();
        axios.post('/users.json', this.state.user)
        .then( (response) => {
            this.setModalMessage("Guardado con éxito!");
        })
        .catch( error => {
            console.log(error);
        });

        setTimeout(this.cleanModalHandler,3000);

    }

    cleanModalHandler = () => {
        this.setEnableInput();
        this.setUserClean();
    }

    consultUserHandler = () => {
        console.log("Consulting User");
    }

    changeUserHandler = () => {
        console.log("Changing User");
    }

    modalHandler = () => {
        console.log("Modal Handler");
        const modalBoolean = this.state.showModal;
        const showModalUpdated = !modalBoolean;
        this.setState( { showModal: showModalUpdated } );
    }

    searchUserHandler = () => {
        console.log("Searching User");
        console.log(this.state.search);
    }

    handleOnInputSearchChange = (event) => {
        const search = event.target.value;
        this.setState({ search } );
    };



    render(){

        let RedirectComponent = this.props.isAuthed ?
            null
            :
        <Redirect from="/Dashboard" to="/login"/>;

        let UsersTableComponent = null;

        if (this.state.users){
            UsersTableComponent = (
                <AllTable 
                    theadArray={this.state.theaderTable}
                    payloadArray={this.state.users}
                    consultHandler={this.consultUserHandler}
                    changeHandler={this.changeUserHandler}
                    deleteAction={false}/>
            );
        }

        return(
            <Aux>
                <SubHeader
                    subHeaderTitle="Usuarios"
                    searchHandler={this.searchUserHandler}
                    btnName="Usuario"
                    searchPlaceholder="Cédula de Identidad"
                    showModal={this.modalHandler}
                    onChange={this.handleOnInputSearchChange}
                    typeInput="button"/>
                {UsersTableComponent}
                <AllModal
                    showModal={this.modalHandler}
                    modalBoolean={this.state.showModal}
                    createHandler={this.createUserHandler}
                    modalTitile="Crear Usuario"
                    create={true}
                    enableState={this.state.inputEnable}
                    modalMessage={this.state.modalMessage}>
                    <UserCreateModal 
                        userValue={this.state.user}
                        userPassword={this.state.userPassword}
                        enableState={this.state.inputEnable}
                        modalMessage={this.state.modalMessage}
                        onIdChange={this.setId}
                        onNameChange={this.setName}
                        onSchoolChange={this.setSchool}
                        onEmailChange={this.setEmail}
                        onPasswordChange={this.setPassword}
                        tagLabel={this.setLabel}/>
                </AllModal>
                {RedirectComponent}
            </Aux>
        )
    }

}

export default User;
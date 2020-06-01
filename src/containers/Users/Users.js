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
            users: [
                { id: "1", name: "José Salas", faculty: "Ingeniería", school: "Informática", email: "jsalas@gmail.com"},
                { id: "2", name: "Simón Esperanza", faculty: "Ingeniería", school: "Informática", email: "esperanzas@gmail.com"},
                { id: "3", name: "Ramón Bravo", faculty: "Ciencias Sociales", school: "Comunicación Social", email: "bravor@gmail.com"},
                { id: "4", name: "Victoria Ramirez", faculty: "Derecho", school: "Derecho", email: "ramirezv@gmail.com"},
                { id: "5", name: "José Salas", faculty: "Ingeniería", school: "Informática", email: "jsalas@gmail.com"},
                { id: "6", name: "Simón Esperanza", faculty: "Ingeniería", school: "Informática", email: "esperanzas@gmail.com"},
                { id: "7", name: "Ramón Bravo", faculty: "Ciencias Sociales", school: "Comunicación Social", email: "bravor@gmail.com"},
                { id: "8", name: "Victoria Ramirez", faculty: "Derecho", school: "Derecho", email: "ramirezv@gmail.com"},
                { id: "9", name: "José Salas", faculty: "Ingeniería", school: "Informática", email: "jsalas@gmail.com"},
                { id: "10", name: "Simón Esperanza", faculty: "Ingeniería", school: "Informática", email: "esperanzas@gmail.com"},
                { id: "11", name: "Ramón Bravo", faculty: "Ciencias Sociales", school: "Comunicación Social", email: "bravor@gmail.com"},
                { id: "12", name: "Victoria Ramirez", faculty: "Derecho", school: "Derecho", email: "ramirezv@gmail.com"},
                { id: "13", name: "José Salas", faculty: "Ingeniería", school: "Informática", email: "jsalas@gmail.com"},
                { id: "14", name: "Simón Esperanza", faculty: "Ingeniería", school: "Informática", email: "esperanzas@gmail.com"},
                { id: "15", name: "Ramón Bravo", faculty: "Ciencias Sociales", school: "Comunicación Social", email: "bravor@gmail.com"},
                { id: "16", name: "Victoria Ramirez", faculty: "Derecho", school: "Derecho", email: "ramirezv@gmail.com"},
                { id: "17", name: "Fernanda Chacón", faculty: "Ciencias Sociales", school: "Letras", email: "chacof@gmail.com"}
            ],
            user: {id:"", name:"", faculty:"", school:"Administración y Contaduría", email:"", password:"", enable: true},
            userPassword: "",
            theaderTable: ["Cédula","Nombre","Facultad","Escuela","Email",""],
            showModal: false,
            search: '',

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

    componentDidMount () {
        console.log("Users.js is mount");
        // Here we ask for the initial data
    }

    createUserHandler = async () => {
        console.log("Creating New User");
        await this.setFaculty(this.state.user.school);
        axios.post('/users.json', this.state.user)
        .then( response => {
            console.log(response);
            this.modalHandler();
            this.setUserClean();
        })
        .catch( error => {
            console.log(error);
        });
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

        let UsersComponent = this.props.isAuthed ?
        <AllTable 
            theadArray={this.state.theaderTable}
            payloadArray={this.state.users}
            consultHandler={this.consultUserHandler}
            changeHandler={this.changeUserHandler}
            deleteAction={false}/>    
            :
        <Redirect from="/Dashboard" to="/login"/>;

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
                {UsersComponent}
                <AllModal
                    showModal={this.modalHandler}
                    modalBoolean={this.state.showModal}
                    createHandler={this.createUserHandler}
                    modalTitile="Crear Usuario"
                    create={true}>
                    <UserCreateModal 
                        userValue={this.state.user}
                        userPassword={this.state.userPassword}
                        onIdChange={this.setId}
                        onNameChange={this.setName}
                        onSchoolChange={this.setSchool}
                        onEmailChange={this.setEmail}
                        onPasswordChange={this.setPassword}/>
                </AllModal>
                
            </Aux>
        )
    }

}

export default User;
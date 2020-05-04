import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit} from '@fortawesome/free-solid-svg-icons';

import Aux from '../../hoc/Aux';
import styles from './Users.module.css';
import SubHeader from '../../components/Layout/Subheader/Subheader';
import UserCreateModal from '../../components/Users/UserCreateModal/UserCreateModal';

class User extends Component {

    state = {
        users: [
            { id: "1", nombre: "José Salas", facultad: "Ingeniería", escuela: "Informática", email: "jsalas@gmail.com"},
            { id: "2", nombre: "Simón Esperanza", facultad: "Ingeniería", escuela: "Informática", email: "esperanzas@gmail.com"},
            { id: "3", nombre: "Ramón Bravo", facultad: "Ciencias Sociales", escuela: "Comunicación Social", email: "bravor@gmail.com"},
            { id: "4", nombre: "Victoria Ramirez", facultad: "Derecho", escuela: "Derecho", email: "ramirezv@gmail.com"},
            { id: "5", nombre: "José Salas", facultad: "Ingeniería", escuela: "Informática", email: "jsalas@gmail.com"},
            { id: "6", nombre: "Simón Esperanza", facultad: "Ingeniería", escuela: "Informática", email: "esperanzas@gmail.com"},
            { id: "7", nombre: "Ramón Bravo", facultad: "Ciencias Sociales", escuela: "Comunicación Social", email: "bravor@gmail.com"},
            { id: "8", nombre: "Victoria Ramirez", facultad: "Derecho", escuela: "Derecho", email: "ramirezv@gmail.com"},
            { id: "9", nombre: "José Salas", facultad: "Ingeniería", escuela: "Informática", email: "jsalas@gmail.com"},
            { id: "10", nombre: "Simón Esperanza", facultad: "Ingeniería", escuela: "Informática", email: "esperanzas@gmail.com"},
            { id: "11", nombre: "Ramón Bravo", facultad: "Ciencias Sociales", escuela: "Comunicación Social", email: "bravor@gmail.com"},
            { id: "12", nombre: "Victoria Ramirez", facultad: "Derecho", escuela: "Derecho", email: "ramirezv@gmail.com"},
            { id: "13", nombre: "José Salas", facultad: "Ingeniería", escuela: "Informática", email: "jsalas@gmail.com"},
            { id: "14", nombre: "Simón Esperanza", facultad: "Ingeniería", escuela: "Informática", email: "esperanzas@gmail.com"},
            { id: "15", nombre: "Ramón Bravo", facultad: "Ciencias Sociales", escuela: "Comunicación Social", email: "bravor@gmail.com"},
            { id: "16", nombre: "Victoria Ramirez", facultad: "Derecho", escuela: "Derecho", email: "ramirezv@gmail.com"},
            { id: "17", nombre: "Fernanda Chacón", facultad: "Ciencias Sociales", escuela: "Letras", email: "chacof@gmail.com"}
        ],
        userFiltered: null,
        showModal: false,
        showElection: false,
        search: '',
    }

    componentDidMount () {
        console.log("Users.js is mount");
        // Here we ask for the initial data
    }

    createUserHandler = () => {
        console.log("Creating New User");
    }

    modalHandler = () => {
        console.log("Modal Handler");
        const modalBoolean = this.state.showModal;
        const showModalUpdated = !modalBoolean;
        this.setState( { showModal: showModalUpdated } );
    }

    showElectionHandler = () => {
        console.log("Show Election Handler");
        const electionBoolean = this.state.showElection;
        const showElectionUpdated = !electionBoolean;
        this.setState( { showElection: showElectionUpdated } );
    }

    searchUserHandler = () => {
        console.log(this.state.search);
    }

    handleOnInputSearchChange = (event) => {
        const search = event.target.value;
        this.setState({ search } );
    };

    render(){

        let UsersComponent = this.props.isAuthed ?
            <Card className={styles.UsersCard}>
                <Container>
                    <Row lg={2}>
                        <Col xs lg="12">
                            <Table 
                                responsive
                                className={styles.UserTable}>
                                <thead
                                    className={styles.UserThead}>
                                    <tr>
                                        <th>Nombre</th>
                                        <th>Facultad</th>
                                        <th>Escuela</th>
                                        <th>Email</th>
                                        <th>Acción</th>
                                    </tr>
                                </thead>
                                <tbody
                                    className={styles.UserTbody}>
                                    {
                                        this.state.users.map(
                                            user => {
                                                return (
                                                    <tr 
                                                        key={user.id}
                                                        className={styles.UserTr}>
                                                        <td>{user.nombre}</td>
                                                        <td>{user.facultad}</td>
                                                        <td>{user.escuela}</td>
                                                        <td>{user.email}</td>
                                                        <td className={styles.AccionIcons}>
                                                            <FontAwesomeIcon 
                                                                icon={faEye}
                                                                className={styles.AccionIcon}/> 

                                                            <FontAwesomeIcon 
                                                                icon={faEdit}
                                                                className={styles.AccionIcon}/>
                                                        </td>
                                                    </tr>
                                                )
                                            }
                                        )
                                    }
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </Container>
            </Card>:
            <Redirect from="/Dashboard" to="/login"/>;

        return(
            <Aux>
                <SubHeader
                    subHeaderTitle="Usuarios"
                    searchgHandler={this.searchUserHandler}
                    btnName="Usuario"
                    searchPlaceholder="Cédula de Identidad"
                    showModal={this.modalHandler}
                    onChange={this.handleOnInputSearchChange}
                    typeInput="button"/>
                {UsersComponent}
                <UserCreateModal 
                    showModal={this.modalHandler}
                    modalBoolean={this.state.showModal}
                    showElection={this.showElectionHandler}
                    electionBoolean={this.state.showElection}
                    createUserHandler={this.createUserHandler}/>
            </Aux>
        )
    }

}

export default User;
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Table from 'react-bootstrap/Table'

import Aux from '../../hoc/Aux';
import styles from './Users.module.css'
import SubHeader from '../../components/Layout/Subheader/Subheader'

class User extends Component {

    state = {
        users: [
            { id: "1", nombre: "José Salas", facultad: "Ingeniería", escuela: "Informática", email: "jsalas@gmail.com"},
            { id: "2", nombre: "Simón Esperanza", facultad: "Ingeniería", escuela: "Informática", email: "esperanzas@gmail.com"},
            { id: "3", nombre: "Ramón Bravo", facultad: "Ciencias Sociales", escuela: "Comunicación Social", email: "bravor@gmail.com"},
            { id: "4", nombre: "Victoria Ramirez", facultad: "Derecho", escuela: "Derecho", email: "ramirezv@gmail.com"},
            { id: "5", nombre: "Fernanda Chacón", facultad: "Ciencias Sociales", escuela: "Letras", email: "chacof@gmail.com"}
        ]
    }

    componentDidMount () {
        console.log("Users.js is mount")
        // Here we ask for the initial data
    }

    createUserHandler = () => {
        console.log("Creating New User");
    }

    searchUserHandler = () => {
        console.log("Searching an User");
    }

    render(){

        let UsersComponent = this.props.isAuthed ?
            <Card className={styles.UsersCard}>
                <Container>
                    <Row lg={2}>
                        <Col xs lg="12">
                            <Table responsive>
                                <thead>
                                    <tr>
                                        <th>Nombre</th>
                                        <th>Facultad</th>
                                        <th>Escuela</th>
                                        <th>Email</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.users.map(
                                            user => {
                                                return (
                                                    <tr key={user.id}>
                                                        <td>{user.nombre}</td>
                                                        <td>{user.facultad}</td>
                                                        <td>{user.escuela}</td>
                                                        <td>{user.email}</td>
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
                    subHeaderTitle="Lista de Usuarios del Sistema"
                    subHeaderSearchingHandler={this.searchUserHandler}
                    elementName="Usuario"/>
                {UsersComponent}
            </Aux>
        )
    }

}

export default User;
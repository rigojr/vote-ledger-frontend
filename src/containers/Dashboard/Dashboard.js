import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';


import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Table from 'react-bootstrap/Table'

import styles from './Dashboard.module.css' 
import Aux from '../../hoc/Aux';
import Status from '../../components/Dashboard/Status/Status'
import About from '../../components/Dashboard/About/About';

class Dashboard extends Component {

    state = {
        status: ["Activo","Activo","Activo","Activo"],
        elections: [
            { id: "1", description: "Electora Election 1", startDate: "17/02/2020", endDate: "17/02/2020", statusElection: true},
            { id: "2", description: "Electora Election 2", startDate: "18/02/2020", endDate: "18/02/2020", statusElection: true},
            { id: "3", description: "Electora Election 3", startDate: "19/02/2020", endDate: "19/02/2020", statusElection: false},
            { id: "4", description: "Electora Election 4", startDate: "20/02/2020", endDate: "20/02/2020", statusElection: true},
            { id: "5", description: "Electora Election 5", startDate: "21/02/2020", endDate: "21/02/2020", statusElection: true}
        ]
    }


    componentDidMount () {
        console.log("Dashboard.js is mount")
        // Here we ask for the initial data
    }

    render (){

        let DashboardComponent = this.props.isAuthed ? 
            <Card className={styles.DashboardCard}>

                    <Container>

                        <Row lg={2}>
                            <Col xs lg="3">
                                <Status 
                                    statusArray={this.state.status}/>
                            </Col>
                            <Col xs lg="9">
                                <h1>Lista de Elecciones Activas</h1>
                                <Table 
                                    className={styles.ActiveElectionTable}
                                    responsive>
                                    <thead
                                        className={styles.ActiveElectionThead}>
                                        <tr>
                                            <th>Descripción</th>
                                            <th>Fecha de Inicio</th>
                                            <th>Fecha de Finalización</th>
                                        </tr>
                                    </thead>
                                    <tbody
                                        className={styles.ActiveElectionTbody}>
                                        {
                                            this.state.elections.map(
                                                election => {
                                                    return election.statusElection ? 
                                                        <tr 
                                                            className={styles.ActiveElectionTr}
                                                            key={election.id}>
                                                            <td>{election.description}</td>
                                                            <td>{election.startDate}</td>
                                                            <td>{election.endDate}</td>
                                                        </tr> : null
                                                }
                                            )
                                        }
                                    </tbody>
                                </Table>
                            </Col>
                        </Row>

                        <Row lg={2}>
                            <Col xs lg="12">
                                <About />
                            </Col>
                        </Row>

                    </Container>
            </Card> : 
            <Redirect from="/Dashboard" to="/login"/>;

        return (
            <Aux>
                {DashboardComponent}
            </Aux>
        )
    }


}

export default Dashboard;
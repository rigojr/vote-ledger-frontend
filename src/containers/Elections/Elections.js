import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit, faVoteYea} from '@fortawesome/free-solid-svg-icons';

import Aux from '../../hoc/Aux';
import styles from './Elections.module.css';
import SubHeader from '../../components/Layout/Subheader/Subheader';
import ElectionCreateModal from '../../components/Elections/ElectionCreateModal/ElectionCreateModal';

class Elections extends Component {

    state = {
        elections: [
            { id: "1", description: "Electora Election 1", startDate: "17/02/2020", endDate: "17/02/2020", statusElection: true},
            { id: "2", description: "Electora Election 2", startDate: "18/02/2020", endDate: "18/02/2020", statusElection: true},
            { id: "3", description: "Electora Election 3", startDate: "19/02/2020", endDate: "19/02/2020", statusElection: false},
            { id: "4", description: "Electora Election 4", startDate: "20/02/2020", endDate: "20/02/2020", statusElection: true},
            { id: "5", description: "Electora Election 5", startDate: "21/02/2020", endDate: "21/02/2020", statusElection: true}
        ],
        showModal: false,
        showElection: false,
        search: ''
    }

    componentDidMount () {
        console.log("Elections.js is mount")
        // Here we ask for the initial data
    }

    searchElectionHandler = () =>{
        console.log("Searching Election");
        console.log(this.state.search);
    }

    handleOnInputSearchChange = (event) => {
        const search = event.target.value;
        this.setState({ search } );
    };

    modalHandler = () => {
        console.log("Modal Handler");
        const modalBoolean = this.state.showModal;
        const showModalUpdated = !modalBoolean;
        this.setState( { showModal: showModalUpdated } );
    }

    createElectionHandler = () => {
        console.log("Creating a Election")
    }

    render(){

        let ElectionsComponent = this.props.isAuthed ?
            <Card className={styles.ElectionsCard}>
                <Container>
                    <Row lg={2}>
                        <Col xs lg="12">
                            <Table 
                                responsive
                                className={styles.ElectionTable}>
                                <thead
                                    className={styles.ElectionThead}>
                                    <tr>
                                        <th>Id</th>
                                        <th>Descripción</th>
                                        <th>Fecha de Inicio</th>
                                        <th>Fecha de Finalización</th>
                                        <th>Acción</th>
                                    </tr>
                                </thead>
                                <tbody
                                    className={styles.ElectionTbody}>
                                    {
                                        this.state.elections.map(
                                            election => {
                                                return (
                                                    <tr 
                                                        key={election.id}
                                                        className={styles.ElectionTr}>
                                                        <td>{election.id}</td>
                                                        <td>{election.description}</td>
                                                        <td>{election.startDate}</td>
                                                        <td>{election.endDate}</td>
                                                        <td className={styles.AccionIcons}>
                                                            <FontAwesomeIcon 
                                                                icon={faEye}
                                                                className={styles.AccionIcon}/> 

                                                            <FontAwesomeIcon 
                                                                icon={faEdit}
                                                                className={styles.AccionIcon}/>
                                                            {
                                                                election.statusElection ?
                                                                    <FontAwesomeIcon 
                                                                        icon={faVoteYea}
                                                                        className={styles.ReportIcon}/> :
                                                                        null
                                                            }
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
                    subHeaderTitle="Elecciones del Sistema"
                    searchHandler={this.searchElectionHandler}
                    btnName="Elección"
                    searchPlaceholder="Código de la Elección"
                    showModal={this.modalHandler}
                    typeInput="drop"
                    onChange={this.handleOnInputSearchChange}/>
                {ElectionsComponent}
                <ElectionCreateModal 
                    showModal={this.modalHandler}
                    modalBoolean={this.state.showModal}
                    createElectionHandler={this.createElectionHandler}/>
            </Aux>
        )
    }

}

export default Elections;
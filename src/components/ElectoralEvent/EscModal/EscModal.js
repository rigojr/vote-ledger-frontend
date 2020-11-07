import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import styled from 'styled-components';

import AllModal from '../../Layout/Modal/AllModal';
import styles from '../../Candidates/CandidatesModalInput/CandidatesModalInput.module.css';
import stylesTable from '../../Layout/AllTable/AllTable.module.css';
import PDF from '../../PDF/PDF';
import Aux from '../../../hoc/Aux';
import EscPDF from '../../PDF/EscPDF/EscPDF';
import {countVotantes} from '../../../store/utility';

const StyledRow = styled(Row)`
    margin: 0px;
`
const TableContainer = styled.div`
    margin-bottom: 1rem;
    padding-right: 15px;
    padding-left: 15px;
    width: 100%;
`

const MainContainer = styled.div`
    max-height: 400px;
    overflow: scroll;
`

const EscModal = (props) => {

    const pdfTitle = `Acta de Escrutinio del Evento Electoral ${props.electoralEvent.id} - ${props.electoralEvent.eventName}`
    const arrayPolling = Object.keys(props.electoralEvent.record.pollingStations)
    const arrayElection = Object.keys(props.electoralEvent.record.elections)
    const tempPDF = (
        <PDF title={pdfTitle}>
            <EscPDF 
                electoralEvent={props.electoralEvent}
                users={props.users}
                responseEscModal={props.responseEscModal}/>
        </PDF>
    )

    const pdf = {
        fileName: "acta-escrutinio.pdf",
        document: tempPDF
    }

    let totalVotantes = 0

    return (
        <AllModal
            showModal={props.modalHandler}
            modalBoolean={props.showModal}
            modalTitile={pdfTitle}
            pdf={pdf}>
            <MainContainer>
                <TableContainer>
                    <Form.Group as={Col} className={`${styles.alertContainer}`}>
                        <Table
                            responsive
                            className={stylesTable.UserTable}>
                                <thead
                                    className={stylesTable.UserThead}>
                                    <tr>
                                        <th>Mesa Electoral</th>
                                        <th>Votantes</th>
                                    </tr>
                                </thead>
                                <tbody
                                    className={stylesTable.UserTbody}>
                                    {
                                        props.responseEscModal.pollingStationCount.map( polling => {
                                            const pollingStation = props.electoralEvent.record.pollingStations[polling.id]
                                            const votantes = countVotantes(props.users, props.electoralEvent.id, pollingStation.escuela)
                                            totalVotantes += votantes
                                            return (
                                                <tr
                                                    className={stylesTable.UserTr}
                                                    key={pollingStation.id}>
                                                        <td>{`${pollingStation.id} - ${pollingStation.nombre}`}</td>
                                                        <td>{votantes}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                    <tr className={stylesTable.UserTr}>
                                        <td><b>Votantes Totales</b></td>
                                        <td><b>{totalVotantes}</b></td>
                                    </tr>
                                </tbody>
                        </Table>
                    </Form.Group>
                </TableContainer>
                        {
                            arrayElection.map( key => {
                                const election = props.electoralEvent.record.elections[key]
                                let votos = 0
                                return (
                                    <Aux key={key}>
                                        <StyledRow>
                                            <Form.Group as={Col} className={`${styles.alertContainer}`}>
                                                <p className={`${styles.alertMessage}`}>
                                                    <b>{`Elección ${key} - ${election.nombre} - ${election.tipoeleccion} - ${election.escuela}`}</b>
                                                </p>
                                            </Form.Group>
                                        </StyledRow>
                                        <TableContainer>
                                            <Form.Group as={Col} className={`${styles.alertContainer}`}>
                                                <Table
                                                    responsive
                                                    className={stylesTable.UserTable}>
                                                        <thead
                                                            className={stylesTable.UserThead}>
                                                            <tr>
                                                                <th>Candidato</th>
                                                                <th>Votos</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody
                                                            className={stylesTable.UserTbody}>
                                                            {
                                                                election.Candidatos ? election.Candidatos.map( candidato => {
                                                                    const userInfo = props.users.find( user => user.id === candidato.idusuario)
                                                                    const userVote = props.responseEscModal.candidates.find( candidate => candidate.idusuario === candidato.idusuario )
                                                                    votos += userVote.votes
                                                                    return (
                                                                        <tr
                                                                            className={stylesTable.UserTr}
                                                                            key={userInfo.id}>
                                                                                <td>{`${userInfo.name}`}</td>
                                                                                <td>{userVote.votes}</td>
                                                                        </tr>
                                                                    )
                                                                }) : <tr>Error, no existen candidatos</tr>
                                                            }
                                                            <tr className={stylesTable.UserTr}>
                                                                <td><b>Votos Totales</b></td>
                                                                <td><b>{votos}</b></td>
                                                            </tr>
                                                        </tbody>
                                                </Table>
                                            </Form.Group>
                                        </TableContainer>
                                    </Aux>
                                )
                            })
                        }
                    
            </MainContainer>
        </AllModal>
    )
};

export default EscModal;
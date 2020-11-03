import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import styled from '@react-pdf/styled-components';

import Aux from '../../../hoc/Aux';

const styles = StyleSheet.create({
        tabelHeader: {
            flex: 1,
            margin: 4,
            flexDirection: "row",
    },
    column: {
            order: 1,
            flexBasis: "20%",
    }
})

const HeaderTContainer = styled.View`
    display: flex;
    justify-content: space-around;
    flex-direction: column;
`

const StyledTitleElection = styled.Text`
    font-size: 16px;
    padding-bottom: 10px;
    font-weight: bold;
    color: #434099
`

const HeaderTable = styled.Text`
    font-size: 14px;
    padding: 10px 0px;
    font-weight: bold;
`

const DataTContainer = styled.View`
    display: flex;
    justify-content: space-around;
    flex-direction: row;
    font-size: 12px;
`

const DataTable = styled.Text`
    font-size: 12px;
    padding: 5px 0px;
    width: 100%;
    margin: 0px;
`

const EscPDF = (props) => {

    const arrayPolling = Object.keys(props.electoralEvent.record.pollingStations)
    const arrayElection = Object.keys(props.electoralEvent.record.elections)
    let totalVotantes = 0

    return (
        <Aux>
                <HeaderTContainer style={styles.tabelHeader}>
                    <HeaderTable style={styles.column}>Mesa Electoral</HeaderTable>
                    <HeaderTable style={styles.column}>Votantes</HeaderTable>
                </HeaderTContainer>
                    {
                        props.responseEscModal.pollingStationCount.map( polling => {
                            const pollingStation = props.electoralEvent.record.pollingStations[polling.id]
                            totalVotantes += polling.voters
                            return(
                                <DataTContainer key={pollingStation.id} style={styles.tabelHeader}>
                                    <DataTable style={styles.column}>{`${pollingStation.id} - ${pollingStation.nombre}`}</DataTable>
                                    <DataTable style={styles.column}>{polling.voters}</DataTable>
                                </DataTContainer>
                            )
                        } )
                    }
                <DataTContainer style={styles.tabelHeader}>
                    <DataTable style={styles.column}>Votantes Totales</DataTable>
                    <DataTable style={styles.column}>{totalVotantes}</DataTable>
                </DataTContainer>
                {
                    arrayElection.map( key =>{
                        const election = props.electoralEvent.record.elections[key]
                        let votos = 0
                        return (
                            <Aux key={key}>
                                <StyledTitleElection>
                                    {`Elección ${key} - ${election.nombre} - ${election.tipoeleccion} - ${election.escuela}`}
                                </StyledTitleElection>
                                <HeaderTContainer style={styles.tabelHeader}>
                                    <HeaderTable style={styles.column}>Candidato</HeaderTable>
                                    <HeaderTable style={styles.column}>Votos</HeaderTable>
                                </HeaderTContainer>
                                {
                                    election.Candidatos ? election.Candidatos.map( candidato => {
                                        const userInfo = props.users.find( user => user.id === candidato.idusuario)
                                        const userVote = props.responseEscModal.candidates.find( candidate => candidate.idusuario === candidato.idusuario )
                                        votos += userVote.votes
                                        return (
                                            <DataTContainer key={userInfo.name} style={styles.tabelHeader}>
                                                    <DataTable style={styles.column}>{`${userInfo.name}`}</DataTable>
                                                    <DataTable style={styles.column}>{userVote.votes}</DataTable>
                                            </DataTContainer>
                                        )
                                    }) : <DataTContainer><DataTable>Error, no existen candidatos</DataTable></DataTContainer>
                                }
                                <HeaderTContainer style={styles.tabelHeader}>
                                    <HeaderTable style={styles.column}>Votos Totales</HeaderTable>
                                    <HeaderTable style={styles.column}>{votos}</HeaderTable>
                                </HeaderTContainer>
                            </Aux>
                        )
                    } )
                }
        </Aux>
    )
};

export default EscPDF;
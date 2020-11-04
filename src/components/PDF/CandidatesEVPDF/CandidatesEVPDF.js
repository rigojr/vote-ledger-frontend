import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import styled from '@react-pdf/styled-components';

import Aux from '../../../hoc/Aux';

const StyledView = styled.View`
    
`

const styles = StyleSheet.create({
    tabelHeader: {
        flex: 1,
        margin: 4,
        flexDirection: "row",
},
column: {
        order: 1,
        flexBasis: "20%",
        justifyContent: "center"
}
})

const StyledTitleElection = styled.Text`
    font-size: 16px;
    padding-bottom: 10px;
    font-weight: bold;
    color: #434099
`

const CandidateInfo = styled.Text`
    font-size: 14px;
    padding: 10px 0px;
`
const HeaderTContainer = styled.View`
    display: flex;
    justify-content: space-around;
    flex-direction: column;
`

const HeaderTable = styled.Text`
    font-size: 14px;
    padding: 10px 0px;
    font-weight: bold;
    text-align: center;
`

const DataTContainer = styled.View`
    display: flex;
    justify-content: space-around;
    flex-direction: row;
`

const DataTable = styled.Text`
    font-size: 14px;
    padding: 5px 0px;
    text-align: center;
`

const CandidatesEVPDF = (props) => (
    <Aux>
        {
            props.electionsKeys.map( key => {
                let electionContent = (
                    <StyledView>
                        <StyledTitleElection>
                            {`La elección ${key} - ${props.electionsRaw[key].nombre} no posee candidatos registrados`}
                        </StyledTitleElection>
                    </StyledView>
                )

                if(props.electionsRaw[key].Candidatos) {
                    electionContent = (
                        <StyledView>
                            <StyledTitleElection>
                                    {`Candidatos registrados para la elección ${key} - ${props.electionsRaw[key].nombre} - ${props.electionsRaw[key].tipoeleccion}`}
                            </StyledTitleElection>
                            <HeaderTContainer style={styles.tabelHeader}>
                                <HeaderTable style={styles.column}>CI</HeaderTable>
                                <HeaderTable style={styles.column}>Nombre</HeaderTable>
                                <HeaderTable style={styles.column}>Facultad</HeaderTable>
                                <HeaderTable style={styles.column}>Escuela</HeaderTable>
                                <HeaderTable style={styles.column}>Organización/es</HeaderTable>
                            </HeaderTContainer>
                            {
                                props.electionsRaw[key].Candidatos.map( candidate => {
                                    const tempUser = props.users.find( user => user.id === candidate.idusuario )
                                    return (
                                        <DataTContainer key={tempUser.name} style={styles.tabelHeader}>
                                            <DataTable style={styles.column}>{tempUser.id}</DataTable>
                                            <DataTable style={styles.column}>{tempUser.name}</DataTable>
                                            <DataTable style={styles.column}>{tempUser.faculty}</DataTable>
                                            <DataTable style={styles.column}>{tempUser.school}</DataTable>
                                            <DataTable style={styles.column}>{candidate.organizacion.map( org => org)}</DataTable>
                                        </DataTContainer>
                                    )
                                })
                            }
                        </StyledView>
                    )
                }

                return (
                    <Aux key={key}>
                        {electionContent}
                    </Aux>
                )

            } )
        }
    </Aux>
    
    );
    
export default CandidatesEVPDF;


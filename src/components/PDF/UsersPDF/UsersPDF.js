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
        justifyContent: "center"
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

const UsersPDF = (props) => {

    return(
    <Aux>
        <HeaderTContainer style={styles.tabelHeader}>
            <HeaderTable style={styles.column}>CI</HeaderTable>
            <HeaderTable style={styles.column}>Nombre</HeaderTable>
            <HeaderTable style={styles.column}>Email</HeaderTable>
            <HeaderTable style={styles.column}>Escuela</HeaderTable>
            <HeaderTable style={styles.column}>Estatus</HeaderTable>
        </HeaderTContainer>
        {
            props.users.map( user => {
                return (
                    user.type === 'elector' ?
                    (
                        <DataTContainer key={user.name} style={styles.tabelHeader}>
                            <DataTable style={styles.column}>{user.id}</DataTable>
                            <DataTable style={styles.column}>{user.name}</DataTable>
                            <DataTable style={styles.column}>{user.email}</DataTable>
                            <DataTable style={styles.column}>{user.school}</DataTable>
                            <DataTable style={styles.column}>{user.status === "0" ? 'Inhabilitado' : 'Habilitado'}</DataTable>
                        </DataTContainer>
                    ) : null
                )
            } )
        }
    </Aux>)
};

export default UsersPDF;
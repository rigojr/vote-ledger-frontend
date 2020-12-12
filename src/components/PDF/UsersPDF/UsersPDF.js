import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import styled from '@react-pdf/styled-components';
import { Table, TableHeader, TableCell, DataTableCell, TableBody } from '@david.kucsai/react-pdf-table'

import Aux from '../../../hoc/Aux';

const styles = StyleSheet.create({
    tabelHeader: {
        flex: 1,
        margin: 4,
        flexDirection: "row",
        width: '100%',
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
width: 100%;
margin: 10px 0px;
`

const StyledTitleElection = styled.Text`
font-size: 14px;
padding-bottom: 10px;
font-weight: bold;
color: #434099
text-align: center;
`

const HeaderTable = styled.Text`
font-size: 10px;
font-weight: bold;
text-align: center;
`

const DataTContainer = styled.View`
display: flex;
justify-content: space-around;
flex-direction: column;
margin: 10px 0px;
width: 100%;
`

const TableContainer = styled.View`
    width: 100%;
    display: flex;
    flex-direction: row;
`

const UsersPDF = (props) => {
    const userArray = []
    props.users.forEach(user => {
        if(user.type === 'elector')
            userArray.push(user)
    });
    return(
    <Aux>
        <Table data={userArray}>
            <TableHeader>
                <TableCell><StyledTitleElection>CI</StyledTitleElection></TableCell>
                <TableCell><StyledTitleElection>Nombre</StyledTitleElection></TableCell>
                <TableCell><StyledTitleElection>Email</StyledTitleElection></TableCell>
                <TableCell><StyledTitleElection>Escuela</StyledTitleElection></TableCell>
                <TableCell><StyledTitleElection>Estatus</StyledTitleElection></TableCell>
            </TableHeader>
            <TableBody>
                <DataTableCell getContent={(r) => <HeaderTable>{r.id}</HeaderTable>}/>
                <DataTableCell getContent={(r) => <HeaderTable>{r.name}</HeaderTable>}/>
                <DataTableCell getContent={(r) => <HeaderTable>{r.email}</HeaderTable>}/>
                <DataTableCell getContent={(r) => <HeaderTable>{r.school}</HeaderTable>}/>
                <DataTableCell getContent={(r) => <HeaderTable>{r.status === "0" ? 'Inhabilitado' : 'Habilitado'}</HeaderTable>}/>
            {/* {
                props.users.map( user => {
                    return (
                        user.type === 'elector' ?
                            (<TableBody>
                                <DataTableCell><DataTContainer>{user.id}</DataTContainer></DataTableCell>
                                <DataTableCell><DataTContainer>{user.name}</DataTContainer></DataTableCell>
                                <DataTableCell><DataTContainer>{user.email}</DataTContainer></DataTableCell>
                                <DataTableCell><DataTContainer>{user.school}</DataTContainer></DataTableCell>
                                <DataTableCell><DataTContainer>{user.status === "0" ? 'Inhabilitado' : 'Habilitado'}</DataTContainer></DataTableCell>
                            </TableBody>
                        ) : null
                    )
                } )
            } */}
            </TableBody>
        </Table>
    </Aux>)
};

export default UsersPDF;
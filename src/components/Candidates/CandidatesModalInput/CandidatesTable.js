import React from 'react';
import styled from 'styled-components'
import Table from 'react-bootstrap/Table';

import styles from '../../Layout/AllTable/AllTable.module.css';
import Aux from '../../../hoc/Aux';

const MainContainer = styled.div`
    margin-bottom: 1rem;
    padding-right: 15px;
    padding-left: 15px;
    width: 100%;
`
const ErrorMessage = styled.p`
    font-size: 1.5rem;
    color: #434099;
    text-align: center;
    padding: 2rem 0rem;
`

const CandidatesTable = ( props ) => (
    <MainContainer>
        {props.candidates ? 
        <Aux>
             <Table 
                responsive
                className={styles.UserTable}>
                    <thead
                        className={styles.UserThead}>
                        <tr>
                            <th>CI</th>
                            <th>Nombre</th>
                            <th>Facultad</th>
                            <th>Escuela</th>
                            <th>Organización/es</th>
                        </tr>
                    </thead>
                    <tbody
                        className={styles.UserTbody}>
                            {props.candidates.map( candidate => {
                                const tempUser = props.users.find( user => user.id === candidate.idusuario )
                                return (
                                    <tr
                                        className={styles.UserTr}
                                        key={candidate.idusuario}>
                                        <td>{candidate.idusuario}</td>
                                        <td>{tempUser.name}</td>
                                        <td>{tempUser.faculty}</td>
                                        <td>{tempUser.school}</td>
                                        <td>{candidate.organizacion ? 
                                            <ul> {candidate.organizacion.map( org => <li key={org}>{org}</li>) } </ul>
                                            : "error"}
                                        </td>
                                    </tr>
                                )
                            }
                            )}
                    </tbody>
            </Table> 
        </Aux>: 
        <ErrorMessage>No existen candidatos registrados</ErrorMessage> }
    </MainContainer>
);

export default CandidatesTable;
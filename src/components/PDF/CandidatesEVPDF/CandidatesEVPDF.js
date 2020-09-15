import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import styled from '@react-pdf/styled-components';

import Aux from '../../../hoc/Aux';

const StyledView = styled.View`
    
`

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
                            {
                                props.electionsRaw[key].Candidatos.map( candidate => {
                                    const tempUser = props.users.find( user => user.id === candidate.idusuario )
                                    return (
                                        <CandidateInfo>
                                            {`CI: ${tempUser.id} Nombre: ${tempUser.name} Facultad: ${tempUser.faculty} Escuela: ${tempUser.school} Organización/es: ${
                                                    candidate.organizacion.map( org => org)
                                                }`}
                                        </CandidateInfo>
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


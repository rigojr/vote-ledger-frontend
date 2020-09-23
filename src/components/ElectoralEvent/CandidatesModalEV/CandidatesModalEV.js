import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

import AllModal from '../../Layout/Modal/AllModal';
import styles from '../../Candidates/CandidatesModalInput/CandidatesModalInput.module.css';
import Aux from '../../../hoc/Aux';
import CandidatesTable from '../../Candidates/CandidatesModalInput/CandidatesTable';
import PDF from '../../PDF/PDF';
import CandidatesEVPDF from '../../PDF/CandidatesEVPDF/CandidatesEVPDF';

import styled from 'styled-components';

const CandidatesContainer = styled.div`
    max-height: 400px;
    overflow: scroll;
`

const StyledRow = styled(Row)`
    margin: 0px;
`

const CandidatesModalEV = (props) => {
    
    const electionsRaw = props.electoralEvent.record.elections
    const electionsKeys = Object.keys(props.electoralEvent.record.elections)
    const pdfTitle = `Elecciones y candidatos del Evento Electoral ${props.electoralEvent.id} - ${props.electoralEvent.eventName}`
    const tempPDF = (
        <PDF title={pdfTitle}>
            <CandidatesEVPDF 
                electionsRaw = {electionsRaw} 
                electionsKeys = {electionsKeys}
                users={props.users}/>
        </PDF>
    )
    const pdf = {
        fileName: "candidatos.pdf",
        document: tempPDF
    }
     
    return (
        <AllModal
            showModal={props.modalHandler}
            modalBoolean={props.showModal}
            modalTitile={pdfTitle}
            pdf={pdf}>
                <CandidatesContainer>
                {
                    electionsKeys > 0 ?
                        (electionsKeys.map( key => {

                            let electionContent = (
                                <StyledRow>
                                    <Form.Group as={Col} className={`${styles.alertContainer}`}>
                                        <p className={`${styles.alertMessage}`}>
                                            <b>{`La elección ${key} - ${electionsRaw[key].nombre} no posee candidatos registrados`}</b>
                                        </p>
                                    </Form.Group>
                                </StyledRow>
                            )

                            if(electionsRaw[key].Candidatos) {
                                electionContent = (
                                    <StyledRow>
                                        <Form.Group as={Col} className={`${styles.alertContainer}`}>
                                            <p className={`${styles.alertMessage}`}>
                                                <b>{`Candidatos registrados para la elección ${key} - ${electionsRaw[key].nombre} - ${electionsRaw[key].tipoeleccion}`}</b>
                                            </p>
                                        </Form.Group>
                                        <CandidatesTable
                                            candidates={electionsRaw[key].Candidatos}
                                            users={props.users}/>
                                    </StyledRow>
                                )
                            }

                            return (
                                <Aux key={key}>
                                    {electionContent}
                                </Aux>
                            )
                        } )) : (
                            <StyledRow>
                                <Form.Group as={Col} className={`${styles.alertContainer}`}>
                                    <p className={`${styles.alertMessage}`}>
                                        <b>No existen elecciones registradas</b>
                                    </p>
                                </Form.Group>
                            </StyledRow>
                        )
                }

                </CandidatesContainer>
        </AllModal>
    )
};

export default CandidatesModalEV;
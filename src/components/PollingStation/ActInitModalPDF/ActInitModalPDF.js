import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

import AllModal from '../../Layout/Modal/AllModal';
import styles from '../../Candidates/CandidatesModalInput/CandidatesModalInput.module.css';
import ActPollingStationPDF from '../../PDF/ActPollingStationPDF/ActPollingStationPDF';
import PDF from '../../PDF/PDF';

import styled from 'styled-components';

const StyledRow = styled(Row)`
    margin: 0px;
`

const ActInitModalPDF = (props) => {

    const pdfTitle = `Acta de ${props.data.state === 'Auditoría' ? 'Inicio' : 'Votación' }`

    const title = `Mesa electoral "${props.data.id} - ${props.data.nombre}"`
    const school = `Escuela que la gestiona: ${props.data.escuela}`
    const vote = `Registro de votos: ${props.data.votantes}`
    const status = `Estatus: ${props.data.habilitada === "0" ? 'Inhabilitada' : 'Habilitada' }`
    
    const PDFInfo = [title,school,vote,status]

    const tempPDF = (
        <PDF title={pdfTitle}>
            <ActPollingStationPDF PDFInfo={PDFInfo}/>
        </PDF> 
    )

    const pdf = {
        fileName: "actaVotacion.pdf",
        document: tempPDF
    }
    
    return (
        <AllModal 
            showModal={props.modalHandler}
            modalBoolean={props.showModal}
            modalTitile={pdfTitle}
            pdf={pdf}>
                <div>
                    <StyledRow>
                        <Form.Group as={Col} className={`${styles.alertContainer}`}>
                            <p className={`${styles.alertMessage}`}>
                                <b>{title}</b>
                            </p>
                        </Form.Group>
                    </StyledRow>
                    <StyledRow>
                        <Form.Group as={Col} className={`${styles.alertContainer}`}>
                            <p className={`${styles.alertMessage}`}>
                                <b>{school}</b>
                            </p>
                        </Form.Group>
                    </StyledRow>
                    <StyledRow>
                        <Form.Group as={Col} className={`${styles.alertContainer}`}>
                            <p className={`${styles.alertMessage}`}>
                                <b>{vote}</b>
                            </p>
                        </Form.Group>
                    </StyledRow>
                    <StyledRow>
                        <Form.Group as={Col} className={`${styles.alertContainer}`}>
                            <p className={`${styles.alertMessage}`}>
                                <b>{status}</b>
                            </p>
                        </Form.Group>
                    </StyledRow>
                </div>
                
        </AllModal>
    )

};

export default ActInitModalPDF;
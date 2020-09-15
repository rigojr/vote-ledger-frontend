import React from 'react';

import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { PDFDownloadLink } from "@react-pdf/renderer";

import Form from 'react-bootstrap/Form';

const AllModal = ( props ) => (
    <Modal 
        show={props.modalBoolean}
        onHide={ () => props.showModal(false, false)}
        size={ props.small ? "sm" : "lg"}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>{props.modalTitile}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                {props.children}
            </Form>
        </Modal.Body>
        <Modal.Footer>
          {
            props.enableState ?
              <p><b>{props.modalMessage}</b></p>
              :
              null
          }
          <Button 
            variant="secondary" 
            onClick={ () => props.showModal(false, false)}>
            Cerrar
          </Button>

            {                                                 
              props.create ? 
                <Button 
                    variant="primary" 
                    onClick={props.createHandler}
                    disabled={props.enableState}>
                    Crear
                </Button>
                :
                null
            }

            {
              props.update ?
                <Button 
                  variant="primary" 
                  onClick={props.UpdateHandler}
                  disabled={props.enableState}>
                    Modificar
                </Button>
                :
                null
            }

            {
              props.pdf ? 
              <PDFDownloadLink
                fileName={props.pdf.fileName}
                document={props.pdf.document}
                style={{
                  textDecoration: "none",
                  padding: "10px",
                  color: "#4a4a4a",
                  backgroundColor: "#f2f2f2",
                  border: "1px solid #4a4a4a"
                }}>
                {
                  ({ blob, url, loading, error }) =>
                  loading ? "Loading document..." : "Download Pdf"
                }
              </PDFDownloadLink> : null
            }

        </Modal.Footer>
      </Modal>
);

export default AllModal;
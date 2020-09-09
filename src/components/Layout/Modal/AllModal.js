import React from 'react';

import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

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

        </Modal.Footer>
      </Modal>
);

export default AllModal;
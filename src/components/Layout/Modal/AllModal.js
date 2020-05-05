import React from 'react';

import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

import Form from 'react-bootstrap/Form';

const AllModal = ( props ) => (
    <Modal 
        show={props.modalBoolean}
        onHide={props.showModal}
        size="lg"
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
          <Button 
            variant="secondary" 
            onClick={props.showModal}>
            Cerrar
          </Button>
            {                                                 
                props.create ? 
                    <Button 
                        variant="primary" 
                        onClick={props.createHandler}>
                        Crear
                    </Button>
                    :
                    null
            }
        </Modal.Footer>
      </Modal>
);

export default AllModal;
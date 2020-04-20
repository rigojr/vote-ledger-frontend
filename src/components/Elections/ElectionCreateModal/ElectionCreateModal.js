import React from 'react';

import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

const ElectionCreateModal = ( props ) => (
    <Modal 
        show={props.modalBoolean}
        onHide={props.showModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
        <Modal.Header closeButton>
          <Modal.Title>Crear Elección</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Row>
                    <Form.Group as={Col}>
                        <Form.Label>Descripción</Form.Label>
                        <Form.Control 
                            as="textarea" 
                            rows="3" />
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group as={Col}>
                        <Form.Label>Fecha de Inicio</Form.Label>
                        <input className="form-control" type="date" defaultValue="2011-08-19" id="example-date-input-1"/>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>Fecha de Fin</Form.Label>
                        <input className="form-control" type="date" defaultValue="2011-08-19" id="example-date-input-2"/>
                    </Form.Group>
                </Row>
            </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button 
            variant="secondary" 
            onClick={props.showModal}>
            Cerrar
          </Button>
          <Button 
            variant="primary" 
            onClick={props.createElectionHandler}>
            Crear
          </Button>
        </Modal.Footer>
      </Modal>
);

export default ElectionCreateModal;
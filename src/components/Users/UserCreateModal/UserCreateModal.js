import React from 'react';

import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

const usercreatemodal = ( props ) => (
    <Modal 
        show={props.modalBoolean}
        onHide={props.showModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
        <Modal.Header closeButton>
          <Modal.Title>Crear Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Row>
                    <Form.Group as={Col}>
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control
                            as="input" />
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>Escuela</Form.Label>
                        <Form.Control 
                            as="select">
                            <option>Civil</option>
                            <option>Industrial</option>
                            <option>Informática</option>
                            <option>Telecomunicaciones</option>
                        </Form.Control>
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group as={Col}>
                        <Form.Label>Correo Electrónico</Form.Label>
                        <Form.Control
                            type="email" />
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>Contraseña</Form.Label>
                            <Form.Control
                                type="password" />
                    </Form.Group>
                </Row>
            </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.showModal}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={props.showModal}>
            Crear
          </Button>
        </Modal.Footer>
      </Modal>
);

export default usercreatemodal;
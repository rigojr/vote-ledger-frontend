import React from 'react';

import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

import SelectOptionsEscuela from './SelectOptionsEscuela/SelectOptionsEscuela';
import SelectOptionEleccion from './SelectOptionEleccion/SelectOptionEleccion';

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
                        <SelectOptionsEscuela />
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
                <Row>
                    <Form.Group 
                        as={Col}
                        >
                        <Form.Label>Tipo de Usuario</Form.Label>
                        <Form.Check
                            type="radio"
                            label="Comisión Electoral"
                            id="ceRadios"
                            name="inputRadios"
                            defaultChecked
                            onChange={props.showElection}/>
                        <Form.Check
                            type="radio"
                            label="Elector"
                            id="electorRadios"
                            name="inputRadios"
                            onChange={props.showElection}/>
                    </Form.Group>
                    <Form.Group as={Col}>
                        {
                            props.electionBoolean ?
                                <SelectOptionEleccion />:
                            null
                        }
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
            onClick={props.createUserHandler}>
            Crear
          </Button>
        </Modal.Footer>
      </Modal>
);

export default usercreatemodal;
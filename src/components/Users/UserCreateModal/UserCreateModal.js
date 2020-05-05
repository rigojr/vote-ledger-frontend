import React from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

import SelectOptionsEscuela from './SelectOptionsEscuela/SelectOptionsEscuela';
import Aux from '../../../hoc/Aux'

const usercreatemodal = ( props ) => (
    <Aux>
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
            <Form.Group as={Col}>
                <Form.Label>Cédula</Form.Label>
                <Form.Control
                    as="input" />
            </Form.Group>
            <Form.Group as={Col}>
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
        </Row>
    </Aux>
);

export default usercreatemodal;
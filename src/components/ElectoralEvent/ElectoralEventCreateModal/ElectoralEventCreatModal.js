import React from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

import Aux from '../../../hoc/Aux'

const usercreatemodal = ( props ) => (
    <Aux>
        <Row>
            <Form.Group as={Col}>
                <Form.Label>Código del Evento</Form.Label>
                <Form.Control
                    as="input" />
            </Form.Group>
        </Row>
        <Row>
            <Form.Group as={Col}>
                <Form.Label>Fecha de Inicio</Form.Label>
                <Form.Control
                    type="email" />
            </Form.Group>
            <Form.Group as={Col}>
                <Form.Label>Fecha de Finalización</Form.Label>
                    <Form.Control
                        type="password" />
            </Form.Group>
        </Row>
    </Aux>
);

export default usercreatemodal;
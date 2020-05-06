import React from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

import Aux from '../../../hoc/Aux'

const PollingStationCreateModal = () => (
    <Aux>
        <Row>
            <Form.Group as={Col}>
                <Form.Label>Código de la Mesa Electoral</Form.Label>
                <Form.Control
                    as="input" />
            </Form.Group>
        </Row>
    </Aux>
);

export default PollingStationCreateModal;
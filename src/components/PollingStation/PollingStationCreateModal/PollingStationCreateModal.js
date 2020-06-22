import React from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

import Aux from '../../../hoc/Aux';
import SelectOptionsEscuela from '../../Users/UserInputModal/SelectOptionsEscuela/SelectOptionsEscuela';


const PollingStationCreateModal = ( props ) => (
    <Aux>
        <Row>
            <Form.Group as={Col}>
                <Form.Label>Código de la Mesa Electoral</Form.Label>
                <Form.Control
                    as="input"
                    name="id"
                    value={props.inputValues.id}
                    onChange={props.setValue}
                    disabled={props.enableState}/>
            </Form.Group>
            <Form.Group as={Col}>
                <SelectOptionsEscuela
                    name="school"
                    school={props.inputValues.school}
                    onChange={props.setValue}
                    disabled={props.enableState}/>
            </Form.Group>
        </Row>
    </Aux>
);

export default PollingStationCreateModal;
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
                    as="input"
                    value={props.inputValues.name}
                    onChange={props.setValue}
                    disabled={props.enableState}
                    name="name"/>
            </Form.Group>
            <Form.Group as={Col}>
                <SelectOptionsEscuela
                    school={props.inputValues.school}
                    onChange={props.setValue}
                    disabled={props.enableState}
                    name="school"/>
            </Form.Group>
        </Row>
        <Row>
            <Form.Group as={Col}>
                <Form.Label>Correo Electrónico</Form.Label>
                <Form.Control
                    type="email"
                    value={props.inputValues.email}
                    onChange={props.setValue}
                    disabled={props.enableState}
                    name="email"/>
            </Form.Group>
            <Form.Group as={Col}>
                <Form.Label>Contraseña</Form.Label>
                    <Form.Control
                        type="password"
                        value={props.inputValues.password}
                        onChange={props.setValue}
                        disabled={props.enableState}
                        name="password"/>
            </Form.Group>
        </Row>
        <Row>
            <Form.Group as={Col}>
                <Form.Label>Cédula</Form.Label>
                <Form.Control
                    as="input" 
                    value={props.inputValues.id}
                    onChange={props.setValue}
                    disabled={props.inputTypeOfUser}
                    name="id"/>
            </Form.Group>
            <Form.Group as={Col}>
                <Form.Label>Tipo de Usuario</Form.Label>
                <Form.Check
                    type="radio"
                    label="Comisión Electoral"
                    id="ceRadios"
                    name="inputRadios"
                    onChange={ () => props.tagLabel("A") }
                    defaultChecked={props.typeOfUser}
                    disabled={props.inputTypeOfUser}/>
                <Form.Check
                    type="radio"
                    label="Elector"
                    id="electorRadios"
                    name="inputRadios"
                    onChange={ () => props.tagLabel("") }
                    disabled={props.inputTypeOfUser}
                    defaultChecked={!props.typeOfUser}/>
            </Form.Group>
        </Row>
    </Aux>
);

export default usercreatemodal;
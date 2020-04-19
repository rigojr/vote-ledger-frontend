import React from 'react';

import Form from 'react-bootstrap/Form';

import Aux from '../../../../hoc/Aux';

const SelectOptionsEscuela = ( ) => (
    <Aux>
        <Form.Label>Escuela</Form.Label>
        <Form.Control 
            as="select">
            <option>Administración y Contaduría</option>
            <option>Civil</option>
            <option>Ciencias Sociales</option>
            <option>Comunicación Social</option>
            <option>Derecho</option>
            <option>Educación</option>
            <option>Economía</option>
            <option>Filosofía</option>
            <option>Industrial</option>
            <option>Informática</option>
            <option>Letras</option>
            <option>Psicología</option>
            <option>Telecomunicaciones</option>
            <option>Teología</option>
        </Form.Control>
    </Aux>
);

export default SelectOptionsEscuela;
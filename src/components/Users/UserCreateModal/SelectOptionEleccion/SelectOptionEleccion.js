import React from 'react';

import Form from 'react-bootstrap/Form';

import Aux from '../../../../hoc/Aux';

const SelectOptionEleccion = () => (
    <Aux>
        <Form.Label>Elección</Form.Label>
        <Form.Control 
            as="select">
            <option>Elección 1</option>
            <option>Elección 2</option>
            <option>Elección 3</option>
            <option>Elección 4</option>
        </Form.Control>
    </Aux>
);

export default SelectOptionEleccion;
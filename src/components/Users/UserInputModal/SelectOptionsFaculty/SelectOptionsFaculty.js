import React from 'react';

import Form from 'react-bootstrap/Form';

import Aux from '../../../../hoc/Aux';

const SelectOptionsFaculty = ( props ) => (
    <Aux>
        <Form.Label>Facultad</Form.Label>
        <Form.Control 
            as="select"
            value={props.faculty}
            onChange={props.onChange}
            disabled={props.disabled}
            name={props.name}>
                <option>Ciencias Económicas y Sociales</option>
                <option>Ingeniería</option>
                <option>Humanidades y Educación</option>
                <option>Derecho</option>
                <option>Teología</option>
        </Form.Control>
    </Aux>
);

export default SelectOptionsFaculty;
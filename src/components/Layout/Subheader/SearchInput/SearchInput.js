import React from 'react';

import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'

import styles from './SearchInput.module.css'


const searchinput = ( props ) => (
    <Form 
        inline
        className={styles.SomePadding}>
        <FormControl 
            type="text"
            placeholder="Búsqueda"/>

        <Form.Control 
            as="select">
            <option>Nombre</option>
            <option>Cédula</option>
        </Form.Control>

        <Button 
            variant="outline-primary"
            onClick={props.subHeaderSearchingHandler}>
            Buscar
        </Button>
    </Form>
);

export default searchinput;
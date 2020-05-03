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
            placeholder="Búsqueda"
            onChange={props.onChange}/>

        <Form.Control 
            as="select"
            onChange={props.onChangeSelect}>
                {props.searchOptions.map(
                    option => {
                        return(
                            <option
                                key={option}>
                                {option}
                            </option>
                        )
                    }
                )}
        </Form.Control>

        <Button 
            variant="outline-primary"
            onClick={props.subHeaderSearchingHandler}>
            Buscar
        </Button>
    </Form>
);

export default searchinput;
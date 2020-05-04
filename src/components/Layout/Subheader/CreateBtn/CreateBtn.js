import React from 'react';

import Button from 'react-bootstrap/Button'

import styles from '../Subheader.module.css'

const createbtn = ( props ) => (
    <Button 
        variant="primary"
        onClick={props.clicked}
        className={styles.SomePadding}>
        Crear {props.btnName}
    </Button>
);

export default createbtn;
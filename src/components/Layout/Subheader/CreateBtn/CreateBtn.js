import React from 'react';

import Button from 'react-bootstrap/Button'

const createbtn = ( props ) => (
    <Button 
        variant="primary"
        onClick={props.clicked}
        block>
        Crear {props.btnName}
    </Button>
);

export default createbtn;
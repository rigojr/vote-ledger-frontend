import React from 'react';

import Button from 'react-bootstrap/Button'

const createbtn = ( props ) => (
    <Button variant="primary" block>
        Crear {props.elementName}
    </Button>
);

export default createbtn;
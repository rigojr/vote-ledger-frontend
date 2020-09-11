import React from 'react';
import ReactDOM from 'react-dom'
import CSVReader from 'react-csv-reader'
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import Aux from '../../../hoc/Aux';

const UserBatchModal = (props) => (
    <Aux>
        <Row>
            <Form as={Col}>
            <CSVReader
                cssClass="csv-reader-input"
                label="Por favor, seleccione un CSV"
                onFileLoaded={(data, fileInfo) => props.initBatchProcess(data, fileInfo)}
                inputId="ObiWan"
                inputStyle={{color: '#434099'}}/>
            </Form>
        </Row>
    </Aux>

    
);

export default UserBatchModal;
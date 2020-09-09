import React from 'react';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import styled from 'styled-components';

import Aux from '../../../hoc/Aux';

const UserBatchModal = (props) => (
    <Aux>
        <Row>
            <Form.Group as={Col}>
                <Form>
                    <Form.File id="formcheck-api-regular">
                        <Form.File.Label>Archivo .csv</Form.File.Label>
                        <Form.File.Input />
                    </Form.File>
                </Form>
            </Form.Group>
        </Row>
        <Row>
            <Form.Group as={Col}>
                <Button 
                    variant="outline-primary"
                    block>
                    Procesar
                </Button>
            </Form.Group>
        </Row>
    </Aux>

    
);

export default UserBatchModal;
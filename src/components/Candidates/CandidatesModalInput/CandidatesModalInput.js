import React from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';

import Aux from '../../../hoc/Aux'
import styles from './CandidatesModalInput.module.css';
import CandidatesTable from './CandidatesTable';

const CandidatesModalInput = ( props ) => (
    <Aux>
        <Row>
            <Form.Group as={Col}>
                <InputGroup className="mb-3">
                    <FormControl
                    placeholder="Cédula del candidato"
                    name='id'
                    value={props.inputValues.id}
                    onChange={props.setValueCandidates}/>
                    <InputGroup.Append>
                        <Button 
                            variant="outline-primary"
                           onClick={props.register}>
                            Registrar
                        </Button>
                    </InputGroup.Append>
                </InputGroup>
            </Form.Group>
        </Row>
        <Row>
            <Form.Group as={Col} className={`${styles.alertContainer}`}>
                <p className={`${styles.alertMessage}`}><b>Buscar Candidato</b></p>
            </Form.Group>
        </Row>
        <Row>
            <CandidatesTable
                candidates={props.candidates}
                users={props.users}/>
        </Row>
    </Aux>
);

export default CandidatesModalInput;
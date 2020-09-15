import React from 'react';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import styled from 'styled-components';

import styles from '../../Candidates/CandidatesModalInput/CandidatesModalInput.module.css';
import Spinner from '../../UI/Spinner/Spinner';
import Aux from '../../../hoc/Aux';

const OrgPills = styled.span`
    background-color: #434099;
    padding: 5px 15px;
    border-radius: 50px;
    margin: 10px 10px;
    color: #fff;
`

const StyledRow = styled(Row)`
    padding: 20px;
`

const OrgModal = (props) => {

    const OrgModalContent = !props.isLoading ? (
        <Aux>
            <Row>
                <Form.Group as={Col}>
                    <InputGroup className="mb-3">
                        <FormControl
                            placeholder="Nombre de la Organización "
                            name='name'
                            value={props.inputValues.name}
                            onChange={props.setValue}/>
                        <InputGroup.Append>
                            <Button 
                                variant="outline-primary"
                            onClick={ () => props.register() }>
                                Registrar
                            </Button>
                        </InputGroup.Append>
                    </InputGroup>
                </Form.Group>
            </Row>
            <Row>
                <Form.Group as={Col} className={`${styles.alertContainer}`}>
                    <p className={`${styles.alertMessage}`}><b>Organizaciones Electorales Registradas</b></p>
                </Form.Group>
            </Row>
            <StyledRow>
                    {
                        props.electoralOrg.map( org => {
                            return <OrgPills key={org}>{org}</OrgPills>
                        })
                    }
            </StyledRow>
        </Aux>
    ) : <Spinner />

    return (

        <Aux>
            {OrgModalContent}
        </Aux>
    )
    
};

export default OrgModal;
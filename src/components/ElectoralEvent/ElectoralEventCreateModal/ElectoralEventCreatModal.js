import React from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

import Aux from '../../../hoc/Aux';
import styles from './inputElectoralEvents.module.css';
import styled from 'styled-components';

const StyleDatePicker = styled.div`
    & > * {
        display: block;
    }
`

const usercreatemodal = ( props ) => (
    <Aux>
        <Row>
            <Form.Group as={Col}>
                <Form.Label>Código</Form.Label>
                <Form.Control
                    as="input"
                    name="eventCode"
                    value={props.inputValues['eventCode']}
                    onChange={props.setEvent}
                    disabled={props.enableState}/>
            </Form.Group>
            <Form.Group as={Col}>
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                    as="input"
                    name="eventName"
                    value={props.inputValues['eventName']}
                    onChange={props.setEvent}
                    disabled={props.enableState}/>
            </Form.Group>
            <Form.Group as={Col}>
                <Form.Label>Estado</Form.Label>
                <Form.Control
                    as="input"
                    name="state"
                    value={props.inputValues['state']}
                    onChange={props.setEvent}
                    disabled={true}/>
            </Form.Group>
        </Row>
        <Row>
            <Form.Group as={Col}>
                <Form.Label className={`${styles.DisplayOption}`}>Fecha de Inicio</Form.Label>
                <StyleDatePicker>
                    <DatePicker
                        className={`${styles.DisplayOption} ${styles.inputStyle}`}
                        onChange={props.setInitValue}
                        selected={props.inputValues['initDate']}
                        showTimeSelect
                        dateFormat="Pp"
                        minDate={new Date()}
                        placeholderText="Seleccione una fecha de inicio"
                        disabled={props.enableState}/>
                </StyleDatePicker>
            </Form.Group>
            <Form.Group as={Col}>
                <Form.Label className={`${styles.DisplayOption}`}>Fecha de Finalización</Form.Label>
                <StyleDatePicker>
                    <DatePicker 
                        className={`${styles.DisplayOption} ${styles.inputStyle}`}
                        onChange={props.setEndValue}
                        selected={props.inputValues['endDate']}
                        showTimeSelect
                        dateFormat="Pp"
                        minDate={props.inputValues['initDate']}
                        disabled={(!props.inputValues['initDate'] || props.enableState)}
                        placeholderText="Seleccione una fecha de Fin"/>
                </StyleDatePicker>
            </Form.Group>
        </Row>
    </Aux>
);

export default usercreatemodal;
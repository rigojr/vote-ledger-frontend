import React from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

import Aux from '../../../hoc/Aux';
import styles from './inputElectoralEvents.module.css'

const usercreatemodal = ( props ) => (
    <Aux>
        <Row>
            <Form.Group as={Col}>
                <Form.Label>Código del Evento</Form.Label>
                <Form.Control
                    as="input"
                    value={props.inputValues['eventCode']}
                    onChange={props.setEvent}/>
            </Form.Group>
        </Row>
        <Row>
            <Form.Group as={Col}>
                <Form.Label className={`${styles.DisplayOption}`}>Fecha de Inicio</Form.Label>
                <DatePicker
                    className={`${styles.DisplayOption} ${styles.inputStyle}`}
                    onChange={props.setInitValue}
                    selected={props.inputValues['initDate']}
                    showTimeSelect
                    dateFormat="Pp"
                    minDate={new Date()}
                    placeholderText="Seleccione una fecha de inicio"/>
            </Form.Group>
            <Form.Group as={Col}>
                <Form.Label>Fecha de Finalización</Form.Label>
                <DatePicker 
                    className={`${styles.DisplayOption} ${styles.inputStyle}`}
                    onChange={props.setEndValue}
                    selected={props.inputValues['endDate']}
                    showTimeSelect
                    dateFormat="Pp"
                    minDate={props.inputValues['initDate']}
                    disabled={!props.inputValues['initDate']}
                    placeholderText="Seleccione una fecha de Fin"/>
            </Form.Group>
        </Row>
    </Aux>
);

export default usercreatemodal;
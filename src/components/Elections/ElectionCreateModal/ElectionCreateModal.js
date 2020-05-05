import React from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

import Aux from '../../../hoc/Aux';

const ElectionCreateModal = ( props ) => (
  <Aux>
      <Row>
          <Form.Group as={Col}>
              <Form.Label>Descripción</Form.Label>
              <Form.Control 
                  as="textarea" 
                  rows="3" />
          </Form.Group>
      </Row>
      <Row>
          <Form.Group as={Col}>
              <Form.Label>Fecha de Inicio</Form.Label>
              <input className="form-control" type="date" defaultValue="2011-08-19" id="example-date-input-1"/>
          </Form.Group>
          <Form.Group as={Col}>
              <Form.Label>Fecha de Fin</Form.Label>
              <input className="form-control" type="date" defaultValue="2011-08-19" id="example-date-input-2"/>
          </Form.Group>
      </Row>
  </Aux>
);

export default ElectionCreateModal;
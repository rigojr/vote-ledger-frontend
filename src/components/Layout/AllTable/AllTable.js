import React from 'react';

import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'

import Aux from '../../../hoc/Aux';
import styles from './AllTable.module.css';

const AllTable = ( props ) => {


    return(
        <Card className={styles.UsersCard}>
            <Container>
                <Row lg={2}>
                    <Col xs lg="12">
                        <Table 
                            responsive
                            className={styles.UserTable}>
                            <thead
                                className={styles.UserThead}>
                                <tr>
                                    {
                                        props.theadArray.map(
                                            thead => {
                                                return (
                                                    <th key={thead}>{thead}</th>
                                                )
                                            }
                                        )
                                    }
                                </tr>
                            </thead>
                            <tbody
                                className={styles.UserTbody}>
                                    {
                                        props.payloadArray.map(
                                            payload => (
                                                <tr 
                                                    key={payload.id}
                                                    className={styles.UserTr}>
                                                    {
                                                        Object.values(payload).map(
                                                            (e, index) => (
                                                                <td key={`${index}+${payload.id}`}>{e}</td>
                                                            )
                                                        )
                                                    }
                                                    <td>
                                                        <DropdownButton 
                                                            id="dropdown-item-button" 
                                                            drop="left"
                                                            title="">
                                                                <Dropdown.Item 
                                                                    as="button"
                                                                    onClick={ () => props.consultHandler(payload)}>
                                                                    Consultar
                                                                </Dropdown.Item>
                                                                <Dropdown.Item 
                                                                    as="button"
                                                                    onClick={
                                                                        props.deleteAction ? 
                                                                        () => props.deleteHandler(payload.id) 
                                                                        : 
                                                                        () => props.changeHandler(payload)
                                                                    }>
                                                                    {
                                                                        props.deleteAction ? "Eliminar" : "Modificar"
                                                                    }
                                                                </Dropdown.Item>
                                                                {
                                                                    props.pollingStation ?
                                                                    <Aux>
                                                                    <Dropdown.Item 
                                                                        as="button"
                                                                        onClick={props.enableHandler}>
                                                                        Inhabilitar/Habilitar
                                                                    </Dropdown.Item>
                                                                    <Dropdown.Item 
                                                                        as="button"
                                                                        onClick={props.uninstallHandler}>
                                                                        Desinstalar
                                                                    </Dropdown.Item> 
                                                                    </Aux>
                                                                    :
                                                                    null
                                                                }
                                                        </DropdownButton>
                                                    </td>
                                                </tr> 
                                            )
                                        )
                                    }
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        </Card>
    );
};

export default AllTable;
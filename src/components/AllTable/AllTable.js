import React from 'react';

import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit} from '@fortawesome/free-solid-svg-icons';

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
                                        user => {
                                            return (
                                                <tr 
                                                    key={user.id}
                                                    className={styles.UserTr}>
                                                    <td>{user.id}</td>
                                                    <td>{user.nombre}</td>
                                                    <td>{user.facultad}</td>
                                                    <td>{user.escuela}</td>
                                                    <td>{user.email}</td>
                                                    <td className={styles.AccionIcons}>
                                                        <FontAwesomeIcon 
                                                            icon={faEye}
                                                            className={styles.AccionIcon}/> 

                                                        <FontAwesomeIcon 
                                                            icon={faEdit}
                                                            className={styles.AccionIcon}/>
                                                    </td>
                                                </tr>
                                            )
                                        }
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
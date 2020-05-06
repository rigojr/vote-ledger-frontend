import React from 'react';

import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import stylesCard from '../AllTable/AllTable.module.css';
import styles from './CardMessage.module.css';

const CardMessage = ( props ) => (
    <Card className={stylesCard.UsersCard}>
        <Container>
            <Row>
                <Col xs lg="12" className={styles.TitleMessage}>
                    <h1> {props.messageTitle}</h1>
                </Col>
            </Row>
        </Container>
    </Card>
);

export default CardMessage;
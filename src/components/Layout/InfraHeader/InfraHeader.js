import React from 'react';

import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import stylesCard from '../AllTable/AllTable.module.css';
import TitleElement from './TitleElement/TitleElement';
import CreateBtn from '../Subheader/CreateBtn/CreateBtn';


const InfraHeader = ( props ) => (
    <Card className={stylesCard.UsersCard}>
        <Container>
            <Row>
                <TitleElement elementTitile={ props.title}/>
                <Col xs lg="4">
                    <CreateBtn 
                        btnName={props.btnName}
                        clicked={props.showModal}
                        btnBlockBoolean={props.btnBlockBoolean}/>
                </Col>
            </Row>
        </Container>
    </Card>
);

export default InfraHeader;
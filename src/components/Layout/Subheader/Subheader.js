import React from 'react';

import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import styles from './Subheader.module.css'
import SearchInput from './SearchInput/SearchInput';
import CreateBtn from './CreateBtn/CreateBtn';

const subheader = ( props ) => (
    <Container className={styles.Container}>
        <Row>
            <Col xs lg="4">
                <h1 className={styles.TitileSubHeader}>
                    { props.subHeaderTitle }
                </h1>
            </Col>
            <Col xs lg="8">
                <Card className={styles.BtnsCard}>
                    <Container>
                        <Row>
                            <Col xs lg="9"> 
                                <SearchInput 
                                    subHeaderSearchingHandler={props.subHeaderSearchingHandler}
                                    searchOptions={props.searchOptions}/>
                            </Col>
                            <Col xs lg="3">
                                <CreateBtn 
                                    elementName={props.elementName}
                                    clicked={props.showModal}/>
                            </Col>
                        </Row>
                    </Container>
                </Card>
            </Col>
        </Row>
    </Container>
);

export default subheader;
import React from 'react';

import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import styles from './Subheader.module.css'
import SearchInput from './SearchInput/SearchInput';
import CreateBtn from './CreateBtn/CreateBtn';
import TitlePage from './TitlePage/TitlePage';

const subheader = ( props ) => (
    <Container className={styles.Container}>
        <Row>
            <TitlePage 
                subHeaderTitle={props.subHeaderTitle}/>
            <Col xs lg="8">
                <Card className={styles.BtnsCard}>
                    <Container>
                        <Row>
                            <Col xs lg="8"> 
                                <SearchInput 
                                    searchgHandler={props.searchgHandler}
                                    onChange={props.onChange}
                                    searchPlaceholder={props.searchPlaceholder}/>
                            </Col>
                            <Col xs lg="4">
                                <CreateBtn 
                                    btnName={props.btnName}
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
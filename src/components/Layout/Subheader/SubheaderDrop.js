import React from 'react';

import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import styles from './Subheader.module.css'
import SearchInput from './SearchInput/SearchInput';
import CreateBtn from './CreateBtn/CreateBtn';
import TitlePage from './TitlePage/TitlePage';

const SubheaderDrop = (props) => (
    <Container className={styles.Container}>
        <Row>
            <TitlePage />
            <Col xs lg="8">
                <Card className={styles.BtnsCard}>
                    <Container>
                        <Row>
                            <Col xs lg="9"> 
                                <SearchInput 
                                    subHeaderSearchingHandler={props.subHeaderSearchingHandler}
                                    searchOptions={props.searchOptions}
                                    onChange={props.onChange}
                                    onChangeSelect={props.onChangeSelect}/>
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

export default SubheaderDrop;
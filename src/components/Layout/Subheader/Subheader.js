import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import styles from './Subheader.module.css'
import SearchInput from './SearchInput/SearchInput';
import CreateBtn from './CreateBtn/CreateBtn';
import TitlePage from './TitlePage/TitlePage';
import Dropdown from './DropdownBtn/DropdownBtn';

const subheader = ( props ) => {

    let inputFiled;
    switch (props.typeInput){
        case "button":
            inputFiled = (
                <CreateBtn 
                    btnName={props.btnName}
                    clicked={props.showModal}/>
            )
            break;
        case "drop":
            inputFiled = (
                <Dropdown 
                    btnName={props.btnName}
                    btnPayload={props.btnPayload}
                    btnSelect={props.btnSelect}/>
            )
            break;
        default:
            break;
    }

    return(
        <Container 
            className={styles.Container}>
            <Row>
                <TitlePage 
                    subHeaderTitle={props.subHeaderTitle}/>
                <Col xs lg="8">
                    <Container>
                        <Row
                            className={styles.InputRigth}>
                            <SearchInput 
                                searchHandler={props.searchHandler}
                                onChange={props.onChange}
                                searchPlaceholder={props.searchPlaceholder}/>
                            {inputFiled}
                        </Row>
                    </Container>
                </Col>
            </Row>
        </Container>
    );

}

export default subheader;
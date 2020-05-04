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
            console.log("Creating a button as a input field in the sub header");
            inputFiled = (
                <CreateBtn 
                    btnName={props.btnName}
                    clicked={props.showModal}/>
            )
            break;
        case "drop":
            console.log("Creating a dropdown as a input field in the sub header");
            inputFiled = (
                <Dropdown 
                    btnName={props.btnName}/>
            )
            break;
        default:
            console.log("Error handling the input selection for the subheader");
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
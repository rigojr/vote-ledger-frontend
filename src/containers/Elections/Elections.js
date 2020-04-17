import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import Aux from '../../hoc/Aux';
import styles from './Elections.module.css' 

class Elections extends Component {

    componentDidMount () {
        console.log("Elections.js is mount")
        // Here we ask for the initial data
    }

    render(){

        let ElectionsComponent = this.props.isAuthed ?
            <Card className={styles.ElectionsCard}>
                <Container>
                    <Row lg={2}>
                        <Col xs lg="12">
                            <p>User</p>
                        </Col>
                    </Row>
                </Container>
            </Card>:
            <Redirect from="/Dashboard" to="/login"/>;

        return(
            <Aux>
                {ElectionsComponent}
            </Aux>
        )
    }

}

export default Elections;
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import Aux from '../../hoc/Aux';
import styles from './Users.module.css' 

class User extends Component {

    componentDidMount () {
        console.log("Users.js is mount")
        // Here we ask for the initial data
    }

    render(){

        let UsersComponent = this.props.isAuthed ?
            <Card className={styles.UsersCard}>
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
                {UsersComponent}
            </Aux>
        )
    }

}

export default User;
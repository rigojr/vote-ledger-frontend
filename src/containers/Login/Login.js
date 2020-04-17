import React, {Component} from 'react';

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import styles from './Login.module.css' 
import Aux from '../../hoc/Aux';


class Login extends Component {


    authLogicRedirection = () =>{
        console.log("authLogicRedirection");
        this.props.authHandler();
        this.props.history.push( '/dashboard/' );
    }

    render(){
        return(
            <Aux>
                <div className={styles.logoContainer}>
                    <p className={styles.titleLogo}>VoteLedger</p>
                    <p className={styles.subtitleLogo}>Aplicación Electoral</p>
                </div>
                <Card className={styles.loginCard}>
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Usuario</Form.Label>
                            <Form.Control type="text" />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control type="password"/>
                        </Form.Group>
                        <Button 
                            variant="primary" 
                            onClick={this.authLogicRedirection}>
                            Ingresar
                        </Button>

                    </Form>
                </Card>
            </Aux>
        )
    }

}

export default Login;
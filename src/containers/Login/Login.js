import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom';

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import styles from './Login.module.css' 
import Aux from '../../hoc/Aux'

import * as actions from '../../store/actions/index'
import { sha256 } from 'js-sha256'
import Spinner from '../../components/UI/Spinner/Spinner'
import styled from 'styled-components'

const ErrorMessage = styled.p`
    text-align: center;
    color: red;
    padding-top: 20px;
`

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            form: {
                ci: '',
                password: '',
            }
         };
    }

    componentDidMount () {
        this.props.onFetchUsers();
    }


    authLogicRedirection = () =>{
        if( this.state.form.ci !== '' && this.state.form.password !== ''){
            const user = this.props.users.find( user => user.id === this.state.form.ci )
            if( user && user.type === "admin"){
                const shaPassword = sha256(this.state.form.password)
                if( user.status === '1' ){
                    if( shaPassword === user.password ){
                        this.props.onLogin( 
                            this.state.form.ci, 
                            shaPassword,  
                            user
                            )
                    } else {
                        alert("Error, la contraseña es incorrecta")
                    }
                } else {
                    alert("Error, el usuario esta inhabilitado")
                }
            } else {
                alert('Error, el usuario no existe / el tipo de usuario no puede hacer login')
            }
        } else {
            alert(`Termine de ingresaro los datos`)
        }
        this.cleanLoginForm()
    }

    cleanLoginForm = () => {
        this.setState( prevState => ({
            ...prevState,
            form: {
                ci: '',
                password: '',
            }
        }))
    }

    setValue = (e) => {
        const value = e.target.value;
        const name = [e.target.name];
        this.setState( prevState => ({
            ...prevState,
            form: {
                ...prevState.form,
                [name]: value 
            }
         }));
    };

    render(){

        let LoginContainer = (
            <Card className={styles.loginCard}>
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Cédula</Form.Label>
                            <Form.Control 
                                name="ci"
                                as="input"
                                value={this.state.form.ci}
                                onChange={this.setValue}
                                type="text" />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control 
                                name="password"
                                as="input"
                                value={this.state.form.password}
                                onChange={this.setValue}
                                type="password"/>
                        </Form.Group>
                        <Button 
                            variant="primary" 
                            onClick={this.authLogicRedirection}
                            autoFocus>
                            Ingresar
                        </Button>
                    </Form>
                </Card>
        )

        let redirectDashBoard = null

        if ( this.props.authenticated )
            redirectDashBoard = <Redirect to="/dashboard"/>

        if ( this.props.isLoading )
            LoginContainer = <Spinner/>

        return(
            <Aux>
                <div className={styles.logoContainer}>
                    <p className={styles.titleLogo}>VoteLedger</p>
                    <p className={styles.subtitleLogo}>Aplicación Electoral</p>
                </div>
                {LoginContainer}
                {
                    this.props.isLoggin ? <Spinner /> : null
                }
                {redirectDashBoard}
            </Aux>
        )
    }

}

const mapStateToProps = state => {
    return{
        isLoading: state.user.isLoading,
        users: state.user.fetch,
        isLoggin: state.login.isLoading,
        failMessage: state.login.failMessage,
        authenticated: state.login.authenticated
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchUsers: () => dispatch( actions.fetchUser() ),
        onLogin: (ci, password, userInfo) => dispatch( actions.login(ci, password, userInfo) )
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Login);
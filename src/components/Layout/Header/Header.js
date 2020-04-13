import React from 'react';

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './Header.module.css'



const header = ( props ) => (

    <header>
        <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
            <Navbar.Brand className={styles.purpleColor}>VoteLedger</Navbar.Brand>

            {
            props.authenticated ? 
            <Nav className="ml-auto">
                <Nav.Link href="#" >Usuarios</Nav.Link>
                <Nav.Link href="#" >Elecciones</Nav.Link>
            </Nav>:
            null
            }
            
        </Navbar>
    </header>
);

export default header;
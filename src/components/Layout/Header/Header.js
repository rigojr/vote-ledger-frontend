import React from 'react';
import { NavLink, Link } from 'react-router-dom';

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

import styles from './Header.module.css'



const header = ( props ) => (

    <header>
        <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
            <Navbar.Brand>
                <Link to="/dashboard" className={styles.purpleColor}>VoteLedger</Link>
            </Navbar.Brand>
            <Nav className="ml-auto">
                <NavLink to="/users" className={styles.NavLink} activeClassName={styles.Active}>Usuarios</NavLink>
                <NavLink to="/elections" className={styles.NavLink} activeClassName={styles.Active}>Elecciones</NavLink>
            </Nav>
        </Navbar>
    </header>
);

export default header;
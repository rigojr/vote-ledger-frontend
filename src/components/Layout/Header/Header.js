import React from 'react';
import { Link } from 'react-router-dom';

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import styled from 'styled-components'

import styles from './Header.module.css'

const SpecialAnchor = styled.a`
    color: rgba(0,0,0,.5) !important;
`

const header = ( props ) => (

    <header>
        <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
            <Navbar.Brand>
                <Link to="/dashboard" className={styles.purpleColor}>VoteLedger</Link>
            </Navbar.Brand>
            <Nav className="ml-auto">

                <DropdownButton 
                    id="dropdown-item-button" 
                    title={"Bienvenido, " + props.userName}
                    drop="left">
                    <Dropdown.Item as="button">
                        <Link 
                            to="/users" 
                            className={styles.NavLink}>
                                Usuarios
                        </Link>
                    </Dropdown.Item>
                    <Dropdown.Item as="button">
                        <Link 
                            to="/electoral-events" 
                            className={styles.NavLink}>
                                Eventos Electorales
                        </Link>
                    </Dropdown.Item>
                    <Dropdown.Item as="button">
                        <Link 
                            to="/elections" 
                            className={styles.NavLink}>
                                Elecciones
                        </Link>
                    </Dropdown.Item>
                    <Dropdown.Item as="button">
                        <Link 
                            to="/polling-station" 
                            className={styles.NavLink}>
                                Mesas Electorales
                        </Link>
                    </Dropdown.Item>
                    <Dropdown.Item as="button">
                        <SpecialAnchor 
                            className={styles.NavLink}
                            onClick={ () => props.orgModalHandler() }>
                                Organizaciones
                        </SpecialAnchor>
                    </Dropdown.Item>
                    
                    <div className="dropdown-divider"></div>
                    <Dropdown.Item as="button">
                        <Link 
                            to="/login" 
                            onClick={props.logout} 
                            className={styles.NavLink}>
                                Cerrar Sesión
                        </Link>
                    </Dropdown.Item>
                </DropdownButton>
            </Nav>
        </Navbar>
    </header>
);

export default header;
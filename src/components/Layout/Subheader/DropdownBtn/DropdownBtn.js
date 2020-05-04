import React from 'react';

import Dropdown from 'react-bootstrap/Dropdown'

import styles from '../Subheader.module.css'

const DropdownBtn = (props) => (

    <Dropdown>
        <Dropdown.Toggle 
            variant="primary" 
            id="dropdown-basic" 
            block
            className={styles.SomePadding}>
            {props.btnName}
        </Dropdown.Toggle>

        <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
        </Dropdown.Menu>
    </Dropdown>
    
);

export default DropdownBtn;
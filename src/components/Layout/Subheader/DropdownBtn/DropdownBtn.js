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
            {
                props.btnPayload.map(
                    payload => (
                        <Dropdown.Item
                            key={payload.id}
                            onClick={() => props.btnSelect(payload.id)}>
                            {payload.id}
                        </Dropdown.Item>
                    )
                )
            }
        </Dropdown.Menu>
    </Dropdown>
    
);

export default DropdownBtn;
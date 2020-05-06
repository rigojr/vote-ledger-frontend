import React from 'react';

import Col from 'react-bootstrap/Col';

import styles from '../InfraHeader.module.css';

const TitleElement = ( props ) => (
    <Col xs lg="8">
        <h1 className={styles.ElementTitle}>
            { props.elementTitile }
        </h1>
    </Col>
);

export default TitleElement;
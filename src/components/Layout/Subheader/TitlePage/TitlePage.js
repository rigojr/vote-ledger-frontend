import React from 'react';

import styles from '../Subheader.module.css'
import Col from 'react-bootstrap/Col';

const TitlePage = ( props ) => (
    <Col xs lg="4">
        <h1 className={styles.TitileSubHeader}>
            { props.subHeaderTitle }
        </h1>
    </Col>
);

export default TitlePage;
import React from 'react';

import styles from './Footer.module.css'
import ucabLogo from '../../../assets/img/Logo_UCAB_negro_2.png';

const Footer = () => (
    <footer className={styles.footer}>
        <div>
            <p className={styles.pFooter}>Por José Salas y Simón Esperanza</p>
            <img src={ucabLogo} alt="UCAB Logo" className={styles.imgUcab}/>
        </div>
    </footer>
);

export default Footer;
import React from 'react';

import Aux from '../../../hoc/Aux';
import styles from './About.module.css';

const about = () => (
    <Aux>
        <h1>Sobre la Aplicación</h1>
        <p className={ styles.AboutText }>
        Mediante la solución desarrollada en este Trabajo de Grado, se busca realizar un aporte en el área de los procesos electorales. El mismo es de suma importancia ya que pretende retirar la mayor cantidad de responsabilidad humana en la transparencia e integridad de los procesos electorales, y también, hacer más difícil y costoso cualquier acto de corrupción.</p>
        <p className={ styles.AboutText }>Por otra parte, ofrece una primera exploración en cuanto al desarrollo, gestión y escalabilidad de registros civiles, en este caso electorales, permitiendo abrir el horizonte a nuevas soluciones en diversas áreas burocráticas que se basan en la transferencias de activos e información vital, como lo son las universidades en cuanto a la expedición de títulos universitarios, clínicas y hospitales llevando un registro médico compartido, cuerpos notariados del estado emitiendo documentos legales de manera eficiente, rápida y más económica.</p> 
        <p className={ styles.AboutText }>La innovación de la solución planteada radica en el uso de una nueva tecnología, el Blockchain, que si bien se debate su estatus de disruptividad, ha demostrado en diferentes áreas ser una herramienta capaz de ofrecer soluciones y optimizaciones innovadoras.</p>
        <h1>Desarrollado Por:</h1>
        <ul>
            <li>José Salas</li>
            <li>Simón Esperanza</li>
        </ul>
        <h1>Bajo la tutoría de Ing. Ana Karina Fernandez</h1>
        <p>En el Marco del desarrollo "Arquitectura Basada en Blockchain para la Gestión de Registros y Procesos Electorales"</p>
    </Aux>
);

export default about;
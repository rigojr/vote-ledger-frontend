import React from 'react';

import Aux from '../../../hoc/Aux';
import Table from 'react-bootstrap/Table'

const labelStatus = ["Middleware","UCAB","CE","SCE"];

const status = (props) => (
    <Aux>
        <h1>Estatus</h1>
        <Table responsive>
            <tbody>
                {props.statusArray.map((value,index) => {
                    return(
                        <tr key={index}>
                            <td>{labelStatus[index]}</td>
                            <td>{value}</td>
                        </tr>
                    )
                })}
            </tbody>
        </Table>
    </Aux>
);

export default status;
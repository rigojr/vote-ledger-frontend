import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import styled from '@react-pdf/styled-components';

import Aux from '../../../hoc/Aux';

const StyledView = styled.View`
    
`

const StyledText = styled.Text`
    font-size: 16px;
    padding-bottom: 10px;
    font-weight: bold;
    color: #000
`

const ActPollingStationPDF = (props) => {

    return(
        <StyledView>
            {
                props.PDFInfo.map( info => <StyledText key={info}>{info}</StyledText> )
            }
        </StyledView>
    )
};

export default ActPollingStationPDF;
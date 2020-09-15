import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import styled from '@react-pdf/styled-components';

const StyledPage = styled.Page`
    padding: 20px;
`

const HeaderContainer = styled.View`
    text-align: center;
    padding: 20px;
    color: #434099;
`

const StyledTitle = styled.Text`
    font-size: 64px;
    padding-bottom: 10px;
`
const StyledSubTitle = styled.Text`
    font-size: 16px;
    padding-bottom: 10px;
`
const MainContainer = styled.View`
    padding: 10px; 
`

const PDF = (props) => (
  <Document>
    <StyledPage size="A4">
      <HeaderContainer>
        <StyledTitle>VoteLedger</StyledTitle>
        <StyledSubTitle>Aplicación Electoral</StyledSubTitle>
        <StyledSubTitle>{props.title}</StyledSubTitle>
      </HeaderContainer>
      <MainContainer>
          {props.children}
      </MainContainer>
    </StyledPage>
  </Document>
);

export default PDF;
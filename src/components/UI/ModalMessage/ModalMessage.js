import React from 'react';
import styled from 'styled-components';

import AllModal from '../../Layout/Modal/AllModal';

const MainContainer = styled.div`
    max-height: 400px;
`

const ModalMessage = (props) => {


    return (
        <AllModal
            modalBoolean={true}
            showModal={props.modalHandler}
            modalTitile={props.modalTitile}
            small={true}>
            <MainContainer>
                {props.children}
            </MainContainer>
        </AllModal>
    )
};

export default ModalMessage;
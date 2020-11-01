import React, { Component } from 'react';
import { connect } from 'react-redux'

import Aux from '../../hoc/Aux';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import AllModal from '../Layout/Modal/AllModal';
import OrgModalContent from '../Users/OrgModal/OrgModal';
import * as actions from '../../store/actions/index';
import ModalMessage from '../../components/UI/ModalMessage/ModalMessage';
import { ErrorMessage } from '../../constants/cssProperties';

class Layout extends Component {

    constructor(props) {
        super(props)
        this.state = { 
            formElectoralOrg: {
                name: ''
            },
            modalWarning: null
         };
    }

    setValueElectoralOrg = (e) => {
        const value = e.target.value;
        const name = [e.target.name];
        this.setState( prevState => ({
            formElectoralOrg: {
                ...prevState.form,
                [name]: value 
            }
         }));
    }

    createOrgHandler = () => {
        let modalWarning = null
        if( this.state.formElectoralOrg.name !== "" ){
            if( this.props.electoralOrg.findIndex( org => org ===  this.state.formElectoralOrg.name) === -1 ){
                this.setState( prevState => ({
                    ...prevState,
                    formElectoralOrg: {
                        name: ''
                    },
                }) )
                this.props.onCreateElectoralOrg(this.state.formElectoralOrg.name)
            } else {
                modalWarning = "Error, la organización ya existe"
            }
        } else {
            modalWarning = "Error, no deje espacios vacios"
        }
        this.setState( prevState => ({
            ...prevState,
            modalWarning,
            formElectoralOrg: {
                name: ''
            },
        }))
        
    }

    showModalHandler = () => {
        this.props.onFetchElectoralOrg()
        this.props.onModalOrgShow()
        this.setState( prevState => ({
            ...prevState,
            formElectoralOrg: {
                name: ''
            },
        }))
    }
    
    render(){

        let HeaderComponent = this.props.isAuthed ? 
            <Header 
                userName={this.props.userName}
                logout={this.props.onLogout}
                orgModalHandler={this.showModalHandler}/> : null;

        return(
            
            <Aux>
                {HeaderComponent}
                <div>
                    { this.props.children }
                </div>
                <Footer />
                <AllModal
                    showModal={this.showModalHandler}
                    modalBoolean={this.props.isOrgModal}
                    modalTitile="Organizaciones Electorales"
                    modalMessage={this.props.message}>
                        <OrgModalContent
                            inputValues={this.state.formElectoralOrg}
                            setValue={this.setValueElectoralOrg}
                            register={this.createOrgHandler}
                            isLoading={this.props.isLoading}
                            electoralOrg={this.props.electoralOrg}/>
                </AllModal>
                {
                    this.state.modalWarning ? 
                        <ModalMessage
                            modalHandler={() => this.setState( prevState => ({...prevState, modalWarning: null}))}
                            modalTitile={"Error"}>
                            <ErrorMessage>{ this.state.modalWarning }</ErrorMessage>
                        </ModalMessage> : null
                }
            </Aux>
        )
    }

}

const mapStateToProps = state => {
    return{
        isOrgModal: state.user.isOrgModal,
        electoralOrg: state.user.electoralOrg,
        message: state.user.message,
        isLoading: state.user.isLoading
    }
}


const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch( actions.logout()),
        onModalOrgShow: () => dispatch( actions.showOrgModal() ),
        onCreateElectoralOrg: (electoralOrg) => dispatch( actions.createOrg(electoralOrg) ),
        onFetchElectoralOrg: () => dispatch( actions.fetchOrg() ),

    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Layout);
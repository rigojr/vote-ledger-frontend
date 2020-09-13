import React, { Component } from 'react';
import { connect } from 'react-redux'

import Aux from '../../hoc/Aux';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import AllModal from '../Layout/Modal/AllModal';
import OrgModalContent from '../Users/OrgModal/OrgModal';
import * as actions from '../../store/actions/index';


class Layout extends Component {

    constructor(props) {
        super(props)
        this.state = { 
            formElectoralOrg: {
                name: ''
            },
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
        this.setState( prevState => ({
            ...prevState,
            formElectoralOrg: {
                name: ''
            },
        }) )
        this.props.onCreateElectoralOrg(this.state.formElectoralOrg.name)
    }

    showModalHandler = () => {
        this.props.onFetchElectoralOrg()
        this.props.onModalOrgShow()
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
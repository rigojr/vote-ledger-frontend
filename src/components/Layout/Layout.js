import React, { Component } from 'react';
import { connect } from 'react-redux'

import Aux from '../../hoc/Aux';
import Header from './Header/Header';
import Footer from './Footer/Footer'
import * as actions from '../../store/actions/index'


class Layout extends Component {
    
    render(){

        let HeaderComponent = this.props.isAuthed ? 
            <Header 
                userName={this.props.userName}
                logout={this.props.onLogout}/> : null;

        return(
            
            <Aux>
                {HeaderComponent}
                <div>
                    { this.props.children }
                </div>
                <Footer />
            </Aux>
        )
    }

}

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch( actions.logout())
    }
}

export default connect(null,mapDispatchToProps)(Layout);
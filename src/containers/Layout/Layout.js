import React, { Component } from 'react';

import Aux from '../../hoc/Aux';
import Header from '../../components/Layout/Header/Header';
import Footer from '../../components/Layout/Footer/Footer'

class Layout extends Component {
    
    render(){

        let HeaderComponent = this.props.isAuthed ? <Header/> : null;

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

export default Layout;
import React, { Component } from 'react';

import Aux from '../../hoc/Aux';
import Header from '../../components/Layout/Header/Header';
import Footer from '../../components/Layout/Footer/Footer'

class Layout extends Component {
    state = {
         authenticated: false
    }


    render(){
        return(
            <Aux>
                <Header authenticated={this.state.authenticated}/>
                <div>
                    { this.props.children }
                </div>
                <Footer />
            </Aux>
        )
    }

}

export default Layout;
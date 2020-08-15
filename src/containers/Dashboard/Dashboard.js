import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';


import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import styles from './Dashboard.module.css' 
import Aux from '../../hoc/Aux';
import About from '../../components/Dashboard/About/About';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

class Dashboard extends Component {

    componentDidMount () {
        this.props.onFetch();
    }

    render (){

        

        let DashboardComponent = this.props.isLoading 
            ?   <Spinner />
            :   <Card className={styles.DashboardCard}>
                    <Container>

                        <Row lg={2}>
                            <Col xs lg="12">
                                <About />
                            </Col>
                        </Row>

                    </Container>
                </Card>
                
            
        const redirectComponent = !this.props.isAuthed 
            ? <Redirect from="/Dashboard" to="/login"/> 
            : null


        return (
            <Aux>
                {DashboardComponent}
                {redirectComponent}
            </Aux>
        )
    }


}

const mapStateToProps = state => {
    return{
        isLoading: state.central.isLoading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetch: () => dispatch( actions.fetch() )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
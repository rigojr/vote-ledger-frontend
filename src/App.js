import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { connect } from 'react-redux'

import Layout from './components/Layout/Layout';
import Login from './containers/Login/Login'
import Dashboard from './containers/Dashboard/Dashboard';
import Users from './containers/Users/Users'
import Elections from './containers/Elections/Elections';
import ElectoralEvents from './containers/ElectoralEvent/ElectoralEvent';
import PollingStation from './containers/PollingStation/PollingStation';
import Candidates from './containers/Candidates/Candidates';

class App extends Component {

  render() {

    return (
        <Layout 
          isAuthed={this.props.authenticated}
          userName={this.props.username}
          authHandler={this.authenticationHandler}>
          <Switch>
            <Route 
              path="/login"
              render={ (props) => <Login {...props}/>}/>
            <Route 
              path="/dashboard"
              render={ (props) => <Dashboard {...props} isAuthed={this.props.authenticated}/> } />
            <Route
              path="/users"
              render={ (props) => <Users {...props} isAuthed={this.props.authenticated}/> }/>
            <Route
              path="/electoral-events"
              render={ (props) => <ElectoralEvents {...props} isAuthed={this.props.authenticated}/> }/>
            <Route
              path="/elections"
              render={ (props) => <Elections {...props} isAuthed={this.props.authenticated}/> }/>
            <Route
              path="/polling-station"
              render={ (props) => <PollingStation {...props} isAuthed={this.props.authenticated}/> }/>
            <Route
              path="/candidates"
              render={ (props) => <Candidates {...props} isAuthed={this.props.authenticated}/> }/>
            <Redirect from="/" to="/login"/>
          </Switch>
        </Layout>
    )

  }
  
}

const mapStateToProps = state => {
  return{
    authenticated: state.login.authenticated,
    username: state.login.userProfile.name
  }
}

export default connect(mapStateToProps)(App);

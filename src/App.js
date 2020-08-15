import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import Login from './containers/Login/Login'
import Dashboard from './containers/Dashboard/Dashboard';
import Users from './containers/Users/Users'
import Elections from './containers/Elections/Elections';
import ElectoralEvents from './containers/ElectoralEvent/ElectoralEvent';
import PollingStation from './containers/PollingStation/PollingStation';
import Candidates from './containers/Candidates/Candidates';

class App extends Component {

  state = {
    authenticated: false,
    username: "Rigojr"
  }

  authenticationHandler = () => {

    const auth = this.state.authenticated;
    const authUpdated = !auth;
    this.setState( { authenticated: authUpdated } );

  }

  render() {

    return (
        <Layout 
          isAuthed={this.state.authenticated}
          userName={this.state.username}
          authHandler={this.authenticationHandler}>
          <Switch>
            <Route 
              path="/login"
              render={ (props) => <Login {...props} authHandler={this.authenticationHandler}/>}/>
            <Route 
              path="/dashboard"
              render={ (props) => <Dashboard {...props} isAuthed={this.state.authenticated}/> } />
            <Route
              path="/users"
              render={ (props) => <Users {...props} isAuthed={this.state.authenticated}/> }/>
            <Route
              path="/electoral-events"
              render={ (props) => <ElectoralEvents {...props} isAuthed={this.state.authenticated}/> }/>
            <Route
              path="/elections"
              render={ (props) => <Elections {...props} isAuthed={this.state.authenticated}/> }/>
            <Route
              path="/polling-station"
              render={ (props) => <PollingStation {...props} isAuthed={this.state.authenticated}/> }/>
            <Route
              path="/candidates"
              render={ (props) => <Candidates {...props} isAuthed={this.state.authenticated}/> }/>
            <Redirect from="/" to="/login"/>
          </Switch>
        </Layout>
    )

  }
  
}

export default App;

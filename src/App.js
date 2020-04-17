import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

import Layout from './containers/Layout/Layout';
import Login from './containers/Login/Login'
import Dashboard from './containers/Dashboard/Dashboard';

class App extends Component {

  state = {
    authenticated: false
  }

  authenticationHandler = () => {

    console.log("authenticationHandler")
    const auth = this.state.authenticated;
    const authUpdated = !auth;
    this.setState( { authenticated: authUpdated } );

  }

  render() {

    return (
      <div className="App">
        <Layout isAuthed={this.state.authenticated}>
          <Switch>
            <Route 
              path="/login"
              render={ (props) => <Login {...props} authHandler={this.authenticationHandler}/>}/>
            <Route 
              path="/dashboard"
              render={ (props) => <Dashboard {...props} isAuthed={this.state.authenticated}/> } />
            <Redirect from="/" to="/login"/>
          </Switch>
        </Layout>
      </div>
    )

  }
  
}

export default App;

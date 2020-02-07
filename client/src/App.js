import React from 'react';
import {BrowserRouter, Route, Link, Switch } from 'react-router-dom'
import _ from 'lodash'
import {connect} from 'react-redux'
import {startLogoutUser} from './actions/user'

import Register from './components/users/Register'
import Login from './components/users/Login'

import Home from './components/common/Home'

import List from './components/dashboard/List'

function App(props) {

  const handleLogout = () => {
    setTimeout(()=>{
      props.dispatch(startLogoutUser())
    },60000)  
  }

  return (
    <BrowserRouter>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <span class="navbar-brand mb-0 h4">App</span>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            {
              _.isEmpty(props.user) ? (
                <React.Fragment>
                  <li className="nav-item">
                    <Link className="nav-link" to="/dashboard">Dashboard</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/users/login">Login</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/users/register">Register</Link>
                  </li>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <li className="nav-item">
                    <Link className="nav-link" to="/">Home</Link>
                  </li>
                   { <li className="nav-item">
                    <Link className="nav-link" to="/dashboard">Dashboard</Link>
                  </li> }
                  <li className="nav-item">
                    <Link className="nav-link" onClick={handleLogout()} to="/">Logout</Link>
                  </li>
                </React.Fragment>
              )
            }
          </ul>
        </div>
      </nav>

      <Switch>

        <Route path="/" component={Home} exact={true}/>

        <Route path="/users/register" component={Register} />
        <Route path="/users/login" component={Login}/>

        <Route path="/dashboard" component={List} exact={true}/> 

      </Switch>
    </BrowserRouter>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(App)
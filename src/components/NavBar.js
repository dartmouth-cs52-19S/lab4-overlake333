import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import '../style.scss';

import { signoutUser } from '../actions';


// eslint-disable-next-line react/prefer-stateless-function
class Navbar extends Component {
  constructor(props) {
    super(props);
    this.onSignOutClick = this.onSignOutClick.bind(this);
  }

  onSignOutClick(event) {
    event.preventDefault();
    this.props.signoutUser(this.props.history);
  }

  renderSignInOutButton() {
    if (this.props.auth) {
      return <button type="button" id="logOutButton" onClick={this.onSignOutClick}> Log Out </button>;
    } else {
      return <button type="button" id="logOutButton"> <NavLink to="/Login"> Are You Sure? </NavLink></button>;
    }
  }

  render() {
    return (
      <div id="header">
        <nav>
          <ul>
            <div id="logo">
              <li><p>Taste of Home</p></li>
            </div>

            <div id="links">
              {this.renderSignInOutButton()}
              <li><NavLink exact to="/">Recipes</NavLink></li>
              <li><NavLink exact to="/posts/new"><input type="button" value="New Recipe" /></NavLink></li>
            </div>
          </ul>
        </nav>
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    auth: state.auth.authenticated,

  }

);

export default withRouter(connect(mapStateToProps, { signoutUser })(Navbar));

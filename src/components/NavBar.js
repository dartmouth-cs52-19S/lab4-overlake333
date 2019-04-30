import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';


// eslint-disable-next-line react/prefer-stateless-function
class Navbar extends Component {
  render() {
    return (
      <div id="header">
        <nav>
          <ul>
            <div id="logo">
              <li><p>Taste of Home</p></li>
            </div>

            <div id="links">
              <li><NavLink exact to="/">Recipes</NavLink></li>
              <li><NavLink exact to="/posts/new"><input type="button" value="New Recipe" /></NavLink></li>
            </div>
          </ul>
        </nav>
      </div>
    );
  }
}

export default Navbar;

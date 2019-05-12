import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { signupUser } from '../actions';

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      email: '',
    };

    this.signUp = this.signUp.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  onInputChange(event) {
    const { id } = event.target;
    if (id === 'email') {
      this.setState({ email: event.target.value });
    } else if (id === 'password') {
      this.setState({ password: event.target.value });
    } else if (id === 'username') {
      this.setState({ username: event.target.value });
    }
  }

  signUp(event) {
    event.preventDefault();
    this.props.signupUser(this.state, this.props.history);
  }

  render() {
    return (
      <div id="signUp">
        <form id="inputContainer">
          <label htmlFor="username">Username
            <input id="username" className="inputField" onChange={this.onInputChange} value={this.state.username} />
          </label>
          <label htmlFor="email">Email
            <input id="email" className="inputField" onChange={this.onInputChange} value={this.state.email} />
          </label>
          <label htmlFor="password">Password
            <input id="password" className="inputField" onChange={this.onInputChange} value={this.state.password} />
          </label>
          <button type="button" id="signUpInButton" onClick={this.signUp}> Sign Up </button>
        </form>
      </div>
    );
  }
}

export default withRouter(connect(null, { signupUser })(SignUp));

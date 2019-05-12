import React from 'react';
import SignIn from '../containers/signIn';
import SignUp from '../containers/signUp';


class SignUpPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    return (
      <div>
        <div className="signContainer">
          <SignUp />
        </div>
        <div className="signContainer">
          <SignIn />
          <div />
        </div>
      </div>
    );
  }
}

export default SignUpPage;

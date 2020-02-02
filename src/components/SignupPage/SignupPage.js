import React from 'react';
import { connect } from 'react-redux';
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment
} from 'semantic-ui-react';

import { confirmSignup, signup } from '../../actions';

class SignupPage extends React.Component {
  state = {
    email: null,
    password: null,
    code: null
  };

  handleConfirm = () => {
    this.props.confirmSignup(this.state);
  };

  handleSignup = () => {
    this.props.signup({ ...this.state });
  };

  handleChange = (e, data) => {
    this.setState({
      [data.name]: data.value
    });
  };

  render() {
    const { signedupUser, signupMessage, isLoading } = this.props;
    return (
      <Grid
        textAlign="center"
        style={{ height: '100vh' }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="red" textAlign="center">
            Sign Up an account
          </Header>
          <Form size="large">
            <Segment stacked>
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="E-mail address"
                name="email"
                type="email"
                onChange={this.handleChange}
              />
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                name="password"
                type="password"
                onChange={this.handleChange}
              />
              {signedupUser && (
                <>
                  <Form.Input
                    fluid
                    icon="lock"
                    iconPosition="left"
                    placeholder="Verification Code"
                    name="code"
                    type="password"
                    onChange={this.handleChange}
                  />
                  <Button
                    color="red"
                    fluid
                    size="large"
                    onClick={this.handleConfirm}
                    loading={isLoading}
                  >
                    Enter the code sent to your email
                  </Button>
                </>
              )}
              {!signedupUser && (
                <Button
                  color="red"
                  fluid
                  size="large"
                  onClick={this.handleSignup}
                  loading={isLoading}
                >
                  Sign Up
                </Button>
              )}
              {signupMessage && (
                <Message negative>
                  <Message.Header>{signupMessage}</Message.Header>
                </Message>
              )}
            </Segment>
          </Form>
          <Message warning>
            Already have an account?{' '}
            <a href="/login" onClick={() => this.props.history.push('/login')}>
              Log In
            </a>
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  return {
    signedupUser: state.signedupUser,
    signupMessage: state.message,
    isLoading: state.isLoading
  };
};

export default connect(mapStateToProps, { confirmSignup, signup })(SignupPage);

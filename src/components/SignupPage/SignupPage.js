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
  }

  componentDidUpdate(prevProps) {
    if ((prevProps.confirmedEmail !== this.props.confirmedEmail) && this.props.confirmedEmail === 'SUCCESS') {
      this.props.history.push('/');
    }
  }

  handleConfirm = () => {
    const { password, ...confirmItem } = this.state;
    this.props.confirmSignup({ ...confirmItem });
  }

  handleSignup = () => {
    this.props.signup({ ...this.state });
  }

  handleChange = (e, data) => {
    this.setState({
      [data.name]: data.value
    });
  }

  render() {
    const { user, signupMessage, isLoading } = this.props;
    return (
      <Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="teal" textAlign="center">
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
              {
                user &&  (
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
                    <Button color="teal" fluid size="large" onClick={this.handleConfirm} loading={isLoading}>
                      Enter the code sent to your email
                    </Button>
                  </>
                )
              }
              {
                !user && (
                  <Button color="teal" fluid size="large" onClick={this.handleSignup} loading={isLoading}>
                    Sign Up
                  </Button>
                )
              }
              {
                signupMessage && (
                  <Message negative>
                    <Message.Header>{signupMessage}</Message.Header>
                  </Message>
                )
              }
            </Segment>
          </Form>
          <Message>
            Already have an account? <a href="/signup" onClick={() => this.props.history.push('/login')}>Log In</a>
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    signupMessage: state.message,
    isLoading: state.isLoading,
    confirmedEmail: state.confirmedEmail
  };
};

export default connect(mapStateToProps, { confirmSignup, signup })(SignupPage);

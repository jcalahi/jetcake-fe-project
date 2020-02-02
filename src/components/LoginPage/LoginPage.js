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
import { login } from '../../actions';

class LoginPage extends React.Component {
  state = {
    email: null,
    password: null
  };

  handleChange = (e, data) => {
    this.setState({
      [data.name]: data.value
    });
  };

  handleLogin = () => {
    this.props.login({ ...this.state });
  };

  render() {
    const { isLoading, loginMessage } = this.props;
    return (
      <Grid
        textAlign="center"
        style={{ height: '100vh' }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="teal" textAlign="center">
            Log-in to your account
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
              <Button
                color="teal"
                fluid
                size="large"
                loading={isLoading}
                onClick={this.handleLogin}
                disabled={!this.state.email || !this.state.password}
              >
                Login
              </Button>
              {loginMessage && (
                <Message negative>
                  <Message.Header>{loginMessage}</Message.Header>
                </Message>
              )}
            </Segment>
          </Form>
          <Message warning>
            New to us?{' '}
            <a
              href="/signup"
              onClick={() => this.props.history.push('/signup')}
            >
              Sign Up
            </a>
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoading: state.isLoading,
    loginMessage: state.message
  };
};

export default connect(mapStateToProps, { login })(LoginPage);

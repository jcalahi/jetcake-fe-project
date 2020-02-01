import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button, Container, Menu } from 'semantic-ui-react';
// actions
import { checkAuth, logout } from '../../../actions';
// components
import Profile from '../../Profile';

class DesktopNav extends React.Component {
  componentDidMount() {
    this.props.checkAuth();
  }

  handleSelectOption = (value) => {
    if (value === 'signout') {
      this.props.logout();
    }
    if (value === 'view') {
      this.props.history.push('/view');
    }
  }

  render() {
    const { fixed, history, userSession, isAuthenticated } = this.props;
    return (
      <Menu
        fixed={fixed ? 'top' : undefined}
        inverted={!fixed}
        pointing={!fixed}
        secondary={!fixed}
        size="large"
      >
        <Container>
          <Menu.Item as="a" active>
            Home
          </Menu.Item>
          <Menu.Item as="a">Work</Menu.Item>
          <Menu.Item as="a">Company</Menu.Item>
          <Menu.Item as="a">Careers</Menu.Item>
          <Menu.Item position="right">
            {
              isAuthenticated && <Profile name={userSession.email} onSelectOption={this.handleSelectOption} />
            }
            {
              !isAuthenticated && (
                <Button
                  as="a"
                  inverted={!fixed}
                  onClick={() => history.push('/login')}
                >
                  Log in
                </Button>
              )
            }
          </Menu.Item>
        </Container>
      </Menu>
    );
  }
}

const mapStateToProps = ({ isAuthenticated, userSession }) => {
  return {
    isAuthenticated,
    userSession
  };
};

export default compose(
  connect(mapStateToProps, { checkAuth, logout }),
  withRouter
)(DesktopNav);

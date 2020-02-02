import React from 'react';
import { withRouter } from 'react-router-dom';
import {
  Button,
  Container,
  Icon,
  Menu
} from 'semantic-ui-react';

const MobileNav = ({ toggleSidebar, isAuth, user, history }) => {
  return (
    <Container>
      <Menu inverted pointing secondary size='large'>
        <Menu.Item onClick={toggleSidebar}>
          <Icon name='sidebar' />
        </Menu.Item>
        <Menu.Item position='right'>
          {
            isAuth && <span>{user.email}</span>
          }
          {
            !isAuth && (
              <Button as='a' inverted onClick={() => history.push('/login')}>
                Log in
              </Button>
            )
          }
        </Menu.Item>
      </Menu>
    </Container>
  );
};

export default withRouter(MobileNav);

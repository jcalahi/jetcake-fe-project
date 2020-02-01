import React from 'react';
import {
  Button,
  Container,
  Icon,
  Menu
} from 'semantic-ui-react';

const MobileNav = ({ toggleSidebar }) => {
  return (
    <Container>
      <Menu inverted pointing secondary size='large'>
        <Menu.Item onClick={toggleSidebar}>
          <Icon name='sidebar' />
        </Menu.Item>
        <Menu.Item position='right'>
          <Button as='a' inverted>
            Log in
          </Button>
        </Menu.Item>
      </Menu>
    </Container>
  );
};

export default MobileNav;

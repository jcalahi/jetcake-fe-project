import React from 'react';
import { Menu } from 'semantic-ui-react';

const MobileNavSidebar = () => {
  return (
    <>
      <Menu.Item as='a' active>Home</Menu.Item>
      <Menu.Item as='a'>Work</Menu.Item>
      <Menu.Item as='a'>Company</Menu.Item>
      <Menu.Item as='a'>Careers</Menu.Item>
      <Menu.Item as='a'>Log in</Menu.Item>
      <Menu.Item as='a'>Sign Up</Menu.Item>
    </>
  );
};

export default MobileNavSidebar;

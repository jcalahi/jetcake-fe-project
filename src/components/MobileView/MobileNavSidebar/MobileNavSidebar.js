import React from 'react';
import { withRouter } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

const MobileNavSidebar = ({ isAuth, history, logout }) => {
  return (
    <>
      {
        isAuth && (
          <>
            <Menu.Item as='a' onClick={() => history.push('/view')}>View Profile</Menu.Item>
            <Menu.Item as='a' onClick={logout}>Sign Out</Menu.Item>
          </>
        )
      }
      {
        !isAuth && (
          <>
            <Menu.Item as='a' active>Home</Menu.Item>
            <Menu.Item as='a'>Work</Menu.Item>
            <Menu.Item as='a'>Company</Menu.Item>
            <Menu.Item as='a'>Careers</Menu.Item>
            <Menu.Item as='a' onClick={() => history.push('/signup')}>Sign Up</Menu.Item>
          </>
        )
      }
    </>
  );
};

export default withRouter(MobileNavSidebar);

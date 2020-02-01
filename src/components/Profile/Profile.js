import React from 'react';
import { Dropdown } from 'semantic-ui-react'

const options = [
  { key: 'user', text: 'Account', icon: 'user' },
  { key: 'sign-out', text: 'Sign Out', icon: 'sign out' },
]

const Profile = (props) => {
  return (
    <Dropdown
      trigger={<span>{props.name}</span>}
      options={options}
      pointing='top left'
      icon={null}
    />
  );
};

export default Profile;

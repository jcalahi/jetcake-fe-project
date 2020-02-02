import React from 'react';
import { Dropdown } from 'semantic-ui-react';

const options = [
  { key: 'view', text: 'View Profile', icon: 'user', value: 'view' },
  { key: 'sign-out', text: 'Sign Out', icon: 'sign out', value: 'signout' }
];

const Profile = props => {
  function handleChange(e, data) {
    props.onSelectOption(data.value);
  }

  return (
    <Dropdown
      trigger={<span>{props.name}</span>}
      options={options}
      pointing="top left"
      icon={null}
      onChange={handleChange}
    />
  );
};

export default Profile;

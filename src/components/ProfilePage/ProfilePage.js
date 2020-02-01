import React from 'react';
import { connect } from 'react-redux';
import {
  Grid,
  Form,
  Button,
  Message,
  TextArea
} from 'semantic-ui-react';
import { checkAuth, updateProfile } from '../../actions';

class ProfilePage extends React.Component {
  componentDidMount() {
    this.props.checkAuth();
  }

  render() {
    const { userSession } = this.props;
    return (
      <Grid centered style={{ height: '90vh' }} verticalAlign="middle">
        <Grid.Column style={{ maxWidth: 700 }}>
          <Message
            color="blue"
            attached
            header="Edit your Profile"
          />
          <Form className="attached fluid segment">
            <Form.Input
              fluid
              label="Email (read-only)"
              value={userSession ? userSession.email : ''}
              readOnly
            />
            <Form.Input
              fluid
              label="Date of Birth"
              placeholder="Enter your birthdate"
              type="date"
            />
            <Form.Input 
              label="Phone Number" 
              placeholder="Enter your phone number" 
              type="text" 
            />
            <Form.Input 
              control={TextArea}
              label="Address" 
              type="textarea" 
            />
            <Form.Input 
              label="What is your dog's name?" 
              placeholder="Security Question #1" 
              type="text" 
            />
            <Form.Input 
              label="What is your favorite color?" 
              placeholder="Security Question #2" 
              type="text" 
            />
            <Form.Input 
              label="What is your middle name?" 
              placeholder="Security Question #3" 
              type="text" 
            />
            <Button color="red" basic>Cancel</Button>
            <Button color="blue" basic onClick={() => this.props.updateProfile()}>Submit</Button>
          </Form>
        </Grid.Column>
      </Grid>
    );
  }
}

const mapStateToProps = ({ isAuthenticated, isLoading, userSession }) => {
  return {
    isAuthenticated,
    isLoading,
    userSession
  };
};

export default connect(mapStateToProps, { checkAuth, updateProfile })(ProfilePage);

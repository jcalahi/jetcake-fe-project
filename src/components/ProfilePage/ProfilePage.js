import React from 'react';
import { connect } from 'react-redux';
import { Grid, Form, Button, Message, TextArea } from 'semantic-ui-react';
import { checkAuth, updateProfile, setProfileField } from '../../actions';

class ProfilePage extends React.Component {

  componentDidMount() {
    this.props.checkAuth();
  }

  handleChange = (e, data) => {
    this.props.setProfileField(data.name, data.value);
  };

  handleSubmit = () => {
    this.props.updateProfile(this.props.userProfile);
  };

  validateFields = () => {
    return Object.keys(this.props.userProfile).some(prop => this.props.userProfile[prop].length === 0);
  };

  render() {
    const {
      isLoading,
      userSession,
      history,
      postFailed,
      userProfile
    } = this.props;

    if (!userSession) {
      return (
        <Message negative>
          <Message.Header>Not Authorized</Message.Header>
        </Message>
      );
    };

    return (
      <Grid centered style={{ height: '100vh' }} verticalAlign="middle">
        <Grid.Column style={{ maxWidth: 700 }}>
          <Message
            color="blue"
            attached
            header="Edit your Profile"
            content="Fill out the form and submit"
          />
          <Form
            className="attached fluid segment"
            onSubmit={() => {}}
            loading={isLoading}
          >
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
              name="birthdate"
              value={userProfile.birthdate}
              onChange={this.handleChange}
            />
            <Form.Input
              label="Phone Number"
              placeholder="Enter your phone number"
              type="text"
              name="phonenumber"
              value={userProfile.phonenumber}
              onChange={this.handleChange}
            />
            <Form.Input
              control={TextArea}
              label="Address"
              type="textarea"
              name="address"
              value={userProfile.address}
              onChange={this.handleChange}
            />
            <Form.Input
              label="What is your dog's name?"
              placeholder="Security Question #1"
              type="text"
              name="question1"
              value={userProfile.question1}
              onChange={this.handleChange}
            />
            <Form.Input
              label="What is your favorite color?"
              placeholder="Security Question #2"
              type="text"
              name="question2"
              value={userProfile.question2}
              onChange={this.handleChange}
            />
            <Form.Input
              label="What is your middle name?"
              placeholder="Security Question #3"
              type="text"
              name="question3"
              value={userProfile.question3}
              onChange={this.handleChange}
            />
            <Button basic color="red" onClick={() => history.push('/')}>
              Cancel
            </Button>
            <Button
              basic
              color="blue"
              disabled={this.validateFields()}
              onClick={this.handleSubmit}
            >
              Submit
            </Button>
            {postFailed && (
              <Message negative>
                <Message.Header>{postFailed}</Message.Header>
              </Message>
            )}
          </Form>
        </Grid.Column>
      </Grid>
    );
  }
}

const mapStateToProps = ({
  isAuthenticated,
  isLoading,
  userSession,
  postSuccess,
  postFailed,
  userProfile
}) => {
  return {
    isAuthenticated,
    isLoading,
    userSession,
    postSuccess,
    postFailed,
    userProfile
  };
};

export default connect(mapStateToProps, {
  checkAuth,
  updateProfile,
  setProfileField
})(ProfilePage);

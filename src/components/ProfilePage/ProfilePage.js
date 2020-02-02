import React from 'react';
import { connect } from 'react-redux';
import { Grid, Form, Button, Message, TextArea } from 'semantic-ui-react';
import { checkAuth, updateProfile, getProfileData } from '../../actions';

class ProfilePage extends React.Component {
  state = {
    birthdate: '',
    address: '',
    phonenumber: '',
    question1: '',
    question2: '',
    question3: ''
  };

  componentDidMount() {
    this.props.checkAuth();
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.isAuthenticated !== this.props.isAuthenticated &&
      this.props.isAuthenticated
    ) {
      this.props.getProfileData();
    }
    if (
      prevProps.postSuccess !== this.props.postSuccess &&
      this.props.postSuccess
    ) {
      this.props.history.push('/');
    }
  }

  handleChange = (e, data) => {
    this.setState({
      [data.name]: data.value
    });
  };

  handleSubmit = () => {
    this.props.updateProfile({ ...this.state });
  };

  validateFields = () => {
    return Object.keys(this.state).some(prop => this.state[prop].length === 0);
  };

  render() {
    const {
      isLoading,
      userSession,
      history,
      postFailed,
      userProfile
    } = this.props;
    console.log(userProfile);

    if (!userProfile) return <div>loading...</div>;

    return (
      <Grid centered style={{ height: '90vh' }} verticalAlign="middle">
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
              onChange={this.handleChange}
            />
            <Form.Input
              label="Phone Number"
              placeholder="Enter your phone number"
              type="text"
              name="phonenumber"
              value={this.state.phonenumber || userProfile.phonenumber}
              onChange={this.handleChange}
            />
            <Form.Input
              control={TextArea}
              label="Address"
              type="textarea"
              name="address"
              onChange={this.handleChange}
            />
            <Form.Input
              label="What is your dog's name?"
              placeholder="Security Question #1"
              type="text"
              name="question1"
              onChange={this.handleChange}
            />
            <Form.Input
              label="What is your favorite color?"
              placeholder="Security Question #2"
              type="text"
              name="question2"
              onChange={this.handleChange}
            />
            <Form.Input
              label="What is your middle name?"
              placeholder="Security Question #3"
              type="text"
              name="question3"
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
  getProfileData
})(ProfilePage);

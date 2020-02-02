import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import {
  Menu,
  Responsive,
  Segment,
  Sidebar
} from 'semantic-ui-react';
// actions
import { checkAuth, logout } from '../../../actions';

import PageHeader from '../../PageHeader';
import MobileNav from '../MobileNav';
import MobileNavSidebar from '../MobileNavSidebar';

const MobileSegment = styled(Segment)`
  && {
    min-height: 350px;
    padding: 1em 0em;
  }
`;

class MobileContainer extends React.Component {
  state = {
    sidebarOpened: false
  }

  componentDidMount() {
    this.props.checkAuth();
  }

  handleSidebarHide = () => this.setState({ sidebarOpened: false })
  handleToggle = () => this.setState({ sidebarOpened: true })

  render() {
    const { children, isAuthenticated, userSession, logout } = this.props
    const { sidebarOpened } = this.state

    return (
      <Responsive
        as={Sidebar.Pushable}
        maxWidth={Responsive.onlyMobile.maxWidth}
      >
        <Sidebar
          as={Menu}
          animation='push'
          inverted
          onHide={this.handleSidebarHide}
          vertical
          visible={sidebarOpened}
        >
          <MobileNavSidebar
            isAuth={isAuthenticated}
            logout={logout}
          />
        </Sidebar>
        <Sidebar.Pusher dimmed={sidebarOpened}>
          <MobileSegment
            inverted
            textAlign='center'
            vertical
          >
            <MobileNav
              toggleSidebar={this.handleToggle}
              isAuth={isAuthenticated}
              user={userSession}
            />
            <PageHeader layout="mobile" />
          </MobileSegment>
          {children}
        </Sidebar.Pusher>
      </Responsive>
    )
  }
}

const mapStateToProps = ({ isAuthenticated, userSession }) => {
  return {
    isAuthenticated,
    userSession
  };
};

export default connect(mapStateToProps, { checkAuth, logout })(MobileContainer);

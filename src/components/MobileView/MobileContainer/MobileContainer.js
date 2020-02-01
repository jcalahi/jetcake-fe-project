import React from 'react';
import styled from 'styled-components';
import {
  Menu,
  Responsive,
  Segment,
  Sidebar
} from 'semantic-ui-react';

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

  handleSidebarHide = () => this.setState({ sidebarOpened: false })
  handleToggle = () => this.setState({ sidebarOpened: true })

  render() {
    const { children } = this.props
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
          <MobileNavSidebar />
        </Sidebar>
        <Sidebar.Pusher dimmed={sidebarOpened}>
          <MobileSegment
            inverted
            textAlign='center'
            vertical
          >
            <MobileNav toggleSidebar={this.handleToggle} />
            <PageHeader layout="mobile" />
          </MobileSegment>
          {children}
        </Sidebar.Pusher>
      </Responsive>
    )
  }
}

export default MobileContainer;

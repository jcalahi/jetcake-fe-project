import React from 'react';
import styled from 'styled-components';
import { 
  Responsive, 
  Segment,
  Visibility 
} from 'semantic-ui-react';
import PageHeader from '../../PageHeader';
import DesktopNav from '../DesktopNav';

const StyledSegment = styled(Segment)`
  && {
    min-height: 700px;
    padding: 1em 0em;
  }
`;

class DesktopContainer extends React.Component {
  state = {
    fixed: false
  }

  hideFixedMenu = () => this.setState({ fixed: false })
  showFixedMenu = () =>  this.setState({ fixed: true })

  render() {
    const { fixed } = this.state;
    const { children } = this.props;
    return (
      <Responsive minWidth={Responsive.onlyTablet.minWidth}>
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        >
          <StyledSegment
            inverted
            textAlign='center'
            vertical
          >
            <DesktopNav fixed={fixed} />
            <PageHeader layout="desktop" />
          </StyledSegment>
        </Visibility>
        {children}
      </Responsive>
    );
  }
}

export default DesktopContainer;

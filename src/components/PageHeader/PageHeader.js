import React from 'react';
import styled from 'styled-components';
import {
  Button,
  Container,
  Header,
  Icon
} from 'semantic-ui-react';

const StyledH1 = styled(Header)`
  &&& {
    font-size: ${p => p.layout === 'mobile' ? '2em' : '4em' };
    font-weight: normal;
    margin-bottom: 0;
    margin-top: ${p => p.layout === 'mobile' ? '1.5em' : '3em' }
  }
`;

const StyledH2 = styled(Header)`
  &&& {
    font-size: ${p => p.layout === 'mobile' ? '1.5em' : '1.7em' };
    font-weight: normal;
    margin-top: ${p => p.layout === 'mobile' ? '0.5em' : 's1.5em' }
  }
`;

const PageHeader = ({ layout }) => {
  return (
    <Container text>
      <StyledH1
        as={Header}
        content='Imagine-a-Company'
        inverted
        layout={layout}
      />
      <StyledH2
        as={Header}
        content='Do whatever you want when you want to.'
        inverted
        layout={layout}
      />
      <Button primary size='huge'>
        Get Started
        <Icon name="arrow right" />
      </Button>
    </Container>
  );
};

export default PageHeader;
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
        content='I AM YOUR HERO'
        inverted
        layout={layout}
      />
      <StyledH2
        as={Header}
        content='Running errands on your behalf'
        inverted
        layout={layout}
      />
      <Button primary size='huge'>
        Let's get things done!
        <Icon name="arrow right" />
      </Button>
    </Container>
  );
};

export default PageHeader;
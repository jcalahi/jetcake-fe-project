import React from 'react';
import styled from 'styled-components';
import {
  Grid,
  Header,
  Image
} from 'semantic-ui-react';

const StyledGridColumn = styled(Grid.Column)`
  && {
    padding-bottom: 5em !important;
    padding-top: 5em !important;
  }
`;

const StyledH3 = styled(Header)`
  &&& {
    font-size: 2em;
  }
`;

const StyledP = styled.p`
  font-size: 1.33em;
`;

const Testimonial = () => {
  return (
    <Grid celled="internally" columns="equal" stackable>
      <Grid.Row textAlign="center">
        <StyledGridColumn>
          <StyledH3 as="h3">
            "What a Company"
          </StyledH3>
          <StyledP>
            That is what they all say about us
          </StyledP>
        </StyledGridColumn>
        <StyledGridColumn>
          <StyledH3 as="h3">
            "I shouldn't have gone with their competitor."
          </StyledH3>
          <StyledP>
            <Image avatar src="/images/avatar/large/nan.jpg" />
            <b>Nan</b> Chief Fun Officer Acme Toys
          </StyledP>
        </StyledGridColumn>
      </Grid.Row>
    </Grid>
  );
};

export default Testimonial;

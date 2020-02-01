import React from 'react';
import styled from 'styled-components';
import {
  Grid,
  Header,
  Image
} from 'semantic-ui-react';

const StyledH3 = styled(Header)`
  &&& {
    font-size: 2em;
  }
`;

const StyledP = styled.p`
  font-size: 1.33em;
`;

const About = () => {
  return (
    <Grid container stackable verticalAlign="middle">
      <Grid.Row>
        <Grid.Column width={8}>
          <StyledH3 as="h3">
            We Help Companies and Companions
          </StyledH3>
          <StyledP>
            We can give your company superpowers to do things that they never
            thought possible. Let us delight your customers and empower your
            needs... through pure data analytics.
          </StyledP>
          <StyledH3 as="h3">
            We Make Bananas That Can Dance
          </StyledH3>
          <StyledP>
            Yes that's right, you thought it was the stuff of dreams, but even
            bananas can be bioengineered.
          </StyledP>
        </Grid.Column>
        <Grid.Column floated="right" width={6}>
          <Image
            bordered
            rounded
            size="large"
            src="/images/wireframe/white-image.png"
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default About;

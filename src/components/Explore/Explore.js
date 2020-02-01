import React from 'react';
import styled from 'styled-components';
import {
  Button,
  Container,
  Divider,
  Header
} from 'semantic-ui-react';

const StyledH3 = styled(Header)`
  && {
    font-size: 2em;
  }
`;

const StyledP = styled.p`
  font-size: 1.33em;
`;

const Explore = () => {
  return (
    <Container text>
      <StyledH3 as="h3">
        Breaking The Grid, Grabs Your Attention
      </StyledH3>
      <StyledP>
        Instead of focusing on content creation and hard work, we have learned
        how to master the art of doing nothing by providing massive amounts of
        whitespace and generic content that can seem massive, monolithic and
        worth your attention.
      </StyledP>
      <Button as="a" size="large">
        Read More
      </Button>
      <Divider
        as="h4"
        className="header"
        horizontal
        style={{ margin: '3em 0em', textTransform: 'uppercase' }}
      >
        {/* <a href='javascript:void(0)'>Case Studies</a> */}
      </Divider>
      <StyledH3 as="h3">
        Did We Tell You About Our Bananas?
      </StyledH3>
      <StyledP>
        Yes I know you probably disregarded the earlier boasts as non-sequitur
        filler content, but it's really true. It took years of gene splicing and
        combinatory DNA research, but our bananas can really dance.
      </StyledP>
      <Button as="a" size="large">
        I'm Still Quite Interested
      </Button>
    </Container>
  );
};

export default Explore;
